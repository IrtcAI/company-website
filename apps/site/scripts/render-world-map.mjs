import { writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";
const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(site, "lib", "world-map.ts");

const WIDTH = 600;
const HEIGHT = 280;
const LAT_MIN = -58;
const LAT_MAX = 83;
const GRID = 4;

function projectLonLat(lon, lat) {
  const mapWidth = WIDTH;
  const mapHeight = (mapWidth * (LAT_MAX - LAT_MIN)) / 360;
  const offsetY = (HEIGHT - mapHeight) / 2;
  const x = ((lon + 180) / 360) * mapWidth;
  const y = offsetY + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * mapHeight;
  return [x, y];
}

function unprojectXY(x, y) {
  const mapWidth = WIDTH;
  const mapHeight = (mapWidth * (LAT_MAX - LAT_MIN)) / 360;
  const offsetY = (HEIGHT - mapHeight) / 2;
  const lon = (x / mapWidth) * 360 - 180;
  const lat = LAT_MAX - ((y - offsetY) / mapHeight) * (LAT_MAX - LAT_MIN);
  return [lon, lat];
}

function decodeArcs(topology) {
  const { scale, translate } = topology.transform;
  return topology.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
}

function arcPoints(arcs, index) {
  return index >= 0 ? arcs[index] : arcs[~index].slice().reverse();
}

function ringPoints(arcs, ring) {
  const points = [];
  for (const index of ring) {
    const coords = arcPoints(arcs, index);
    points.push(...(points.length ? coords.slice(1) : coords));
  }
  return points;
}

// Natural Earth splits rings at the antimeridian, so longitudes jump ~360°;
// unwrap them or point-in-polygon draws false land bridges across oceans.
function unwrapRing(ring) {
  const out = [ring[0]];
  let prevLon = ring[0][0];
  for (let i = 1; i < ring.length; i++) {
    let [lon, lat] = ring[i];
    while (lon - prevLon > 180) lon -= 360;
    while (lon - prevLon < -180) lon += 360;
    out.push([lon, lat]);
    prevLon = lon;
  }
  return out;
}

function ringBBox(ring) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
}

function pointInPolygon(x, y, polygon) {
  let inside = false;
  for (const ring of polygon.rings) {
    const points = ring.points;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];
      const intersects =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersects) inside = !inside;
    }
  }
  return inside;
}

function isLand(polygons, lon, lat) {
  return polygons.some((polygon) => {
    const [minX, minY, maxX, maxY] = polygon.bbox;
    if (lat < minY || lat > maxY) return false;
    for (const candidate of [lon, lon - 360, lon + 360]) {
      if (candidate < minX || candidate > maxX) continue;
      if (pointInPolygon(candidate, lat, polygon)) return true;
    }
    return false;
  });
}

async function main() {
  console.log(`Fetching ${SOURCE_URL}`);
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(
      `Download failed: ${response.status} ${response.statusText}`,
    );
  }
  const topology = await response.json();
  const arcs = decodeArcs(topology);
  const land = topology.objects.land;
  const rawPolygons =
    land.type === "MultiPolygon"
      ? land.arcs
      : land.geometries.flatMap((g) => g.arcs);

  const polygons = rawPolygons.map((rings) => {
    const decodedRings = rings.map((ring) => {
      const points = unwrapRing(ringPoints(arcs, ring));
      return { points, bbox: ringBBox(points) };
    });
    const bbox = decodedRings.reduce(
      (acc, ring) => [
        Math.min(acc[0], ring.bbox[0]),
        Math.min(acc[1], ring.bbox[1]),
        Math.max(acc[2], ring.bbox[2]),
        Math.max(acc[3], ring.bbox[3]),
      ],
      [Infinity, Infinity, -Infinity, -Infinity],
    );
    return { rings: decodedRings, bbox };
  });

  const mapHeight = (WIDTH * (LAT_MAX - LAT_MIN)) / 360;
  const offsetY = (HEIGHT - mapHeight) / 2;
  const segments = [];
  let dotCount = 0;

  for (let py = offsetY; py <= offsetY + mapHeight; py += GRID) {
    for (let px = 0; px <= WIDTH; px += GRID) {
      const [lon, lat] = unprojectXY(px, py);
      if (isLand(polygons, lon, lat)) {
        segments.push(`M${Math.round(px)} ${Math.round(py)}h0`);
        dotCount += 1;
      }
    }
  }

  const dots = segments.join("");
  const kb = (Buffer.byteLength(dots) / 1024).toFixed(1);
  console.log(`${dotCount} dots, path data ${kb} KB`);

  const output = `
export const WORLD_MAP_WIDTH = ${WIDTH};
export const WORLD_MAP_HEIGHT = ${HEIGHT};

const LAT_MIN = ${LAT_MIN};
const LAT_MAX = ${LAT_MAX};

export function projectLonLat(lon: number, lat: number): [number, number] {
  const mapWidth = WORLD_MAP_WIDTH;
  const mapHeight = (mapWidth * (LAT_MAX - LAT_MIN)) / 360;
  const offsetY = (WORLD_MAP_HEIGHT - mapHeight) / 2;
  const x = ((lon + 180) / 360) * mapWidth;
  const y = offsetY + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * mapHeight;
  return [x, y];
}

export const WORLD_LAND_DOTS =
  "${dots}";
`;

  writeFileSync(OUTPUT, output.trimStart());
  console.log(
    `Wrote ${OUTPUT} (${(Buffer.byteLength(output) / 1024).toFixed(1)} KB total)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
