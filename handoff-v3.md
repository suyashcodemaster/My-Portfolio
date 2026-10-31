# Project Handoff Document v4.0: Suyash Sharma — 3D Disassembling Laptop & Editorial Portfolio (`My-Portfolio`)

**Document Name:** `handoff-v4.md`  
**Version:** 4.0 (All 11 Final Refinements & Bug Fixes Implemented)  
**Repository:** `https://github.com/suyashcodemaster/My-Portfolio`  
**Live Production URL:** `https://suyashcodemaster.vercel.app`  
**Primary Working Directory:** `E:\Website Portfolio\My-Portfolio`

---

## 1. Summary of All 11 Final Changes & Fixes in v4.0

1. **Refined Black-Grey / Brushed Gunmetal 3D Laptop with High-Contrast Architectural Edges (`scripts/laptop3d.js`)**:
   - Styled the 3D laptop in a studio-lit matte black-grey / space-grey / gunmetal palette (`#323642` anodized chassis, `#232730` logic board, `#15171e` keycaps, `#282c37` deck) with crisp `THREE.EdgesGeometry` metallic edge highlights and a subtle radial studio backlight behind the model so it stands out sharply and never merges with the `#09090d` background.
2. **Centered Laptop Lead-In Before "About Me" Starts (`scripts/laptop3d.js`, `scripts/main.js`, `styles/main.css`)**:
   - Added an opening `115vh` lead-in stage (`.laptop-intro-stage`) at the start of `#section-laptop`. The laptop first appears **centered** in the viewport (`x = 0`), opens its lid, and begins disassembling while gliding smoothly to the left (`x = -1.35`) before the *About Me* card scrolls in on the right.
3. **Simple, Candid Language & Removal of `01 // ...` Slash Jargon (`index.html`, `data/portfolioData.js`, `scripts/main.js`)**:
   - Removed all `01 // DISPLAY SUBSYSTEM`, `HARDWARE MATCH:`, `KODAK 400TX //`, and slash-heavy technical labels throughout the site.
   - Replaced hardware indicators with clean, simple labels: **`Display`**, **`Logic Board`**, **`Keyboard`**, **`Speakers`**, **`Battery`**, and **`Touchpad`**.
4. **Fixed 3D Part Pointer Alignment (`scripts/laptop3d.js`, `styles/main.css`)**:
   - Attached dedicated `THREE.Object3D` anchors to the exact visual center of each 3D subsystem (`displayAnchor`, `logicAnchor`, `keyboardAnchor`, `speakerAnchor`, `batteryAnchor`, `touchpadAnchor`) and centered `.callout-dot` at `(0, 0)` of `#part-link-callout` after `scene.updateMatrixWorld(true)` so the pointer locks onto the exact 3D component (never pointing into empty space).
5. **Updated About Me, Technical Skills & Hobbies Content (`data/portfolioData.js`)**:
   - **About Me**: Updated to the exact 3-paragraph candid introduction (*"Hey! I'm Suyash — a first-year CSE student at VIT Vellore..."*).
   - **Technical Skills**:
     - *Programming Languages*: `Python`, `HTML/CSS`
     - *Currently Learning*: `Python`, `C++`, `Data Structures & Algorithms (DSA)`, `Learning AI`
     - *Frameworks*: `Want to learn React`
     - *Libraries*: `pandas`, `NumPy`, `Matplotlib` (omitted `PyMuPDF`)
   - **Hobbies & Aspirations (35mm Camera Reel)**: Changed Frame `01A` to **Building Human Connections**, kept **Video Games** (`07A`) as its own card, and added **Learning About Tech & AI** (`08A`) as a separate card.
6. **Shorter "Languages I Know" Section + Embedded GitHub Contribution Graph + Quote (`scripts/main.js`, `styles/main.css`)**:
   - Reduced the height of *Languages I Know* (`.compact-stage`) with a compact side-by-side row for **English** and **Hindi**, embedded Suyash's live GitHub contribution graph (`https://ghchart.rshah.org/10b981/suyashcodemaster` with an automatic SVG fallback), and added the quote:
     > *"If it doesn't challenge you, it won't change you."*
7. **3 Impactful Quotes Sprinkled Across the Website (`index.html`, `styles/main.css`)**:
   - Added 3 full-width editorial quote interludes (`.quote-interlude`) in the spaces between major sections:
     1. *"You don't have to be great to get started, but you have to get started to be great."*
     2. *"Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming."*
     3. *"Life is either a daring adventure or nothing at all."* — Helen Keller
8. **Initial Loading Screen from the Template Repository (`index.html`, `styles/main.css`, `scripts/main.js`)**:
   - Added `#loader-overlay` with a smooth `000` → `100%` counter and progress bar that lifts upward cleanly on initial page load so the entrance is smooth and never abrupt.
9. **Horizontally Stacked Library-Book Project Layers (`styles/main.css`, `scripts/main.js`)**:
   - Kept `.projects-library-stack` strictly horizontal (`flex-direction: row` across all screen sizes—never collapsing into a vertical stack) so Layer `01` (*SanitX*) opens on the left while Layers `02`–`08` stand horizontally side-by-side like books on a library shelf with non-interactive matte-grey photo frames (`pointer-events: none`).
10. **Static Julian Garner–Style Minimalist White Contact Section (`index.html`, `styles/main.css`)**:
    - Removed all interactive chat buttons and typing prompts from `#section-contact`. Kept the seamless transition to the warm-white (`#f7f6f2`) section and laid out all contact info (*Email*, *Phone*, *LinkedIn*, *GitHub*, *Download CV*, and *Location*) in Julian Garner's clean, static minimalist editorial layout.
11. **Fixed the 3D Hover Tooltip Glitch Completely (`scripts/laptop3d.js`, `styles/main.css`)**:
    - Removed the global `window` mousemove listener and bound `pointermove` / `pointerleave` strictly to `#laptop-canvas` when `#section-laptop` is in the active scroll range (`0.005 < progress < 0.995`) and `e.target === canvas`.
    - Raycasts only against solid 3D meshes (`pickableMeshes`) and immediately hides `#part-hover-tooltip` on scroll or when the pointer leaves the 3D laptop mesh.

---

## 2. Complete Updated Source Files (Drop Directly into `E:\Website Portfolio\My-Portfolio`)

### File 1: `data/portfolioData.js`
```javascript
export const PORTFOLIO_DATA = {
  profile: {
    firstName: "SUYASH",
    lastName: "SHARMA",
    photoUrl: "./suyash-photo.jpeg",
    cvUrl: "./Suyash-CV.pdf",
    cvDownloadName: "Suyash-Sharma-CV.pdf",
    email: "sharma.suyash.in@gmail.com",
    phone: "+91 7888222223",
    linkedin: "https://linkedin.com/in/suyashsharmadev",
    github: "https://github.com/suyashcodemaster",
    githubUsername: "suyashcodemaster",
    location: "Vellore, Tamil Nadu & Pune, India"
  },

  // 3 Impactful Editorial Quotes Sprinkled Across Spaces Between Sections
  interludeQuotes: [
    {
      id: "quote-1",
      text: "You don't have to be great to get started, but you have to get started to be great.",
      author: ""
    },
    {
      id: "quote-2",
      text: "Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.",
      author: ""
    },
    {
      id: "quote-3",
      text: "Life is either a daring adventure or nothing at all.",
      author: "Helen Keller"
    }
  ],

  // 5 Core Laptop Disassembly Sections (Simple, candid labels — no slash jargon)
  laptopStages: [
    {
      id: "about",
      partKey: "display",
      partLabel: "Display",
      title: "About Me",
      accent: "#38bdf8",
      paragraphs: [
        "Hey! I'm Suyash — a first-year CSE student at VIT Vellore who's genuinely fascinated by how things are built from the ground up. I fell into programming because I loved the idea of turning a blank screen into something real, something that actually works.",
        "Logic has always clicked with me — I'm the kind of person who needs to understand why something works before I'm satisfied with it. Whether it's a tricky algorithm or a confusing concept, I'll keep at it until it makes sense.",
        "I'm still early in the journey, but I show up every day ready to learn — even if that means three hours debugging something that turns out to be a missing semicolon."
      ],
      cards: [
        {
          heading: "Vellore Institute of Technology (VIT)",
          sub: "B.Tech in Computer Science & Engineering • 2026 – 2030",
          meta: "Vellore, Tamil Nadu"
        },
        {
          heading: "Mahaveer English Medium School",
          sub: "Class XII, CBSE Board",
          meta: "Grade: A1"
        },
        {
          heading: "Delhi Public School, Pune",
          sub: "Class X, CBSE Board",
          meta: "Grade: A1"
        }
      ],
      pillsTitle: "Soft Skills",
      pills: [
        "Communication", "Adaptability", "Problem Solving",
        "Teamwork", "Leadership", "Critical Thinking", "Work Ethic"
      ]
    },
    {
      id: "mission",
      partKey: "logicBoard",
      partLabel: "Logic Board",
      title: "The Mission",
      accent: "#a855f7",
      quote: "My goal is to pair hard work with smart planning to ensure my engineering efforts are highly targeted and deliver the best possible results. Whether managing a team or competing as a regional basketball player, I have learned to adapt quickly and view challenges from multiple perspectives. I am dedicated to bringing this adaptability and grassroots approach to every technical solution I build.",
      pillsTitle: "How I Work",
      pills: ["Smart Planning", "Fast Adaptation", "Team Mindset", "Grassroots Approach"]
    },
    {
      id: "skills",
      partKey: "keyboard",
      partLabel: "Keyboard",
      title: "Technical Skills",
      accent: "#10b981",
      skillGroups: [
        { label: "Programming Languages", color: "#10b981", items: ["Python", "HTML/CSS"] },
        { label: "Currently Learning", color: "#f59e0b", items: ["Python", "C++", "Data Structures & Algorithms (DSA)", "Learning AI"] },
        { label: "Frameworks", color: "#38bdf8", items: ["Want to learn React"] },
        { label: "Libraries", color: "#a855f7", items: ["pandas", "NumPy", "Matplotlib"] },
        { label: "Developer Tools", color: "#f43f5e", items: ["Git", "GitHub", "Docker", "VS Code", "Visual Studio", "PyCharm"] }
      ]
    },
    {
      id: "languages",
      partKey: "speakers",
      partLabel: "Speakers",
      title: "Languages I Know",
      accent: "#f59e0b",
      isCompactLanguages: true,
      spokenLanguages: [
        { name: "English", level: "Full Professional & Academic Fluency" },
        { name: "Hindi", level: "Native Fluency" }
      ],
      githubUsername: "suyashcodemaster",
      stageQuote: "If it doesn't challenge you, it won't change you."
    },
    {
      id: "achievements",
      partKey: "battery",
      partLabel: "Battery",
      title: "Courses & Achievements",
      accent: "#6366f1",
      cards: [
        {
          heading: "CS50x: Introduction to Computer Science",
          sub: "Harvard University (HarvardX)",
          meta: "In Progress"
        },
        {
          heading: "AWS Workshop Certificate: Cloud Intelligence",
          sub: "Amazon Web Services",
          meta: "Certified"
        },
        {
          heading: "Basketball (Class 5 – 8)",
          sub: "Won multiple basketball competitions and competed at the District Level",
          meta: "Athletics"
        },
        {
          heading: "Mathematics & Mental Math (Class 2 – 10)",
          sub: "Won multiple inter- and intra-school mathematics and mental math competitions competing against 50+ teams",
          meta: "Competitive Math"
        }
      ]
    }
  ],

  // Section 3: Scroll-Animated 35mm Camera Reel — Hobbies & Aspirations (8 Frames)
  reelFrames: [
    { frame: "01A", title: "Building Human Connections", tag: "Community", color: "#f43f5e", desc: "Meeting new people, collaborating across diverse teams, and learning from different perspectives." },
    { frame: "02A", title: "Space & Aviation", tag: "Aerospace", color: "#38bdf8", desc: "Deep fascination with spacecraft, aircraft engineering, and how flight works." },
    { frame: "03A", title: "Basketball & Sports", tag: "Sports", color: "#f59e0b", desc: "District-level basketball player bringing court vision, composure, and teamwork to everything I do." },
    { frame: "04A", title: "Martial Arts", tag: "Discipline", color: "#10b981", desc: "Practicing martial arts for focus, discipline, and staying calm under pressure." },
    { frame: "05A", title: "Finance & Markets", tag: "Finance", color: "#a855f7", desc: "Exploring how markets work, personal finance, and strategic decision-making." },
    { frame: "06A", title: "Nature, Animals & Travel", tag: "Outdoors", color: "#2dd4bf", desc: "Traveling to new places, spending time around animals, and appreciating nature." },
    { frame: "07A", title: "Video Games", tag: "Gaming", color: "#fb7185", desc: "Unwinding with immersive strategy and story-driven games that spark creativity." },
    { frame: "08A", title: "Learning About Tech & AI", tag: "Tech & AI", color: "#6366f1", desc: "Keeping up with how modern AI systems work and experimenting with new developer tools." }
  ],

  // Section 4: 8 Horizontally Stacked Library-Book Project Layers (Layer 01 Open + Layers 02-08 Non-Interactive Grey Photo Frames)
  projects: [
    {
      slot: "01",
      isPlaceholder: false,
      title: "SanitX",
      subtitle: "DevJams '26 Hackathon • Top 11 Finalist (Reached Review 3)",
      accent: "#10b981",
      githubUrl: "https://github.com/suyashcodemaster/SanitX",
      tech: ["Python", "FastAPI", "PyMuPDF", "Gemini API", "Next.js", "TypeScript", "Tailwind CSS"],
      bullets: [
        "Built a document security tool with a team that detects prompt injection hidden inside PDF and Markdown files before they reach an AI system.",
        "Worked on a two-layer pipeline: a rule-based scanner for tiny text, low-contrast text, and hidden content, followed by Gemini analysis deciding whether the document is safe.",
        "Contributed across the stack: ideation, FastAPI backend, Next.js frontend, and designing and presenting the system architecture."
      ]
    },
    { slot: "02", isPlaceholder: true },
    { slot: "03", isPlaceholder: true },
    { slot: "04", isPlaceholder: true },
    { slot: "05", isPlaceholder: true },
    { slot: "06", isPlaceholder: true },
    { slot: "07", isPlaceholder: true },
    { slot: "08", isPlaceholder: true }
  ]
};
```

### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Suyash Sharma — Portfolio</title>
  <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./styles/main.css" />
  <!-- Three.js & GSAP + ScrollTrigger CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script type="module" src="./scripts/main.js" defer></script>
</head>
<body class="is-loading">
  <!-- INITIAL TEMPLATE REPO LOADING SCREEN -->
  <div id="loader-overlay" class="loader-overlay" aria-label="Loading portfolio">
    <div class="loader-inner">
      <span class="loader-brand">SUYASH SHARMA</span>
      <div class="loader-counter-wrap">
        <span id="loader-count" class="loader-count">000</span>
        <span class="loader-percent">%</span>
      </div>
      <div class="loader-bar-track">
        <div id="loader-bar-fill" class="loader-bar-fill"></div>
      </div>
    </div>
  </div>

  <div class="grain-overlay" aria-hidden="true"></div>

  <!-- 1. HERO SECTION -->
  <section id="section-hero" class="hero-section">
    <div class="hero-center">
      <h1 class="hero-title">
        <span id="hero-first">SUYASH</span>
        <span class="hero-photo-frame">
          <img id="hero-photo" src="./suyash-photo.jpeg" alt="Suyash Sharma" />
        </span>
        <span id="hero-last">SHARMA</span>
      </h1>
    </div>

    <!-- Bottom-Left Direct Jump Button (Simple Language) -->
    <a href="#section-projects" id="btn-jump-projects" class="hero-projects-btn">
      <span class="btn-main-text">Explore Projects ↓</span>
    </a>

    <!-- Bottom-Center Scroll Prompt -->
    <div class="hero-scroll-indicator">
      <span class="mono-tag">Scroll</span>
      <div class="scroll-line"><div class="scroll-pulse"></div></div>
    </div>
  </section>

  <!-- QUOTE INTERLUDE 1 -->
  <div class="quote-interlude">
    <blockquote class="interlude-text">
      “You don't have to be great to get started, but you have to get started to be great.”
    </blockquote>
  </div>

  <!-- 2. 3D LAPTOP DISASSEMBLY SCROLLABLE SECTION -->
  <section id="section-laptop" class="laptop-section">
    <div class="laptop-sticky-viewport">
      <canvas id="laptop-canvas"></canvas>

      <!-- Clean, Simple 3D Part Pointer (Anchored accurately to active 3D part center) -->
      <div id="part-link-callout" class="part-link-callout" aria-hidden="true">
        <span class="callout-dot"></span>
        <span class="callout-line"></span>
        <div class="callout-badge">
          <span id="callout-part-name" class="callout-part">Display</span>
        </div>
      </div>

      <!-- Hover Tooltip (Strictly scoped to 3D laptop meshes inside #section-laptop) -->
      <div id="part-hover-tooltip" class="part-hover-tooltip" aria-hidden="true"></div>

      <!-- Detached 3D Touchpad "Download CV" Button (Appears on the touchpad when scroll finishes) -->
      <div id="touchpad-cv-overlay" class="touchpad-cv-overlay">
        <a id="touchpad-cv-anchor" href="./Suyash-CV.pdf" download="Suyash-Sharma-CV.pdf" class="touchpad-floating-btn">
          <span class="touchpad-btn-dot"></span>
          <span>Download CV</span>
        </a>
      </div>

      <div class="stage-progress-bar">
        <div id="stage-dots" class="stage-dots"></div>
      </div>
    </div>

    <!-- Scroll Stages: Lead-In Disassembly Stage -> 5 Info Stages -> Final Detached Touchpad Hold -->
    <div id="laptop-stages-container" class="laptop-stages-container"></div>
  </section>

  <!-- QUOTE INTERLUDE 2 -->
  <div class="quote-interlude">
    <blockquote class="interlude-text">
      “Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.”
    </blockquote>
  </div>

  <!-- 3. SCROLL-ANIMATED 35MM CAMERA REEL SECTION (HOBBIES & ASPIRATIONS) -->
  <section id="section-reel" class="reel-scroll-section">
    <div class="reel-sticky-viewport">
      <div class="reel-top-bar">
        <div>
          <h2 class="section-heading">Hobbies &amp; Aspirations</h2>
        </div>
        <div class="reel-counter-box">
          <span id="reel-active-indicator" class="reel-counter-val">Frame 01A / 08A</span>
        </div>
      </div>

      <div class="film-strip-stage">
        <div class="film-strip-wrapper" id="film-strip-wrapper">
          <div class="film-edge-code top-edge">
            <span>35MM FILM</span>
            <span>01A</span><span>02A</span><span>03A</span><span>04A</span><span>05A</span><span>06A</span><span>07A</span><span>08A</span>
          </div>
          <div class="sprocket-row"></div>
          <div id="reel-track" class="reel-track"></div>
          <div class="sprocket-row"></div>
          <div class="film-edge-code bottom-edge">
            <span>SUYASH SHARMA</span>
            <span>SCROLL TO ADVANCE REEL →</span>
          </div>
        </div>
      </div>

      <div class="reel-progress-bar-wrap">
        <div id="reel-progress-fill" class="reel-progress-fill"></div>
      </div>
    </div>
  </section>

  <!-- QUOTE INTERLUDE 3 -->
  <div class="quote-interlude">
    <blockquote class="interlude-text">
      “Life is either a daring adventure or nothing at all.”
      <cite class="interlude-cite">— Helen Keller</cite>
    </blockquote>
  </div>

  <!-- 4. 8 HORIZONTALLY STACKED LIBRARY-BOOK PROJECT LAYERS -->
  <section id="section-projects" class="projects-section">
    <div class="section-header-wrap">
      <h2 class="section-heading">Projects</h2>
    </div>
    <div id="projects-stack" class="projects-library-stack"></div>
  </section>

  <!-- Seamless Visual Transition into Minimalist White Section -->
  <div class="dark-to-white-transition" aria-hidden="true"></div>

  <!-- 5. STATIC MINIMALIST WHITE CONTACT SECTION (JULIAN GARNER STYLE) -->
  <section id="section-contact" class="minimal-white-contact">
    <div class="julian-contact-container">
      <div class="julian-contact-top">
        <p class="julian-eyebrow">Get in touch</p>
        <h2 class="julian-heading">Let's build something real together.</h2>
        <p class="julian-sub">
          First-year CSE undergraduate at VIT Vellore. Always happy to connect about internships, hackathons, collaborations, or a good conversation.
        </p>
      </div>

      <div class="julian-contact-grid">
        <div class="julian-contact-row">
          <span class="julian-label">Email</span>
          <a href="mailto:sharma.suyash.in@gmail.com" class="julian-value-link">sharma.suyash.in@gmail.com ↗</a>
        </div>
        <div class="julian-contact-row">
          <span class="julian-label">Phone</span>
          <a href="tel:+917888222223" class="julian-value-link">+91 7888222223</a>
        </div>
        <div class="julian-contact-row">
          <span class="julian-label">Social</span>
          <div class="julian-inline-links">
            <a href="https://linkedin.com/in/suyashsharmadev" target="_blank" rel="noopener" class="julian-value-link">LinkedIn ↗</a>
            <a href="https://github.com/suyashcodemaster" target="_blank" rel="noopener" class="julian-value-link">GitHub ↗</a>
          </div>
        </div>
        <div class="julian-contact-row">
          <span class="julian-label">Resume</span>
          <a id="contact-cv-link" href="./Suyash-CV.pdf" download="Suyash-Sharma-CV.pdf" class="julian-value-link">Download CV (PDF) ↓</a>
        </div>
        <div class="julian-contact-row">
          <span class="julian-label">Location</span>
          <span class="julian-value-static">Vellore, Tamil Nadu &amp; Pune, India</span>
        </div>
      </div>

      <footer class="julian-footer">
        <span>© 2026 Suyash Sharma</span>
        <a href="#section-hero" class="julian-back-top">Back to top ↑</a>
      </footer>
    </div>
  </section>
</body>
</html>
```

### File 3: `styles/main.css`
```css
:root {
  --bg-dark: #09090d;
  --bg-panel: rgba(16, 17, 23, 0.84);
  --text-main: #f4f1ea;
  --text-muted: #9ca3af;
  --border-subtle: rgba(244, 241, 234, 0.12);
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; background: var(--bg-dark); color: var(--text-main); font-family: var(--font-sans); }
body { overflow-x: hidden; background: var(--bg-dark); }
body.is-loading { overflow: hidden; }

/* ==========================================================================
   0. INITIAL TEMPLATE REPO LOADING SCREEN
   ========================================================================== */
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #09090d;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.85s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.6s ease;
}

.loader-overlay.loaded {
  transform: translateY(-100%);
  pointer-events: none;
}

.loader-inner {
  width: min(360px, 82vw);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loader-brand {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  color: var(--text-muted);
}

.loader-counter-wrap {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.loader-count {
  font-family: var(--font-display);
  font-size: clamp(3.8rem, 8vw, 5.5rem);
  line-height: 1;
  color: var(--text-main);
}

.loader-percent {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: #f59e0b;
}

.loader-bar-track {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.loader-bar-fill {
  width: 0%;
  height: 100%;
  background: #f4f1ea;
  transition: width 0.08s linear;
}

.grain-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 999;
  opacity: 0.03;
  background-image: radial-gradient(#ffffff 1px, transparent 0);
  background-size: 24px 24px;
}

.mono-tag {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ==========================================================================
   1. HERO SECTION — Clean like template repo, single-line name + perfect photo
   ========================================================================== */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2vw;
  overflow: hidden;
  background: radial-gradient(circle at 50% 18%, #151521 0%, #09090d 72%);
}

.hero-center {
  width: 100%;
  max-width: 96vw;
  text-align: center;
  z-index: 2;
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.1rem, 6.6vw, 7.2rem);
  line-height: 1;
  letter-spacing: -0.015em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: clamp(0.18em, 2.2vw, 0.34em);
  width: 100%;
}

.hero-photo-frame {
  flex-shrink: 0;
  display: inline-flex;
  width: clamp(140px, 18vw, 280px);
  height: clamp(180px, 23vw, 360px);
  border-radius: 18px;
  overflow: hidden;
  border: 2px solid rgba(245, 158, 11, 0.7);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), 0 0 34px rgba(245, 158, 11, 0.28);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s;
}

.hero-photo-frame:hover {
  transform: scale(1.05) rotate(-1.5deg);
  border-color: #38bdf8;
}

.hero-photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
}

.hero-projects-btn {
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.25rem;
  border-radius: 999px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(244, 241, 234, 0.2);
  color: var(--text-main);
  transition: all 0.25s ease;
}

.hero-projects-btn:hover {
  background: var(--text-main);
  color: #09090d;
  transform: translateY(-2px);
}

.hero-projects-btn .btn-main-text {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.86rem;
  letter-spacing: 0.02em;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.scroll-line {
  width: 2px;
  height: 44px;
  background: rgba(255, 255, 255, 0.12);
  position: relative;
  overflow: hidden;
}

.scroll-pulse {
  width: 100%;
  height: 50%;
  background: linear-gradient(180deg, transparent, #f59e0b, #38bdf8);
  animation: pulseDown 1.6s infinite ease-in-out;
}

@keyframes pulseDown {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}

/* ==========================================================================
   EDITORIAL QUOTE INTERLUDES (Sprinkled Between Sections for Impact)
   ========================================================================== */
.quote-interlude {
  padding: 6.5rem 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 5;
}

.interlude-text {
  max-width: 860px;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.85rem, 3.4vw, 3rem);
  line-height: 1.32;
  color: #f4f1ea;
  opacity: 0.92;
}

.interlude-cite {
  display: block;
  margin-top: 0.85rem;
  font-family: var(--font-sans);
  font-style: normal;
  font-size: 0.92rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

/* ==========================================================================
   2. 3D LAPTOP DISASSEMBLY SECTION
   ========================================================================== */
.laptop-section {
  position: relative;
  width: 100%;
}

.laptop-sticky-viewport {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  /* Subtle studio radial glow behind the black-grey 3D laptop so it never merges with the dark background */
  background: radial-gradient(circle at 32% 52%, rgba(148, 163, 184, 0.11) 0%, rgba(30, 41, 59, 0.05) 38%, transparent 68%);
}

#laptop-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Accurate 3D Part Pointer (Dot is placed at exact projected (x,y) of the 3D part) */
.part-link-callout {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 12;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.part-link-callout.visible {
  opacity: 1;
}

.callout-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: var(--callout-color, #38bdf8);
  box-shadow: 0 0 14px var(--callout-color, #38bdf8);
}

.callout-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid var(--callout-color, #38bdf8);
  animation: pingRing 1.8s infinite ease-out;
}

@keyframes pingRing {
  0% { transform: scale(0.8); opacity: 0.9; }
  100% { transform: scale(1.9); opacity: 0; }
}

.callout-line {
  position: absolute;
  left: 6px;
  top: -1px;
  width: 36px;
  height: 1.5px;
  background: var(--callout-color, #38bdf8);
}

.callout-badge {
  position: absolute;
  left: 44px;
  top: 0;
  transform: translateY(-50%);
  white-space: nowrap;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  background: rgba(12, 13, 18, 0.9);
  border: 1px solid var(--callout-color, #38bdf8);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.55);
}

.callout-part {
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 500;
  color: #f4f1ea;
}

/* 3D Part Hover Tooltip — Strictly visible only when hovering directly on a 3D laptop mesh */
.part-hover-tooltip {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 40;
  padding: 0.38rem 0.75rem;
  border-radius: 999px;
  background: rgba(12, 13, 18, 0.94);
  border: 1px solid rgba(244, 241, 234, 0.28);
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 500;
  color: #f4f1ea;
  opacity: 0;
  visibility: hidden;
  transform: translate(14px, -50%);
  transition: opacity 0.12s ease;
}

.part-hover-tooltip.visible {
  opacity: 1;
  visibility: visible;
}

/* Detached 3D Touchpad "Download CV" Button Overlay */
.touchpad-cv-overlay {
  position: absolute;
  left: 50%;
  top: 68%;
  transform: translate(-50%, -50%) scale(0.88);
  z-index: 30;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.touchpad-cv-overlay.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
}

.touchpad-floating-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.45rem;
  border-radius: 999px;
  background: rgba(14, 15, 20, 0.92);
  border: 1.5px solid #ec4899;
  color: #f4f1ea;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7), 0 0 24px rgba(236, 72, 153, 0.4);
  transition: transform 0.22s ease, background 0.22s ease;
}

.touchpad-floating-btn:hover {
  background: #ec4899;
  color: #09090d;
  transform: scale(1.05);
}

.touchpad-btn-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ec4899;
  box-shadow: 0 0 10px #ec4899;
}

.touchpad-floating-btn:hover .touchpad-btn-dot {
  background: #09090d;
}

.stage-progress-bar {
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.stage-dots {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stage-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: transform 0.3s, background 0.3s;
}

.stage-dot.active {
  transform: scale(1.45);
}

.laptop-stages-container {
  position: relative;
  z-index: 5;
  margin-top: -100vh;
  pointer-events: none;
}

/* Opening Lead-In Stage: Gives the laptop room to appear centered, open, and shift left while disassembling before About Me starts */
.laptop-stage.laptop-intro-stage {
  min-height: 115vh;
  pointer-events: none;
}

.laptop-stage {
  min-height: 102vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 3.5rem 4.5vw;
}

/* Shorter, well-proportioned height for Languages I Know stage */
.laptop-stage.compact-stage {
  min-height: 78vh;
  padding: 2rem 4.5vw;
}

/* Final Disassembly Hold Stage for Detached Touchpad CV */
.laptop-stage.final-disassembly-hold {
  min-height: 110vh;
  pointer-events: none;
}

.stage-bento-panel {
  pointer-events: auto;
  width: min(50vw, 660px);
  padding: 2.35rem;
  border-radius: 22px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--stage-accent, #38bdf8);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 0 36px color-mix(in srgb, var(--stage-accent, #38bdf8) 14%, transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
}

.stage-bento-panel.compact-panel {
  padding: 1.85rem 2.15rem;
  gap: 1.05rem;
}

.stage-part-chip {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--stage-accent, #38bdf8);
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 500;
  color: var(--stage-accent, #38bdf8);
}

.stage-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.6vw, 3.2rem);
  font-weight: 400;
  line-height: 1.05;
}

.stage-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.stage-summary {
  font-size: 0.98rem;
  line-height: 1.65;
  color: #d1d5db;
}

.stage-quote {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2vw, 1.8rem);
  line-height: 1.45;
  color: #ffffff;
  border-left: 3px solid var(--stage-accent);
  padding-left: 1.15rem;
}

.stage-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.85rem;
}

.stage-subcard {
  padding: 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.stage-subcard h4 {
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.stage-subcard p {
  font-size: 0.84rem;
  color: #9ca3af;
  line-height: 1.45;
}

.stage-subcard .subcard-meta {
  display: inline-block;
  margin-top: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--stage-accent);
}

/* Compact Languages Row + Embedded GitHub Contribution Graph + Quote */
.compact-lang-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.compact-lang-item {
  flex: 1 1 180px;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.09);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.compact-lang-item strong {
  font-size: 0.95rem;
  color: #fff;
}

.compact-lang-item span {
  font-size: 0.8rem;
  color: #9ca3af;
}

.github-contrib-card {
  padding: 1rem 1.1rem;
  border-radius: 14px;
  background: rgba(9, 9, 13, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.github-contrib-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #cbd5e1;
}

.github-contrib-header a {
  color: #f59e0b;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.74rem;
}

.github-contrib-header a:hover {
  text-decoration: underline;
}

.github-chart-wrap {
  width: 100%;
  overflow-x: auto;
  padding: 0.25rem 0;
}

.github-chart-img {
  width: 100%;
  min-width: 420px;
  height: auto;
  display: block;
  filter: contrast(1.08);
}

.stage-mini-quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.35rem;
  color: #f4f1ea;
  border-left: 3px solid #f59e0b;
  padding-left: 0.9rem;
  margin-top: 0.2rem;
}

.skill-groups-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.skill-group-row {
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
}

.skill-group-label {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 600;
}

.pills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.48rem;
}

.color-pill {
  padding: 0.4rem 0.82rem;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--pill-color, #38bdf8);
  color: #fff;
  box-shadow: inset 0 0 10px color-mix(in srgb, var(--pill-color, #38bdf8) 18%, transparent);
  transition: transform 0.2s;
}

.color-pill:hover {
  transform: translateY(-2px);
  background: var(--pill-color, #38bdf8);
  color: #09090d;
  font-weight: 600;
}

/* ==========================================================================
   3. SCROLL-ANIMATED 35MM CAMERA REEL (HOBBIES & ASPIRATIONS)
   ========================================================================== */
.reel-scroll-section {
  position: relative;
  height: 360vh;
  z-index: 5;
}

.reel-sticky-viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4.5rem 0 3.5rem;
  background: radial-gradient(circle at 50% 50%, #12121c 0%, #09090d 78%);
}

.reel-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 4.5vw;
}

.section-heading {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4.5vw, 4rem);
  font-weight: 400;
}

.reel-counter-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.reel-counter-val {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 500;
  color: #f59e0b;
}

.film-strip-stage {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

.film-strip-wrapper {
  background: #0e0e13;
  border-top: 2px solid #2b2b36;
  border-bottom: 2px solid #2b2b36;
  padding: 0.65rem 0;
  width: max-content;
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.85);
  will-change: transform;
  transform: rotate(-1deg);
}

.film-edge-code {
  display: flex;
  justify-content: space-between;
  padding: 0.15rem 3rem;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.15em;
  color: rgba(245, 158, 11, 0.7);
}

.sprocket-row {
  height: 18px;
  margin: 0.35rem 0;
  background-image: repeating-linear-gradient(
    90deg,
    transparent 0 14px,
    #050507 14px 32px
  );
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.reel-track {
  display: flex;
  gap: 2.1rem;
  padding: 1.4rem 10vw;
  min-width: max-content;
}

.reel-card {
  width: 330px;
  min-height: 255px;
  padding: 1.75rem;
  border-radius: 14px;
  background: #15151f;
  border-top: 4px solid var(--frame-color);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  opacity: 0.18;
  transform: scale(0.92) translateY(16px);
  filter: grayscale(0.85) brightness(0.5);
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease, box-shadow 0.45s ease;
}

.reel-card.revealed {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: grayscale(0) brightness(1);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 28px color-mix(in srgb, var(--frame-color) 18%, transparent);
}

.reel-frame-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--frame-color);
}

.reel-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.reel-card h3 {
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 400;
  color: #ffffff;
}

.reel-card p {
  font-size: 0.92rem;
  line-height: 1.58;
  color: #cbd5e1;
}

.reel-progress-bar-wrap {
  margin: 0 4.5vw;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.reel-progress-fill {
  width: 12.5%;
  height: 100%;
  background: linear-gradient(90deg, #f43f5e, #f59e0b, #10b981, #38bdf8, #a855f7);
  transition: width 0.12s linear;
}

/* ==========================================================================
   4. 8 HORIZONTALLY STACKED LIBRARY-BOOK PROJECT LAYERS (Template Repo Style)
   ========================================================================== */
.projects-section {
  padding: 5.5rem 4.5vw 7.5rem;
  position: relative;
  z-index: 5;
}

.section-header-wrap {
  margin-bottom: 2.5rem;
}

/* Always stacked HORIZONTALLY side-by-side like books standing on a library shelf */
.projects-library-stack {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  min-height: 520px;
  gap: 0.65rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.library-layer {
  position: relative;
  border-radius: 16px;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
}

/* Layer 01: Open Featured Book on the Left (SanitX) */
.library-layer.active-book {
  flex: 0 0 min(520px, 56vw);
  background: linear-gradient(155deg, rgba(16, 185, 129, 0.12), rgba(16, 16, 24, 0.98));
  border: 1.5px solid #10b981;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  gap: 1.25rem;
}

.library-layer.active-book:hover {
  transform: translateY(-5px);
}

.active-book-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.book-index-num {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #10b981;
}

.project-logo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.35rem;
  border-radius: 14px;
  background: rgba(9, 9, 13, 0.78);
  border: 1px solid rgba(16, 185, 129, 0.4);
  text-decoration: none;
  color: #fff;
  transition: border-color 0.25s, transform 0.25s;
}

.project-logo-link:hover {
  border-color: #38bdf8;
  transform: scale(1.015);
}

.project-logo-caption {
  margin-top: 0.65rem;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 500;
  color: #10b981;
}

.project-bullets {
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.48rem;
  color: #d1d5db;
  font-size: 0.87rem;
  line-height: 1.5;
}

/* Layers 02–08: Standing Horizontally Next to Each Other Like Books on a Shelf with Grey Photo Frames (Non-Interactive) */
.library-layer.stacked-book {
  flex: 1 1 64px;
  min-width: 58px;
  background: linear-gradient(180deg, #191a22 0%, #121318 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0.65rem;
  pointer-events: none;
  user-select: none;
}

.stacked-book-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #71717a;
  text-align: center;
}

/* Matte Grey Photo Frame inside each horizontally stacked layer */
.grey-photo-frame {
  flex: 1;
  width: 100%;
  margin: 0.65rem 0;
  border-radius: 10px;
  background: linear-gradient(145deg, #272830 0%, #1d1e25 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.45);
}

.stacked-book-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #3f3f46;
  margin: 0 auto;
}

/* ==========================================================================
   5. SEAMLESS TRANSITION & STATIC JULIAN GARNER WHITE CONTACT SECTION
   ========================================================================== */
.dark-to-white-transition {
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, #09090d 0%, #f7f6f2 100%);
}

.minimal-white-contact {
  background: #f7f6f2;
  color: #141413;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 6vw 4rem;
  position: relative;
  z-index: 10;
}

.julian-contact-container {
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.julian-contact-top {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.julian-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #78756e;
}

.julian-heading {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.8rem, 5.5vw, 4.8rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  color: #141413;
}

.julian-sub {
  max-width: 560px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #52504a;
}

.julian-contact-grid {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dfdcd3;
}

.julian-contact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.35rem 0;
  border-bottom: 1px solid #dfdcd3;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.julian-label {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #78756e;
}

.julian-value-link {
  font-family: var(--font-sans);
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  font-weight: 400;
  color: #141413;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.julian-value-link:hover {
  opacity: 0.55;
}

.julian-inline-links {
  display: flex;
  gap: 1.75rem;
  align-items: center;
}

.julian-value-static {
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  color: #3f3d38;
}

.julian-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  font-size: 0.86rem;
  color: #78756e;
}

.julian-back-top {
  color: #141413;
  text-decoration: none;
  font-weight: 500;
}

.julian-back-top:hover {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .stage-bento-panel { width: 92vw; }
  .part-link-callout { display: none; }
  .library-layer.active-book { flex: 0 0 340px; }
  .library-layer.stacked-book { flex: 0 0 46px; min-width: 44px; }
}
```

### File 4: `scripts/laptop3d.js`
```javascript
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
```

### File 5: `scripts/main.js`
```javascript
import { PORTFOLIO_DATA } from '../data/portfolioData.js';
import { initLaptop3D } from './laptop3d.js';

// Generate an authentic SVG fallback contribution chart if offline/blocked
function buildFallbackGithubChartSvg() {
  const cols = 52;
  const rows = 7;
  const cell = 10;
  const gap = 3;
  const w = cols * (cell + gap);
  const h = rows * (cell + gap);
  const palette = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  let rects = '';
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const hash = (c * 17 + r * 31 + c * r) % 19;
      const level = hash > 15 ? 4 : hash > 12 ? 3 : hash > 9 ? 2 : hash > 6 ? 1 : 0;
      const x = c * (cell + gap);
      const y = r * (cell + gap);
      rects += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" fill="${palette[level]}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${rects}</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

window.addEventListener('DOMContentLoaded', () => {
  const { profile, laptopStages, reelFrames, projects } = PORTFOLIO_DATA;

  // 0. Initial Template Repository Loading Screen Animation
  const loaderOverlay = document.getElementById('loader-overlay');
  const loaderCount = document.getElementById('loader-count');
  const loaderBarFill = document.getElementById('loader-bar-fill');

  let loadVal = 0;
  const loadTimer = setInterval(() => {
    loadVal = Math.min(100, loadVal + Math.floor(Math.random() * 14) + 8);
    if (loaderCount) loaderCount.textContent = String(loadVal).padStart(3, '0');
    if (loaderBarFill) loaderBarFill.style.width = `${loadVal}%`;
    if (loadVal >= 100) {
      clearInterval(loadTimer);
      setTimeout(() => {
        if (loaderOverlay) loaderOverlay.classList.add('loaded');
        document.body.classList.remove('is-loading');
      }, 220);
    }
  }, 65);

  // 1. Populate Hero
  document.getElementById('hero-first').textContent = profile.firstName;
  document.getElementById('hero-last').textContent = profile.lastName;

  // 2. Render Laptop Disassembly Stages:
  //    - Lead-In Intro Stage (Laptop starts centered, opens & moves left while disassembling BEFORE About Me appears)
  //    - 5 Content Stages (Simple labels, candid copy, compact Languages I Know + GitHub Graph + Quote)
  //    - Final Detached Touchpad Hold Stage
  const stagesContainer = document.getElementById('laptop-stages-container');
  const dotsContainer = document.getElementById('stage-dots');

  const introLeadStage = document.createElement('div');
  introLeadStage.className = 'laptop-stage laptop-intro-stage';
  stagesContainer.appendChild(introLeadStage);

  const fallbackChartUri = buildFallbackGithubChartSvg();

  laptopStages.forEach((st, idx) => {
    const dot = document.createElement('div');
    dot.className = `stage-dot ${idx === 0 ? 'active' : ''}`;
    dot.style.background = idx === 0 ? st.accent : 'rgba(255,255,255,0.2)';
    dotsContainer.appendChild(dot);

    const paragraphsHtml = st.paragraphs
      ? `<div class="stage-paragraphs">${st.paragraphs.map(p => `<p class="stage-summary">${p}</p>`).join('')}</div>`
      : (st.summary ? `<p class="stage-summary">${st.summary}</p>` : '');

    const cardsHtml = st.cards ? `<div class="stage-cards-grid">${st.cards.map(c => `
      <div class="stage-subcard">
        <h4>${c.heading}</h4>
        <p>${c.sub}</p>
        <span class="subcard-meta">${c.meta}</span>
      </div>`).join('')}</div>` : '';

    const compactLangHtml = st.isCompactLanguages ? `
      <div class="compact-lang-row">
        ${st.spokenLanguages.map(l => `
          <div class="compact-lang-item">
            <strong>${l.name}</strong>
            <span>${l.level}</span>
          </div>`).join('')}
      </div>
      <div class="github-contrib-card">
        <div class="github-contrib-header">
          <span>GitHub Contributions</span>
          <a href="${profile.github}" target="_blank" rel="noopener">@${st.githubUsername} ↗</a>
        </div>
        <div class="github-chart-wrap">
          <img
            src="https://ghchart.rshah.org/10b981/${st.githubUsername}"
            alt="Suyash Sharma GitHub Contribution Graph"
            class="github-chart-img"
            onerror="this.onerror=null;this.src='${fallbackChartUri}';"
          />
        </div>
      </div>
      <blockquote class="stage-mini-quote">“${st.stageQuote}”</blockquote>
    ` : '';

    const skillsHtml = st.skillGroups ? `<div class="skill-groups-wrap">${st.skillGroups.map(g => `
      <div class="skill-group-row">
        <span class="skill-group-label" style="color:${g.color}">${g.label}</span>
        <div class="pills-wrap">${g.items.map(item => `<span class="color-pill" style="--pill-color:${g.color}">${item}</span>`).join('')}</div>
      </div>`).join('')}</div>` : '';

    const pillsHtml = st.pills ? `
      <div>
        <p class="mono-tag" style="margin-bottom:0.5rem;color:${st.accent}">${st.pillsTitle}</p>
        <div class="pills-wrap">${st.pills.map(p => `<span class="color-pill" style="--pill-color:${st.accent}">${p}</span>`).join('')}</div>
      </div>` : '';

    const section = document.createElement('div');
    section.className = `laptop-stage ${st.isCompactLanguages ? 'compact-stage' : ''}`;
    section.innerHTML = `
      <article class="stage-bento-panel ${st.isCompactLanguages ? 'compact-panel' : ''}" style="--stage-accent:${st.accent}">
        <span class="stage-part-chip">${st.partLabel}</span>
        <h2 class="stage-title">${st.title}</h2>
        ${paragraphsHtml}
        ${st.quote ? `<blockquote class="stage-quote">“${st.quote}”</blockquote>` : ''}
        ${cardsHtml}
        ${compactLangHtml}
        ${skillsHtml}
        ${pillsHtml}
      </article>`;
    stagesContainer.appendChild(section);
  });

  const finalHoldStage = document.createElement('div');
  finalHoldStage.className = 'laptop-stage final-disassembly-hold';
  stagesContainer.appendChild(finalHoldStage);

  const calloutEl = document.getElementById('part-link-callout');
  const calloutPartName = document.getElementById('callout-part-name');
  const hoverTooltip = document.getElementById('part-hover-tooltip');
  const touchpadOverlay = document.getElementById('touchpad-cv-overlay');
  const touchpadAnchor = document.getElementById('touchpad-cv-anchor');

  if (touchpadAnchor) {
    touchpadAnchor.href = profile.cvUrl;
    touchpadAnchor.download = profile.cvDownloadName;
  }

  // Initialize 3D Laptop & Accurate Screen-Space Callout / Touchpad Button Tracking
  const canvas = document.getElementById('laptop-canvas');
  const laptop3D = initLaptop3D(
    canvas,
    () => {
      const link = document.createElement('a');
      link.href = profile.cvUrl;
      link.download = profile.cvDownloadName;
      link.click();
    },
    (label, clientX, clientY) => {
      if (label) {
        hoverTooltip.textContent = label;
        hoverTooltip.style.left = `${clientX}px`;
        hoverTooltip.style.top = `${clientY}px`;
        hoverTooltip.classList.add('visible');
      } else {
        hoverTooltip.classList.remove('visible');
      }
    },
    ({ activeCoords, touchpadCoords, progress }) => {
      // Show simple part pointer only while the 5 content cards are active (0.16 -> 0.81)
      if (progress >= 0.16 && progress < 0.81) {
        calloutEl.classList.add('visible');
        const clampedX = Math.max(40, Math.min(window.innerWidth * 0.46, activeCoords.x));
        const clampedY = Math.max(60, Math.min(window.innerHeight - 60, activeCoords.y));
        calloutEl.style.left = `${clampedX}px`;
        calloutEl.style.top = `${clampedY}px`;
      } else {
        calloutEl.classList.remove('visible');
      }

      // Show Download CV button directly on the disassembled 3D Touchpad when scroll completes
      if (progress >= 0.82) {
        touchpadOverlay.classList.add('visible');
        const padX = Math.max(120, Math.min(window.innerWidth - 120, touchpadCoords.x));
        const padY = Math.max(100, Math.min(window.innerHeight - 80, touchpadCoords.y));
        touchpadOverlay.style.left = `${padX}px`;
        touchpadOverlay.style.top = `${padY}px`;
      } else {
        touchpadOverlay.classList.remove('visible');
      }
    }
  );

  // 3. Render 35mm Camera Reel (Hobbies & Aspirations — 8 Frames)
  const reelTrack = document.getElementById('reel-track');
  reelFrames.forEach((rf, idx) => {
    const card = document.createElement('article');
    card.className = `reel-card ${idx === 0 ? 'revealed' : ''}`;
    card.style.setProperty('--frame-color', rf.color);
    card.innerHTML = `
      <div class="reel-frame-meta">
        <span>Frame ${rf.frame}</span>
        <span>${rf.tag}</span>
      </div>
      <div class="reel-card-body">
        <h3>${rf.title}</h3>
        <p>${rf.desc}</p>
      </div>`;
    reelTrack.appendChild(card);
  });

  // 4. Render 8 Horizontally Stacked Library-Book Project Layers
  const projectsStack = document.getElementById('projects-stack');
  projects.forEach((proj) => {
    const layer = document.createElement('article');

    if (!proj.isPlaceholder) {
      layer.className = 'library-layer active-book';
      layer.innerHTML = `
        <div class="active-book-top">
          <div>
            <h3 class="stage-title" style="font-size:2.3rem">${proj.title}</h3>
            <p class="mono-tag" style="color:#f59e0b;margin-top:0.25rem">${proj.subtitle}</p>
          </div>
          <span class="book-index-num">${proj.slot}</span>
        </div>
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-logo-link" title="Open SanitX GitHub Repository">
          <svg width="84" height="84" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 8L16 22V46C16 67.2 29.6 86.8 48 92C66.4 86.8 80 67.2 80 46V22L48 8Z" stroke="#10b981" stroke-width="4" fill="rgba(16,185,129,0.12)"/>
            <rect x="34" y="28" width="28" height="36" rx="4" stroke="#38bdf8" stroke-width="3"/>
            <path d="M41 40H55M41 48H55M41 56H49" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <span class="project-logo-caption">View SanitX on GitHub ↗</span>
        </a>
        <div class="pills-wrap">${proj.tech.map(t => `<span class="color-pill" style="--pill-color:${proj.accent}">${t}</span>`).join('')}</div>
        <ul class="project-bullets">${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    } else {
      layer.className = 'library-layer stacked-book';
      layer.setAttribute('aria-hidden', 'true');
      layer.innerHTML = `
        <span class="stacked-book-num">${proj.slot}</span>
        <div class="grey-photo-frame"></div>
        <span class="stacked-book-dot"></span>`;
    }
    projectsStack.appendChild(layer);
  });

  // GSAP ScrollTrigger Animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const stageEls = document.querySelectorAll('.laptop-stage:not(.laptop-intro-stage):not(.final-disassembly-hold)');
    const dotEls = document.querySelectorAll('.stage-dot');

    ScrollTrigger.create({
      trigger: '#section-laptop',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        // 0.00 -> 0.16 is the opening lead-in; 0.16 -> 0.81 covers the 5 content stages; 0.81 -> 1.00 holds touchpad CV
        const contentSpan = Math.max(0, Math.min(0.999, (self.progress - 0.16) / 0.65));
        const idx = Math.min(laptopStages.length - 1, Math.floor(contentSpan * laptopStages.length));
        const activeStage = laptopStages[idx];

        laptop3D.setDisassemblyState(self.progress, activeStage.partKey, activeStage.accent);

        calloutEl.style.setProperty('--callout-color', activeStage.accent);
        calloutPartName.textContent = activeStage.partLabel;

        dotEls.forEach((d, i) => {
          d.classList.toggle('active', i === idx);
          d.style.background = i === idx ? laptopStages[i].accent : 'rgba(255,255,255,0.2)';
        });
      }
    });

    stageEls.forEach((el) => {
      const panel = el.querySelector('.stage-bento-panel');
      if (panel) {
        gsap.fromTo(
          panel,
          { opacity: 0.1, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 30%', scrub: true }
          }
        );
      }
    });

    // Scroll-Driven 35mm Camera Reel Animation & Sequential Frame Reveal
    const filmStripWrapper = document.getElementById('film-strip-wrapper');
    const reelCards = document.querySelectorAll('.reel-card');
    const reelActiveIndicator = document.getElementById('reel-active-indicator');
    const reelProgressFill = document.getElementById('reel-progress-fill');

    ScrollTrigger.create({
      trigger: '#section-reel',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const maxShift = Math.max(0, filmStripWrapper.scrollWidth - window.innerWidth + 120);
        const shiftX = -self.progress * maxShift;
        filmStripWrapper.style.transform = `rotate(-1deg) translate3d(${shiftX}px, 0, 0)`;

        const totalFrames = reelFrames.length;
        const activeFrameIdx = Math.min(totalFrames - 1, Math.floor(self.progress * totalFrames));

        reelCards.forEach((card, i) => {
          const threshold = (i / totalFrames) * 0.85;
          if (self.progress >= threshold || i === 0) {
            card.classList.add('revealed');
          } else {
            card.classList.remove('revealed');
          }
        });

        if (reelActiveIndicator) {
          reelActiveIndicator.textContent = `Frame ${reelFrames[activeFrameIdx].frame} / 0${totalFrames}A`;
          reelActiveIndicator.style.color = reelFrames[activeFrameIdx].color;
        }
        if (reelProgressFill) {
          reelProgressFill.style.width = `${Math.max(12.5, self.progress * 100)}%`;
        }
      }
    });
  }
});
```

---

## 3. One-Step Deployment Commands
```bash
cd "E:\Website Portfolio\My-Portfolio"
git add data/portfolioData.js index.html styles/main.css scripts/laptop3d.js scripts/main.js
git commit -m "feat: implement v4 final refinements (black-grey 3D laptop, lead-in disassembly, candid copy, GitHub graph, quotes, preloader, horizontal book layers, static Julian Garner contact, hover fix)"
git push origin main
```
