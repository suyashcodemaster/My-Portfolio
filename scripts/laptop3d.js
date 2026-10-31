export function initLaptop3D(canvas, onTouchpadClick, onPartHover, onScreenProjectUpdate) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.35, 6.3);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  // High-Contrast Studio Lighting so the Black-Grey Laptop Pops Clearly Against the Dark Background
  const ambient = new THREE.AmbientLight(0xffffff, 0.95);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 7, 6);
  const rimLight = new THREE.DirectionalLight(0x94a3b8, 1.8);
  rimLight.position.set(-5, 4, -4);
  const bottomFill = new THREE.DirectionalLight(0x64748b, 1.1);
  bottomFill.position.set(0, -5, 3);
  const accentLight = new THREE.PointLight(0x38bdf8, 1.8, 16);
  accentLight.position.set(-2.2, 2.0, 4.2);
  scene.add(ambient, keyLight, rimLight, bottomFill, accentLight);

  const root = new THREE.Group();
  // Starts centered (x = 0) before moving left during disassembly
  root.position.set(0, -0.08, 0);
  root.rotation.set(0.26, 0.35, 0);
  scene.add(root);

  // Cohesive Black-Grey / Brushed Space-Grey / Gunmetal Palette
  const matOuterChassis = new THREE.MeshStandardMaterial({ color: 0x323642, metalness: 0.72, roughness: 0.28 });
  const matScreenPanel = new THREE.MeshStandardMaterial({ color: 0x161922, emissive: 0x1e293b, emissiveIntensity: 0.45, roughness: 0.15 });
  const matLogicPcb = new THREE.MeshStandardMaterial({ color: 0x232730, metalness: 0.55, roughness: 0.35 });
  const matCpuCore = new THREE.MeshStandardMaterial({ color: 0x646b7d, emissive: 0x475569, emissiveIntensity: 0.4, metalness: 0.85, roughness: 0.18 });
  const matHeatPipe = new THREE.MeshStandardMaterial({ color: 0x4b5162, metalness: 0.8, roughness: 0.22 });
  const matKeyDeck = new THREE.MeshStandardMaterial({ color: 0x282c37, metalness: 0.65, roughness: 0.32 });
  const matKeyCap = new THREE.MeshStandardMaterial({ color: 0x15171e, roughness: 0.4 });
  const matSpeakerBody = new THREE.MeshStandardMaterial({ color: 0x383d4b, metalness: 0.75, roughness: 0.25 });
  const matTouchpadSurface = new THREE.MeshStandardMaterial({ color: 0x252934, emissive: 0x334155, emissiveIntensity: 0.35, roughness: 0.15, metalness: 0.6 });
  const matBatteryPack = new THREE.MeshStandardMaterial({ color: 0x1f232d, metalness: 0.6, roughness: 0.3 });

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

  // 1. Display (About Me)
  const display = new THREE.Group();
  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.92, 0.07), matOuterChassis);
  addCrispEdges(lidMesh, 'display', 0x94a3b8, 0.75);
  const lcdMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.82, 1.72), matScreenPanel);
  lcdMesh.position.z = 0.04;
  addCrispEdges(lcdMesh, 'display', 0x64748b, 0.5);
  const hingeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.2, 16), matOuterChassis);
  hingeMesh.rotation.z = Math.PI / 2;
  hingeMesh.position.set(0, -0.95, 0);
  const displayAnchor = new THREE.Object3D();
  displayAnchor.position.set(0, 0, 0.05);
  display.add(lidMesh, lcdMesh, hingeMesh, displayAnchor);
  display.position.set(0, 1.02, -0.95);
  display.rotation.x = -0.15;

  // 2. Logic Board (The Mission)
  const logicBoard = new THREE.Group();
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.58, 0.06, 1.54), matLogicPcb);
  addCrispEdges(pcb, 'logicBoard', 0x94a3b8, 0.8);
  const cpuDie = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.11, 0.68), matCpuCore);
  cpuDie.position.set(0, 0.06, 0);
  addCrispEdges(cpuDie, 'logicBoard', 0xcbd5e1, 0.9);
  const heatPipe = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.045, 0.16), matHeatPipe);
  heatPipe.position.set(0, 0.07, -0.42);
  addCrispEdges(heatPipe, 'logicBoard', 0x94a3b8, 0.7);
  const fanL = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.07, 20), matOuterChassis);
  const fanR = fanL.clone();
  fanL.position.set(-0.8, 0.05, -0.35);
  fanR.position.set(0.8, 0.05, -0.35);
  addCrispEdges(fanL, 'logicBoard', 0x94a3b8, 0.65);
  addCrispEdges(fanR, 'logicBoard', 0x94a3b8, 0.65);
  const logicAnchor = new THREE.Object3D();
  logicAnchor.position.set(0, 0.08, 0);
  logicBoard.add(pcb, cpuDie, heatPipe, fanL, fanR, logicAnchor);
  logicBoard.position.set(0, 0.02, 0);

  // 3. Keyboard (Technical Skills)
  const keyboard = new THREE.Group();
  const deckPlate = new THREE.Mesh(new THREE.BoxGeometry(2.68, 0.04, 1.16), matKeyDeck);
  deckPlate.position.set(0, 0.08, -0.14);
  addCrispEdges(deckPlate, 'keyboard', 0x94a3b8, 0.75);
  keyboard.add(deckPlate);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 11; c++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.055, 0.19), matKeyCap);
      key.position.set(-1.0 + c * 0.2, 0.12, -0.52 + r * 0.24);
      addCrispEdges(key, 'keyboard', 0x64748b, 0.45);
      keyboard.add(key);
    }
  }
  const keyboardAnchor = new THREE.Object3D();
  keyboardAnchor.position.set(0, 0.12, -0.14);
  keyboard.add(keyboardAnchor);

  // 4. Speakers (Languages I Know)
  const speakers = new THREE.Group();
  const spkL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.09, 1.5), matSpeakerBody);
  const spkR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.09, 1.5), matSpeakerBody);
  spkL.position.set(-1.32, 0.1, 0);
  spkR.position.set(1.32, 0.1, 0);
  addCrispEdges(spkL, 'speakers', 0x94a3b8, 0.8);
  addCrispEdges(spkR, 'speakers', 0x94a3b8, 0.8);
  const speakerAnchor = new THREE.Object3D();
  speakerAnchor.position.set(0, 0.05, 0);
  spkR.add(speakerAnchor);
  speakers.add(spkL, spkR);

  // 5. Touchpad (Detaches at scroll end with Download CV button on it)
  const touchpad = new THREE.Group();
  const padRim = new THREE.Mesh(
    new THREE.BoxGeometry(1.06, 0.045, 0.68),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 })
  );
  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.055, 0.62), matTouchpadSurface);
  padRim.position.set(0, 0.11, 0.6);
  padMesh.position.set(0, 0.115, 0.6);
  addCrispEdges(padMesh, 'touchpad', 0xcbd5e1, 0.85);
  padMesh.userData.isTouchpad = true;
  const touchpadAnchor = new THREE.Object3D();
  touchpadAnchor.position.set(0, 0.12, 0.6);
  touchpad.add(padRim, padMesh, touchpadAnchor);

  // 6. Battery (Courses & Achievements)
  const battery = new THREE.Group();
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.12, 2.0), matOuterChassis);
  baseMesh.position.y = -0.12;
  addCrispEdges(baseMesh, 'battery', 0x94a3b8, 0.75);
  const cellsMesh = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.1, 0.82), matBatteryPack);
  cellsMesh.position.set(0, -0.02, 0.4);
  addCrispEdges(cellsMesh, 'battery', 0x94a3b8, 0.8);
  const batteryAnchor = new THREE.Object3D();
  batteryAnchor.position.set(0, -0.05, 0.25);
  battery.add(baseMesh, cellsMesh, batteryAnchor);

  const parts = { display, logicBoard, keyboard, speakers, touchpad, battery };
  const anchors = {
    display: displayAnchor,
    logicBoard: logicAnchor,
    keyboard: keyboardAnchor,
    speakers: speakerAnchor,
    touchpad: touchpadAnchor,
    battery: batteryAnchor
  };

  // Simple, candid hover labels (no slash jargon)
  const partLabels = {
    display: "Display",
    logicBoard: "Logic Board",
    keyboard: "Keyboard",
    speakers: "Speakers",
    battery: "Battery",
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

  // Strictly Scoped Raycaster on #laptop-canvas Only (Zero Background Hover Glitch!)
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);
  let currentActiveKey = 'display';
  let currentProgress = 0;

  function clearHover() {
    canvas.style.cursor = 'default';
    if (onPartHover) onPartHover(null, 0, 0);
  }

  canvas.addEventListener('pointermove', (e) => {
    // Only show hover tooltip when inside the active laptop scroll range and directly on the canvas
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

  // Project exact 3D anchor world position to 2D viewport coordinates
  const tempWorldVec = new THREE.Vector3();
  function getAnchorScreenCoords(anchorObj) {
    anchorObj.getWorldPosition(tempWorldVec);
    tempWorldVec.project(camera);
    return {
      x: (tempWorldVec.x * 0.5 + 0.5) * window.innerWidth,
      y: (-(tempWorldVec.y * 0.5) + 0.5) * window.innerHeight
    };
  }

  // 3-Phase Disassembly Choreography:
  // Phase 1 (0.00 -> 0.18): Laptop starts centered (x = 0), opens up, starts disassembling, and moves left (x = -1.35)
  // Phase 2 (0.18 -> 0.82): Laptop stays on the left while sections scroll on the right, parts separated cleanly
  // Phase 3 (0.82 -> 1.00): Touchpad detaches forward with Download CV button on it
  function setDisassemblyState(progress, activeKey, hexAccent) {
    currentProgress = progress;
    currentActiveKey = activeKey;

    const introShift = Math.min(1, progress / 0.18);
    const smoothIntro = 1 - Math.pow(1 - introShift, 2.2);

    const spread = Math.min(1, Math.pow(Math.min(1, progress * 1.15), 0.85));
    const touchpadDetach = Math.max(0, Math.min(1, (progress - 0.80) / 0.18));

    // Lid opens from closed/semi-closed in the center to wide open exploded state
    display.position.set(0, 1.02 + spread * 2.05, -0.95 - spread * 0.78);
    display.rotation.x = 0.35 * (1 - smoothIntro) - 0.16 - spread * 0.25;

    keyboard.position.set(0, spread * 1.15, spread * 0.18);
    logicBoard.position.set(0, 0.02 + spread * 0.22, 0);

    spkL.position.x = -1.32 - spread * 1.05;
    spkR.position.x = 1.32 + spread * 1.05;
    speakers.position.y = spread * 0.52;

    battery.position.set(0, -spread * 1.55, -spread * 0.15);

    touchpad.position.set(
      touchpadDetach * 1.05,
      spread * 0.42 - touchpadDetach * 0.2,
      spread * 1.45 + touchpadDetach * 0.85
    );
    touchpad.rotation.x = touchpadDetach * 0.36;
    touchpad.rotation.y = -touchpadDetach * 0.28;

    // X Position: Starts at 0 (center), glides to -1.35 (left) as About Me arrives, then shifts toward -0.35 at final touchpad stage
    root.position.x = -1.35 * smoothIntro + touchpadDetach * 0.95;
    root.rotation.y = 0.35 + progress * Math.PI * 0.68;
    root.rotation.x = 0.26 + spread * 0.08;

    if (hexAccent) accentLight.color.set(hexAccent);

    // Highlight active subsystem's crisp edge lines so it stands out unmistakably
    Object.entries(parts).forEach(([key, group]) => {
      const isFocused = (touchpadDetach > 0.5 && key === 'touchpad') || (introShift >= 0.85 && touchpadDetach <= 0.5 && key === activeKey);
      group.scale.setScalar(isFocused ? 1.12 : 0.98);
      const lines = partEdgeLines[key] || [];
      lines.forEach((lMat) => {
        lMat.color.set(isFocused ? (hexAccent || '#38bdf8') : '#8b95a9');
        lMat.opacity = isFocused ? 0.98 : 0.55;
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
