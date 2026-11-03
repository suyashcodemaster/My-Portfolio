# Handoff Guide (v15): Restored Full 3D Project Card Opening Animation Across All Devices & OS Settings

This archive (`My-Portfolio-v15.zip`) contains the complete, production-ready codebase for `E:\Website Portfolio\My-Portfolio` (deployed to `https://suyashcodemaster.vercel.app`).

## Why the Card Opening Animation Disappeared in v14 & How It Is Fixed in v15
1. **Removed the `@media (prefers-reduced-motion: reduce)` Transition Killer (`styles/main.css`)**:
   - In v14, `@media (prefers-reduced-motion: reduce)` set `transition-duration: 0.01ms !important` and `animation-duration: 0.01ms !important` on `*`. On Windows systems where OS animation effects or power-saving preferences toggle `prefers-reduced-motion`, that rule completely disabled every CSS transition on the site, causing the project cards to snap open instantaneously with zero animation. Removing that rule restores the full `0.58s cubic-bezier(0.19, 1, 0.22, 1)` 3D opening animation.
2. **Restored Full 3D Card Opening Animation on All Viewports (`styles/main.css`, `scripts/main.js`)**:
   - Lowered the mobile swipe-carousel breakpoint from `900px` to `680px` so desktop split-screen windows and the Canvas preview (`681px–960px`) keep the full 3D angled stack (`rotateY(-54deg) rotateX(5deg) -> translate3d(var(--center-shift), 15px, 240px) rotateY(0deg) rotateX(0deg) scale(1.52)`).
   - Added 3D perspective and smooth 3D pop-forward animation (`rotateY(-18deg) rotateX(4deg) scale(0.94) -> translate3d(0, -8px, 120px) rotateY(0deg) rotateX(0deg) scale(1.12)`) to the mobile carousel (`<= 680px`) as well, so opening a card smoothly animates in 3D on every device.
