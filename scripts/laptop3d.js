export function initLaptop3D(canvas, onTouchpadClick, onPartHover, onScreenProjectUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.55, 6.2);
  camera.lookAt(0, 0.12, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;

  // Directional Studio Lighting for Deep Matte Finish + Crisp 3D Silhouette
  const ambient = new THREE.AmbientLight(0xffffff, 0.9);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
  keyLight.position.set(4, 7, 6);
  const rimLight = new THREE.DirectionalLight(0x94a3b8, 1.7);
  rimLight.position.set(-5, 4, -4);
  const bottomFill = new THREE.DirectionalLight(0x475569, 1.0);
  bottomFill.position.set(0, -5, 4);
  const accentLight = new THREE.PointLight(0x38bdf8, 1.8, 16);
  accentLight.position.set(-2.0, 2.2, 4.2);
  scene.add(ambient, keyLight, rimLight, bottomFill, accentLight);

  const root = new THREE.Group();
  root.position.set(0, -0.08, 0);
  root.rotation.set(0.24, 0.28, 0);
  scene.add(root);

  // Darker, Deep Matte Stealth Carbon / Obsidian Materials (High Roughness, Low Metalness)
  const matOuterChassis = new THREE.MeshStandardMaterial({ color: 0x161820, metalness: 0.22, roughness: 0.82 });
  const matBezel = new THREE.MeshStandardMaterial({ color: 0x0d0f14, metalness: 0.15, roughness: 0.85 });
  const matScreenPanel = new THREE.MeshStandardMaterial({ color: 0x0b101d, emissive: 0x172554, emissiveIntensity: 0.45, roughness: 0.35 });
  const matMotherboardPcb = new THREE.MeshStandardMaterial({ color: 0x11141c, metalness: 0.25, roughness: 0.78 });
  const matCpuPackage = new THREE.MeshStandardMaterial({ color: 0x262b38, emissive: 0x1e293b, emissiveIntensity: 0.3, metalness: 0.45, roughness: 0.55 });
  const matCopperPipe = new THREE.MeshStandardMaterial({ color: 0x92400e, emissive: 0x451a03, emissiveIntensity: 0.2, metalness: 0.55, roughness: 0.48 });
  const matGoldContacts = new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0x92400e, emissiveIntensity: 0.25, metalness: 0.65, roughness: 0.4 });
  const matKeyDeck = new THREE.MeshStandardMaterial({ color: 0x141720, metalness: 0.2, roughness: 0.84 });
  const matKeyCap = new THREE.MeshStandardMaterial({ color: 0x0c0e14, metalness: 0.12, roughness: 0.88 });
  const matRamSpreader = new THREE.MeshStandardMaterial({ color: 0x181c26, emissive: 0x0f172a, emissiveIntensity: 0.25, metalness: 0.35, roughness: 0.72 });
  const matRamChip = new THREE.MeshStandardMaterial({ color: 0x0b0d12, metalness: 0.2, roughness: 0.82 });
  const matStoragePcb = new THREE.MeshStandardMaterial({ color: 0x131722, metalness: 0.28, roughness: 0.76 });
  const matStorageSink = new THREE.MeshStandardMaterial({ color: 0x1f2433, metalness: 0.38, roughness: 0.68 });
  const matTouchpadSurface = new THREE.MeshStandardMaterial({ color: 0x171a24, emissive: 0x1e293b, emissiveIntensity: 0.32, roughness: 0.65, metalness: 0.25 });

  const pickableMeshes = [];
  const partEdgeLines = {};

  // Sharper, Higher-Contrast Edge Outlines so Every Part Looks Strongly 3D
  function addCrispEdges(mesh, partKey, edgeColor = 0xcbd5e1, opacity = 0.88) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineMat = new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity });
    const line = new THREE.LineSegments(edges, lineMat);
    mesh.add(line);
    if (!partEdgeLines[partKey]) partEdgeLines[partKey] = [];
    partEdgeLines[partKey].push(lineMat);
  }

  // =========================================================================
  // 1. DISPLAY (Mathematically Flush-Closed at progress = 0: rests at y = 0.00)
  // =========================================================================
  const display = new THREE.Group();
  // Rear hinge pivot sits on the exact top-rear edge of the base (y = 0.00, z = -1.00)
  display.position.set(0, 0.00, -1.00);

  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 2.00, 0.06), matOuterChassis);
  // Offset z = -0.03 so when rotated +90 deg (Math.PI / 2), bottom face rests flush at y = 0.00!
  lidMesh.position.set(0, 1.00, -0.03);
  addCrispEdges(lidMesh, 'display', 0xe2e8f0, 0.92);

  const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.94, 1.88), matBezel);
  bezelMesh.position.set(0, 1.00, 0.002);

  const lcdMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.78, 1.70), matScreenPanel);
  lcdMesh.position.set(0, 1.00, 0.004);
  addCrispEdges(lcdMesh, 'display', 0x94a3b8, 0.75);

  const uiBarMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.38 });
  for (let i = 0; i < 5; i++) {
    const barW = 0.8 + (i % 3) * 0.45;
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(barW, 0.042), uiBarMat);
    bar.position.set(-1.1 + barW / 2, 1.44 - i * 0.16, 0.006);
    display.add(bar);
  }

  const hingeL = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 16), matOuterChassis);
  hingeL.rotation.z = Math.PI / 2;
  hingeL.position.set(-0.85, 0, -0.03);
  addCrispEdges(hingeL, 'display', 0x94a3b8, 0.7);
  const hingeR = hingeL.clone();
  hingeR.position.set(0.85, 0, -0.03);

  const displayAnchor = new THREE.Object3D();
  displayAnchor.position.set(0, 1.00, 0.01);
  display.add(lidMesh, bezelMesh, lcdMesh, hingeL, hingeR, displayAnchor);

  // =========================================================================
  // 2. MOTHERBOARD (Embedded Flat PCB Line Wiring + Dual Spinning Fans + VRM — No 3D Tube Wires)
  // =========================================================================
  const motherboard = new THREE.Group();
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.64, 0.045, 1.58), matMotherboardPcb);
  addCrispEdges(pcb, 'motherboard', 0xcbd5e1, 0.92);
  motherboard.add(pcb);

  const cpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.055, 0.76), matOuterChassis);
  cpuSocket.position.set(0, 0.025, -0.08);
  addCrispEdges(cpuSocket, 'motherboard', 0x94a3b8, 0.8);
  const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.075, 0.54), matCpuPackage);
  cpuDie.position.set(0, 0.04, -0.08);
  addCrispEdges(cpuDie, 'motherboard', 0xf8fafc, 0.96);
  motherboard.add(cpuSocket, cpuDie);

  const pipe1 = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.028, 0.11), matCopperPipe);
  pipe1.position.set(0, 0.048, -0.42);
  const pipe2 = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.028, 0.08), matCopperPipe);
  pipe2.position.set(0, 0.048, -0.26);
  addCrispEdges(pipe1, 'motherboard', 0xf59e0b, 0.85);
  addCrispEdges(pipe2, 'motherboard', 0xf59e0b, 0.75);
  motherboard.add(pipe1, pipe2);

  // Dual Multi-Blade Cooling Fans (Kept and highlighted with crisp outlines)
  function createCoolingFan(xPos) {
    const fanGroup = new THREE.Group();
    fanGroup.position.set(xPos, 0.036, -0.38);
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.048, 24), matOuterChassis);
    addCrispEdges(shroud, 'motherboard', 0xe2e8f0, 0.9);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.058, 16), matCpuPackage);
    addCrispEdges(hub, 'motherboard', 0xcbd5e1, 0.85);
    fanGroup.add(shroud, hub);
    for (let b = 0; b < 8; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.032, 0.032), matKeyCap);
      const angle = (b / 8) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.18, 0.012, Math.sin(angle) * 0.18);
      blade.rotation.y = -angle + 0.4;
      addCrispEdges(blade, 'motherboard', 0x94a3b8, 0.65);
      fanGroup.add(blade);
    }
    return fanGroup;
  }
  const fanL = createCoolingFan(-0.82);
  const fanR = createCoolingFan(0.82);
  motherboard.add(fanL, fanR);

  for (let v = 0; v < 6; v++) {
    const vrm = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.06, 0.11), matStorageSink);
    vrm.position.set(-0.38 + v * 0.15, 0.035, -0.62);
    addCrispEdges(vrm, 'motherboard', 0xcbd5e1, 0.8);
    motherboard.add(vrm);
  }
  for (let c = 0; c < 5; c++) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.06, 12), matGoldContacts);
    cap.position.set(-1.12, 0.035, -0.2 + c * 0.16);
    addCrispEdges(cap, 'motherboard', 0xf59e0b, 0.75);
    motherboard.add(cap);
  }

  // Embedded Flat PCB Line Wiring Traces Coming Out of the Logic Core on the Motherboard
  const tracePoints = [];
  const traceCoords = [
    [-1.15, 0.026, 0.56, -0.38, 0.026, 0.56],
    [-0.38, 0.026, 0.56, -0.14, 0.026, 0.24],
    [1.15, 0.026, 0.56, 0.38, 0.026, 0.56],
    [0.38, 0.026, 0.56, 0.14, 0.026, 0.24],
    [-1.05, 0.026, 0.42, -0.32, 0.026, 0.42],
    [-0.32, 0.026, 0.42, -0.08, 0.026, 0.22],
    [1.05, 0.026, 0.42, 0.32, 0.026, 0.42],
    [0.32, 0.026, 0.42, 0.08, 0.026, 0.22],
    [-0.95, 0.026, 0.28, -0.35, 0.026, 0.28],
    [0.95, 0.026, 0.28, 0.35, 0.026, 0.28],
    [-0.32, 0.026, 0.68, 0.32, 0.026, 0.68],
    [-0.62, 0.026, -0.08, -0.38, 0.026, -0.08],
    [0.38, 0.026, -0.08, 0.62, 0.026, -0.08],
    [0, 0.026, 0.24, 0, 0.026, 0.72],
    [-0.18, 0.026, -0.46, -0.18, 0.026, -0.72],
    [0.18, 0.026, -0.46, 0.18, 0.026, -0.72]
  ];
  traceCoords.forEach(([x1, y1, z1, x2, y2, z2]) => {
    tracePoints.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
  });
  const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePoints);
  const traceMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.88 });
  motherboard.add(new THREE.LineSegments(traceGeo, traceMat));

  const motherboardAnchor = new THREE.Object3D();
  motherboardAnchor.position.set(0, 0.05, 0);
  motherboard.add(motherboardAnchor);

  // =========================================================================
  // 3. KEYBOARD (With Futuristic Curved Dome Keycap Pop-Out During Disassembly!)
  // =========================================================================
  const keyboard = new THREE.Group();
  const deckPlate = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.03, 1.18), matKeyDeck);
  deckPlate.position.set(0, 0.02, -0.14);
  addCrispEdges(deckPlate, 'keyboard', 0xcbd5e1, 0.9);
  keyboard.add(deckPlate);

  const domeKeys = [];
  const rows = 4;
  const cols = 11;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.185, 0.036, 0.185), matKeyCap);
      const baseX = -1.0 + c * 0.2;
      const baseY = 0.042;
      const baseZ = -0.50 + r * 0.24;
      key.position.set(baseX, baseY, baseZ);
      addCrispEdges(key, 'keyboard', 0x94a3b8, 0.78);
      keyboard.add(key);

      // Normalized (-1..1) coordinates for curved dome elevation & outward fan
      const nx = (c - (cols - 1) / 2) / ((cols - 1) / 2);
      const nz = (r - (rows - 1) / 2) / ((rows - 1) / 2);
      const domeHeight = Math.max(0, 1 - (nx * nx * 0.62 + nz * nz * 0.62));
      domeKeys.push({ mesh: key, baseX, baseY, baseZ, nx, nz, domeHeight });
    }
  }
  const keyboardAnchor = new THREE.Object3D();
  keyboardAnchor.position.set(0, 0.18, -0.14);
  keyboard.add(keyboardAnchor);

  // =========================================================================
  // 4. RAM STICKS (Dual DDR5 Modules that Visibly Slide Out While Scrolling)
  // =========================================================================
  const ram = new THREE.Group();
  function createRamStick(side) {
    const stickGroup = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.038, 0.32), matRamSpreader);
    addCrispEdges(board, 'ram', 0xf59e0b, 0.92);
    stickGroup.add(board);

    const goldStrip = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.04, 0.045), matGoldContacts);
    goldStrip.position.set(0, 0, side > 0 ? -0.145 : 0.145);
    stickGroup.add(goldStrip);

    for (let m = 0; m < 4; m++) {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, 0.16), matRamChip);
      chip.position.set(-0.255 + m * 0.17, 0.008, 0);
      addCrispEdges(chip, 'ram', 0xcbd5e1, 0.85);
      stickGroup.add(chip);
    }
    return stickGroup;
  }
  const ramL = createRamStick(-1);
  const ramR = createRamStick(1);
  ramL.position.set(-0.62, 0.02, 0.22);
  ramR.position.set(0.62, 0.02, 0.22);

  const ramAnchor = new THREE.Object3D();
  ramAnchor.position.set(0, 0.04, 0);
  ramR.add(ramAnchor);
  ram.add(ramL, ramR);

  // =========================================================================
  // 5. STORAGE (NVMe M.2 Solid-State Array & Lower Unibody Base)
  // =========================================================================
  const storage = new THREE.Group();
  // Top face of baseMesh sits at y = 0.00 so closed lid at y = 0.00 seals 100% flush!
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.11, 2.00), matOuterChassis);
  baseMesh.position.set(0, -0.055, 0);
  addCrispEdges(baseMesh, 'storage', 0xe2e8f0, 0.92);

  function createNvmeSsd(xOffset) {
    const ssdGroup = new THREE.Group();
    ssdGroup.position.set(xOffset, -0.03, 0.38);
    const ssdPcb = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.04, 0.42), matStoragePcb);
    addCrispEdges(ssdPcb, 'storage', 0x818cf8, 0.92);
    const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.06, 0.36), matStorageSink);
    heatsink.position.set(-0.06, 0.015, 0);
    addCrispEdges(heatsink, 'storage', 0xe2e8f0, 0.9);
    const connector = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.042, 0.34), matGoldContacts);
    connector.position.set(0.48, 0, 0);
    ssdGroup.add(ssdPcb, heatsink, connector);
    return ssdGroup;
  }
  const ssd1 = createNvmeSsd(-0.64);
  const ssd2 = createNvmeSsd(0.64);
  const storageAnchor = new THREE.Object3D();
  storageAnchor.position.set(0, 0.02, 0.38);
  storage.add(baseMesh, ssd1, ssd2, storageAnchor);

  // =========================================================================
  // 6. TOUCHPAD (Detaches Forward in Unobstructed Front View with Download CV Button)
  // =========================================================================
  const touchpad = new THREE.Group();
  const padRim = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.036, 0.66),
    new THREE.MeshStandardMaterial({ color: 0x262b38, metalness: 0.35, roughness: 0.68 })
  );
  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.042, 0.60), matTouchpadSurface);
  padRim.position.set(0, 0.02, 0.60);
  padMesh.position.set(0, 0.024, 0.60);
  addCrispEdges(padMesh, 'touchpad', 0xf472b6, 0.95);
  padMesh.userData.isTouchpad = true;
  const touchpadAnchor = new THREE.Object3D();
  touchpadAnchor.position.set(0, 0.04, 0.60);
  touchpad.add(padRim, padMesh, touchpadAnchor);

  const parts = { display, motherboard, keyboard, ram, touchpad, storage };
  const anchors = {
    display: displayAnchor,
    motherboard: motherboardAnchor,
    keyboard: keyboardAnchor,
    ram: ramAnchor,
    touchpad: touchpadAnchor,
    storage: storageAnchor
  };

  const partLabels = {
    display: "Display",
    motherboard: "Motherboard",
    keyboard: "Keyboard",
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

  // Start 100% flush-closed with internal boards tucked inside the sealed clamshell
  display.rotation.x = Math.PI / 2;
  motherboard.visible = false;
  keyboard.visible = false;
  ram.visible = false;
  touchpad.visible = false;
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

    // Phase 1 (0.00 -> 0.11): Lid opens cleanly from 100% flush-closed (Math.PI / 2) to open angle (-0.22)
    const openRatio = Math.min(1, progress / 0.11);
    const smoothOpen = 1 - Math.pow(1 - openRatio, 2.4);
    const closedAngle = Math.PI / 2;
    const openAngle = -0.22;

    // Reveal internal assemblies only once the lid has hinged open enough (openRatio > 0.12) so nothing ever pokes through when closed!
    const showInternals = openRatio > 0.12;
    motherboard.visible = showInternals;
    keyboard.visible = showInternals;
    ram.visible = showInternals;
    touchpad.visible = showInternals;
    ssd1.visible = showInternals;
    ssd2.visible = showInternals;

    // Phase 2 (0.08 -> 0.78): Disassembly spread
    const rawSpread = Math.max(0, Math.min(1, (progress - 0.08) / 0.70));
    const spread = 1 - Math.pow(1 - rawSpread, 1.8);

    // Smooth shift to the left as About Me arrives
    const leftShift = Math.max(0, Math.min(1, (progress - 0.04) / 0.10));
    const smoothLeft = 1 - Math.pow(1 - leftShift, 2.2);

    // Phase 3 (progress >= 0.79): Touchpad detaches forward in front view
    const touchpadDetach = Math.max(0, Math.min(1, (progress - 0.79) / 0.18));

    // Display hinges open from (0, 0.00, -1.00) and then rises smoothly
    display.position.set(0, spread * 1.18, -1.00 - spread * 0.38);
    display.rotation.x = closedAngle * (1 - smoothOpen) + (openAngle - spread * 0.14) * smoothOpen;

    // Keyboard Deck & Futuristic Curved Dome Keycap Pop-Out
    keyboard.position.set(0, spread * 0.62, spread * 0.08);
    const keyDomeFactor = Math.max(0, Math.min(1, (progress - 0.12) / 0.45));
    domeKeys.forEach(({ mesh, baseX, baseY, baseZ, nx, nz, domeHeight }) => {
      mesh.position.set(
        baseX + nx * keyDomeFactor * 0.15,
        baseY + keyDomeFactor * (0.08 + domeHeight * 0.28),
        baseZ + nz * keyDomeFactor * 0.11
      );
      mesh.rotation.x = -nz * keyDomeFactor * 0.22;
      mesh.rotation.z = nx * keyDomeFactor * 0.18;
    });

    // Motherboard stays cleanly separated in the center plane
    motherboard.position.set(0, spread * 0.12, 0);

    // RAM Sticks slide/eject outward from the motherboard slots
    const ramOut = Math.max(0, Math.min(1, (progress - 0.12) / 0.52));
    ramL.position.set(-0.62 - ramOut * 1.18, 0.02 + spread * 0.34, 0.22 + ramOut * 0.22);
    ramR.position.set(0.62 + ramOut * 1.18, 0.02 + spread * 0.34, 0.22 + ramOut * 0.22);
    ramL.rotation.z = ramOut * 0.12;
    ramR.rotation.z = -ramOut * 0.12;

    // Storage & Lower Chassis separate downward
    storage.position.set(0, -spread * 0.58, 0);
    ssd1.position.y = -0.03 + spread * 0.24;
    ssd2.position.y = -0.03 + spread * 0.24;

    // Touchpad stays front-and-center and detaches forward toward camera at completion
    touchpad.position.set(
      touchpadDetach * 0.32,
      spread * 0.28 + touchpadDetach * 0.08,
      spread * 0.72 + touchpadDetach * 1.05
    );
    touchpad.rotation.x = touchpadDetach * 0.28;

    root.position.x = -1.32 * smoothLeft + touchpadDetach * 0.85;
    root.position.y = -0.12;
    root.rotation.y = 0.28 - Math.sin(progress * Math.PI) * 0.48 + touchpadDetach * 0.12;
    root.rotation.x = 0.24 + spread * 0.08;

    if (hexAccent) accentLight.color.set(hexAccent);

    Object.entries(parts).forEach(([key, group]) => {
      const isFocused = (touchpadDetach > 0.45 && key === 'touchpad') || (leftShift >= 0.8 && touchpadDetach <= 0.45 && key === activeKey);
      group.scale.setScalar(isFocused ? 1.07 : 0.99);
      const lines = partEdgeLines[key] || [];
      lines.forEach((lMat) => {
        lMat.color.set(isFocused ? (hexAccent || '#38bdf8') : '#cbd5e1');
        lMat.opacity = isFocused ? 1.0 : 0.78;
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
    fanL.rotation.y += 0.028;
    fanR.rotation.y -= 0.028;

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
