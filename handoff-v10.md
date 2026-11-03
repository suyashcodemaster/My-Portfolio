# Handoff Guide (v13): Final 3D Laptop Showcase Tilt (2x More Downward Step), Tilting & Separating Keyboard + Intermediate Surface, and Outlined Letter-Imprinted Keycaps

This archive (`My-Portfolio-v13.zip`) contains the complete, production-ready codebase for `E:\Website Portfolio\My-Portfolio` (deployed to `https://suyashcodemaster.vercel.app`).

## Summary of Fixes in v13
1. **2x More Downward Isometric Showcase Tilt (`scripts/laptop3d.js`)**:
   - Increased the downward tilt step by 2x more from v12 (`root.rotation.x = 0.24 - spread * 0.06`, reaching **`+0.18 rad`** vs v10's `-0.06 rad` and v12's `+0.02 rad`) with the camera elevated slightly (`y = 1.62, z = 6.65`), so the top surfaces and intricate 3D detailing of every internal layer face the viewer directly.
2. **Keyboard & Intermediate Surface Tilt and Extra Separation During Motherboard/RAM/Storage Stages (`scripts/laptop3d.js`)**:
   - Separated the surface between the Keyboard and the Motherboard (`midSurface` — the emerald-edged backlight/EMI matrix plate with structural ribs) into its own independent layer between `keyboard` and `motherboard`.
   - When scrolling into the Motherboard, RAM Sticks, and Storage stages (`lowerReveal`, `progress >= 0.25`), the `keyboard` (`y` up to `+1.04`, `rotation.x = -0.15 rad`) and `midSurface` (`y` up to `+0.62`, `rotation.x = -0.08 rad`) lift higher and tilt upward to open a wide, unobstructed window, while `motherboard`, `ram`, and `storage` separate further (`storage` down to `-0.50`) and tilt toward the camera (`+0.12` to `+0.14 rad`) so the CPU/GPU dies, copper heatpipes, dual spinning fans, VRM bank, RAM sticks, and dual NVMe SSDs get full recognition.
3. **Outlined Keycaps with Subtle Imprinted QWERTY Letters (`scripts/laptop3d.js`)**:
   - Added crisp geometric outlines (`EdgesGeometry` with shared `LineSegments`) to all 44 individual keys on the keyboard.
   - Added a single `512×256` `CanvasTexture` UV-mapped across the top faces (+Y) of all 44 keycaps with subtle laser-etched QWERTY key imprints (`ESC`, `1`–`0`, `Q`–`P`, `A`–`L`, `Z`–`M`, etc.) and recessed key bevels.
