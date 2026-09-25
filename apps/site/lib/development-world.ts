import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function createDevelopmentWorld(
  mount: HTMLElement,
  section: HTMLElement,
  paused: () => boolean,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  mount.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.z = 12;
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  const mint = new THREE.MeshPhysicalMaterial({
    color: 0x83a898,
    metalness: 0.72,
    roughness: 0.3,
    clearcoat: 0.8,
  });
  const peach = new THREE.MeshPhysicalMaterial({
    color: 0xc88e78,
    metalness: 0.65,
    roughness: 0.28,
    clearcoat: 0.8,
  });
  const light = new THREE.DirectionalLight(0xe3f6e9, 3);
  light.position.set(-3, 5, 7);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.35));
  const sculpture = new THREE.Group();
  scene.add(sculpture);
  function piece(points: [number, number][], material: THREE.Material) {
    const shape = new THREE.Shape(
      points.map(([x, y]) => new THREE.Vector2(x, y)),
    );
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.07,
      bevelThickness: 0.07,
    });
    geometry.translate(0, 0, -0.225);
    const mesh = new THREE.Mesh(geometry, material);
    sculpture.add(mesh);
    return mesh;
  }
  const left = piece(
    [
      [-0.7, 1.05],
      [-1.9, 0],
      [-0.7, -1.05],
      [-0.4, -0.7],
      [-1.2, 0],
      [-0.4, 0.7],
    ],
    mint,
  );
  const right = piece(
    [
      [0.7, 1.05],
      [0.4, 0.7],
      [1.2, 0],
      [0.4, -0.7],
      [0.7, -1.05],
      [1.9, 0],
    ],
    mint,
  );
  const slash = piece(
    [
      [0.18, 1.3],
      [-0.5, -1.3],
      [-0.14, -1.3],
      [0.54, 1.3],
    ],
    peach,
  );
  let frame = 0;
  let visible = true;
  let progress = 0;
  const render = () => {
    frame = 0;
    if (!visible || document.hidden) return;
    if (!paused()) {
      const bounds = section.getBoundingClientRect();
      progress = THREE.MathUtils.clamp(
        (innerHeight - bounds.top) / (bounds.height + innerHeight),
        0,
        1,
      );
    }
    const assembly = THREE.MathUtils.smoothstep(progress, 0.04, 0.32);
    const spread = 1 - assembly;
    left.position.set(-spread * 3, spread * 1.4, -spread * 2);
    right.position.set(spread * 3, -spread, spread * 1.5);
    slash.position.set(0, spread * 2.8, spread * 2);
    left.rotation.y = -spread * 1.4;
    right.rotation.y = spread * 1.4;
    slash.rotation.z = spread * 0.8;
    sculpture.rotation.set(
      0.24 + progress * 0.55,
      -0.5 + progress * Math.PI * 3,
      -0.18 + progress * 0.28,
    );
    sculpture.position.x = camera.aspect > 1.3 ? 2 : 1.3;
    sculpture.scale.setScalar(1.5);
    mount.dataset.progress = progress.toFixed(3);
    renderer.render(scene, camera);
  };
  const schedule = () => {
    if (!frame && visible) frame = requestAnimationFrame(render);
  };
  const resize = () => {
    const { width, height } = mount.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
    schedule();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  observer.observe(section);
  const size = new ResizeObserver(resize);
  size.observe(mount);
  size.observe(section);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("irtc-motion-change", schedule);
  document.addEventListener("visibilitychange", schedule);
  resize();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    size.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("irtc-motion-change", schedule);
    document.removeEventListener("visibilitychange", schedule);
    [left, right, slash].forEach((mesh) => mesh.geometry.dispose());
    mint.dispose();
    peach.dispose();
    environment.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
