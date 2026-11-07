# Suyash Sharma — 3D Disassembling Laptop & Editorial Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-suyashcodemaster.vercel.app-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://suyashcodemaster.vercel.app)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A high-performance, zero-dependency editorial web experience combining real-time procedural 3D WebGL computer hardware disassembly with cinematic darkroom editorial aesthetics.

Built for **Suyash Sharma** — B.Tech Computer Science & Engineering undergraduate at Vellore Institute of Technology ('26–'30).

---

## 🌟 Key Features & Engineering Highlights

### 1. Procedural 3D Exploding Laptop (Three.js WebGL)
- **Zero-Blob Procedural Geometry**: Entire 3D laptop is rendered dynamically in code without heavy external `.glb`/`.gltf` asset bundles, ensuring near-instant page load speeds.
- **6-Stage Scroll-Driven Hardware Disassembly**:
  - **Stage 1 (Display & Hinge)**: Screen assembly lifts and tilts backward with high-res glass reflection.
  - **Stage 2 (Keyboard & EMI Mid-Surface)**: Laser-etched QWERTY keycaps with geometric wireframe outlines and emerald-edged EMI matrix plate elevate upward.
  - **Stage 3 (Motherboard & Dual Cooling Fans)**: PCB chassis tilts forward toward the viewer, showcasing CPU/GPU silicon dies, spinning dual cooling fans, copper heatpipes, and VRM power chokes.
  - **Stage 4 (RAM Sticks)**: Dual DDR5 memory modules eject laterally with detailed contact pins and memory chips.
  - **Stage 5 (Storage & Battery)**: Dual PCIe Gen 4 NVMe SSDs and lithium-ion battery modules separate downward.
  - **Stage 6 (Touchpad & Precision Trackpad)**: Smooth haptic glass trackpad with direct "Download CV" action.

### 2. Editorial Darkroom Aesthetic & 60-30-10 Design Hierarchy
- Deep obsidian backdrop (`#09090d`), subtle film grain overlay, and typography pairing of *Newsreader* serif with *Plus Jakarta Sans*.
- Strategic color accent balancing:
  - `#38bdf8` (Sky Cyan)
  - `#10b981` (Emerald Green)
  - `#a855f7` (Electric Purple)
  - `#f59e0b` (Amber Gold)
  - `#6366f1` (Indigo Blue)
  - `#f43f5e` (Rose Coral)

### 3. Multi-Device Responsiveness & Adaptive Viewports
- **Desktop (`> 900px`)**: Full isometric 3D explosion with parallel floating bento cards and 3D hover states.
- **Tablet / Split-Screen (`681px–900px`)**: Preserved 3D stacked layout with proportional perspective scaling.
- **Mobile (`<= 680px`)**:
  - Centered 3D viewport with auto-scaled camera distance so ejected components never clip off-screen.
  - Touch-swipeable horizontal projects carousel (`scroll-snap-type: x mandatory`) with real-time `01`–`06` progress tracking.
  - Scaled horizontal 35mm film reel frames (`01A`–`08A`).

### 4. Interactive Terminal & Conversational Dispatch
- Julian Garner–inspired conversational contact terminal.
- Realistic simulated keystrokes, typing indicators, quick-action chips, and instant contact modal dispatch.

### 5. Web Performance & Core Web Vitals
- Zero build tools required: 100% native ES6 modules running directly in modern browsers.
- Compressed progressive image assets (`~60 KB` portrait with preload tags and explicit aspect ratios to prevent CLS).
- Automated WebGL rendering throttle on `document.hidden` and pointer raycast optimizations to guarantee smooth 60 FPS performance.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Core** | Vanilla HTML5, CSS3 (Custom Properties & Bento Grid), ES6+ JavaScript |
| **3D & WebGL** | [Three.js](https://threejs.org/) (r128) |
| **Animation & Scroll** | [GSAP](https://greensock.com/gsap/) (3.12.5) & ScrollTrigger Plugin |
| **Typography** | Newsreader, Plus Jakarta Sans, JetBrains Mono |
| **Local Runtime** | Node.js (Zero-dependency HTTP server with security headers) |
| **Hosting & CDN** | [Vercel](https://vercel.com/) (Edge Network with cache & security headers) |

---

## 📁 Project Structure

```text
My-Portfolio/
├── data/
│   └── portfolioData.js     # Single source of truth for all content, bio, projects & chat
├── public/
│   └── assets/              # Static media assets (photo & resume)
├── scripts/
│   ├── laptop3d.js          # Procedural 3D laptop WebGL scene, lighting & disassembly
│   └── main.js              # Application controller, DOM generation & GSAP animations
├── styles/
│   └── main.css             # Design tokens, bento cards, responsive layouts & typography
├── favicon.svg              # Shutter / camera icon
├── index.html               # Main semantic HTML entry point
├── package.json             # NPM package scripts & repository metadata
├── server.js                # Zero-dependency local Node.js development server
├── Suyash-CV.pdf            # Official Curriculum Vitae
├── suyash-photo.jpeg        # Optimized high-resolution portrait
└── vercel.json              # Vercel CDN caching and HTTP security headers
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/suyashcodemaster/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Start the local server:**
   ```bash
   npm start
   ```
   *Or run directly with Node:*
   ```bash
   node server.js
   ```

3. **Open in your browser:**
   ```
   http://localhost:3000
   ```

---

## ⚙️ Content Management Guide

All content is cleanly decoupled from rendering logic and resides in [`data/portfolioData.js`](data/portfolioData.js):

- **Personal Info & Bio**: Update `profile` object (name, roles, college, status, social links).
- **Disassembly Stage Cards**: Modify items inside the `stages` array.
- **Projects Showcase**: Add or edit projects in the `projects` array (`title`, `subtitle`, `bullets`, `tech`, `githubUrl`).
- **Interactive Chat Prompts**: Add custom queries and automated replies inside the `chat` object.

Changes saved to `portfolioData.js` take effect immediately without requiring code compilation or bundlers.

---

## 👨‍💻 Author

**Suyash Sharma**  
- **Email**: [sharma.suyash.in@gmail.com](mailto:sharma.suyash.in@gmail.com)  
- **LinkedIn**: [linkedin.com/in/suyashsharmadev](https://linkedin.com/in/suyashsharmadev)  
- **GitHub**: [@suyashcodemaster](https://github.com/suyashcodemaster)  
- **Portfolio**: [suyashcodemaster.vercel.app](https://suyashcodemaster.vercel.app)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
