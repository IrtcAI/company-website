import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { StudioKind } from "./studio-kinds";

type Part = {
  mesh: THREE.Object3D;
  offset: THREE.Vector3;
  turn: THREE.Euler;
};

type Idle = (wave: (speed: number) => number) => void;

type Model = {
  root: THREE.Group;
  body: THREE.Group;
  parts: Part[];
  idle?: Idle;
};

export type StageSlot = { element: HTMLElement; kind: StudioKind };

export type StageOptions = {
  paused: () => boolean;
  progress?: () => number;
  active?: () => boolean;
};

const poses: Record<StudioKind, [number, number, number]> = {
  browser: [0.18, -0.45, 0.05],
  robot: [0.14, -0.34, 0.03],
  database: [0.42, 0.3, -0.22],
  server: [0.42, -0.42, 0.08],
  phone: [0.12, -0.42, 0.26],
};

const fov = 30;
const distance = 1.18 / Math.sin(THREE.MathUtils.degToRad(fov / 2));

function createMaterials() {
  return {
    charcoal: new THREE.MeshPhysicalMaterial({
      color: 0x1d2120,
      metalness: 0.6,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    }),
    silver: new THREE.MeshStandardMaterial({
      color: 0xd8dfd8,
      metalness: 0.95,
      roughness: 0.22,
    }),
    mint: new THREE.MeshPhysicalMaterial({
      color: 0xa5dec5,
      metalness: 0.2,
      roughness: 0.28,
      clearcoat: 1,
    }),
    orange: new THREE.MeshPhysicalMaterial({
      color: 0xffbd66,
      metalness: 0.28,
      roughness: 0.25,
      clearcoat: 1,
    }),
    glow: new THREE.MeshStandardMaterial({
      color: 0x8fdcb8,
      emissive: 0x3fc48e,
      emissiveIntensity: 0.55,
      roughness: 0.4,
    }),
  };
}

type Materials = ReturnType<typeof createMaterials>;

function rounded(
  width: number,
  height: number,
  depth: number,
  material: THREE.Material,
  radius: number,
) {
  return new THREE.Mesh(
    new RoundedBoxGeometry(width, height, depth, 3, radius),
    material,
  );
}

function part(
  parts: Part[],
  mesh: THREE.Object3D,
  offset: [number, number, number],
  turn: [number, number, number] = [0, 0, 0],
) {
  parts.push({
    mesh,
    offset: new THREE.Vector3(...offset),
    turn: new THREE.Euler(...turn),
  });
  mesh.userData.base = mesh.position.clone();
  mesh.userData.rotation = mesh.rotation.clone();
  return mesh;
}

function buildBrowser(body: THREE.Group, parts: Part[], materials: Materials) {
  const frame = rounded(2.6, 1.9, 0.14, materials.silver, 0.08);
  body.add(part(parts, frame, [0, -1.3, -0.9], [0.7, 0, 0]));

  const screen = rounded(2.42, 1.46, 0.04, materials.charcoal, 0.04);
  screen.position.set(0, -0.14, 0.08);
  body.add(part(parts, screen, [0, 0, -0.7]));

  const toolbar = new THREE.Group();
  [materials.orange, materials.mint, materials.charcoal].forEach(
    (material, index) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 16, 12),
        material,
      );
      dot.position.set(-1.1 + index * 0.17, 0.77, 0.08);
      toolbar.add(dot);
    },
  );
  const address = rounded(1.3, 0.14, 0.04, materials.charcoal, 0.05);
  address.position.set(0.15, 0.77, 0.08);
  toolbar.add(address);
  body.add(part(parts, toolbar, [0, 0.9, 0.9]));

  const tiles: [number, number, number, number, THREE.Material][] = [
    [0, 0.42, 2.2, 0.22, materials.mint],
    [-0.62, -0.28, 0.95, 0.95, materials.orange],
    [0.55, -0.02, 1.1, 0.42, materials.mint],
    [0.55, -0.55, 1.1, 0.42, materials.mint],
  ];
  tiles.forEach(([x, y, width, height, material], index) => {
    const tile = rounded(width, height, 0.05, material, 0.05);
    tile.position.set(x, y, 0.12);
    body.add(part(parts, tile, [0, 0, 1.2 + index * 0.3]));
  });
}

function sparkle(radius: number, depth: number, material: THREE.Material) {
  const shape = new THREE.Shape();
  const waist = radius * 0.1;
  shape.moveTo(0, radius);
  [
    [radius, 0],
    [0, -radius],
    [-radius, 0],
    [0, radius],
  ].forEach(([x, y], index) => {
    const corner = [
      [waist, waist],
      [waist, -waist],
      [-waist, -waist],
      [-waist, waist],
    ][index];
    shape.quadraticCurveTo(corner[0], corner[1], x, y);
  });
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.03,
    bevelThickness: 0.03,
    curveSegments: 16,
  });
  geometry.rotateX(-Math.PI / 2);
  return new THREE.Mesh(geometry, material);
}

function plate(
  width: number,
  height: number,
  radius: number,
  material: THREE.Material,
) {
  const x = width / 2 - radius;
  const y = height / 2 - radius;
  const shape = new THREE.Shape();
  shape.absarc(x, y, radius, 0, Math.PI / 2);
  shape.absarc(-x, y, radius, Math.PI / 2, Math.PI);
  shape.absarc(-x, -y, radius, Math.PI, Math.PI * 1.5);
  shape.absarc(x, -y, radius, Math.PI * 1.5, Math.PI * 2);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.03,
    bevelThickness: 0.03,
    curveSegments: 10,
  });
  return new THREE.Mesh(geometry, material);
}

function buildRobot(body: THREE.Group, parts: Part[], materials: Materials) {
  const torso = new THREE.Group();
  torso.add(
    new THREE.Mesh(
      new RoundedBoxGeometry(1.04, 0.78, 0.84, 4, 0.32),
      materials.silver,
    ),
  );
  const chest = plate(0.5, 0.36, 0.12, materials.charcoal);
  chest.position.set(0, 0.02, 0.38);
  const badge = sparkle(0.12, 0.03, materials.glow);
  badge.rotation.x = Math.PI / 2;
  badge.position.set(0, 0.02, 0.46);
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.24, 0.16, 24),
    materials.charcoal,
  );
  neck.position.y = 0.44;
  torso.add(chest, badge, neck);
  torso.position.y = -0.88;
  body.add(part(parts, torso, [0, -1.2, 0]));

  const arm = new THREE.CapsuleGeometry(0.12, 0.26, 4, 12);
  const arms = [-1, 1].map((side) => {
    const shoulder = new THREE.Group();
    const limb = new THREE.Mesh(arm, materials.silver);
    limb.position.y = side * 0.22;
    shoulder.add(limb);
    shoulder.position.set(side * 0.5, -0.82, 0.02);
    shoulder.rotation.z = side < 0 ? -0.42 : -0.6;
    body.add(part(parts, shoulder, [side * 1.1, -0.4, 0.3]));
    return shoulder;
  });

  const head = new THREE.Group();
  head.add(
    new THREE.Mesh(
      new RoundedBoxGeometry(1.6, 1.18, 1.14, 5, 0.42),
      materials.silver,
    ),
  );
  const visor = plate(1.24, 0.8, 0.3, materials.charcoal);
  visor.position.z = 0.54;
  head.add(visor);

  const smile = new THREE.TorusGeometry(0.12, 0.04, 10, 24, Math.PI);
  [-0.27, 0.27].forEach((x) => {
    const eye = new THREE.Mesh(smile, materials.glow);
    eye.position.set(x, 0.04, 0.66);
    head.add(eye);
  });
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.11, 0.034, 10, 24, Math.PI),
    materials.glow,
  );
  mouth.rotation.z = Math.PI;
  mouth.position.set(0, -0.14, 0.66);
  head.add(mouth);

  const ear = new THREE.CylinderGeometry(0.22, 0.22, 0.14, 32);
  ear.rotateZ(Math.PI / 2);
  [-1, 1].forEach((side) => {
    const pod = new THREE.Mesh(ear, materials.orange);
    pod.position.x = side * 0.82;
    head.add(pod);
  });

  const antenna = new THREE.Group();
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.3, 12),
    materials.charcoal,
  );
  stem.position.y = 0.15;
  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 24, 16),
    materials.orange,
  );
  tip.position.y = 0.34;
  antenna.add(stem, tip);
  antenna.position.y = 0.56;
  antenna.rotation.z = -0.18;
  head.add(antenna);

  head.position.y = 0.2;
  body.add(part(parts, head, [0, 1.2, 0.4]));

  const spark = sparkle(0.2, 0.06, materials.orange);
  spark.rotation.x = Math.PI / 2;
  spark.position.set(0.9, 1.0, 0.1);
  body.add(part(parts, spark, [0.8, 1.4, 0], [0, 0, 1.4]));

  return (wave: (speed: number) => number) => {
    head.rotation.z = wave(0.8) * 0.07;
    arms[1].rotation.z = -0.6 + wave(2.4) * 0.14;
  };
}

function buildDatabase(body: THREE.Group, parts: Part[], materials: Materials) {
  const disc = new THREE.CylinderGeometry(0.64, 0.64, 0.33, 48, 1);
  const rim = new THREE.TorusGeometry(0.62, 0.025, 8, 48);

  for (let index = 0; index < 3; index++) {
    const tier = new THREE.Group();
    tier.add(new THREE.Mesh(disc, materials.charcoal));
    const ring = new THREE.Mesh(rim, materials.mint);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.16;
    tier.add(ring);
    tier.position.y = index * 0.46 - 0.46;
    body.add(part(parts, tier, [0, (index - 1) * 1.6, 0], [0, index - 1, 0]));
  }
}

function buildServer(body: THREE.Group, parts: Part[], materials: Materials) {
  for (let index = 0; index < 3; index++) {
    const unit = new THREE.Group();
    unit.add(rounded(1.45, 0.32, 0.6, materials.charcoal, 0.08));
    const light = rounded(0.12, 0.09, 0.04, materials.mint, 0.025);
    light.position.set(0.48, 0, 0.32);
    const slot = rounded(0.55, 0.055, 0.03, materials.silver, 0.015);
    slot.position.set(-0.2, 0, 0.32);
    unit.add(light, slot);
    unit.position.y = (index - 1) * 0.43;
    body.add(part(parts, unit, [(index - 1) * 2.2, 0, 1.2 - index * 0.6]));
  }
}

function buildPhone(body: THREE.Group, parts: Part[], materials: Materials) {
  body.add(rounded(1.05, 2.05, 0.22, materials.silver, 0.16));

  const screen = rounded(0.9, 1.88, 0.05, materials.charcoal, 0.11);
  screen.position.z = 0.13;
  const speaker = rounded(0.28, 0.055, 0.03, materials.silver, 0.015);
  speaker.position.set(0, 0.8, 0.18);
  body.add(screen, speaker);

  for (let index = 0; index < 4; index++) {
    const tile = rounded(
      0.3,
      0.3,
      0.06,
      index % 2 ? materials.orange : materials.mint,
      0.06,
    );
    tile.position.set(index % 2 ? 0.2 : -0.2, index < 2 ? 0.35 : -0.1, 0.19);
    body.add(part(parts, tile, [0, 0, 1.4]));
  }
}

const builders: Record<
  StudioKind,
  (body: THREE.Group, parts: Part[], materials: Materials) => Idle | void
> = {
  browser: buildBrowser,
  robot: buildRobot,
  database: buildDatabase,
  server: buildServer,
  phone: buildPhone,
};

function createModel(kind: StudioKind, materials: Materials): Model {
  const root = new THREE.Group();
  const body = new THREE.Group();
  const parts: Part[] = [];
  const idle = builders[kind](body, parts, materials) ?? undefined;
  const sphere = new THREE.Box3()
    .setFromObject(body)
    .getBoundingSphere(new THREE.Sphere());
  body.position.sub(sphere.center);
  root.add(body);
  root.scale.setScalar(1 / sphere.radius);
  root.rotation.set(...poses[kind]);

  return { root, body, parts, idle };
}

function assemble(model: Model, spread: number) {
  model.parts.forEach(({ mesh, offset, turn }) => {
    const base = mesh.userData.base as THREE.Vector3;
    const rotation = mesh.userData.rotation as THREE.Euler;
    mesh.position.copy(base).addScaledVector(offset, spread);
    mesh.rotation.set(
      rotation.x + turn.x * spread,
      rotation.y + turn.y * spread,
      rotation.z + turn.z * spread,
    );
  });
}

function createRenderer(canvas?: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
    preserveDrawingBuffer: !canvas,
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  room.dispose();
  pmrem.dispose();

  return { renderer, environment };
}

function createScene(environment: THREE.Texture) {
  const scene = new THREE.Scene();
  scene.environment = environment;
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(-3, 6, 8);
  scene.add(key, new THREE.AmbientLight(0xffffff, 0.55));

  return scene;
}

function createCamera() {
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.z = distance;
  return camera;
}

function dispose(scene: THREE.Scene) {
  const geometries = new Set<THREE.BufferGeometry>();
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) geometries.add(object.geometry);
  });
  geometries.forEach((geometry) => geometry.dispose());
}

export function renderPoster(kind: StudioKind, size: number) {
  const { renderer, environment } = createRenderer();
  renderer.setPixelRatio(1);
  renderer.setSize(size, size, false);
  const scene = createScene(environment.texture);
  const materials = createMaterials();
  const model = createModel(kind, materials);

  scene.add(model.root);
  renderer.render(scene, createCamera());
  const image = renderer.domElement.toDataURL("image/png");

  dispose(scene);
  Object.values(materials).forEach((material) => material.dispose());
  environment.dispose();
  renderer.dispose();
  renderer.forceContextLoss();

  return image;
}

export function createStage(
  host: HTMLElement,
  slots: StageSlot[],
  options: StageOptions,
) {
  const canvas = document.createElement("canvas");
  canvas.className = "studio-canvas";

  const { renderer, environment } = createRenderer(canvas);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setScissorTest(true);
  const scene = createScene(environment.texture);
  const camera = createCamera();
  const materials = createMaterials();

  const entries = slots.map(({ element, kind }, index) => {
    const model = createModel(kind, materials);
    model.root.visible = false;
    scene.add(model.root);
    return {
      element,
      kind,
      model,
      phase: index * 1.7,
      rect: { x: 0, y: 0, width: 0, height: 0 },
    };
  });

  const pointer = new THREE.Vector2();
  const tilt = new THREE.Vector2();
  const scrolled = Boolean(options.progress);
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = true;
  let elapsed = 0;
  let last = 0;
  let ready = false;

  const measure = () => {
    const bounds = host.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    renderer.setSize(width, height, false);

    entries.forEach((entry) => {
      const rect = entry.element.getBoundingClientRect();
      entry.rect = {
        x: rect.left - bounds.left,
        y: height - (rect.top - bounds.top) - rect.height,
        width: rect.width,
        height: rect.height,
      };
    });
  };

  const draw = () => {
    renderer.setScissorTest(false);
    renderer.clear();
    renderer.setScissorTest(true);
    const progress = options.progress?.() ?? 0;
    entries.forEach(({ model, kind, phase, rect }) => {
      if (rect.width < 2 || rect.height < 2) return;
      const [x, y, z] = poses[kind];
      if (scrolled) {
        const spread = 1 - THREE.MathUtils.smoothstep(progress, 0.04, 0.32);
        assemble(model, spread);
        model.root.rotation.set(
          x + progress * 0.55,
          y + progress * Math.PI * (kind === "browser" ? 0.35 : 0.7),
          z + progress * 0.28,
        );
      } else {
        const wave = (speed: number) =>
          Math.sin(elapsed * speed + phase) - Math.sin(phase);
        model.root.position.y = wave(0.65) * 0.07;
        model.root.rotation.set(
          x + tilt.y * 0.12,
          y + tilt.x * 0.3 + wave(0.3) * 0.12,
          z + wave(0.35) * 0.08,
        );
        model.idle?.(wave);
      }
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setViewport(rect.x, rect.y, rect.width, rect.height);
      renderer.setScissor(rect.x, rect.y, rect.width, rect.height);
      model.root.visible = true;
      renderer.render(scene, camera);
      model.root.visible = false;
    });

    if (!ready) {
      ready = true;
      host.dataset.ready = "true";
    }
  };

  const running = () =>
    visible &&
    !document.hidden &&
    !options.paused() &&
    (options.active?.() ?? true);

  const tick = (time: number) => {
    frame = 0;
    const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
    last = time;
    if (!scrolled) {
      elapsed += delta;
      tilt.lerp(pointer, 0.05);
    }
    draw();
    if (!scrolled && running()) frame = requestAnimationFrame(tick);
    else last = 0;
  };

  const schedule = () => {
    if (frame || !visible || document.hidden) return;
    frame = requestAnimationFrame(tick);
  };

  const move = (event: PointerEvent) => {
    pointer.set(
      event.clientX / innerWidth - 0.5,
      event.clientY / innerHeight - 0.5,
    );
  };

  const resize = () => {
    measure();
    schedule();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    },
    { rootMargin: "100px" },
  );
  const size = new ResizeObserver(resize);
  observer.observe(host);
  size.observe(host);
  entries.forEach(({ element }) => size.observe(element));

  window.addEventListener("scroll", schedule, { passive: true });
  if (!scrolled)
    window.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  window.addEventListener("irtc-motion-change", schedule);

  renderer.compile(scene, camera);
  host.prepend(canvas);
  measure();
  draw();

  return {
    update: schedule,
    destroy() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      size.disconnect();

      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener("irtc-motion-change", schedule);

      dispose(scene);
      Object.values(materials).forEach((material) => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      canvas.remove();
      delete host.dataset.ready;
    },
  };
}
