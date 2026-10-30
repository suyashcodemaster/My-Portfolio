export function initLaptop3D(canvas, onTouchpadClick, onPartSelect) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.2, 5.2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Cinematic Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
  keyLight.position.set(5, 8, 6);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
  fillLight.position.set(-6, -2, -3);
  scene.add(fillLight);

  const accentLight = new THREE.PointLight(0x38bdf8, 2.8, 16);
  accentLight.position.set(-2, 2.5, 3);
  scene.add(accentLight);

  // Root Pivot Group
  const root = new THREE.Group();
  root.position.set(-1.15, -0.2, 0);
  root.rotation.set(0.32, 0.45, 0);
  scene.add(root);

  // Shared High-Fidelity Materials
  const matChassis = new THREE.MeshStandardMaterial({
    color: 0x181924,
    metalness: 0.9,
    roughness: 0.25
  });

  const matDarkBezel = new THREE.MeshStandardMaterial({
    color: 0x08090d,
    metalness: 0.5,
    roughness: 0.45
  });

  const matScreen = new THREE.MeshStandardMaterial({
    color: 0x060b13,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.42,
    roughness: 0.15
  });

  const matPcb = new THREE.MeshStandardMaterial({
    color: 0x0b261b,
    metalness: 0.4,
    roughness: 0.35
  });

  const matCpu = new THREE.MeshStandardMaterial({
    color: 0x221a30,
    emissive: 0xa855f7,
    emissiveIntensity: 0.8,
    metalness: 0.85,
    roughness: 0.18
  });

  const matGold = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.95,
    roughness: 0.15
  });

  const matCopper = new THREE.MeshStandardMaterial({
    color: 0xc87533,
    metalness: 0.92,
    roughness: 0.22
  });

  const matKeycap = new THREE.MeshStandardMaterial({
    color: 0x12131d,
    emissive: 0x10b981,
    emissiveIntensity: 0.18,
    roughness: 0.45
  });

  const matSpeaker = new THREE.MeshStandardMaterial({
    color: 0x1f1b14,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.45,
    metalness: 0.75
  });

  const matTouchpad = new THREE.MeshStandardMaterial({
    color: 0x25142a,
    emissive: 0xec4899,
    emissiveIntensity: 0.52,
    roughness: 0.1,
    metalness: 0.65
  });

  const matBattery = new THREE.MeshStandardMaterial({
    color: 0x141830,
    emissive: 0x6366f1,
    emissiveIntensity: 0.45,
    metalness: 0.65
  });

  // 1. DISPLAY SUBSYSTEM (Lid, Bezel, Screen, Webcam, Logo)
  const display = new THREE.Group();
  display.userData = { key: 'display', label: 'PART 01 // DISPLAY LID & 120HZ PANEL', stageIndex: 0 };
  
  const lid = new THREE.Mesh(new THREE.BoxGeometry(3.15, 2.1, 0.07), matChassis);
  lid.userData.parentKey = 'display';
  
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(3.04, 1.98, 0.015), matDarkBezel);
  bezel.position.z = 0.04;
  bezel.userData.parentKey = 'display';
  
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.82, 1.76), matScreen);
  screen.position.z = 0.052;
  screen.userData.parentKey = 'display';

  // Webcam dot
  const camDot = new THREE.Mesh(
    new THREE.CircleGeometry(0.022, 16),
    new THREE.MeshBasicMaterial({ color: 0x10b981 })
  );
  camDot.position.set(0, 0.93, 0.053);
  camDot.userData.parentKey = 'display';

  // Hinge barrel
  const hinge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 2.7, 16),
    matChassis
  );
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, -1.02, 0.02);
  hinge.userData.parentKey = 'display';

  display.add(lid, bezel, screen, camDot, hinge);
  display.position.set(0, 1.08, -1.02);
  display.rotation.x = -0.18;

  // 2. LOGIC BOARD & CPU CORE (PCB, CPU Die, Copper Heatpipes, RAM, NVMe SSD, Fans)
  const logicBoard = new THREE.Group();
  logicBoard.userData = { key: 'logicBoard', label: 'PART 02 // LOGIC BOARD & CPU SILICON', stageIndex: 1 };

  const pcb = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.035, 1.55), matPcb);
  pcb.userData.parentKey = 'logicBoard';

  const cpu = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.075, 0.62), matCpu);
  cpu.position.set(-0.35, 0.03, -0.15);
  cpu.userData.parentKey = 'logicBoard';

  // Dual RAM Sticks
  const ram1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.055, 0.68), matGold);
  ram1.position.set(0.48, 0.025, -0.2);
  ram1.userData.parentKey = 'logicBoard';
  const ram2 = ram1.clone();
  ram2.position.set(0.76, 0.025, -0.2);
  ram2.userData.parentKey = 'logicBoard';

  // NVMe M.2 SSD
  const ssd = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.045, 0.24), matGold);
  ssd.position.set(-0.25, 0.025, 0.42);
  ssd.userData.parentKey = 'logicBoard';

  // Copper Heatpipes
  const heatpipe = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.035, 0.12), matCopper);
  heatpipe.position.set(0.18, 0.045, -0.15);
  heatpipe.userData.parentKey = 'logicBoard';

  // Twin Cooling Turbines
  const fanL = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.05, 16), matChassis);
  fanL.position.set(-1.05, 0.03, -0.38);
  fanL.userData.parentKey = 'logicBoard';
  const fanR = fanL.clone();
  fanR.position.set(1.05, 0.03, -0.38);
  fanR.userData.parentKey = 'logicBoard';

  logicBoard.add(pcb, cpu, ram1, ram2, ssd, heatpipe, fanL, fanR);
  logicBoard.position.set(0, 0.02, 0);

  // 3. KEYBOARD DECK & KEYCAPS
  const keyboard = new THREE.Group();
  keyboard.userData = { key: 'keyboard', label: 'PART 03 // KEYBOARD MATRIX & DECK', stageIndex: 2 };

  const deckPlate = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.03, 1.35), matDarkBezel);
  deckPlate.position.set(0, 0.09, -0.22);
  deckPlate.userData.parentKey = 'keyboard';
  keyboard.add(deckPlate);

  const rows = 5;
  const cols = 12;
  const keyW = 0.185;
  const keyD = 0.185;
  const gapX = 0.042;
  const gapZ = 0.042;
  const startX = -((cols * (keyW + gapX)) / 2) + keyW / 2;
  const startZ = -0.72;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isSpace = (r === rows - 1 && c >= 4 && c <= 7);
      if (isSpace && c !== 4) continue;
      
      const width = isSpace ? (keyW + gapX) * 4 - gapX : keyW;
      const x = isSpace ? startX + (5.5 * (keyW + gapX)) : startX + c * (keyW + gapX);
      const z = startZ + r * (keyD + gapZ);
      
      const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.045, keyD), matKeycap);
      keyMesh.position.set(x, 0.115, z);
      keyMesh.userData.parentKey = 'keyboard';
      keyboard.add(keyMesh);
    }
  }

  // 4. ACOUSTIC SPEAKERS & I/O PORTS
  const speakers = new THREE.Group();
  speakers.userData = { key: 'speakers', label: 'PART 04 // STEREO TRANSDUCERS & I/O', stageIndex: 3 };

  const spkL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.065, 1.38), matSpeaker);
  spkL.position.set(-1.42, 0.09, -0.22);
  spkL.userData.parentKey = 'speakers';

  const spkR = spkL.clone();
  spkR.position.set(1.42, 0.09, -0.22);
  spkR.userData.parentKey = 'speakers';

  // Side USB-C / Thunderbolt Ports
  const portL1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, 0.14), matGold);
  portL1.position.set(-1.58, 0.06, -0.5);
  portL1.userData.parentKey = 'speakers';
  const portL2 = portL1.clone();
  portL2.position.set(-1.58, 0.06, -0.28);
  portL2.userData.parentKey = 'speakers';

  const portR1 = portL1.clone();
  portR1.position.set(1.58, 0.06, -0.5);
  portR1.userData.parentKey = 'speakers';

  speakers.add(spkL, spkR, portL1, portL2, portR1);

  // 5. PRECISION GLASS TOUCHPAD (Interactive Raycast Surface)
  const touchpad = new THREE.Group();
  touchpad.userData = { key: 'touchpad', label: 'PART 05 // HAPTIC GLASS TOUCHPAD [CLICK TO DOWNLOAD CV]', isTouchpad: true, stageIndex: 4 };

  const padMesh = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.035, 0.68), matTouchpad);
  padMesh.position.set(0, 0.095, 0.62);
  padMesh.userData.parentKey = 'touchpad';
  padMesh.userData.isTouchpad = true;

  // Thin perimeter edge accent line
  const padRim = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.02, 0.71), matGold);
  padRim.position.set(0, 0.085, 0.62);
  padRim.userData.parentKey = 'touchpad';
  padRim.userData.isTouchpad = true;

  touchpad.add(padMesh, padRim);

  // 6. LOWER UNIBODY CHASSIS & BATTERY PACK
  const battery = new THREE.Group();
  battery.userData = { key: 'battery', label: 'PART 06 // UNIBODY CHASSIS & POWER CORE', stageIndex: 5 };

  const bottomChassis = new THREE.Mesh(new THREE.BoxGeometry(3.18, 0.12, 2.18), matChassis);
  bottomChassis.position.y = -0.06;
  bottomChassis.userData.parentKey = 'battery';

  // 4 Battery Modules
  const battPack = new THREE.Group();
  for (let b = 0; b < 4; b++) {
    const cell = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.065, 0.72), matBattery);
    cell.position.set(-0.9 + b * 0.6, -0.015, 0.52);
    cell.userData.parentKey = 'battery';
    battPack.add(cell);
  }

  // Bottom Rubber Feet
  const footPositions = [
    [-1.4, -0.13, -0.9], [1.4, -0.13, -0.9],
    [-1.4, -0.13, 0.9], [1.4, -0.13, 0.9]
  ];
  footPositions.forEach(([fx, fy, fz]) => {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16), matDarkBezel);
    foot.position.set(fx, fy, fz);
    foot.userData.parentKey = 'battery';
    battery.add(foot);
  });

  battery.add(bottomChassis, battPack);

  // Assemble all groups into root
  const parts = { display, logicBoard, keyboard, speakers, touchpad, battery };
  Object.values(parts).forEach(g => root.add(g));

  // Raycasting for interactive click & hover
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function getHitPart(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(root.children, true);
    if (hits.length > 0) {
      let obj = hits[0].object;
      while (obj && !obj.userData?.key && obj.parent !== root && obj.parent !== null) {
        if (obj.userData?.parentKey) {
          return { part: parts[obj.userData.parentKey], hitObject: obj };
        }
        obj = obj.parent;
      }
      if (obj && obj.userData?.key) return { part: obj, hitObject: hits[0].object };
    }
    return null;
  }

  // Click handler: click touchpad -> download CV; click any other part -> select stage
  canvas.addEventListener('click', (e) => {
    const result = getHitPart(e);
    if (result) {
      const { part } = result;
      if (part.userData?.isTouchpad && onTouchpadClick) {
        onTouchpadClick();
      } else if (onPartSelect && part.userData?.stageIndex !== undefined) {
        onPartSelect(part.userData.stageIndex);
      }
    }
  });

  // Hover detection with sleek floating HUD badge
  const partBadge = document.getElementById('laptop-part-tag');
  canvas.addEventListener('mousemove', (e) => {
    const result = getHitPart(e);
    if (result) {
      canvas.style.cursor = 'pointer';
      if (partBadge && result.part.userData?.label) {
        partBadge.textContent = result.part.userData.label;
        partBadge.style.opacity = '1';
        partBadge.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
      }
    } else {
      canvas.style.cursor = 'default';
      if (partBadge) partBadge.style.opacity = '0';
    }
  });

  canvas.addEventListener('mouseleave', () => {
    if (partBadge) partBadge.style.opacity = '0';
  });

  // Responsive scaling
  function updateScale() {
    const w = window.innerWidth;
    const baseScale = w < 480 ? 0.65 : (w < 768 ? 0.75 : (w < 1200 ? 0.88 : 1.0));
    root.scale.setScalar(baseScale);
    root.position.x = w < 768 ? 0 : -1.15;
  }
  updateScale();

  // Scroll Disassembly Controller
  function setDisassemblyState(progress, activeKey, hexAccent) {
    const factor = Math.min(1.0, progress * 1.3);
    
    // Display lifts up and angles backward
    display.position.y = 1.08 + factor * 1.45;
    display.position.z = -1.02 - factor * 0.52;
    display.rotation.x = -0.18 - factor * 0.35;
    
    // Keyboard floats upward
    keyboard.position.y = factor * 0.95;
    
    // Logic board hovers in center
    logicBoard.position.y = 0.02 + factor * 0.45;
    
    // Speakers spread slightly outward
    speakers.position.y = factor * 0.6;
    speakers.scale.x = 1.0 + factor * 0.14;
    
    // Touchpad floats forward and up towards camera
    touchpad.position.z = 0.62 + factor * 0.62;
    touchpad.position.y = factor * 0.32;
    
    // Battery and lower chassis drop downward
    battery.position.y = -factor * 0.95;

    // Elegant, slow cinematic rotation
    root.rotation.y = 0.45 + progress * Math.PI * 0.45;
    root.rotation.x = 0.32 + Math.sin(progress * Math.PI) * 0.1;

    if (hexAccent) {
      accentLight.color.set(hexAccent);
      screen.material.emissive.set(hexAccent);
    }

    // Scale pulse on active subsystem
    Object.entries(parts).forEach(([key, group]) => {
      const isTarget = key === activeKey;
      const targetScale = isTarget ? 1.06 : 1.0;
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.25);
    });
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateScale();
  });

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  return { setDisassemblyState };
}
