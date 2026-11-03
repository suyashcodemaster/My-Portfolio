# Handoff Guide (v14): Dynamic Multi-Device Responsiveness, Mobile Swipeable Projects Carousel, Scaled 35mm Reel & Web Performance Optimization

This archive (`My-Portfolio-v14.zip`) contains the complete, production-ready codebase for `E:\Website Portfolio\My-Portfolio` (deployed to `https://suyashcodemaster.vercel.app`).

## Summary of Upgrades in v14
1. **Full-Screen Layered 3D Laptop + High-Visibility About Me Cards on Mobile/Tablet (`scripts/laptop3d.js`, `styles/main.css`)**:
   - **Desktop (`> 900px`)**: Kept 100% identical to v13.
   - **Mobile & Tablet (`<= 900px`)**: The 3D laptop stays centered horizontally (`root.position.x = 0`) in the upper-middle portion of the full-screen sticky viewport (`100dvh`) with adaptive portrait camera distance (`camera.position.z` scaled to aspect ratio so the laptop and ejected RAM sticks never clip off-screen). Meanwhile, the About Me `.stage-bento-panel` cards scroll through the lower half of the viewport (`padding-top: 50vh`) as high-contrast frosted glass cards (`rgba(13, 15, 23, 0.84)`, `backdrop-filter: blur(16px)`), keeping both the 3D laptop and the card text clearly visible.
2. **Swipeable Horizontal Carousel for Projects on Mobile/Tablet (`styles/main.css`, `scripts/main.js`)**:
   - On `<= 900px`, `#projects-stack` converts into a smooth hardware-accelerated touch-swipeable horizontal carousel (`scroll-snap-type: x mandatory`, `min(82vw, 315px)` per landscape card).
   - Swiping automatically updates the active `01`–`06` single-line indicator below, and tapping any card expands its project details and **View on GitHub ↗** button without hover glitches.
3. **Scaled Scroll-Driven Horizontal 35mm Camera Reel (`styles/main.css`, `scripts/main.js`)**:
   - Scaled `.reel-card` on mobile (`width: min(76vw, 265px)`) so only what naturally fits in the viewport is shown at once, and vertical scrolling smoothly advances horizontally through all 8 frames (`01A`–`08A`).
4. **Faster Loading Screen & Industry Web Performance Optimizations (`index.html`, `scripts/main.js`, `scripts/laptop3d.js`, `vercel.json`, `suyash-photo.jpeg`)**:
   - **Faster Preloader**: Reduced initial loading screen duration to `~0.68s` on every visit (never skipped on repeat visits).
   - **Core Web Vitals (LCP / CLS / INP)**: Compressed `suyash-photo.jpeg` to `~60 KB` progressive JPEG (`560×670` `@2x`), added `<link rel="preload" as="image" href="./suyash-photo.jpeg" fetchpriority="high" />`, explicit `width="280" height="360"` (`0` CLS), `loading="lazy"` on below-the-fold images, `Cache-Control` headers in `vercel.json`, touch-pointer raycast skipping, `document.hidden` WebGL pause, and `prefers-reduced-motion` support.
