export function initLaptop3D(canvas, onTouchpadClick, onPartHover, onScreenProjectUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.55, 6.2);
  camera.lookAt(0, 0.15, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;

  // Studio Multi-Point Lighting for Sleek Black-Grey / Brushed Gunmetal Contrast
  const ambient = new THREE.AmbientLight(0xffffff, 0.98);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
  keyLight.position.set(4, 7, 6);
  const rimLight = new THREE.DirectionalLight(0x94a3b8, 1.85);
  rimLight.position.set(-5, 4, -4);
  const bottomFill = new THREE.DirectionalLight(0x64748b, 1.15);
  bottomFill.position.set(0, -5, 4);
  const accentLight = new THREE.PointLight(0x38bdf8, 1.9, 16);
  accentLight.position.set(-2.0, 2.2, 4.2);
  scene.add(ambient, keyLight, rimLight, bottomFill, accentLight);

  const root = new THREE.Group();
  root.position.set(0, -0.1, 0);
  root.rotation.set(0.24, 0.28, 0);
  scene.add(root);

  // Materials
  const matOuterChassis = new THREE.MeshStandardMaterial({ color: 0x303440, metalness: 0.76, roughness: 0.24 });
  const matBezel = new THREE.MeshStandardMaterial({ color: 0x12141c, metalness: 0.4, roughness: 0.2 });
  const matScreenPanel = new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: 0x1e293b, emissiveIntensity: 0.55, roughness: 0.12 });
  const matMotherboardPcb = new THREE.MeshStandardMaterial({ color: 0x1c212b, metalness: 0.55, roughness: 0.34 });
  const matCpuPackage = new THREE.MeshStandardMaterial({ color: 0x646d80, emissive: 0x475569, emissiveIntensity: 0.35, metalness: 0.88, roughness: 0.16 });
  const matCopperPipe = new THREE.MeshStandardMaterial({ color: 0xb45309, emissive: 0x78350f, emissiveIntensity: 0.22, metalness: 0.85, roughness: 0.2 });
  const matGoldContacts = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.3, metalness: 0.9, roughness: 0.18 });
  const matKeyDeck = new THREE.MeshStandardMaterial({ color: 0x262a35, metalness: 0.68, roughness: 0.3 });
  const matKeyCap = new THREE.MeshStandardMaterial({ color: 0x14161d, roughness: 0.38 });
  const matRamSpreader = new THREE.MeshStandardMaterial({ color: 0x282d3a, emissive: 0x1e293b, emissiveIntensity: 0.3, metalness: 0.8, roughness: 0.22 });
  const matRamChip = new THREE.MeshStandardMaterial({ color: 0x111318, metalness: 0.5, roughness: 0.3 });
  const matStoragePcb = new THREE.MeshStandardMaterial({ color: 0x1e2433, metalness: 0.65, roughness: 0.28 });
  const matStorageSink = new THREE.MeshStandardMaterial({ color: 0x3b4254, metalness: 0.82, roughness: 0.2 });
  const matTouchpadSurface = new THREE.MeshStandardMaterial({ color: 0x262b38, emissive: 0x334155, emissiveIntensity: 0.4, roughness: 0.14, metalness: 0.62 });

  const pickableMeshes = [];
  const partEdgeLines = {};

  function addCrispEdges(mesh, partKey, edgeColor = 0x8b95a9, opacity = 0.65) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineMat = new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity });
    const line = new THREE.LineSegments(edges, lineMat);
    mesh.add(line);
    if (!partEdgeLines[partKey]) partEdgeLines[partKey] = [];
    partEdgeLines[partKey].push(lineMat);
  }

  // =========================================================================
  // 1. DISPLAY (Pivots from rear hinge so it starts 100% CLOSED flat at progress = 0)
  // =========================================================================
  const display = new THREE.Group();
  // Rear hinge pivot at y = 0.14, z = -0.98
  display.position.set(0, 0.14, -0.98);

  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 1.96, 0.065), matOuterChassis);
  lidMesh.position.set(0, 0.98, 0);
  addCrispEdges(lidMesh, 'display', 0x94a3b8, 0.8);

  const bezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.94, 1.86), matBezel);
  bezelMesh.position.set(0, 0.98, 0.034);

  const lcdMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.78, 1.68), matScreenPanel);
  lcdMesh.position.set(0, 0.98, 0.036);
  addCrispEdges(lcdMesh, 'display', 0x64748b, 0.55);

  // Subtle glowing code/UI bars on the screen
  const uiBarMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 });
  for (let i = 0; i < 5; i++) {
    const barW = 0.8 + (i % 3) * 0.45;
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(barW, 0.045), uiBarMat);
    bar.position.set(-1.1 + barW / 2, 1.42 - i * 0.16, 0.038);
    display.add(bar);
  }

  const hingeL = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.45, 16), matOuterChassis);
  hingeL.rotation.z = Math.PI / 2;
  hingeL.position.set(-0.85, 0, 0);
  const hingeR = hingeL.clone();
  hingeR.position.set(0.85, 0, 0);

  const displayAnchor = new THREE.Object3D();
  displayAnchor.position.set(0, 0.98, 0.04);
  display.add(lidMesh, bezelMesh, lcdMesh, hingeL, hingeR, displayAnchor);

  // =========================================================================
  // 2. MOTHERBOARD (Complex PCB + Gold Wiring Traces + Braided Wires + Dual Fans + VRM)
  // =========================================================================
  const motherboard = new THREE.Group();
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.64, 0.055, 1.58), matMotherboardPcb);
  addCrispEdges(pcb, 'motherboard', 0x94a3b8, 0.82);
  motherboard.add(pcb);

  // CPU Socket & Die
  const cpuSocket = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.07, 0.76), matOuterChassis);
  cpuSocket.position.set(0, 0.035, -0.08);
  const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.1, 0.54), matCpuPackage);
  cpuDie.position.set(0, 0.055, -0.08);
  addCrispEdges(cpuDie, 'motherboard', 0xcbd5e1, 0.92);
  motherboard.add(cpuSocket, cpuDie);

  // Twin Copper Heatpipes
  const pipe1 = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.035, 0.11), matCopperPipe);
  pipe1.position.set(0, 0.065, -0.42);
  const pipe2 = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.035, 0.08), matCopperPipe);
  pipe2.position.set(0, 0.065, -0.26);
  addCrispEdges(pipe1, 'motherboard', 0xf59e0b, 0.75);
  motherboard.add(pipe1, pipe2);

  // Dual Multi-Blade Cooling Fans
  function createCoolingFan(xPos) {
    const fanGroup = new THREE.Group();
    fanGroup.position.set(xPos, 0.045, -0.38);
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.06, 24), matOuterChassis);
    addCrispEdges(shroud, 'motherboard', 0x94a3b8, 0.7);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.075, 16), matCpuPackage);
    fanGroup.add(shroud, hub);
    for (let b = 0; b < 8; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.035), matKeyCap);
      const angle = (b / 8) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.18, 0.02, Math.sin(angle) * 0.18);
      blade.rotation.y = -angle + 0.4;
      fanGroup.add(blade);
    }
    return fanGroup;
  }
  const fanL = createCoolingFan(-0.82);
  const fanR = createCoolingFan(0.82);
  motherboard.add(fanL, fanR);

  // VRM Choke Coils & Capacitors Array
  for (let v = 0; v < 6; v++) {
    const vrm = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 0.11), matStorageSink);
    vrm.position.set(-0.38 + v * 0.15, 0.045, -0.62);
    addCrispEdges(vrm, 'motherboard', 0x94a3b8, 0.6);
    motherboard.add(vrm);
  }
  for (let c = 0; c < 5; c++) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.085, 12), matGoldContacts);
    cap.position.set(-1.12, 0.045, -0.2 + c * 0.16);
    motherboard.add(cap);
  }

  // Gold & Copper PCB Circuit Traces + 3D Wiring Harness on Motherboard
  const tracePoints = [];
  const traceCoords = [
    [-1.1, 0.032, 0.55, -0.4, 0.032, 0.55],
    [-0.4, 0.032, 0.55, -0.15, 0.032, 0.25],
    [1.1, 0.032, 0.55, 0.4, 0.032, 0.55],
    [0.4, 0.032, 0.55, 0.15, 0.032, 0.25],
    [-0.95, 0.032, 0.35, -0.35, 0.032, 0.35],
    [0.95, 0.032, 0.35, 0.35, 0.032, 0.35],
    [-0.25, 0.032, 0.68, 0.25, 0.032, 0.68],
    [-0.6, 0.032, -0.08, -0.38, 0.032, -0.08],
    [0.38, 0.032, -0.08, 0.6, 0.032, -0.08]
  ];
  traceCoords.forEach(([x1, y1, z1, x2, y2, z2]) => {
    tracePoints.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
  });
  const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePoints);
  const traceMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.78 });
  motherboard.add(new THREE.LineSegments(traceGeo, traceMat));

  // 3D Arched Wiring Cables connecting motherboard subsystems
  function addWireArc(p1, p2, midHeight, hexColor) {
    const mid = new THREE.Vector3((p1.x + p2.x) * 0.5, midHeight, (p1.z + p2.z) * 0.5);
    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.016, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({ color: hexColor, metalness: 0.5, roughness: 0.3 });
    motherboard.add(new THREE.Mesh(tubeGeo, tubeMat));
  }
  addWireArc(new THREE.Vector3(-1.1, 0.04, 0.45), new THREE.Vector3(-0.35, 0.05, -0.05), 0.16, 0x38bdf8);
  addWireArc(new THREE.Vector3(-1.05, 0.04, 0.52), new THREE.Vector3(-0.35, 0.05, 0.02), 0.14, 0xf59e0b);
  addWireArc(new THREE.Vector3(1.1, 0.04, 0.45), new THREE.Vector3(0.35, 0.05, -0.05), 0.16, 0xa855f7);
  addWireArc(new THREE.Vector3(1.05, 0.04, 0.52), new THREE.Vector3(0.35, 0.05, 0.02), 0.14, 0x10b981);

  const motherboardAnchor = new THREE.Object3D();
  motherboardAnchor.position.set(0, 0.07, 0);
  motherboard.add(motherboardAnchor);

  // =========================================================================
  // 3. KEYBOARD (Technical Skills)
  // =========================================================================
  const keyboard = new THREE.Group();
  const deckPlate = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.038, 1.18), matKeyDeck);
  deckPlate.position.set(0, 0.08, -0.14);
  addCrispEdges(deckPlate, 'keyboard', 0x94a3b8, 0.78);
  keyboard.add(deckPlate);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 11; c++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.05, 0.19), matKeyCap);
      key.position.set(-1.0 + c * 0.2, 0.115, -0.52 + r * 0.24);
      addCrispEdges(key, 'keyboard', 0x64748b, 0.45);
      keyboard.add(key);
    }
  }
  const keyboardAnchor = new THREE.Object3D();
  keyboardAnchor.position.set(0, 0.12, -0.14);
  keyboard.add(keyboardAnchor);

  // =========================================================================
  // 4. RAM STICKS (Dual DDR5 Modules that Visibly Slide/Eject Out While Scrolling!)
  // =========================================================================
  const ram = new THREE.Group();
  function createRamStick(side) {
    const stickGroup = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.045, 0.32), matRamSpreader);
    addCrispEdges(board, 'ram', 0xf59e0b, 0.85);
    stickGroup.add(board);

    // Gold Edge Connector Pins
    const goldStrip = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.048, 0.045), matGoldContacts);
    goldStrip.position.set(0, 0, side > 0 ? -0.145 : 0.145);
    stickGroup.add(goldStrip);

    // 4 Memory IC Packages per stick
    for (let m = 0; m < 4; m++) {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.06, 0.16), matRamChip);
      chip.position.set(-0.255 + m * 0.17, 0.01, 0);
      addCrispEdges(chip, 'ram', 0x94a3b8, 0.7);
      stickGroup.add(chip);
    }
    return stickGroup;
  }
  const ramL = createRamStick(-1);
  const ramR = createRamStick(1);
  ramL.position.set(-0.62, 0.055, 0.22);
  ramR.position.set(0.62, 0.055, 0.22);

  const ramAnchor = new THREE.Object3D();
  ramAnchor.position.set(0, 0.05, 0);
  ramR.add(ramAnchor);
  ram.add(ramL, ramR);

  // =========================================================================
  // 5. STORAGE (NVMe M.2 Solid-State Array & Lower Unibody Base)
  // =========================================================================
  const storage = new THREE.Group();
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.11, 2.02), matOuterChassis);
  baseMesh.position.y = -0.14;
  addCrispEdges(baseMesh, 'storage', 0x94a3b8, 0.72);

  // Dual NVMe M.2 SSD Modules with Finned Heatsinks & NAND Chips
  function createNvmeSsd(xOffset) {
    const ssdGroup = new THREE.Group();
    ssdGroup.position.set(xOffset, -0.02, 0.38);
    const ssdPcb = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.05, 0.42), matStoragePcb);
    addCrispEdges(ssdPcb, 'storage', 0x818cf8, 0.85);
    const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.075, 0.36), matStorageSink);
    heatsink.position.set(-0.06, 0.02, 0);
    addCrispEdges(heatsink, 'storage', 0xcbd5e1, 0.8);
    const connector = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.052, 0.34), matGoldContacts);
    connector.position.set(0.48, 0, 0);
    ssdGroup.add(ssdPcb, heatsink, connector);
    return ssdGroup;
  }
  const ssd1 = createNvmeSsd(-0.64);
  const ssd2 = createNvmeSsd(0.64);
  const storageAnchor = new THREE.Object3D();
  storageAnchor.position.set(0, 0.04, 0.38);
  storage.add(baseMesh, ssd1, ssd2, storageAnchor);

  // =========================================================================
  // 6. TOUCHPAD (Detaches Forward in Unobstructed Front View with Download CV Button)
  // =========================================================================
  const touchpad = new THREE.Group();
  const padRim = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.045, 0.68),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.82, roughness: 0.2 })
  );
  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.055, 0.62), matTouchpadSurface);
  padRim.position.set(0, 0.1, 0.62);
  padMesh.position.set(0, 0.105, 0.62);
  addCrispEdges(padMesh, 'touchpad', 0xf472b6, 0.9);
  padMesh.userData.isTouchpad = true;
  const touchpadAnchor = new THREE.Object3D();
  touchpadAnchor.position.set(0, 0.12, 0.62);
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

  // Initialize in closed state at progress = 0
  display.rotation.x = Math.PI / 2;

  // Strictly Scoped Raycaster on #laptop-canvas Only
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);
  let currentActiveKey = 'display';
  let currentProgress = 0;

  function clearHover() {
    canvas.style.cursor = 'default';
    if (onPartHover) onPartHover(null, 0, 0);
  }

  canvas.addEventListener('pointermove', (e) => {
    if (e.target !== canvas || currentProgress <= 0.005 || currentProgress >= 0.995) {
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

    const hits = raycaster.intersectObjects(pickableMeshes, false);
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

  // Disassembly Choreography:
  // 1. Starts 100% CLOSED flat in the center (progress = 0)
  // 2. Opens lid smoothly & shifts left (0.00 -> 0.16)
  // 3. Explodes with compact vertical gaps so ALL parts + ejecting RAM sticks remain simultaneously visible
  // 4. Never rotates its back to the camera — at completion (progress >= 0.80), faces front-three-quarter with Touchpad front-and-center!
  function setDisassemblyState(progress, activeKey, hexAccent) {
    currentProgress = progress;
    currentActiveKey = activeKey;

    // Lid Hinge Opening: 0.00 -> 0.14 opens lid from flat closed (Math.PI / 2) to open viewing angle (-0.22)
    const openRatio = Math.min(1, progress / 0.14);
    const smoothOpen = 1 - Math.pow(1 - openRatio, 2.5);
    const closedAngle = Math.PI / 2;
    const openAngle = -0.22;

    // Explosion Spread starts after the lid begins opening (0.08 -> 0.82)
    const rawSpread = Math.max(0, Math.min(1, (progress - 0.08) / 0.72));
    const spread = 1 - Math.pow(1 - rawSpread, 1.8);

    // Shift to left as About Me arrives
    const leftShift = Math.max(0, Math.min(1, (progress - 0.05) / 0.13));
    const smoothLeft = 1 - Math.pow(1 - leftShift, 2.2);

    // Final Touchpad Detach stage (progress >= 0.80)
    const touchpadDetach = Math.max(0, Math.min(1, (progress - 0.79) / 0.18));

    // Compact vertical gaps so every single part fits comfortably inside the viewport at the same time
    display.position.set(0, 0.14 + spread * 1.12, -0.98 - spread * 0.42);
    display.rotation.x = closedAngle * (1 - smoothOpen) + (openAngle - spread * 0.14) * smoothOpen;

    keyboard.position.set(0, spread * 0.62, spread * 0.08);
    motherboard.position.set(0, spread * 0.12, 0);

    // RAM Sticks visibly unclip and slide/eject outward from the laptop while scrolling!
    const ramOut = Math.max(0, Math.min(1, (progress - 0.12) / 0.55));
    ramL.position.set(-0.62 - ramOut * 1.18, 0.055 + spread * 0.34, 0.22 + ramOut * 0.22);
    ramR.position.set(0.62 + ramOut * 1.18, 0.055 + spread * 0.34, 0.22 + ramOut * 0.22);
    ramL.rotation.z = ramOut * 0.12;
    ramR.rotation.z = -ramOut * 0.12;

    // Storage array & base separate cleanly downward
    storage.position.set(0, -spread * 0.62, 0);
    ssd1.position.y = -0.02 + spread * 0.24;
    ssd2.position.y = -0.02 + spread * 0.24;

    // Touchpad stays front-and-center and detaches forward toward camera at completion
    touchpad.position.set(
      touchpadDetach * 0.35,
      spread * 0.28 + touchpadDetach * 0.08,
      spread * 0.75 + touchpadDetach * 1.05
    );
    touchpad.rotation.x = touchpadDetach * 0.28;

    // Root Position & Front-Facing Isometric Rotation (Never rotates its back to the camera!)
    root.position.x = -1.32 * smoothLeft + touchpadDetach * 0.85;
    root.position.y = -0.15;
    // Gentle front-facing yaw sweep between +0.34 and -0.28 rad, ending at +0.16 rad so touchpad is 100% visible!
    root.rotation.y = 0.28 - Math.sin(progress * Math.PI) * 0.52 + touchpadDetach * 0.12;
    root.rotation.x = 0.24 + spread * 0.08;

    if (hexAccent) accentLight.color.set(hexAccent);

    // Highlight active subsystem's crisp edge lines
    Object.entries(parts).forEach(([key, group]) => {
      const isFocused = (touchpadDetach > 0.45 && key === 'touchpad') || (leftShift >= 0.8 && touchpadDetach <= 0.45 && key === activeKey);
      group.scale.setScalar(isFocused ? 1.08 : 0.99);
      const lines = partEdgeLines[key] || [];
      lines.forEach((lMat) => {
        lMat.color.set(isFocused ? (hexAccent || '#38bdf8') : '#8b95a9');
        lMat.opacity = isFocused ? 0.98 : 0.58;
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
    // Subtle turbine fan spin on motherboard
    fanL.rotation.y += 0.025;
    fanR.rotation.y -= 0.025;

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
