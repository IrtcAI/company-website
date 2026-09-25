import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function createWorld(mount: HTMLElement, paused: () => boolean) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  mount.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 15);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.05);
  scene.environment = environment.texture;
  room.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-3, 7, 8);
  scene.add(key, new THREE.AmbientLight(0xffffff, 0.7));

  const charcoal = new THREE.MeshPhysicalMaterial({
    color: 0x181b1c,
    metalness: 0.65,
    roughness: 0.25,
    clearcoat: 1,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: 0xd8dfd8,
    metalness: 0.95,
    roughness: 0.22,
  });
  const mint = new THREE.MeshPhysicalMaterial({
    color: 0xa5dec5,
    metalness: 0.2,
    roughness: 0.28,
    clearcoat: 1,
  });
  const orange = new THREE.MeshPhysicalMaterial({
    color: 0xffbd66,
    metalness: 0.28,
    roughness: 0.25,
    clearcoat: 1,
  });
  const cluster = new THREE.Group();
  scene.add(cluster);
  const objects: {
    mesh: THREE.Object3D;
    y: number;
    z: number;
    phase: number;
  }[] = [];
  function place(
    mesh: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    rotation: [number, number, number],
  ) {
    mesh.position.set(x, y, z);
    mesh.rotation.set(...rotation);
    cluster.add(mesh);
    objects.push({ mesh, y, z: rotation[2], phase: objects.length * 1.6 });
  }
  function rounded(
    width: number,
    height: number,
    depth: number,
    material: THREE.Material,
    radius = 0.14,
  ) {
    return new THREE.Mesh(
      new RoundedBoxGeometry(width, height, depth, 3, radius),
      material,
    );
  }

  const phone = new THREE.Group();
  phone.add(rounded(1.05, 2.05, 0.22, silver, 0.16));
  const phoneScreen = rounded(0.9, 1.88, 0.05, charcoal, 0.11);
  phoneScreen.position.z = 0.13;
  phone.add(phoneScreen);
  const speaker = rounded(0.28, 0.055, 0.03, silver, 0.015);
  speaker.position.set(0, 0.8, 0.18);
  phone.add(speaker);
  for (let index = 0; index < 4; index++) {
    const tile = rounded(0.3, 0.3, 0.06, index % 2 ? orange : mint, 0.06);
    tile.position.set(index % 2 ? 0.2 : -0.2, index < 2 ? 0.35 : -0.1, 0.19);
    phone.add(tile);
  }
  place(phone, 3.8, 2.45, 0.3, [0.1, -0.4, 0.25]);

  function beam(
    from: [number, number],
    to: [number, number],
    material: THREE.Material,
  ) {
    const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
    const shape = rounded(length, 0.2, 0.28, material, 0.06);
    shape.rotation.z = Math.atan2(to[1] - from[1], to[0] - from[0]);
    shape.position.set((from[0] + to[0]) / 2, (from[1] + to[1]) / 2, 0);
    return shape;
  }
  const code = new THREE.Group();
  const terminal = new THREE.Group();
  const terminalMaterials = [charcoal.clone(), silver.clone(), mint.clone()];
  terminalMaterials.forEach((material) => {
    material.transparent = true;
  });
  terminal.add(rounded(2.35, 2.15, 0.42, terminalMaterials[0], 0.22));
  const terminalFrame = rounded(2.28, 2.08, 0.12, terminalMaterials[1], 0.2);
  terminalFrame.position.z = 0.23;
  terminal.add(terminalFrame);
  const terminalFace = rounded(1.98, 1.78, 0.1, terminalMaterials[0], 0.14);
  terminalFace.position.z = 0.32;
  terminal.add(terminalFace);
  const prompt = new THREE.Group();
  prompt.add(
    beam([-0.48, 0.25], [-0.18, 0], terminalMaterials[2]),
    beam([-0.18, 0], [-0.48, -0.25], terminalMaterials[2]),
    beam([0.06, -0.27], [0.48, -0.27], terminalMaterials[2]),
  );
  prompt.scale.setScalar(0.75);
  prompt.position.z = 0.42;
  terminal.add(prompt);
  place(terminal, -3.8, 2.45, 0.2, [-0.22, 0.35, 0.2]);
  const story = mount.closest<HTMLElement>(".intro-story");
  code.add(
    beam([-0.7, 0.55], [-1.25, 0], mint),
    beam([-1.25, 0], [-0.7, -0.55], mint),
    beam([0.7, 0.55], [1.25, 0], mint),
    beam([1.25, 0], [0.7, -0.55], mint),
    beam([0.22, 0.75], [-0.22, -0.75], silver),
  );
  code.scale.setScalar(0.72);
  place(code, -3.75, -1.8, 0.1, [0.3, 0.3, -0.2]);

  const database = new THREE.Group();
  for (let index = 0; index < 3; index++) {
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.64, 0.64, 0.33, 48, 1),
      charcoal,
    );
    disc.position.y = index * 0.46 - 0.46;
    database.add(disc);
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.62, 0.025, 8, 48),
      mint,
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = disc.position.y + 0.16;
    database.add(rim);
  }
  place(database, 3.6, -1.7, 0.4, [0.3, 0.2, -0.3]);

  const sparkleShape = new THREE.Shape();
  for (let index = 0; index < 16; index++) {
    const angle = (index * Math.PI) / 8;
    const radius = index % 2 ? 0.36 : 0.85;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) sparkleShape.moveTo(x, y);
    else sparkleShape.lineTo(x, y);
  }
  sparkleShape.closePath();
  const sparkle = new THREE.Mesh(
    new THREE.ExtrudeGeometry(sparkleShape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    }),
    orange,
  );
  place(sparkle, 0, 3.4, -0.4, [0.3, -0.4, 0.2]);

  const server = new THREE.Group();
  for (let index = 0; index < 3; index++) {
    const unit = rounded(1.45, 0.32, 0.6, charcoal, 0.08);
    unit.position.y = index * 0.43;
    server.add(unit);
    const light = rounded(0.12, 0.09, 0.04, mint, 0.025);
    light.position.set(0.48, unit.position.y, 0.32);
    server.add(light);
    const slot = rounded(0.55, 0.055, 0.03, silver, 0.015);
    slot.position.set(-0.2, unit.position.y, 0.32);
    server.add(slot);
  }
  place(server, 3.6, -3.6, 0, [0.35, -0.2, 0.12]);

  const target = new THREE.Vector2();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = true;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let renderedPaused = false;
  function pointer(event: PointerEvent) {
    const bounds = mount.getBoundingClientRect();
    target.set(
      (event.clientX - bounds.left) / bounds.width - 0.5,
      (event.clientY - bounds.top) / bounds.height - 0.5,
    );
  }
  function resize() {
    const { width, height } = mount.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.8 ? 20 : 14;
    camera.updateProjectionMatrix();
    renderedPaused = false;
  }
  function animate(time: number) {
    frame = requestAnimationFrame(animate);
    const delta = Math.min((time - lastTime) / 1000, 0.04);
    lastTime = time;
    if (!visible || document.hidden) return;
    const progress =
      story?.dataset.enhanced === "true"
        ? Number(story.dataset.progress || 0)
        : 0;
    const terminalOpacity = Math.max(0, 1 - progress / 0.18);
    terminalMaterials.forEach((material) => {
      material.opacity = terminalOpacity;
    });
    const frozen = reducedMotion.matches || paused();
    if (frozen && renderedPaused) return;
    if (!frozen) {
      elapsed += delta;
      cluster.rotation.y += (target.x * 0.25 - cluster.rotation.y) * 0.04;
      cluster.rotation.x += (target.y * 0.12 - cluster.rotation.x) * 0.04;
      objects.forEach(({ mesh, y, z, phase }) => {
        mesh.position.y = y + Math.sin(elapsed * 0.65 + phase) * 0.13;
        mesh.rotation.z = z + Math.sin(elapsed * 0.35 + phase) * 0.09;
      });
      renderedPaused = false;
    } else renderedPaused = true;
    renderer.render(scene, camera);
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  const size = new ResizeObserver(resize);
  observer.observe(mount);
  size.observe(mount);
  window.addEventListener("pointermove", pointer, { passive: true });
  resize();
  renderer.render(scene, camera);
  mount.dataset.ready = "true";
  frame = requestAnimationFrame(animate);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    size.disconnect();
    window.removeEventListener("pointermove", pointer);
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    [charcoal, silver, mint, orange, ...terminalMaterials].forEach((material) =>
      material.dispose(),
    );
    environment.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
