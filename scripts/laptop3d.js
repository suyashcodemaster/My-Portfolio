export function initLaptop3D(canvas, onTouchpadClick, onPartHover, onScreenProjectUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);
  // Framed back at z = 6.9 so the entire laptop and all ejected parts stay 100% inside the viewport at all times!
  camera.position.set(0, 1.62, 6.65);
  camera.lookAt(0, -0.02, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
  }, false);

  canvas.addEventListener('webglcontextrestored', () => {
    renderer.render(scene, camera);
  }, false);

  const ambient = new THREE.AmbientLight(0xffffff, 0.52);
  const keyLight = new THREE.DirectionalLight(0xe2e8f0, 1.25);
  keyLight.position.set(3.5, 6.5, 4.5);
  const rimLight = new THREE.DirectionalLight(0x94a3b8, 1.45);
  rimLight.position.set(-5, 4, -5);
  const bottomFill = new THREE.DirectionalLight(0x64748b, 0.95);
  bottomFill.position.set(0, -5, 3.5);
  const accentLight = new THREE.PointLight(0x38bdf8, 2.2, 16);
  accentLight.position.set(-1.8, 1.8, 4.0);
  scene.add(ambient, keyLight, rimLight, bottomFill, accentLight);

  const root = new THREE.Group();
  root.scale.setScalar(0.86);
  root.position.set(0, -0.36, 0);
  root.rotation.set(0.24, 0.96, 0);
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

  const matOuterChassis = makeMatteMaterial({ color: 0x090a0f, metalness: 0.16, roughness: 0.90 });
  const matBezel = makeMatteMaterial({ color: 0x050608, metalness: 0.10, roughness: 0.94 });
  const matScreenPanel = makeMatteMaterial({ color: 0x070b14, emissive: 0x0f172a, emissiveIntensity: 0.42, roughness: 0.45 });
  const matMotherboardPcb = makeMatteMaterial({ color: 0x080b11, metalness: 0.18, roughness: 0.88 });
  const matCpuPackage = makeMatteMaterial({ color: 0x161922, emissive: 0x1e1b4b, emissiveIntensity: 0.35, metalness: 0.35, roughness: 0.65 });
  const matCopperPipe = makeMatteMaterial({ color: 0x92400e, emissive: 0x451a03, emissiveIntensity: 0.24, metalness: 0.48, roughness: 0.52 });
  const matGoldContacts = makeMatteMaterial({ color: 0xf59e0b, emissive: 0x78350f, emissiveIntensity: 0.28, metalness: 0.60, roughness: 0.42 });
  const matKeyDeck = makeMatteMaterial({ color: 0x08090d, metalness: 0.15, roughness: 0.92 });
  const matKeyCap = makeMatteMaterial({ color: 0x0e1017, metalness: 0.12, roughness: 0.90 });
  const matBacklightMatrix = makeMatteMaterial({ color: 0x062019, emissive: 0x10b981, emissiveIntensity: 0.45, roughness: 0.5 });
  const matRamSpreader = makeMatteMaterial({ color: 0x0c0e14, emissive: 0x0f172a, emissiveIntensity: 0.25, metalness: 0.28, roughness: 0.82 });
  const matRamChip = makeMatteMaterial({ color: 0x050608, metalness: 0.15, roughness: 0.90 });
  const matStoragePcb = makeMatteMaterial({ color: 0x090c14, metalness: 0.22, roughness: 0.86 });
  const matStorageSink = makeMatteMaterial({ color: 0x12151f, metalness: 0.30, roughness: 0.78 });
  const matBatteryCell = makeMatteMaterial({ color: 0x0a0c12, metalness: 0.20, roughness: 0.88 });
  const matTouchpadSurface = makeMatteMaterial({ color: 0x0d0f16, emissive: 0x1e1b4b, emissiveIntensity: 0.28, roughness: 0.78, metalness: 0.20 });

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
  // 1. DISPLAY
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
  addCrispEdges(lcdMesh, 'display', 0x38bdf8, 0.84);

  const barGeo = new THREE.PlaneGeometry(1.0, 0.036);
  const uiColors = [0x38bdf8, 0x10b981, 0xa855f7, 0xf59e0b, 0xec4899];
  for (let i = 0; i < 5; i++) {
    const barMat = new THREE.MeshBasicMaterial({ color: uiColors[i % uiColors.length], transparent: true, opacity: 0.45 });
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
  // 2. KEYBOARD DECK, OUTLINED & LETTER-IMPRINTED KEYCAPS + INTERMEDIATE SURFACE
  // =========================================================================
  const keyboard = new THREE.Group();
  const topCasePalmrest = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.03, 2.00), matOuterChassis);
  topCasePalmrest.position.set(0, 0.015, 0);
  addCrispEdges(topCasePalmrest, 'keyboard', 0xe2e8f0, 0.92);
  keyboard.add(topCasePalmrest);

  // Separate Intermediate Surface between the Keyboard and the Motherboard (EMI / Backlight Matrix Shield)
  // Tilts and separates independently when Motherboard & lower components are revealed!
  const midSurface = new THREE.Group();
  const backlightPlate = new THREE.Mesh(new THREE.BoxGeometry(2.68, 0.016, 1.18), matBacklightMatrix);
  backlightPlate.position.set(0, 0, -0.18);
  addCrispEdges(backlightPlate, 'keyboard', 0x10b981, 0.85);
  // Subtle grid ribs on the intermediate surface between keyboard and motherboard
  const midRibGeo = new THREE.BoxGeometry(2.56, 0.020, 0.025);
  for (let r = -2; r <= 2; r++) {
    const rib = new THREE.Mesh(midRibGeo, matOuterChassis);
    rib.position.set(0, 0.004, -0.18 + r * 0.22);
    midSurface.add(rib);
  }
  midSurface.add(backlightPlate);
  midSurface.position.set(0, 0.002, 0);
  root.add(midSurface);

  // Build a single 512x256 CanvasTexture atlas for subtle laser-imprinted QWERTY key legends
  const rows = 4;
  const cols = 11;
  const keyLegends = [
    ['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '⌫'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '↵'],
    ['⇧', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', 'FN']
  ];

  const atlasCanvas = document.createElement('canvas');
  atlasCanvas.width = 512;
  atlasCanvas.height = 256;
  const ctx = atlasCanvas.getContext('2d');
  ctx.fillStyle = '#0e1017';
  ctx.fillRect(0, 0, 512, 256);

  const cellW = 512 / cols;
  const cellH = 256 / rows;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * cellW;
      const cy = (r + 0.5) * cellH;
      const label = keyLegends[r][c];
      // Subtle recessed keycap top bevel imprint
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(c * cellW + 5, r * cellH + 5, cellW - 10, cellH - 10);
      // Subtle laser-etched letter imprint (not overly bright, realistic dark-matte keycap imprint)
      ctx.font = label.length > 1 ? '600 13px "JetBrains Mono", monospace' : '600 18px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(203, 213, 225, 0.38)';
      ctx.fillText(label, cx, cy + 1);
    }
  }

  const keyAtlasTex = new THREE.CanvasTexture(atlasCanvas);
  keyAtlasTex.anisotropy = 4;
  const matImprintedKeyCap = makeMatteMaterial({
    color: 0xffffff,
    map: keyAtlasTex,
    metalness: 0.14,
    roughness: 0.88
  });

  const baseKeyGeo = new THREE.BoxGeometry(0.182, 0.028, 0.172);
  const sharedKeyEdgesGeo = new THREE.EdgesGeometry(baseKeyGeo);
  const keyOutlineMat = new THREE.LineBasicMaterial({
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.62
  });
  if (!partEdgeLines['keyboard']) partEdgeLines['keyboard'] = [];
  partEdgeLines['keyboard'].push(keyOutlineMat);

  const cascadeKeys = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const keyGeo = baseKeyGeo.clone();
      const uvAttr = keyGeo.attributes.uv;
      const u0 = c / cols;
      const u1 = (c + 1) / cols;
      const v1 = 1 - (r / rows);
      const v0 = 1 - ((r + 1) / rows);
      // Map all faces to a dark corner of cell (0,0) first, then map Top Face (+Y, vertices 8..11) to cell (c, r)
      for (let i = 0; i < uvAttr.count; i++) {
        uvAttr.setXY(i, 0.005, 0.995);
      }
      uvAttr.setXY(8, u0, v1);
      uvAttr.setXY(9, u1, v1);
      uvAttr.setXY(10, u0, v0);
      uvAttr.setXY(11, u1, v0);
      uvAttr.needsUpdate = true;

      const key = new THREE.Mesh(keyGeo, matImprintedKeyCap);
      // Attach crisp outline to each keycap using the shared EdgesGeometry and shared LineBasicMaterial
      const keyOutline = new THREE.LineSegments(sharedKeyEdgesGeo, keyOutlineMat);
      key.add(keyOutline);

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
  // 3. ENLARGED PRECISION TOUCHPAD (Attached to Front Palmrest of Keyboard Deck)
  // =========================================================================
  const touchpad = new THREE.Group();
  const padRim = new THREE.Mesh(
    new THREE.BoxGeometry(1.38, 0.024, 0.74),
    makeMatteMaterial({ color: 0x161922, metalness: 0.25, roughness: 0.82 })
  );
  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.030, 0.68), matTouchpadSurface);
  padRim.position.set(0, 0.024, 0.56);
  padMesh.position.set(0, 0.028, 0.56);
  addCrispEdges(padMesh, 'touchpad', 0xec4899, 0.96);
  padMesh.userData.isTouchpad = true;
  const touchpadAnchor = new THREE.Object3D();
  touchpadAnchor.position.set(0, 0.045, 0.56);
  touchpad.add(padRim, padMesh, touchpadAnchor);
  keyboard.add(touchpad);

  // =========================================================================
  // 4. MOTHERBOARD
  // =========================================================================
  const motherboard = new THREE.Group();
  motherboard.position.set(0, -0.02, 0);

  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.66, 0.042, 1.60), matMotherboardPcb);
  addCrispEdges(pcb, 'motherboard', 0xe2e8f0, 0.94);
  motherboard.add(pcb);

  const cpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.05, 0.68), matOuterChassis);
  cpuSocket.position.set(-0.22, 0.025, -0.06);
  const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.068, 0.46), matCpuPackage);
  cpuDie.position.set(-0.22, 0.038, -0.06);
  addCrispEdges(cpuDie, 'motherboard', 0xa855f7, 0.98);

  const gpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.048, 0.56), matOuterChassis);
  gpuSocket.position.set(0.38, 0.024, -0.06);
  const gpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.064, 0.38), matCpuPackage);
  gpuDie.position.set(0.38, 0.036, -0.06);
  addCrispEdges(gpuDie, 'motherboard', 0x38bdf8, 0.95);
  motherboard.add(cpuSocket, cpuDie, gpuSocket, gpuDie);

  const pipe1 = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.026, 0.10), matCopperPipe);
  pipe1.position.set(0, 0.046, -0.42);
  const pipe2 = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.026, 0.08), matCopperPipe);
  pipe2.position.set(0, 0.046, -0.26);
  addCrispEdges(pipe1, 'motherboard', 0xf59e0b, 0.88);
  motherboard.add(pipe1, pipe2);

  const sharedBladeGeo = new THREE.BoxGeometry(0.22, 0.028, 0.03);
  function createCoolingFan(xPos, ringColor) {
    const fanGroup = new THREE.Group();
    fanGroup.position.set(xPos, 0.034, -0.38);
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.046, 20), matOuterChassis);
    addCrispEdges(shroud, 'motherboard', 0xe2e8f0, 0.92);

    const ringGeo = new THREE.RingGeometry(0.30, 0.34, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: ringColor, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
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
  const fanL = createCoolingFan(-0.84, 0x38bdf8);
  const fanR = createCoolingFan(0.84, 0xa855f7);
  motherboard.add(fanL, fanR);

  const sharedVrmGeo = new THREE.BoxGeometry(0.10, 0.052, 0.10);
  for (let v = 0; v < 7; v++) {
    const vrm = new THREE.Mesh(sharedVrmGeo, matStorageSink);
    vrm.position.set(-0.45 + v * 0.15, 0.032, -0.62);
    motherboard.add(vrm);
  }

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
  const traceMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.9, depthTest: true });
  motherboard.add(new THREE.LineSegments(traceGeo, traceMat));

  const motherboardAnchor = new THREE.Object3D();
  motherboardAnchor.position.set(-0.35, 0.035, 0.48);
  motherboard.add(motherboardAnchor);

  // =========================================================================
  // 5. RAM STICKS
  // =========================================================================
  const ram = new THREE.Group();
  const sharedChipGeo = new THREE.BoxGeometry(0.13, 0.05, 0.16);
  function createRamStick(side) {
    const stickGroup = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.038, 0.32), matRamSpreader);
    addCrispEdges(board, 'ram', 0xf59e0b, 0.94);
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
  addCrispEdges(baseMesh, 'storage', 0xe2e8f0, 0.92);

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
    addCrispEdges(ssdPcb, 'storage', 0x6366f1, 0.94);
    const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.062, 0.36), matStorageSink);
    heatsink.position.set(-0.06, 0.016, 0);
    addCrispEdges(heatsink, 'storage', 0xe2e8f0, 0.9);
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
  touchpad.traverse((child) => {
    if (child.isMesh) {
      child.userData.partKey = 'touchpad';
      child.userData.partLabel = partLabels.touchpad;
    }
  });

  Object.values(topLevelGroups).forEach((g) => root.add(g));

  display.rotation.x = Math.PI / 2;
  midSurface.visible = false;
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

    // 2. Disassembly Spread (0.11 -> 0.80)
    const rawSpread = Math.max(0, Math.min(1, (progress - 0.11) / 0.69));
    const spread = 1 - Math.pow(1 - rawSpread, 1.85);

    // Extra separation & tilt window when Motherboard, RAM Sticks, and Storage are being showcased (0.25 -> 0.78)
    const rawLowerReveal = Math.max(0, Math.min(1, (progress - 0.25) / 0.24));
    const lowerReveal = rawLowerReveal * rawLowerReveal * (3 - 2 * rawLowerReveal);

    const showInternals = rawSpread > 0.015;
    midSurface.visible = showInternals;
    motherboard.visible = showInternals;
    ram.visible = showInternals;
    ssd1.visible = showInternals;
    ssd2.visible = showInternals;

    // 3. Smooth shift to left while cards scroll (0.05 -> 0.15)
    const leftShift = Math.max(0, Math.min(1, (progress - 0.05) / 0.10));
    const smoothLeft = 1 - Math.pow(1 - leftShift, 2.2);

    // 4. End-of-Animation Centering (progress >= 0.81)
    const endCenterRatio = Math.max(0, Math.min(1, (progress - 0.81) / 0.16));
    const smoothEndCenter = 1 - Math.pow(1 - endCenterRatio, 2.2);
    const activeLowerReveal = lowerReveal * (1 - smoothEndCenter * 0.75);

    // Display lifts higher when lower parts are showcased so nothing feels cramped
    display.position.set(
      0,
      0.03 + spread * 1.08 + activeLowerReveal * 0.34,
      -1.00 - spread * 0.16 - activeLowerReveal * 0.12
    );
    display.rotation.x = closedAngle * (1 - smoothOpen) + (openAngle - spread * 0.08 - activeLowerReveal * 0.06) * smoothOpen;

    // Keyboard lifts high (+0.68 * spread + 0.36 * activeLowerReveal = +1.04) AND tilts when Motherboard/RAM/Storage
    // are active so both the imprinted Keyboard keys AND the Motherboard beneath have a wide-open viewing window!
    keyboard.position.set(
      0,
      spread * 0.68 + activeLowerReveal * 0.36,
      -activeLowerReveal * 0.10
    );
    // During Keyboard stage (before lowerReveal), slight forward tilt (+0.08 * spread) shows off the key outlines & letters;
    // then tilts upward (-0.16 * activeLowerReveal) to open up the view of the intermediate surface & Motherboard below!
    keyboard.rotation.x = spread * 0.08 * (1 - activeLowerReveal) - activeLowerReveal * 0.15 + smoothEndCenter * 0.10;

    // Intermediate Surface between Keyboard and Motherboard separates into the middle gap and tilts cleanly
    midSurface.position.set(
      0,
      spread * 0.40 + activeLowerReveal * 0.22,
      -activeLowerReveal * 0.06
    );
    midSurface.rotation.x = -activeLowerReveal * 0.08;

    // Dramatic Keycap Wave Cascade (follows dome arc + shows off key outlines and imprinted letters!)
    const keyCascadeProgress = Math.max(0, Math.min(1, (progress - 0.13) / 0.35));
    cascadeKeys.forEach(({ mesh, baseX, baseY, baseZ, wavePhase }) => {
      const localWave = Math.max(0, Math.min(1, (keyCascadeProgress * 1.6) - wavePhase * 0.6));
      const smoothWave = Math.sin(localWave * Math.PI * 0.5);
      mesh.position.set(baseX, baseY + smoothWave * 0.20, baseZ);
    });

    // Touchpad stays attached to the front palmrest of the keyboard
    touchpad.position.set(0, smoothEndCenter * 0.045, smoothEndCenter * 0.06);

    // Motherboard sits with wide vertical separation below midSurface and tilts slightly toward the camera (+0.12 rad)
    // so the CPU/GPU dies, copper heatpipes, dual spinning fans, VRM bank, and gold traces get full visual recognition!
    motherboard.position.set(0, -0.02 + spread * 0.08 - activeLowerReveal * 0.04, 0);
    motherboard.rotation.x = activeLowerReveal * 0.12;

    // RAM Sticks eject outward from the Motherboard slots and match the Motherboard showcase tilt
    const ramOut = Math.max(0, Math.min(1, (progress - 0.16) / 0.48));
    ram.position.set(0, -0.02 + spread * 0.08 - activeLowerReveal * 0.04, 0);
    ram.rotation.x = activeLowerReveal * 0.12;
    ramL.position.set(-0.62 - ramOut * 0.96, 0, 0.24);
    ramR.position.set(0.62 + ramOut * 0.96, 0, 0.24);

    // Storage & Lower Unibody separate further down (-0.34 * spread - 0.16 * activeLowerReveal = -0.50) and tilt toward camera
    storage.position.set(0, -spread * 0.34 - activeLowerReveal * 0.16, 0);
    storage.rotation.x = activeLowerReveal * 0.14;
    ssd1.position.set(-0.64 - spread * 0.14, -0.01 + spread * 0.18, 0.38 + spread * 0.18);
    ssd2.position.set(0.64 + spread * 0.14, -0.01 + spread * 0.18, 0.38 + spread * 0.18);

    // Keep laptop well inside the left viewport (-1.02) and balanced vertically
    root.position.x = -1.02 * smoothLeft * (1 - smoothEndCenter);
    root.position.y = -0.34 + spread * 0.24 - smoothEndCenter * 0.16;

    // Tilt 2x more downward than v12's step from v10:
    // (v10 reached -0.06 rad; v12 added +0.08 rad -> +0.02 rad; now 2x more (+0.16 rad more) -> +0.18 rad!)
    root.rotation.x = 0.24 - spread * 0.06 + smoothEndCenter * 0.14;

    // Continuous Yaw Rotation from Right (+0.96 rad) to Left (-0.86 rad), easing to center at final touchpad stage
    const mainYaw = 0.96 - progress * 1.82;
    root.rotation.y = mainYaw * (1 - smoothEndCenter * 0.72);

    if (hexAccent) accentLight.color.set(hexAccent);

    Object.entries(allParts).forEach(([key, group]) => {
      const isFocused = (smoothEndCenter > 0.45 && key === 'touchpad') || (leftShift >= 0.8 && smoothEndCenter <= 0.45 && key === activeKey);
      const lines = partEdgeLines[key] || [];
      lines.forEach((lMat) => {
        if (lMat === keyOutlineMat) {
          lMat.color.set(isFocused ? (hexAccent || '#10b981') : '#94a3b8');
          lMat.opacity = isFocused ? 0.92 : 0.58;
        } else {
          lMat.color.set(isFocused ? (hexAccent || '#38bdf8') : '#cbd5e1');
          lMat.opacity = isFocused ? 1.0 : 0.72;
        }
      });
    });
  }

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

    if (fanL.userData.rotor) fanL.userData.rotor.rotation.y += 0.038;
    if (fanR.userData.rotor) fanR.userData.rotor.rotation.y -= 0.038;

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
