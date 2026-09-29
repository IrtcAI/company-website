export const WORLD_MAP_WIDTH = 600;
export const WORLD_MAP_HEIGHT = 280;

const LAT_MIN = -58;
const LAT_MAX = 83;

export function projectLonLat(lon: number, lat: number): [number, number] {
  const mapWidth = WORLD_MAP_WIDTH;
  const mapHeight = (mapWidth * (LAT_MAX - LAT_MIN)) / 360;
  const offsetY = (WORLD_MAP_HEIGHT - mapHeight) / 2;
  const x = ((lon + 180) / 360) * mapWidth;
  const y = offsetY + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * mapHeight;
  return [x, y];
}
