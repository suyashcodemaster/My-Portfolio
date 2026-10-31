export function initLaptop3D(canvas, onTouchpadClick, onPartHover, onScreenProjectUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.35, 6.2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Dynamic Multi-Point Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.75);
  const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
  keyLight.position.set(4, 7, 6);
  const rimLight = new THREE.DirectionalLight(0xa855f7, 1.4);
  rimLight.position.set(-5, 3, -4);
  const accentLight = new THREE.PointLight(0xf59e0b, 2.5, 16);
  accentLight.position.set(-2.5, 2, 4);
  scene.add(ambient, keyLight, rimLight, accentLight);

  const root = new THREE.Group();
  root.position.set(-1.35, -0.1, 0);
  root.rotation.set(0.28, 0.52, 0);
  scene.add(root);

  // PBR Materials
  const matChassis = new THREE.MeshStandardMaterial({ color: 0x242734, metalness: 0.82, roughness: 0.24 });
  const matScreen = new THREE.MeshStandardMaterial({ color: 0x0b1528, emissive: 0x38bdf8, emissiveIntensity: 0.45, roughness: 0.12 });
  const matBoard = new THREE.MeshStandardMaterial({ color: 0x0e2a1f, emissive: 0x10b981, emissiveIntensity: 0.35, metalness: 0.65, roughness: 0.28 });
  const matCpu = new THREE.MeshStandardMaterial({ color: 0x3b1d5e, emissive: 0xa855f7, emissiveIntensity: 0.75, metalness: 0.7, roughness: 0.2 });
  const matCopper = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xf59e0b, emissiveIntensity: 0.25, metalness: 0.88, roughness: 0.2 });
  const matKeyDeck = new THREE.MeshStandardMaterial({ color: 0x181a24, metalness: 0.7, roughness: 0.35 });
  const matKey = new THREE.MeshStandardMaterial({ color: 0x101218, emissive: 0x10b981, emissiveIntensity: 0.28, roughness: 0.35 });
  const matSpeaker = new THREE.MeshStandardMaterial({ color: 0x2e2518, emissive: 0xf59e0b, emissiveIntensity: 0.5, metalness: 0.75, roughness: 0.25 });
  const matTouchpad = new THREE.MeshStandardMaterial({ color: 0x2d122b, emissive: 0xec4899, emissiveIntensity: 0.65, roughness: 0.12, metalness: 0.55 });
  const matBattery = new THREE.MeshStandardMaterial({ color: 0x161936, emissive: 0x6366f1, emissiveIntensity: 0.45, metalness: 0.65, roughness: 0.28 });

  // 1. Display Subsystem (About Me — Vision & Foundation)
  const display = new THREE.Group();
  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.92, 0.07), matChassis);
  const lcdMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.82, 1.72), matScreen);
  lcdMesh.position.z = 0.04;
  const hingeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.2, 16), matChassis);
  hingeMesh.rotation.z = Math.PI / 2;
  hingeMesh.position.set(0, -0.95, 0);
  display.add(lidMesh, lcdMesh, hingeMesh);
  display.position.set(0, 1.02, -0.95);
  display.rotation.x = -0.16;

  // 2. Logic Board & CPU Core (The Mission — Core Processing & Mindset)
  const logicBoard = new THREE.Group();
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.05, 1.52), matBoard);
  const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.1, 0.62), matCpu);
  cpuDie.position.set(0, 0.05, -0.1);
  const heatPipe = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.04, 0.14), matCopper);
  heatPipe.position.set(0, 0.06, -0.42);
  const fanL = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.06, 20), matChassis);
  const fanR = fanL.clone();
  fanL.position.set(-0.78, 0.04, -0.35);
  fanR.position.set(0.78, 0.04, -0.35);
  logicBoard.add(pcb, cpuDie, heatPipe, fanL, fanR);
  logicBoard.position.set(0, 0.02, 0);

  // 3. Keyboard Matrix & Engine (Technical Skills — Execution & Toolkit)
  const keyboard = new THREE.Group();
  const deckPlate = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.03, 1.15), matKeyDeck);
  deckPlate.position.set(0, 0.08, -0.14);
  keyboard.add(deckPlate);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 11; c++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.055, 0.19), matKey);
      key.position.set(-1.0 + c * 0.2, 0.12, -0.52 + r * 0.24);
      keyboard.add(key);
    }
  }

  // 4. Acoustic & I/O Array (Languages I Know — Voice & Collaboration)
  const speakers = new THREE.Group();
  const spkL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 1.48), matSpeaker);
  const spkR = spkL.clone();
  spkL.position.set(-1.32, 0.1, 0);
  spkR.position.set(1.32, 0.1, 0);
  speakers.add(spkL, spkR);

  // 5. Precision Glass Touchpad (Detaches at scroll end with Download CV button on it)
  const touchpad = new THREE.Group();
  const padRim = new THREE.Mesh(
    new THREE.BoxGeometry(1.06, 0.04, 0.68),
    new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xec4899, emissiveIntensity: 0.45, metalness: 0.8, roughness: 0.2 })
  );
  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 0.62), matTouchpad);
  padRim.position.set(0, 0.11, 0.6);
  padMesh.position.set(0, 0.115, 0.6);
  padMesh.userData.isTouchpad = true;
  touchpad.add(padRim, padMesh);

  // 6. Battery & Lower Unibody Chassis (Courses & Achievements — Endurance & Milestones)
  const battery = new THREE.Group();
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.12, 2.0), matChassis);
  const cellsMesh = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.09, 0.78), matBattery);
  cellsMesh.position.set(0, -0.02, 0.42);
  baseMesh.position.y = -0.12;
  battery.add(baseMesh, cellsMesh);

  const parts = { display, logicBoard, keyboard, speakers, touchpad, battery };
  const partLabels = {
    display: "01 // DISPLAY PANEL & OPTICS — ABOUT ME",
    logicBoard: "02 // LOGIC BOARD & CPU CORE — THE MISSION",
    keyboard: "03 // KEYBOARD MATRIX — TECHNICAL SKILLS",
    speakers: "04 // ACOUSTIC TRANSDUCERS — LANGUAGES I KNOW",
    battery: "05 // POWER CORE & CELLS — ACHIEVEMENTS",
    touchpad: "PRECISION TOUCHPAD — CLICK TO DOWNLOAD CV"
  };

  Object.entries(parts).forEach(([key, group]) => {
    group.traverse((child) => {
      if (child.isMesh) {
        child.userData.partKey = key;
        child.userData.partLabel = partLabels[key];
      }
    });
    root.add(group);
  });

  // Raycaster for Hover Tooltips + 3D Touchpad Click
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(root.children, true);
    if (hits.length > 0) {
      const hitMesh = hits[0].object;
      canvas.style.cursor = hitMesh.userData.partKey === 'touchpad' ? 'pointer' : 'crosshair';
      if (onPartHover) onPartHover(hitMesh.userData.partLabel, e.clientX, e.clientY);
    } else {
      canvas.style.cursor = 'default';
      if (onPartHover) onPartHover(null, 0, 0);
    }
  });

  window.addEventListener('click', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(touchpad.children, true);
    if (hits.length > 0 && onTouchpadClick) onTouchpadClick();
  });

  // Helper to project a 3D group's world center onto 2D viewport coordinates
  function getScreenCoords(group, localOffset = new THREE.Vector3(0, 0, 0)) {
    const worldPos = localOffset.clone();
    group.localToWorld(worldPos);
    worldPos.project(camera);
    return {
      x: (worldPos.x * 0.5 + 0.5) * window.innerWidth,
      y: (-(worldPos.y * 0.5) + 0.5) * window.innerHeight
    };
  }

  let currentActiveKey = 'display';
  let currentProgress = 0;

  // High-Separation Disassembly State Controller (Stays fully disassembled at scroll completion!)
  function setDisassemblyState(progress, activeKey, hexAccent) {
    currentProgress = progress;
    currentActiveKey = activeKey;

    // Monotonic ease-out explosion curve: 0 -> assembled, 1 -> stays wide open in full exploded state!
    const spread = Math.min(1, Math.pow(Math.min(1, progress * 1.18), 0.82));
    // Extra touchpad detachment when scrolling finishes (progress > 0.78)
    const touchpadDetach = Math.max(0, Math.min(1, (progress - 0.74) / 0.22));

    // Wide vertical, lateral, and depth separation so every single part is unmistakably distinct
    display.position.set(0, 1.02 + spread * 2.15, -0.95 - spread * 0.85);
    display.rotation.x = -0.16 - spread * 0.28;

    keyboard.position.set(0, spread * 1.18, spread * 0.22);

    logicBoard.position.set(0, 0.02 + spread * 0.25, -spread * 0.15);

    // Separate Left and Right Speakers far outward on X axis
    spkL.position.x = -1.32 - spread * 1.15;
    spkR.position.x = 1.32 + spread * 1.15;
    speakers.position.y = spread * 0.55;

    // Battery & Unibody drops far down
    battery.position.set(0, -spread * 1.65, -spread * 0.2);

    // Touchpad disassembles forward and detaches toward viewer at completion
    touchpad.position.set(
      touchpadDetach * 1.15,
      spread * 0.45 - touchpadDetach * 0.25,
      spread * 1.55 + touchpadDetach * 0.85
    );
    touchpad.rotation.x = touchpadDetach * 0.38;
    touchpad.rotation.y = -touchpadDetach * 0.32;

    // Smoothly orbit root model to showcase internal layers and center at completion
    root.position.x = -1.35 + touchpadDetach * 0.95;
    root.rotation.y = 0.52 + progress * Math.PI * 0.78;
    root.rotation.x = 0.28 + spread * 0.1;

    if (hexAccent) accentLight.color.set(hexAccent);

    // Spotlight the active section's matching 3D subsystem
    Object.entries(parts).forEach(([key, group]) => {
      const isFocused = (touchpadDetach > 0.5 && key === 'touchpad') || (touchpadDetach <= 0.5 && key === activeKey);
      const targetScale = isFocused ? 1.16 : 0.96;
      group.scale.setScalar(targetScale);
    });
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (onScreenProjectUpdate) {
      const activeGroup = parts[currentActiveKey] || display;
      const activeCoords = getScreenCoords(activeGroup, new THREE.Vector3(0, 0.1, 0));
      const touchpadCoords = getScreenCoords(touchpad, new THREE.Vector3(0, 0.12, 0.6));
      onScreenProjectUpdate({
        activeCoords,
        touchpadCoords,
        progress: currentProgress
      });
    }
  }
  animate();

  return { setDisassemblyState };
}
