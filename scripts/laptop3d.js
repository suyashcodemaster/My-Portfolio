export function initLaptop3D(canvas, onTouchpadClick, onPartHover, onScreenProjectUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.48, 6.2);
  camera.lookAt(0, 0.02, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Cap pixelRatio at 1.5 to prevent WebGL GPU memory exhaustion / context loss
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;

  // WebGL Context Loss & Restoration Recovery Guard (Prevents white-screen crash)
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
  }, false);

  canvas.addEventListener('webglcontextrestored', () => {
    renderer.render(scene, camera);
  }, false);

  const ambient = new THREE.AmbientLight(0xffffff, 0.96);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.15);
  keyLight.position.set(4, 7, 6);
  const rimLight = new THREE.DirectionalLight(0xcbd5e1, 1.65);
  rimLight.position.set(-5, 4, -4);
  const bottomFill = new THREE.DirectionalLight(0x94a3b8, 1.15);
  bottomFill.position.set(0, -5, 4);
  const accentLight = new THREE.PointLight(0xe2dfd7, 1.6, 16);
  accentLight.position.set(-1.8, 2.0, 4.2);
  scene.add(ambient, keyLight, rimLight, bottomFill, accentLight);

  const root = new THREE.Group();
  // Balanced size (0.88x) and lower position (-0.32) so it fills the space intentionally
  root.scale.setScalar(0.88);
  root.position.set(0, -0.32, 0);
  root.rotation.set(0.24, 0.62, 0);
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

  const matOuterChassis = makeMatteMaterial({ color: 0x1b1c20, metalness: 0.24, roughness: 0.80 });
  const matBezel = makeMatteMaterial({ color: 0x101114, metalness: 0.15, roughness: 0.85 });
  const matScreenPanel = makeMatteMaterial({ color: 0x13151a, emissive: 0x1f242d, emissiveIntensity: 0.45, roughness: 0.35 });
  const matMotherboardPcb = makeMatteMaterial({ color: 0x14161a, metalness: 0.25, roughness: 0.78 });
  const matCpuPackage = makeMatteMaterial({ color: 0x2c3038, emissive: 0x1e2229, emissiveIntensity: 0.3, metalness: 0.48, roughness: 0.52 });
  const matCopperPipe = makeMatteMaterial({ color: 0xb45309, emissive: 0x451a03, emissiveIntensity: 0.22, metalness: 0.58, roughness: 0.44 });
  const matGoldContacts = makeMatteMaterial({ color: 0xd4a373, emissive: 0x78350f, emissiveIntensity: 0.25, metalness: 0.68, roughness: 0.38 });
  const matKeyDeck = makeMatteMaterial({ color: 0x16171b, metalness: 0.2, roughness: 0.84 });
  const matKeyCap = makeMatteMaterial({ color: 0x24262c, metalness: 0.18, roughness: 0.76 });
  const matBacklightMatrix = makeMatteMaterial({ color: 0x18221f, emissive: 0x84a98c, emissiveIntensity: 0.35, roughness: 0.4 });
  const matRamSpreader = makeMatteMaterial({ color: 0x1e2026, emissive: 0x141619, emissiveIntensity: 0.25, metalness: 0.36, roughness: 0.70 });
  const matRamChip = makeMatteMaterial({ color: 0x101114, metalness: 0.2, roughness: 0.82 });
  const matStoragePcb = makeMatteMaterial({ color: 0x17191f, metalness: 0.28, roughness: 0.76 });
  const matStorageSink = makeMatteMaterial({ color: 0x262932, metalness: 0.40, roughness: 0.66 });
  const matBatteryCell = makeMatteMaterial({ color: 0x18191e, metalness: 0.3, roughness: 0.75 });
  const matTouchpadSurface = makeMatteMaterial({ color: 0x202228, emissive: 0x2a2d35, emissiveIntensity: 0.32, roughness: 0.58, metalness: 0.28 });

  const pickableMeshes = [];
  const partEdgeLines = {};

  // Attach crisp EdgesGeometry ONLY to primary structural silhouettes (prevents GPU draw-call overload)
  function addCrispEdges(mesh, partKey, edgeColor = 0xd6d3cd, baseOpacity = 0.88) {
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
  // 1. DISPLAY (Rests seamlessly at y = +0.03 when closed; shifts upward during disassembly)
  // =========================================================================
  const display = new THREE.Group();
  display.position.set(0, 0.03, -1.00);

  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 2.00, 0.055), matOuterChassis);
  lidMesh.position.set(0, 1.00, -0.028);
  addCrispEdges(lidMesh, 'display', 0xe5e5e0, 0.92);

  const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.94, 1.88), matBezel);
  bezelMesh.position.set(0, 1.00, 0.002);

  const lcdMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.78, 1.70), matScreenPanel);
  lcdMesh.position.set(0, 1.00, 0.004);
  addCrispEdges(lcdMesh, 'display', 0x9ca3af, 0.75);

  const barGeo = new THREE.PlaneGeometry(1.0, 0.036);
  const barMat = new THREE.MeshBasicMaterial({ color: 0xd4a373, transparent: true, opacity: 0.35 });
  for (let i = 0; i < 5; i++) {
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.scale.x = 0.65 + (i % 3) * 0.4;
    bar.position.set(-1.1 + (bar.scale.x * 0.5), 1.45 - i * 0.16, 0.006);
    display.add(bar);
  }

  const hingeGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.42, 12);
  const hingeL = new THREE.Mesh(hingeGeo, matOuterChassis);
  hingeL.rotation.z = Math.PI / 2;
  hingeL.position.set(-0.85, 0, -0.025);
  const hingeR = hingeL.clone();
  hingeR.position.set(0.85, 0, -0.025);

  const displayAnchor = new THREE.Object3D();
  displayAnchor.position.set(-0.75, 1.05, 0.02);
  display.add(lidMesh, bezelMesh, lcdMesh, hingeL, hingeR, displayAnchor);

  // =========================================================================
  // 2. KEYBOARD & TOP-CASE PALMREST DECK (With Enlarged Touchpad on Front Deck)
  // =========================================================================
  const keyboard = new THREE.Group();
  const topCasePalmrest = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.03, 2.00), matOuterChassis);
  topCasePalmrest.position.set(0, 0.015, 0);
  addCrispEdges(topCasePalmrest, 'keyboard', 0xe5e5e0, 0.92);
  keyboard.add(topCasePalmrest);

  const backlightPlate = new THREE.Mesh(new THREE.BoxGeometry(2.64, 0.014, 1.02), matBacklightMatrix);
  backlightPlate.position.set(0, 0.024, -0.26);
  addCrispEdges(backlightPlate, 'keyboard', 0x84a98c, 0.8);
  keyboard.add(backlightPlate);

  // Shared Geometry for 44 Keycaps (Zero extra draw-call overhead)
  const sharedKeyGeo = new THREE.BoxGeometry(0.185, 0.028, 0.175);
  const cascadeKeys = [];
  const rows = 4;
  const cols = 11;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = new THREE.Mesh(sharedKeyGeo, matKeyCap);
      const baseX = -1.0 + c * 0.2;
      const baseY = 0.032;
      const baseZ = -0.60 + r * 0.22;
      key.position.set(baseX, baseY, baseZ);
      keyboard.add(key);

      const wavePhase = (c / (cols - 1)) * 0.65 + (r / (rows - 1)) * 0.35;
      cascadeKeys.push({ mesh: key, baseX, baseY, baseZ, wavePhase });
    }
  }
  const keyboardAnchor = new THREE.Object3D();
  keyboardAnchor.position.set(-0.75, 0.08, -0.25);
  keyboard.add(keyboardAnchor);

  // =========================================================================
  // 3. ENLARGED PRECISION TOUCHPAD (Attached to Front Palmrest of Keyboard Deck!)
  // =========================================================================
  const touchpad = new THREE.Group();
  // Bigger touchpad (1.36 x 0.72) nestled right on the front palmrest (never detaches completely from the laptop!)
  const padRim = new THREE.Mesh(
    new THREE.BoxGeometry(1.38, 0.024, 0.74),
    makeMatteMaterial({ color: 0x2c2f36, metalness: 0.35, roughness: 0.65 })
  );
  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.030, 0.68), matTouchpadSurface);
  padRim.position.set(0, 0.024, 0.56);
  padMesh.position.set(0, 0.028, 0.56);
  addCrispEdges(padMesh, 'touchpad', 0xf4f1ea, 0.96);
  padMesh.userData.isTouchpad = true;
  const touchpadAnchor = new THREE.Object3D();
  touchpadAnchor.position.set(0, 0.045, 0.56);
  touchpad.add(padRim, padMesh, touchpadAnchor);
  // Parent touchpad directly to keyboard so it moves naturally with the palmrest and never detaches away!
  keyboard.add(touchpad);

  // =========================================================================
  // 4. MOTHERBOARD (Aligned on Central Axis; Visible as Upper Parts Shift Upward!)
  // =========================================================================
  const motherboard = new THREE.Group();
  motherboard.position.set(0, -0.02, 0);

  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.66, 0.042, 1.60), matMotherboardPcb);
  addCrispEdges(pcb, 'motherboard', 0xe5e5e0, 0.94);
  motherboard.add(pcb);

  const cpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.05, 0.68), matOuterChassis);
  cpuSocket.position.set(-0.22, 0.025, -0.06);
  const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.068, 0.46), matCpuPackage);
  cpuDie.position.set(-0.22, 0.038, -0.06);
  addCrispEdges(cpuDie, 'motherboard', 0xf4f1ea, 0.96);

  const gpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.048, 0.56), matOuterChassis);
  gpuSocket.position.set(0.38, 0.024, -0.06);
  const gpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.064, 0.38), matCpuPackage);
  gpuDie.position.set(0.38, 0.036, -0.06);
  addCrispEdges(gpuDie, 'motherboard', 0xd4a373, 0.92);
  motherboard.add(cpuSocket, cpuDie, gpuSocket, gpuDie);

  const pipe1 = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.026, 0.10), matCopperPipe);
  pipe1.position.set(0, 0.046, -0.42);
  const pipe2 = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.026, 0.08), matCopperPipe);
  pipe2.position.set(0, 0.046, -0.26);
  addCrispEdges(pipe1, 'motherboard', 0xd4a373, 0.88);
  motherboard.add(pipe1, pipe2);

  const sharedBladeGeo = new THREE.BoxGeometry(0.22, 0.028, 0.03);
  function createCoolingFan(xPos, ringColor) {
    const fanGroup = new THREE.Group();
    fanGroup.position.set(xPos, 0.034, -0.38);
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.046, 20), matOuterChassis);
    addCrispEdges(shroud, 'motherboard', 0xe5e5e0, 0.92);

    const ringGeo = new THREE.RingGeometry(0.30, 0.34, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: ringColor, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.024;

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.056, 12), matCpuPackage);
    fanGroup.add(shroud, ringMesh, hub);

    const rotorGroup = new THREE.Group();
    for (let b = 0; b < 8; b++) {
      const blade = new THREE.Mesh(sharedBladeGeo, matKeyCap);
      const angle = (b / 8) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.18, 0.01, Math.sin(angle) * 0.18);
      blade.rotation.y = -angle + 0.42;
      rotorGroup.add(blade);
    }
    fanGroup.add(rotorGroup);
    fanGroup.userData.rotor = rotorGroup;
    return fanGroup;
  }
  const fanL = createCoolingFan(-0.84, 0xd4a373);
  const fanR = createCoolingFan(0.84, 0x84a98c);
  motherboard.add(fanL, fanR);

  const sharedVrmGeo = new THREE.BoxGeometry(0.10, 0.052, 0.10);
  for (let v = 0; v < 7; v++) {
    const vrm = new THREE.Mesh(sharedVrmGeo, matStorageSink);
    vrm.position.set(-0.45 + v * 0.15, 0.032, -0.62);
    motherboard.add(vrm);
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
    [0, 0.024, 0.24, 0, 0.024, 0.72]
  ];
  traceCoords.forEach(([x1, y1, z1, x2, y2, z2]) => {
    tracePoints.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
  });
  const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePoints);
  const traceMat = new THREE.LineBasicMaterial({ color: 0xd4a373, transparent: true, opacity: 0.88, depthTest: true });
  motherboard.add(new THREE.LineSegments(traceGeo, traceMat));

  // Accurate Motherboard Anchor placed on the front-left visible edge of the Motherboard PCB
  const motherboardAnchor = new THREE.Object3D();
  motherboardAnchor.position.set(-0.35, 0.035, 0.48);
  motherboard.add(motherboardAnchor);

  // =========================================================================
  // 5. RAM STICKS (Anchored to Left Ejecting RAM Stick so Label Is 100% Accurate!)
  // =========================================================================
  const ram = new THREE.Group();
  const sharedChipGeo = new THREE.BoxGeometry(0.13, 0.05, 0.16);
  function createRamStick(side) {
    const stickGroup = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.038, 0.32), matRamSpreader);
    addCrispEdges(board, 'ram', 0xd4a373, 0.94);
    stickGroup.add(board);

    const goldStrip = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.04, 0.045), matGoldContacts);
    goldStrip.position.set(0, 0, side > 0 ? -0.145 : 0.145);
    stickGroup.add(goldStrip);

    for (let m = 0; m < 4; m++) {
      const chip = new THREE.Mesh(sharedChipGeo, matRamChip);
      chip.position.set(-0.255 + m * 0.17, 0.008, 0);
      stickGroup.add(chip);
    }
    return stickGroup;
  }
  const ramL = createRamStick(-1);
  const ramR = createRamStick(1);
  ramL.position.set(-0.62, -0.02, 0.24);
  ramR.position.set(0.62, -0.02, 0.24);

  // Attach ramAnchor directly to ramL (the left RAM stick that slides out into open view on the left!)
  const ramAnchor = new THREE.Object3D();
  ramAnchor.position.set(0, 0.03, 0);
  ramL.add(ramAnchor);
  ram.add(ramL, ramR);

  // =========================================================================
  // 6. STORAGE & UNIBODY CHASSIS
  // =========================================================================
  const storage = new THREE.Group();
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.09, 2.00), matOuterChassis);
  baseMesh.position.set(0, -0.045, 0);
  addCrispEdges(baseMesh, 'storage', 0xe5e5e0, 0.92);

  const sharedBatGeo = new THREE.BoxGeometry(0.82, 0.045, 0.48);
  for (let cell = 0; cell < 3; cell++) {
    const batCell = new THREE.Mesh(sharedBatGeo, matBatteryCell);
    batCell.position.set(-0.88 + cell * 0.88, 0.035, -0.42);
    baseMesh.add(batCell);
  }

  function createNvmeSsd(xOffset) {
    const ssdGroup = new THREE.Group();
    ssdGroup.position.set(xOffset, -0.01, 0.38);
    const ssdPcb = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.04, 0.42), matStoragePcb);
    addCrispEdges(ssdPcb, 'storage', 0x84a98c, 0.92);
    const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.062, 0.36), matStorageSink);
    heatsink.position.set(-0.06, 0.016, 0);
    addCrispEdges(heatsink, 'storage', 0xe5e5e0, 0.9);
    const connector = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.042, 0.34), matGoldContacts);
    connector.position.set(0.48, 0, 0);
    ssdGroup.add(ssdPcb, heatsink, connector);
    return ssdGroup;
  }
  const ssd1 = createNvmeSsd(-0.64);
  const ssd2 = createNvmeSsd(0.64);
  const storageAnchor = new THREE.Object3D();
  storageAnchor.position.set(-0.64, 0.02, 0.38);
  storage.add(baseMesh, ssd1, ssd2, storageAnchor);

  const topLevelGroups = { display, keyboard, motherboard, ram, storage };
  const allParts = { display, keyboard, motherboard, ram, touchpad, storage };
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

  Object.entries(allParts).forEach(([key, group]) => {
    group.traverse((child) => {
      if (child.isMesh && !child.userData.partKey) {
        child.userData.partKey = key;
        child.userData.partLabel = partLabels[key];
        pickableMeshes.push(child);
      }
    });
  });
  // Ensure touchpad meshes carry the 'touchpad' partKey even though touchpad is parented to keyboard
  touchpad.traverse((child) => {
    if (child.isMesh) {
      child.userData.partKey = 'touchpad';
      child.userData.partLabel = partLabels.touchpad;
    }
  });

  Object.values(topLevelGroups).forEach((g) => root.add(g));

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

  // Pixel-accurate projection relative to canvas bounding box
  const tempWorldVec = new THREE.Vector3();
  function getAnchorScreenCoords(anchorObj) {
    const rect = canvas.getBoundingClientRect();
    anchorObj.getWorldPosition(tempWorldVec);
    tempWorldVec.project(camera);
    return {
      x: rect.left + (tempWorldVec.x * 0.5 + 0.5) * rect.width,
      y: rect.top + (-(tempWorldVec.y * 0.5) + 0.5) * rect.height
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

    // 2. Vertical Disassembly Spread (0.11 -> 0.80): Upper parts shift UP so Motherboard & under-parts are clearly visible!
    const rawSpread = Math.max(0, Math.min(1, (progress - 0.11) / 0.69));
    const spread = 1 - Math.pow(1 - rawSpread, 1.85);

    const showInternals = rawSpread > 0.015;
    motherboard.visible = showInternals;
    ram.visible = showInternals;
    ssd1.visible = showInternals;
    ssd2.visible = showInternals;

    // 3. Smooth shift to left while cards scroll (0.05 -> 0.15)
    const leftShift = Math.max(0, Math.min(1, (progress - 0.05) / 0.10));
    const smoothLeft = 1 - Math.pow(1 - leftShift, 2.2);

    // 4. End-of-Animation Centering (progress >= 0.81):
    //    Laptop glides back to the center of the screen so the enlarged Touchpad (still attached to the palmrest!) sits centered!
    const endCenterRatio = Math.max(0, Math.min(1, (progress - 0.81) / 0.16));
    const smoothEndCenter = 1 - Math.pow(1 - endCenterRatio, 2.2);

    // Upper parts (Display & Keyboard) shift cleanly UPWARD so you can see the Motherboard & under-parts beneath them!
    display.position.set(0, 0.03 + spread * 0.68, -1.00 - spread * 0.12);
    display.rotation.x = closedAngle * (1 - smoothOpen) + (openAngle - spread * 0.06) * smoothOpen;

    keyboard.position.set(0, spread * 0.44, 0);

    // Keycap Wave Cascade
    const keyCascadeProgress = Math.max(0, Math.min(1, (progress - 0.13) / 0.35));
    cascadeKeys.forEach(({ mesh, baseX, baseY, baseZ, wavePhase }) => {
      const localWave = Math.max(0, Math.min(1, (keyCascadeProgress * 1.6) - wavePhase * 0.6));
      const smoothWave = Math.sin(localWave * Math.PI * 0.5);
      mesh.position.set(baseX, baseY + smoothWave * 0.14, baseZ);
    });

    // Touchpad remains attached to the front palmrest of the keyboard (only rising 0.045 units in subtle relief at the end!)
    touchpad.position.set(0, smoothEndCenter * 0.045, smoothEndCenter * 0.06);

    // Motherboard stays aligned on the central axis right in the open window below the lifted Keyboard
    motherboard.position.set(0, -0.02 - spread * 0.04, 0);

    // RAM Sticks slide out cleanly from the Motherboard slots
    const ramOut = Math.max(0, Math.min(1, (progress - 0.16) / 0.48));
    ram.position.set(0, -0.02 - spread * 0.04, 0);
    ramL.position.set(-0.62 - ramOut * 0.82, 0, 0.24);
    ramR.position.set(0.62 + ramOut * 0.82, 0, 0.24);

    // Storage & Lower Unibody separate cleanly below the Motherboard
    storage.position.set(0, -spread * 0.44, 0);
    ssd1.position.set(-0.64, -0.01 + spread * 0.14, 0.38);
    ssd2.position.set(0.64, -0.01 + spread * 0.14, 0.38);

    // Horizontal Position: Starts at 0 -> moves left (-1.22) during stages -> returns to center (0.0) at end for Touchpad CV!
    root.position.x = -1.22 * smoothLeft * (1 - smoothEndCenter);
    root.position.y = -0.32 - spread * 0.06;

    // Tilt Laptop UPWARD (rotation.x decreases from 0.24 to 0.12) so we can see under the lifted Keyboard into the Motherboard!
    root.rotation.x = 0.24 - spread * 0.12 + smoothEndCenter * 0.14;

    // Continuous rotation from facing RIGHT (+0.62 rad) to facing LEFT (-0.52 rad), easing toward front-center at final touchpad stage
    const mainYaw = 0.62 - progress * 1.14;
    root.rotation.y = mainYaw * (1 - smoothEndCenter * 0.65);

    if (hexAccent) accentLight.color.set(hexAccent);

    Object.entries(allParts).forEach(([key, group]) => {
      const isFocused = (smoothEndCenter > 0.45 && key === 'touchpad') || (leftShift >= 0.8 && smoothEndCenter <= 0.45 && key === activeKey);
      const lines = partEdgeLines[key] || [];
      lines.forEach((lMat) => {
        lMat.color.set(isFocused ? '#ffffff' : '#9ca3af');
        lMat.opacity = isFocused ? 1.0 : 0.68;
      });
    });
  }

  // Pause WebGL rendering when #section-laptop is scrolled out of view to save GPU resources
  let isLaptopInView = true;
  const laptopSectionEl = document.getElementById('section-laptop');
  if ('IntersectionObserver' in window && laptopSectionEl) {
    const viewObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isLaptopInView = entry.isIntersecting;
      });
    }, { rootMargin: '200px 0px' });
    viewObs.observe(laptopSectionEl);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isLaptopInView) return;

    if (fanL.userData.rotor) fanL.userData.rotor.rotation.y += 0.035;
    if (fanR.userData.rotor) fanR.userData.rotor.rotation.y -= 0.035;

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
