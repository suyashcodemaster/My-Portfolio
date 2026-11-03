export function initLaptop3D(canvas, onTouchpadClick, onPartHover, onScreenProjectUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.65, 6.8);
  camera.lookAt(0, 0.05, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  // Multi-Point Studio Lighting for Exquisite Matte Stealth Finish
  const ambient = new THREE.AmbientLight(0xffffff, 0.94);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 7, 6);
  const rimLight = new THREE.DirectionalLight(0x94a3b8, 1.8);
  rimLight.position.set(-5, 4, -4);
  const bottomFill = new THREE.DirectionalLight(0x475569, 1.1);
  bottomFill.position.set(0, -5, 4);
  const accentLight = new THREE.PointLight(0x38bdf8, 2.0, 16);
  accentLight.position.set(-1.8, 2.0, 4.2);
  scene.add(ambient, keyLight, rimLight, bottomFill, accentLight);

  const root = new THREE.Group();
  // Smaller scale (0.76x) and lower screen position (y = -0.44) so it aligns with cards and never clips
  root.scale.setScalar(0.76);
  root.position.set(0, -0.44, 0);
  root.rotation.set(0.28, 0.64, 0);
  scene.add(root);

  function makeMatteMaterial(opts) {
    return new THREE.MeshStandardMaterial({
      ...opts,
      transparent: false,
      depthWrite: true,
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    });
  }

  const matOuterChassis = makeMatteMaterial({ color: 0x141720, metalness: 0.22, roughness: 0.82 });
  const matBezel = makeMatteMaterial({ color: 0x0b0d13, metalness: 0.15, roughness: 0.86 });
  const matScreenPanel = makeMatteMaterial({ color: 0x090e1a, emissive: 0x172554, emissiveIntensity: 0.48, roughness: 0.35 });
  const matMotherboardPcb = makeMatteMaterial({ color: 0x0f131c, metalness: 0.25, roughness: 0.78 });
  const matCpuPackage = makeMatteMaterial({ color: 0x242938, emissive: 0x1e293b, emissiveIntensity: 0.35, metalness: 0.48, roughness: 0.52 });
  const matCopperPipe = makeMatteMaterial({ color: 0xb45309, emissive: 0x451a03, emissiveIntensity: 0.24, metalness: 0.58, roughness: 0.44 });
  const matGoldContacts = makeMatteMaterial({ color: 0xf59e0b, emissive: 0x92400e, emissiveIntensity: 0.28, metalness: 0.68, roughness: 0.38 });
  const matKeyDeck = makeMatteMaterial({ color: 0x12151e, metalness: 0.2, roughness: 0.84 });
  const matKeyCap = makeMatteMaterial({ color: 0x0a0c12, metalness: 0.12, roughness: 0.88 });
  const matBacklightMatrix = makeMatteMaterial({ color: 0x0d2822, emissive: 0x10b981, emissiveIntensity: 0.42, roughness: 0.4 });
  const matRamSpreader = makeMatteMaterial({ color: 0x171b26, emissive: 0x0f172a, emissiveIntensity: 0.28, metalness: 0.36, roughness: 0.70 });
  const matRamChip = makeMatteMaterial({ color: 0x090b10, metalness: 0.2, roughness: 0.82 });
  const matStoragePcb = makeMatteMaterial({ color: 0x111520, metalness: 0.28, roughness: 0.76 });
  const matStorageSink = makeMatteMaterial({ color: 0x1e2332, metalness: 0.40, roughness: 0.66 });
  const matBatteryCell = makeMatteMaterial({ color: 0x131622, emissive: 0x1e1b4b, emissiveIntensity: 0.25, metalness: 0.3, roughness: 0.75 });
  const matTouchpadSurface = makeMatteMaterial({ color: 0x151923, emissive: 0x1e293b, emissiveIntensity: 0.35, roughness: 0.64, metalness: 0.26 });

  const pickableMeshes = [];
  const partEdgeLines = {};

  function addCrispEdges(mesh, partKey, edgeColor = 0xcbd5e1, baseOpacity = 0.88) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineMat = new THREE.LineBasicMaterial({
      color: edgeColor,
      transparent: true,
      opacity: baseOpacity,
      depthTest: true,
      depthWrite: false
    });
    lineMat.userData = { baseOpacity };
    const line = new THREE.LineSegments(edges, lineMat);
    mesh.add(line);
    if (!partEdgeLines[partKey]) partEdgeLines[partKey] = [];
    partEdgeLines[partKey].push(lineMat);
  }

  // =========================================================================
  // 1. DISPLAY (Rests seamlessly at y = +0.03 when closed on top of the single unibody base!)
  // =========================================================================
  const display = new THREE.Group();
  display.position.set(0, 0.03, -1.00);

  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 2.00, 0.055), matOuterChassis);
  lidMesh.position.set(0, 1.00, -0.028);
  addCrispEdges(lidMesh, 'display', 0xe2e8f0, 0.94);

  const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.94, 1.88), matBezel);
  bezelMesh.position.set(0, 1.00, 0.002);

  const lcdMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.78, 1.70), matScreenPanel);
  lcdMesh.position.set(0, 1.00, 0.004);
  addCrispEdges(lcdMesh, 'display', 0x38bdf8, 0.82);

  // Camera Notch & Glowing IDE Telemetry Bars on Display
  const camNotch = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.05), matBezel);
  camNotch.position.set(0, 1.82, 0.006);
  display.add(camNotch);

  const uiColors = [0x38bdf8, 0x10b981, 0xa855f7, 0xf59e0b, 0xec4899];
  for (let i = 0; i < 6; i++) {
    const barW = 0.65 + (i % 3) * 0.45;
    const barMat = new THREE.MeshBasicMaterial({ color: uiColors[i % uiColors.length], transparent: true, opacity: 0.45 });
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(barW, 0.038), barMat);
    bar.position.set(-1.15 + barW / 2, 1.48 - i * 0.15, 0.006);
    display.add(bar);
  }

  const hingeL = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.42, 16), matOuterChassis);
  hingeL.rotation.z = Math.PI / 2;
  hingeL.position.set(-0.85, 0, -0.025);
  addCrispEdges(hingeL, 'display', 0x94a3b8, 0.72);
  const hingeR = hingeL.clone();
  hingeR.position.set(0.85, 0, -0.025);

  const displayAnchor = new THREE.Object3D();
  displayAnchor.position.set(-0.9, 1.15, 0.02);
  display.add(lidMesh, bezelMesh, lcdMesh, hingeL, hingeR, displayAnchor);

  // =========================================================================
  // 2. KEYBOARD & TOP-CASE PALMREST DECK
  //    When assembled (spread = 0), sits at y = +0.015 directly touching baseMesh (y = 0.00)
  //    so the entire laptop is ONE SEAMLESS UNIBODY (never 2 separate slabs!)
  // =========================================================================
  const keyboard = new THREE.Group();
  const topCasePalmrest = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.03, 2.00), matOuterChassis);
  topCasePalmrest.position.set(0, 0.015, 0);
  addCrispEdges(topCasePalmrest, 'keyboard', 0xe2e8f0, 0.92);
  keyboard.add(topCasePalmrest);

  // Glowing Backlit Switch Matrix Plate under the keys (revealed when keys cascade upward)
  const backlightPlate = new THREE.Mesh(new THREE.BoxGeometry(2.64, 0.016, 1.10), matBacklightMatrix);
  backlightPlate.position.set(0, 0.026, -0.18);
  addCrispEdges(backlightPlate, 'keyboard', 0x10b981, 0.85);
  keyboard.add(backlightPlate);

  // Precision Scissor-Switch Keycap Matrix (Animates in a clean Teardown Wave Cascade!)
  const cascadeKeys = [];
  const rows = 4;
  const cols = 11;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.185, 0.028, 0.185), matKeyCap);
      const baseX = -1.0 + c * 0.2;
      const baseY = 0.034;
      const baseZ = -0.54 + r * 0.24;
      key.position.set(baseX, baseY, baseZ);
      addCrispEdges(key, 'keyboard', 0xcbd5e1, 0.84);
      keyboard.add(key);

      // Wave delay across diagonal (0.0 -> 1.0) for smooth engineering teardown cascade
      const wavePhase = (c / (cols - 1)) * 0.65 + (r / (rows - 1)) * 0.35;
      cascadeKeys.push({ mesh: key, baseX, baseY, baseZ, wavePhase });
    }
  }
  const keyboardAnchor = new THREE.Object3D();
  keyboardAnchor.position.set(-0.85, 0.12, -0.18);
  keyboard.add(keyboardAnchor);

  // =========================================================================
  // 3. MOTHERBOARD (Ultra-Detailed with Dual Spinning LED Fans, Copper Heatpipes,
  //    CPU + GPU Dies, VRM Banks, Capacitors & Gold PCB Circuit Traces)
  // =========================================================================
  const motherboard = new THREE.Group();
  // Tucked inside the unibody at y = -0.02 when closed
  motherboard.position.set(0, -0.02, 0);

  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.66, 0.042, 1.60), matMotherboardPcb);
  addCrispEdges(pcb, 'motherboard', 0xcbd5e1, 0.94);
  motherboard.add(pcb);

  // Central CPU Die + Secondary GPU Die
  const cpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.05, 0.68), matOuterChassis);
  cpuSocket.position.set(-0.22, 0.025, -0.06);
  addCrispEdges(cpuSocket, 'motherboard', 0x94a3b8, 0.82);
  const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.068, 0.46), matCpuPackage);
  cpuDie.position.set(-0.22, 0.038, -0.06);
  addCrispEdges(cpuDie, 'motherboard', 0xa855f7, 0.98);

  const gpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.048, 0.56), matOuterChassis);
  gpuSocket.position.set(0.38, 0.024, -0.06);
  addCrispEdges(gpuSocket, 'motherboard', 0x94a3b8, 0.8);
  const gpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.064, 0.38), matCpuPackage);
  gpuDie.position.set(0.38, 0.036, -0.06);
  addCrispEdges(gpuDie, 'motherboard', 0x38bdf8, 0.95);
  motherboard.add(cpuSocket, cpuDie, gpuSocket, gpuDie);

  // Twin Copper Thermal Heatpipes
  const pipe1 = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.026, 0.10), matCopperPipe);
  pipe1.position.set(0, 0.046, -0.42);
  const pipe2 = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.026, 0.08), matCopperPipe);
  pipe2.position.set(0, 0.046, -0.26);
  addCrispEdges(pipe1, 'motherboard', 0xf59e0b, 0.88);
  addCrispEdges(pipe2, 'motherboard', 0xf59e0b, 0.8);
  motherboard.add(pipe1, pipe2);

  // Dual Multi-Blade Spinning Cooling Fans with Glowing LED Halo Rings
  function createCoolingFan(xPos, ringColor) {
    const fanGroup = new THREE.Group();
    fanGroup.position.set(xPos, 0.034, -0.38);
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.046, 24), matOuterChassis);
    addCrispEdges(shroud, 'motherboard', 0xe2e8f0, 0.92);

    // Glowing LED Halo Ring inside fan shroud
    const ringGeo = new THREE.RingGeometry(0.30, 0.34, 28);
    const ringMat = new THREE.MeshBasicMaterial({ color: ringColor, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.024;

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.056, 16), matCpuPackage);
    addCrispEdges(hub, 'motherboard', 0xcbd5e1, 0.88);
    fanGroup.add(shroud, ringMesh, hub);

    const rotorGroup = new THREE.Group();
    for (let b = 0; b < 9; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.028, 0.03), matKeyCap);
      const angle = (b / 9) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.18, 0.01, Math.sin(angle) * 0.18);
      blade.rotation.y = -angle + 0.42;
      addCrispEdges(blade, 'motherboard', 0x94a3b8, 0.7);
      rotorGroup.add(blade);
    }
    fanGroup.add(rotorGroup);
    fanGroup.userData.rotor = rotorGroup;
    return fanGroup;
  }
  const fanL = createCoolingFan(-0.84, 0x38bdf8);
  const fanR = createCoolingFan(0.84, 0xa855f7);
  motherboard.add(fanL, fanR);

  // VRM Choke Coils & Solid-State Capacitors
  for (let v = 0; v < 7; v++) {
    const vrm = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.052, 0.10), matStorageSink);
    vrm.position.set(-0.45 + v * 0.15, 0.032, -0.62);
    addCrispEdges(vrm, 'motherboard', 0xcbd5e1, 0.82);
    motherboard.add(vrm);
  }
  for (let c = 0; c < 6; c++) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.052, 12), matGoldContacts);
    cap.position.set(-1.14, 0.032, -0.25 + c * 0.15);
    addCrispEdges(cap, 'motherboard', 0xf59e0b, 0.8);
    motherboard.add(cap);
  }

  // Embedded Flat PCB Line Wiring Traces
  const tracePoints = [];
  const traceCoords = [
    [-1.15, 0.024, 0.56, -0.38, 0.024, 0.56],
    [-0.38, 0.024, 0.56, -0.14, 0.024, 0.24],
    [1.15, 0.024, 0.56, 0.38, 0.024, 0.56],
    [0.38, 0.024, 0.56, 0.14, 0.024, 0.24],
    [-1.05, 0.024, 0.42, -0.32, 0.024, 0.42],
    [-0.32, 0.024, 0.42, -0.08, 0.024, 0.22],
    [1.05, 0.024, 0.42, 0.32, 0.024, 0.42],
    [0.32, 0.024, 0.42, 0.08, 0.024, 0.22],
    [-0.95, 0.024, 0.28, -0.35, 0.024, 0.28],
    [0.95, 0.024, 0.28, 0.35, 0.024, 0.28],
    [-0.32, 0.024, 0.68, 0.32, 0.024, 0.68],
    [-0.62, 0.024, -0.06, -0.38, 0.024, -0.06],
    [0.38, 0.024, -0.06, 0.68, 0.024, -0.06],
    [0, 0.024, 0.24, 0, 0.024, 0.72]
  ];
  traceCoords.forEach(([x1, y1, z1, x2, y2, z2]) => {
    tracePoints.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
  });
  const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePoints);
  const traceMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.9, depthTest: true });
  motherboard.add(new THREE.LineSegments(traceGeo, traceMat));

  const motherboardAnchor = new THREE.Object3D();
  motherboardAnchor.position.set(0.25, 0.06, -0.06);
  motherboard.add(motherboardAnchor);

  // =========================================================================
  // 4. RAM STICKS (Dual DDR5 Modules Ejecting Linearly Sideways)
  // =========================================================================
  const ram = new THREE.Group();
  function createRamStick(side) {
    const stickGroup = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.038, 0.32), matRamSpreader);
    addCrispEdges(board, 'ram', 0xf59e0b, 0.94);
    stickGroup.add(board);

    const goldStrip = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.04, 0.045), matGoldContacts);
    goldStrip.position.set(0, 0, side > 0 ? -0.145 : 0.145);
    stickGroup.add(goldStrip);

    for (let m = 0; m < 4; m++) {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, 0.16), matRamChip);
      chip.position.set(-0.255 + m * 0.17, 0.008, 0);
      addCrispEdges(chip, 'ram', 0xcbd5e1, 0.86);
      stickGroup.add(chip);
    }
    return stickGroup;
  }
  const ramL = createRamStick(-1);
  const ramR = createRamStick(1);
  ramL.position.set(-0.62, -0.02, 0.24);
  ramR.position.set(0.62, -0.02, 0.24);

  const ramAnchor = new THREE.Object3D();
  ramAnchor.position.set(0, 0.04, 0);
  ramR.add(ramAnchor);
  ram.add(ramL, ramR);

  // =========================================================================
  // 5. STORAGE & UNIBODY CHASSIS
  //    When assembled (spread = 0), baseMesh sits at y = -0.045 (top face at y = 0.00)
  //    so it meets topCasePalmrest (bottom face at y = 0.00) seamlessly!
  // =========================================================================
  const storage = new THREE.Group();
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.09, 2.00), matOuterChassis);
  baseMesh.position.set(0, -0.045, 0);
  addCrispEdges(baseMesh, 'storage', 0xe2e8f0, 0.92);

  // Side USB-C / Thunderbolt I/O Port Cutouts on Unibody Base
  for (let p = 0; p < 2; p++) {
    const portL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.026, 0.12), matGoldContacts);
    portL.position.set(-1.525, -0.035, -0.45 + p * 0.24);
    const portR = portL.clone();
    portR.position.x = 1.525;
    baseMesh.add(portL, portR);
  }

  // Multi-Cell Lithium Power Array in Rear Bay of Unibody
  for (let cell = 0; cell < 3; cell++) {
    const batCell = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.045, 0.48), matBatteryCell);
    batCell.position.set(-0.88 + cell * 0.88, 0.035, -0.42);
    addCrispEdges(batCell, 'storage', 0x6366f1, 0.78);
    baseMesh.add(batCell);
  }

  // Dual NVMe M.2 Solid-State Storage Drives with Finned Thermal Heatsinks
  function createNvmeSsd(xOffset) {
    const ssdGroup = new THREE.Group();
    ssdGroup.position.set(xOffset, -0.01, 0.38);
    const ssdPcb = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.04, 0.42), matStoragePcb);
    addCrispEdges(ssdPcb, 'storage', 0x818cf8, 0.94);
    const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.062, 0.36), matStorageSink);
    heatsink.position.set(-0.06, 0.016, 0);
    addCrispEdges(heatsink, 'storage', 0xe2e8f0, 0.92);
    const connector = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.042, 0.34), matGoldContacts);
    connector.position.set(0.48, 0, 0);
    ssdGroup.add(ssdPcb, heatsink, connector);
    return ssdGroup;
  }
  const ssd1 = createNvmeSsd(-0.64);
  const ssd2 = createNvmeSsd(0.64);
  const storageAnchor = new THREE.Object3D();
  storageAnchor.position.set(0.55, 0.02, 0.38);
  storage.add(baseMesh, ssd1, ssd2, storageAnchor);

  // =========================================================================
  // 6. TOUCHPAD (Flush on front palmrest at start; detaches forward at scroll end)
  // =========================================================================
  const touchpad = new THREE.Group();
  const padRim = new THREE.Mesh(
    new THREE.BoxGeometry(1.06, 0.024, 0.62),
    makeMatteMaterial({ color: 0x262b38, metalness: 0.35, roughness: 0.68 })
  );
  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.00, 0.030, 0.56), matTouchpadSurface);
  padRim.position.set(0, 0.022, 0.62);
  padMesh.position.set(0, 0.025, 0.62);
  addCrispEdges(padMesh, 'touchpad', 0xf472b6, 0.96);
  padMesh.userData.isTouchpad = true;
  const touchpadAnchor = new THREE.Object3D();
  touchpadAnchor.position.set(0, 0.04, 0.62);
  touchpad.add(padRim, padMesh, touchpadAnchor);

  const parts = { display, keyboard, motherboard, ram, touchpad, storage };
  const anchors = {
    display: displayAnchor,
    keyboard: keyboardAnchor,
    motherboard: motherboardAnchor,
    ram: ramAnchor,
    touchpad: touchpadAnchor,
    storage: storageAnchor
  };

  const partLabels = {
    display: "Display",
    keyboard: "Keyboard",
    motherboard: "Motherboard",
    ram: "RAM Sticks",
    storage: "Storage",
    touchpad: "Touchpad — Click to Download CV"
  };

  Object.entries(parts).forEach(([key, group]) => {
    group.traverse((child) => {
      if (child.isMesh) {
        child.userData.partKey = key;
        child.userData.partLabel = partLabels[key];
        pickableMeshes.push(child);
      }
    });
    root.add(group);
  });

  // Start 100% seamless & closed with internal boards hidden inside the unibody until separation begins
  display.rotation.x = Math.PI / 2;
  motherboard.visible = false;
  ram.visible = false;
  ssd1.visible = false;
  ssd2.visible = false;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);
  let currentActiveKey = 'display';
  let currentProgress = 0;

  function clearHover() {
    canvas.style.cursor = 'default';
    if (onPartHover) onPartHover(null, 0, 0);
  }

  canvas.addEventListener('pointermove', (e) => {
    if (e.target !== canvas || currentProgress <= 0.01 || currentProgress >= 0.995) {
      clearHover();
      return;
    }
    const rect = canvas.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
      clearHover();
      return;
    }
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const visiblePickables = pickableMeshes.filter((m) => m.visible && (!m.parent || m.parent.visible));
    const hits = raycaster.intersectObjects(visiblePickables, false);
    if (hits.length > 0) {
      const hitMesh = hits[0].object;
      canvas.style.cursor = hitMesh.userData.partKey === 'touchpad' ? 'pointer' : 'crosshair';
      if (onPartHover) onPartHover(hitMesh.userData.partLabel, e.clientX, e.clientY);
    } else {
      clearHover();
    }
  });

  canvas.addEventListener('pointerleave', clearHover);
  window.addEventListener('scroll', clearHover, { passive: true });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects([padMesh, padRim], false);
    if (hits.length > 0 && onTouchpadClick) onTouchpadClick();
  });

  const tempWorldVec = new THREE.Vector3();
  function getAnchorScreenCoords(anchorObj) {
    anchorObj.getWorldPosition(tempWorldVec);
    tempWorldVec.project(camera);
    return {
      x: (tempWorldVec.x * 0.5 + 0.5) * window.innerWidth,
      y: (-(tempWorldVec.y * 0.5) + 0.5) * window.innerHeight
    };
  }

  function setDisassemblyState(progress, activeKey, hexAccent) {
    currentProgress = progress;
    currentActiveKey = activeKey;

    // 1. Seamless Unibody Lid Hinge Opening (0.00 -> 0.13)
    const openRatio = Math.min(1, progress / 0.13);
    const smoothOpen = 1 - Math.pow(1 - openRatio, 2.4);
    const closedAngle = Math.PI / 2;
    const openAngle = -0.18;

    // 2. Linear Sideways + Vertical Exploded Echelon Spread (0.11 -> 0.80)
    const rawSpread = Math.max(0, Math.min(1, (progress - 0.11) / 0.69));
    const spread = 1 - Math.pow(1 - rawSpread, 1.85);

    const showInternals = rawSpread > 0.015;
    motherboard.visible = showInternals;
    ram.visible = showInternals;
    ssd1.visible = showInternals;
    ssd2.visible = showInternals;

    // 3. Smooth shift to left as About Me arrives (0.05 -> 0.15)
    const leftShift = Math.max(0, Math.min(1, (progress - 0.05) / 0.10));
    const smoothLeft = 1 - Math.pow(1 - leftShift, 2.2);

    // 4. Final Touchpad Detach stage (progress >= 0.82)
    const touchpadDetach = Math.max(0, Math.min(1, (progress - 0.82) / 0.15));

    // Active-part spotlight nudge (+Z toward viewer when that part's stage is active)
    const activeNudge = (key) => (leftShift >= 0.8 && touchpadDetach <= 0.45 && activeKey === key ? 0.18 : 0);

    // Display opens and steps slightly up & back-left
    display.position.set(
      -0.30 * spread,
      0.03 + spread * 0.56,
      -1.00 - spread * 0.18 + activeNudge('display')
    );
    display.rotation.x = closedAngle * (1 - smoothOpen) + (openAngle - spread * 0.08) * smoothOpen;

    // Keyboard Deck lifts up and shifts sideways to the LEFT (-0.65 * spread) so Motherboard beneath/beside it is 100% uncovered!
    keyboard.position.set(
      -0.65 * spread,
      spread * 0.40,
      spread * 0.14 + activeNudge('keyboard')
    );

    // Authentic Tech-Teardown Keycap Wave Cascade (Keys rise flat & crisp above glowing LED switch plate!)
    const keyCascadeProgress = Math.max(0, Math.min(1, (progress - 0.13) / 0.35));
    cascadeKeys.forEach(({ mesh, baseX, baseY, baseZ, wavePhase }) => {
      const localWave = Math.max(0, Math.min(1, (keyCascadeProgress * 1.6) - wavePhase * 0.6));
      const smoothWave = Math.sin(localWave * Math.PI * 0.5);
      mesh.position.set(
        baseX,
        baseY + smoothWave * 0.16,
        baseZ
      );
      mesh.rotation.set(0, 0, 0);
    });

    // Motherboard steps sideways to the RIGHT (+0.38 * spread) into full unobstructed view!
    motherboard.position.set(
      0.38 * spread,
      -0.02 + spread * 0.04,
      activeNudge('motherboard')
    );

    // RAM Sticks eject linearly sideways from the Motherboard
    const ramOut = Math.max(0, Math.min(1, (progress - 0.16) / 0.48));
    ram.position.set(0.38 * spread, 0, activeNudge('ram'));
    ramL.position.set(-0.62 - ramOut * 0.95, -0.02 + spread * 0.18, 0.24 + ramOut * 0.15);
    ramR.position.set(0.62 + ramOut * 1.05, -0.02 + spread * 0.18, 0.24 + ramOut * 0.15);

    // Storage & Unibody Base step downward & slightly right-forward
    storage.position.set(
      0.18 * spread,
      -spread * 0.46,
      spread * 0.08 + activeNudge('storage')
    );
    ssd1.position.set(-0.64 - spread * 0.22, -0.01 + spread * 0.22, 0.38 + spread * 0.16);
    ssd2.position.set(0.64 + spread * 0.22, -0.01 + spread * 0.22, 0.38 + spread * 0.16);

    // Touchpad moves with keyboard then detaches forward into front spotlight at scroll end
    touchpad.position.set(
      -0.65 * spread * (1 - touchpadDetach) + touchpadDetach * 0.22,
      spread * 0.40 - touchpadDetach * 0.22,
      spread * 0.18 + touchpadDetach * 1.15
    );
    touchpad.rotation.x = touchpadDetach * 0.28;

    // Continuous, Unidirectional Rotation (Starts facing RIGHT +0.64 rad -> Ends facing LEFT -0.56 rad)
    // Plus higher isometric tilt (rotation.x up to 0.44 rad) so all internal fans, chips & parts are richly visible!
    root.position.x = -1.28 * smoothLeft + touchpadDetach * 0.72;
    root.position.y = -0.44;
    root.rotation.y = 0.64 - progress * 1.20;
    root.rotation.x = 0.26 + spread * 0.18;

    if (hexAccent) accentLight.color.set(hexAccent);

    Object.entries(parts).forEach(([key, group]) => {
      const isFocused = (touchpadDetach > 0.45 && key === 'touchpad') || (leftShift >= 0.8 && touchpadDetach <= 0.45 && key === activeKey);
      group.scale.setScalar(isFocused ? 1.06 : 0.99);
      const lines = partEdgeLines[key] || [];
      lines.forEach((lMat) => {
        lMat.color.set(isFocused ? (hexAccent || '#38bdf8') : '#cbd5e1');
        lMat.opacity = isFocused ? 1.0 : 0.76;
      });
    });
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (fanL.userData.rotor) fanL.userData.rotor.rotation.y += 0.04;
    if (fanR.userData.rotor) fanR.userData.rotor.rotation.y -= 0.04;

    renderer.render(scene, camera);
    scene.updateMatrixWorld(true);

    if (onScreenProjectUpdate) {
      const activeAnchor = anchors[currentActiveKey] || anchors.display;
      const activeCoords = getAnchorScreenCoords(activeAnchor);
      const touchpadCoords = getAnchorScreenCoords(anchors.touchpad);
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
