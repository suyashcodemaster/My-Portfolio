# Project Handoff Document v6.0: Suyash Sharma — 3D Disassembling Laptop & Editorial Portfolio (`My-Portfolio`)

**Document Name:** `handoff-v6.md`  
**Version:** 6.0 (All 11 Final Refinements + Security Hardening Implemented)  
**Repository:** `https://github.com/suyashcodemaster/My-Portfolio`  
**Live Production URL:** `https://suyashcodemaster.vercel.app`  
**Primary Working Directory:** `E:\Website Portfolio\My-Portfolio`

---

## 1. Summary of All 11 Refinements & Security Fixes in v6.0

1. **Slower Initial Loading Screen (+1s), Removed Name from Loader & Added Landing Page Typewriter Effect (`index.html`, `styles/main.css`, `scripts/main.js`)**:
   - Removed `SUYASH SHARMA` from `#loader-overlay` and slowed the counter by 1 second (~4.1s total duration).
   - Once the loading screen finishes, `SUYASH` and `SHARMA` automatically type out character-by-character on the landing page (`runHeroTypewriter`) with a blinking cursor (non-scrollable).
2. **100% Flush-Closed Laptop at Start & Removed 3D Arched Wires (`scripts/laptop3d.js`)**:
   - Aligned the rear hinge pivot (`(0, 0.00, -1.00)`) and lid geometry (`z = -0.03`) with the top face of the base (`y = 0.00`) so when `display.rotation.x = Math.PI / 2` at `progress = 0`, the laptop is **100% flush-closed** with zero gap.
   - Kept internal boards hidden inside the closed clamshell until the lid hinges open past `openRatio > 0.12` so zero wires or parts ever poke out before disassembly begins.
   - Removed the 3D `TubeGeometry` arched wires while preserving the flat embedded PCB circuit lines and the dual spinning cooling fans.
3. **Steeply Angled Project Stack + Hover Pulls Card Forward to Exact Center + Blurs Website & Other Tabs (`index.html`, `styles/main.css`, `scripts/main.js`)**:
   - Angled the 8 horizontal cards more steeply (`rotateY(-40deg) rotateX(4deg)`) with `overflow: hidden` and clean internal spacing so text never spills out when angled.
   - On hovering Card `01` (*SanitX*), it computes the exact pixel distance to the viewport center and glides forward in 3D to the center (`translate3d(var(--center-shift), -16px, 220px) rotateY(0deg) scale(1.08)`) while blurring out the rest of the tabs (`.blurred-left` / `.blurred-right`) and the entire website (`#projects-focus-backdrop` with `backdrop-filter: blur(10px)`).
4. **Longer, Slower (~6s) *Contact Me* Bubble Stream Without Redundant Intro Messages (`data/portfolioData.js`, `scripts/main.js`, `styles/main.css`)**:
   - Removed the *"I'm Suyash..."* and *"I love building..."* bubbles.
   - Increased vertical spacing between bubbles and set the typing/reveal cadence to `1150ms` typing + `350ms` pause per bubble across the 4 bubbles (`6.0 seconds` total animation duration).
5. **Halved Vertical Space After the First Quote (`styles/main.css`, `scripts/main.js`)**:
   - Reduced `.first-quote-interlude` bottom padding to `0.4rem` and halved `.laptop-intro-stage` height from `118vh` to `55vh` without breaking any scroll physics or subsequent sections.
6. **Futuristic Curved Dome Keycap Pop-Out (`scripts/laptop3d.js`)**:
   - As the laptop disassembles, all 44 individual keycaps levitate upward and outward in a smooth 3D parabolic dome curve (`domeHeight = Math.max(0, 1 - (nx*nx*0.62 + nz*nz*0.62))`) with subtle radial tilt.
7. **Moved `"If it doesn't challenge you, it won't change you."` Outside the *Languages I Know* Card (`scripts/main.js`, `styles/main.css`)**:
   - Rendered the quote in a standalone `.stage-outside-quote-wrap` block flanked by botanical leaf sprigs directly below `<article class="stage-bento-panel">`.
8. **Scroll-Triggered Illumination for Frame `01A` (*Building Human Connections*) (`scripts/main.js`, `styles/main.css`)**:
   - Started all 8 camera reel cards (including Frame `01A — Building Human Connections`) unlit/dimmed so Frame `01A` lights up (`revealed`) after scrolling into `#section-reel` (`self.progress >= 0.04`) just like the other cards.
9. **Added `"yet to build😝"` Inside Empty Grey Project Tabs (`02`–`08`) (`data/portfolioData.js`, `scripts/main.js`, `styles/main.css`)**:
   - Displayed `yet to build😝` centered inside `.grey-photo-frame` on Layers `02` through `08`.
10. **Darker Matte Laptop Finish + Sharper 3D Part Outlines (`scripts/laptop3d.js`)**:
    - Deepened all laptop materials to a stealth matte obsidian/carbon finish (`color: 0x0c0e14` to `0x1f2433`, `roughness: 0.68–0.88`, low metalness) with high-contrast edge outlines (`#e2e8f0` / `#cbd5e1` at `0.88–1.0` opacity) while keeping the dual spinning fans.
11. **Security Audit & Fixes (`server.js`, `vercel.json`, `index.html`, `scripts/main.js`)**:
    - Fixed directory traversal (`../`) and dotfile exposure (`.git`, `.env`) in `server.js` using `path.resolve` + `path.relative` boundary validation.
    - Wrapped `decodeURIComponent` in `try/catch` and blocked null bytes (`\0`) in `server.js` to prevent `URIError` DoS crashes on malformed URLs.
    - Replaced wildcard CORS (`Access-Control-Allow-Origin: *`) in `vercel.json` and `server.js` with `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
    - Replaced inline `onerror="..."` HTML attribute injection with programmatic `addEventListener('error', ...)` and enforced `rel="noopener noreferrer"` and `referrerpolicy="no-referrer"` across external resources.

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
    linkedin: "https://linkedin.com/in/suyashsharmadev",
    github: "https://github.com/suyashcodemaster",
    githubUsername: "suyashcodemaster",
    location: "Vellore, Tamil Nadu & Pune, India"
  },

  // 3 Philosophical Quotes Sprinkled Across Spaces Between Sections
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

  // 5 Core Laptop Disassembly Sections
  // (Display -> Motherboard -> Keyboard -> RAM Sticks -> Storage, plus Touchpad at completion for Download CV)
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
      partKey: "motherboard",
      partLabel: "Motherboard",
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
      partKey: "ram",
      partLabel: "RAM Sticks",
      title: "Languages I Know",
      accent: "#f59e0b",
      isCompactLanguages: true,
      spokenLanguages: [
        { name: "English", level: "Full Professional & Academic Fluency" },
        { name: "Hindi", level: "Native Fluency" }
      ],
      githubUsername: "suyashcodemaster",
      badgesTitle: "Badges",
      badgesPlaceholder: "Yet to earn",
      outsideQuote: "If it doesn't challenge you, it won't change you."
    },
    {
      id: "achievements",
      partKey: "storage",
      partLabel: "Storage",
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

  // Section 4: 8 Horizontally Stacked Project Layers (Hovering moves card to center & blurs background)
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
    { slot: "02", isPlaceholder: true, emptyLabel: "yet to build😝" },
    { slot: "03", isPlaceholder: true, emptyLabel: "yet to build😝" },
    { slot: "04", isPlaceholder: true, emptyLabel: "yet to build😝" },
    { slot: "05", isPlaceholder: true, emptyLabel: "yet to build😝" },
    { slot: "06", isPlaceholder: true, emptyLabel: "yet to build😝" },
    { slot: "07", isPlaceholder: true, emptyLabel: "yet to build😝" },
    { slot: "08", isPlaceholder: true, emptyLabel: "yet to build😝" }
  ],

  // Section 5: Julian Garnier (juliangarnier.com) Auto-Typing Chat Bubbles (~6s total, no intro fluff, no phone)
  contactMessages: [
    "Hey there 👋",
    "You can reach me by email at <a href=\"mailto:sharma.suyash.in@gmail.com\">sharma.suyash.in@gmail.com ↗</a>",
    "Or connect with me on <a href=\"https://linkedin.com/in/suyashsharmadev\" target=\"_blank\" rel=\"noopener noreferrer\">LinkedIn ↗</a> and <a href=\"https://github.com/suyashcodemaster\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub ↗</a>",
    "Need a copy of my resume? <a href=\"./Suyash-CV.pdf\" download=\"Suyash-Sharma-CV.pdf\" class=\"chat-inline-cv\" data-cv-download=\"true\">Download my CV (PDF) ↓</a>"
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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./styles/main.css" />
  <!-- Three.js & GSAP + ScrollTrigger CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" crossorigin="anonymous" referrerpolicy="no-referrer" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" crossorigin="anonymous" referrerpolicy="no-referrer" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" crossorigin="anonymous" referrerpolicy="no-referrer" defer></script>
  <script type="module" src="./scripts/main.js" defer></script>
</head>
<body class="is-loading">
  <!-- INITIAL TEMPLATE REPO LOADING SCREEN (No Name on Loader, ~4.1s Smooth Duration) -->
  <div id="loader-overlay" class="loader-overlay" aria-label="Loading portfolio">
    <div class="loader-inner">
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

  <!-- Full-Viewport Blur Backdrop when Focusing a Project Card in Center -->
  <div id="projects-focus-backdrop" class="projects-focus-backdrop" aria-hidden="true"></div>

  <!-- 1. HERO SECTION (Typewriter Name Effect After Loading Completes) -->
  <section id="section-hero" class="hero-section">
    <div class="hero-center">
      <h1 class="hero-title">
        <span class="hero-word-slot"><span id="hero-first" class="typewriter-word"></span></span>
        <span class="hero-photo-frame">
          <img id="hero-photo" src="./suyash-photo.jpeg" alt="Suyash Sharma" />
        </span>
        <span class="hero-word-slot"><span id="hero-last" class="typewriter-word"></span></span>
      </h1>
    </div>

    <!-- Bottom-Left Direct Jump Button -->
    <a href="#section-projects" id="btn-jump-projects" class="hero-projects-btn">
      <span class="btn-main-text">Explore Projects ↓</span>
    </a>

    <!-- Bottom-Center Scroll Prompt -->
    <div class="hero-scroll-indicator">
      <span class="mono-tag">Scroll</span>
      <div class="scroll-line"><div class="scroll-pulse"></div></div>
    </div>
  </section>

  <!-- PHILOSOPHICAL QUOTE INTERLUDE 1 (Halved Bottom Space) -->
  <div class="quote-interlude first-quote-interlude">
    <div class="quote-frame">
      <svg class="quote-leaf leaf-left" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M58 34C42 32 24 24 8 8" stroke="#6ee7b7" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M44 31C42 22 34 18 28 20C30 27 37 31 44 31Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M30 24C28 15 20 11 14 13C16 20 23 24 30 24Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M36 28C43 24 49 26 52 31C45 33 39 31 36 28Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M21 19C28 15 34 17 37 22C30 24 24 22 21 19Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
      </svg>
      <blockquote class="interlude-text">
        “You don't have to be great to get started, but you have to get started to be great.”
      </blockquote>
      <svg class="quote-leaf leaf-right" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 34C22 32 40 24 56 8" stroke="#6ee7b7" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M20 31C22 22 30 18 36 20C34 27 27 31 20 31Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M34 24C36 15 44 11 50 13C48 20 41 24 34 24Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M28 28C21 24 15 26 12 31C19 33 25 31 28 28Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M43 19C36 15 30 17 27 22C34 24 40 22 43 19Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
      </svg>
    </div>
  </div>

  <!-- 2. 3D LAPTOP DISASSEMBLY SCROLLABLE SECTION -->
  <section id="section-laptop" class="laptop-section">
    <div class="laptop-sticky-viewport">
      <canvas id="laptop-canvas"></canvas>

      <!-- Clean, Simple 3D Part Pointer -->
      <div id="part-link-callout" class="part-link-callout" aria-hidden="true">
        <span class="callout-dot"></span>
        <span class="callout-line"></span>
        <div class="callout-badge">
          <span id="callout-part-name" class="callout-part">Display</span>
        </div>
      </div>

      <!-- Hover Tooltip (Strictly scoped to 3D laptop meshes inside #section-laptop) -->
      <div id="part-hover-tooltip" class="part-hover-tooltip" aria-hidden="true"></div>

      <!-- Detached 3D Touchpad "Download CV" Button -->
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

    <!-- Scroll Stages: Flush-Closed Lead-In -> 5 Info Stages -> Final Detached Touchpad Hold -->
    <div id="laptop-stages-container" class="laptop-stages-container"></div>
  </section>

  <!-- PHILOSOPHICAL QUOTE INTERLUDE 2 -->
  <div class="quote-interlude">
    <div class="quote-frame">
      <svg class="quote-leaf leaf-left" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M58 34C42 32 24 24 8 8" stroke="#6ee7b7" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M44 31C42 22 34 18 28 20C30 27 37 31 44 31Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M30 24C28 15 20 11 14 13C16 20 23 24 30 24Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M36 28C43 24 49 26 52 31C45 33 39 31 36 28Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M21 19C28 15 34 17 37 22C30 24 24 22 21 19Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
      </svg>
      <blockquote class="interlude-text">
        “Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.”
      </blockquote>
      <svg class="quote-leaf leaf-right" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 34C22 32 40 24 56 8" stroke="#6ee7b7" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M20 31C22 22 30 18 36 20C34 27 27 31 20 31Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M34 24C36 15 44 11 50 13C48 20 41 24 34 24Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M28 28C21 24 15 26 12 31C19 33 25 31 28 28Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M43 19C36 15 30 17 27 22C34 24 40 22 43 19Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
      </svg>
    </div>
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

  <!-- PHILOSOPHICAL QUOTE INTERLUDE 3 (Tight bottom spacing beneath Helen Keller quote) -->
  <div class="quote-interlude helen-keller-quote">
    <div class="quote-frame">
      <svg class="quote-leaf leaf-left" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M58 34C42 32 24 24 8 8" stroke="#6ee7b7" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M44 31C42 22 34 18 28 20C30 27 37 31 44 31Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M30 24C28 15 20 11 14 13C16 20 23 24 30 24Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M36 28C43 24 49 26 52 31C45 33 39 31 36 28Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M21 19C28 15 34 17 37 22C30 24 24 22 21 19Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
      </svg>
      <blockquote class="interlude-text">
        “Life is either a daring adventure or nothing at all.”
        <cite class="interlude-cite">— Helen Keller</cite>
      </blockquote>
      <svg class="quote-leaf leaf-right" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 34C22 32 40 24 56 8" stroke="#6ee7b7" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M20 31C22 22 30 18 36 20C34 27 27 31 20 31Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M34 24C36 15 44 11 50 13C48 20 41 24 34 24Z" fill="rgba(110,231,183,0.18)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M28 28C21 24 15 26 12 31C19 33 25 31 28 28Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
        <path d="M43 19C36 15 30 17 27 22C34 24 40 22 43 19Z" fill="rgba(110,231,183,0.14)" stroke="#6ee7b7" stroke-width="1.2"/>
      </svg>
    </div>
  </div>

  <!-- 4. 8 HORIZONTALLY STACKED PROJECT CARDS (Steeper Angle + Hover Pulls Forward to Exact Center & Blurs Website) -->
  <section id="section-projects" class="projects-section">
    <div class="section-header-wrap">
      <h2 class="section-heading">Projects</h2>
    </div>
    <div id="projects-stack" class="template-horizontal-stack"></div>
  </section>

  <!-- Seamless Visual Transition into Minimalist White Section -->
  <div class="dark-to-white-transition" aria-hidden="true"></div>

  <!-- 5. JULIAN GARNIER (juliangarnier.com) CHAT-FORM CONTACT ME SECTION (~6s Slow Stream, No Buttons, No Phone) -->
  <section id="section-contact" class="minimal-white-contact">
    <div class="minimal-contact-inner">
      <h2 class="contact-me-title">Contact Me</h2>
      <div class="minimal-chat-stream" id="chat-messages"></div>

      <footer class="minimal-contact-footer">
        <span>© 2026 Suyash Sharma</span>
        <span class="footer-sep">·</span>
        <a href="#section-hero">Back to top ↑</a>
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
  --bg-panel: rgba(15, 16, 22, 0.86);
  --text-main: #f4f1ea;
  --text-muted: #9ca3af;
  --border-subtle: rgba(244, 241, 234, 0.12);
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-philo: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; background: var(--bg-dark); color: var(--text-main); font-family: var(--font-sans); }
body { overflow-x: hidden; background: var(--bg-dark); }
body.is-loading { overflow: hidden; }

/* ==========================================================================
   0. INITIAL TEMPLATE REPO LOADING SCREEN (No Name, ~4.1s Smooth Duration)
   ========================================================================== */
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #09090d;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.95s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.7s ease;
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

.loader-counter-wrap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.2rem;
}

.loader-count {
  font-family: var(--font-display);
  font-size: clamp(4rem, 8.5vw, 5.8rem);
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
  transition: width 0.06s linear;
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
   1. HERO SECTION — Typewriter Name Effect After Loading + Single Line
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

.hero-word-slot {
  display: inline-flex;
  align-items: center;
  min-width: 3.1em;
}

.hero-word-slot:first-child {
  justify-content: flex-end;
}

.hero-word-slot:last-child {
  justify-content: flex-start;
}

.typewriter-word {
  display: inline-block;
  position: relative;
}

.typewriter-word.typing::after {
  content: '|';
  display: inline-block;
  margin-left: 2px;
  color: #f59e0b;
  font-weight: 300;
  animation: cursorBlink 0.65s steps(2, start) infinite;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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
   PHILOSOPHICAL QUOTES WITH PEACEFUL BOTANICAL LEAVES ON LEFT & RIGHT ENDS
   ========================================================================== */
.quote-interlude {
  padding: 3.6rem 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 5;
}

/* Halved space after the first quote without breaking scroll animations */
.quote-interlude.first-quote-interlude {
  padding: 2.2rem 5vw 0.4rem;
}

/* Remove majority of space beneath the Helen Keller quote */
.quote-interlude.helen-keller-quote {
  padding: 3rem 5vw 0.25rem;
}

.quote-frame {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.85rem, 2vw, 1.65rem);
  max-width: 820px;
  padding: 0.6rem 1.5rem;
}

.quote-leaf {
  width: clamp(36px, 4.2vw, 52px);
  height: auto;
  flex-shrink: 0;
  opacity: 0.82;
  filter: drop-shadow(0 0 8px rgba(110, 231, 183, 0.18));
  animation: leafBreeze 5s ease-in-out infinite alternate;
}

.quote-leaf.leaf-right {
  animation-delay: -2.5s;
}

@keyframes leafBreeze {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-3px) rotate(2deg); }
}

.interlude-text {
  font-family: var(--font-philo);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.12rem, 1.72vw, 1.44rem);
  line-height: 1.5;
  letter-spacing: 0.03em;
  color: #d6d3cd;
}

.interlude-cite {
  display: block;
  margin-top: 0.42rem;
  font-family: var(--font-philo);
  font-style: normal;
  font-size: 0.86rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8c8881;
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
  background: radial-gradient(circle at 30% 52%, rgba(148, 163, 184, 0.15) 0%, rgba(30, 41, 59, 0.07) 42%, transparent 70%);
}

#laptop-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Accurate 3D Part Pointer */
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
  width: 34px;
  height: 1.5px;
  background: var(--callout-color, #38bdf8);
}

.callout-badge {
  position: absolute;
  left: 42px;
  top: 0;
  transform: translateY(-50%);
  white-space: nowrap;
  padding: 0.3rem 0.68rem;
  border-radius: 999px;
  background: rgba(12, 13, 18, 0.92);
  border: 1px solid var(--callout-color, #38bdf8);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.55);
}

.callout-part {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  color: #f4f1ea;
}

/* 3D Part Hover Tooltip */
.part-hover-tooltip {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 40;
  padding: 0.36rem 0.72rem;
  border-radius: 999px;
  background: rgba(12, 13, 18, 0.94);
  border: 1px solid rgba(244, 241, 234, 0.28);
  font-family: var(--font-sans);
  font-size: 0.75rem;
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
  top: 66%;
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
  background: rgba(14, 15, 20, 0.94);
  border: 1.5px solid #ec4899;
  color: #f4f1ea;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.75), 0 0 24px rgba(236, 72, 153, 0.45);
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

/* Halved Opening Lead-In Stage so there isn't excessive space after the first quote */
.laptop-stage.laptop-intro-stage {
  min-height: 55vh;
  pointer-events: none;
}

.laptop-stage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 3rem 4.5vw;
  gap: 1.5rem;
}

/* Shorter, well-proportioned height for Languages I Know stage */
.laptop-stage.compact-stage {
  min-height: 76vh;
  padding: 1.75rem 4.5vw;
}

/* Final Disassembly Hold Stage for Unobstructed Touchpad CV */
.laptop-stage.final-disassembly-hold {
  min-height: 108vh;
  pointer-events: none;
}

.stage-bento-panel {
  pointer-events: auto;
  width: min(50vw, 660px);
  padding: 2.3rem;
  border-radius: 22px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--stage-accent, #38bdf8);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 0 36px color-mix(in srgb, var(--stage-accent, #38bdf8) 14%, transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
}

.stage-bento-panel.compact-panel {
  padding: 1.7rem 2.05rem;
  gap: 0.9rem;
}

/* Standalone Quote Outside the Languages I Know Card */
.stage-outside-quote-wrap {
  width: min(50vw, 660px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  padding: 0.6rem 1rem;
  pointer-events: none;
}

.stage-part-chip {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 0.26rem 0.72rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--stage-accent, #38bdf8);
  font-family: var(--font-sans);
  font-size: 0.73rem;
  font-weight: 500;
  color: var(--stage-accent, #38bdf8);
}

.stage-title {
  font-family: var(--font-display);
  font-size: clamp(2.15rem, 3.5vw, 3.1rem);
  font-weight: 400;
  line-height: 1.05;
}

.stage-title.small-stage-title {
  font-size: clamp(1.4rem, 2.05vw, 1.8rem);
}

.stage-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 0.82rem;
}

.stage-summary {
  font-size: 0.96rem;
  line-height: 1.64;
  color: #d1d5db;
}

.stage-quote {
  font-family: var(--font-philo);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.15rem, 1.65vw, 1.38rem);
  line-height: 1.52;
  color: #e5e7eb;
  border-left: 2px solid var(--stage-accent);
  padding-left: 1.1rem;
}

.stage-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.82rem;
}

.stage-subcard {
  padding: 0.95rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.stage-subcard h4 {
  font-size: 0.94rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.stage-subcard p {
  font-size: 0.83rem;
  color: #9ca3af;
  line-height: 1.45;
}

.stage-subcard .subcard-meta {
  display: inline-block;
  margin-top: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.69rem;
  color: var(--stage-accent);
}

.compact-lang-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.compact-lang-item {
  flex: 1 1 170px;
  padding: 0.65rem 0.95rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.09);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.compact-lang-item strong {
  font-size: 0.92rem;
  color: #fff;
}

.compact-lang-item span {
  font-size: 0.78rem;
  color: #9ca3af;
}

.github-contrib-card {
  padding: 0.9rem 1.05rem;
  border-radius: 14px;
  background: rgba(9, 9, 13, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.github-contrib-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: #cbd5e1;
}

.github-contrib-header a {
  color: #f59e0b;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.github-contrib-header a:hover {
  text-decoration: underline;
}

.github-chart-wrap {
  width: 100%;
  overflow-x: auto;
  padding: 0.2rem 0;
}

.github-chart-img {
  width: 100%;
  min-width: 400px;
  height: auto;
  display: block;
  filter: contrast(1.08);
}

.github-badges-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.45rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.badges-title {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 500;
  color: #cbd5e1;
}

.badges-placeholder {
  font-family: var(--font-mono);
  font-size: 0.71rem;
  color: #9ca3af;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed rgba(255, 255, 255, 0.18);
}

.mini-leaf {
  width: 28px;
  height: auto;
  opacity: 0.8;
  flex-shrink: 0;
}

.stage-mini-quote {
  font-family: var(--font-philo);
  font-style: italic;
  font-weight: 300;
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  color: #d6d3cd;
  text-align: center;
}

.skill-groups-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.skill-group-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.skill-group-label {
  font-family: var(--font-sans);
  font-size: 0.77rem;
  font-weight: 600;
}

.pills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.color-pill {
  padding: 0.38rem 0.8rem;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.79rem;
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
  opacity: 0.16;
  transform: scale(0.92) translateY(16px);
  filter: grayscale(0.88) brightness(0.45);
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
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #f43f5e, #f59e0b, #10b981, #38bdf8, #a855f7);
  transition: width 0.12s linear;
}

/* ==========================================================================
   4. STEEPLY ANGLED HORIZONTAL PROJECT STACK (Hover Pulls Card to Exact Center + Blurs Website)
   ========================================================================== */
.projects-focus-backdrop {
  position: fixed;
  inset: 0;
  z-index: 45;
  background: rgba(6, 7, 11, 0.58);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
}

.projects-focus-backdrop.active {
  opacity: 1;
}

.projects-section {
  padding: 0.9rem 4.5vw 7rem;
  position: relative;
  z-index: 50;
  overflow: visible;
}

.section-header-wrap {
  margin-bottom: 1.75rem;
  text-align: center;
  transition: filter 0.4s ease, opacity 0.4s ease;
}

.projects-section.has-focused-card .section-header-wrap {
  filter: blur(5px);
  opacity: 0.35;
}

.template-horizontal-stack {
  position: relative;
  width: 100%;
  min-height: 540px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
  padding: 2rem 0;
}

.stack-card-slot {
  position: relative;
  margin: 0 -118px;
  flex-shrink: 0;
  transform-style: preserve-3d;
}

.stack-card-slot.slot-focused::before {
  content: '';
  position: absolute;
  top: -30px;
  bottom: -30px;
  left: -30px;
  right: -520px;
  z-index: 1;
}

.stack-card {
  width: clamp(285px, 30vw, 370px);
  height: 465px;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  /* Steeper 3D angle like books/plates in the template repository */
  transform: translate3d(0px, 0px, 0px) rotateY(-40deg) rotateX(4deg) scale(0.92);
  transition: transform 0.58s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.55s ease, filter 0.45s ease, opacity 0.45s ease;
  box-shadow: -22px 16px 42px rgba(0, 0, 0, 0.82);
}

/* When hovered, the card moves forward in 3D and translates to the exact horizontal center of the viewport! */
.stack-card.is-centered {
  transform: translate3d(var(--center-shift, 0px), -16px, 220px) rotateY(0deg) rotateX(0deg) scale(1.08);
  box-shadow: 0 36px 85px rgba(0, 0, 0, 0.92), 0 0 48px rgba(16, 185, 129, 0.32);
  filter: none !important;
  opacity: 1 !important;
}

/* Other tabs blur out and part away when a card is focused in the center */
.stack-card.blurred-left {
  transform: translate3d(-150px, 0px, -60px) rotateY(-44deg) rotateX(4deg) scale(0.86);
  filter: blur(6px) brightness(0.42);
  opacity: 0.55;
}

.stack-card.blurred-right {
  transform: translate3d(150px, 0px, -60px) rotateY(-44deg) rotateX(4deg) scale(0.86);
  filter: blur(6px) brightness(0.42);
  opacity: 0.55;
}

/* Layer 01: Active Project Card (SanitX) — Strictly contained so text never overflows when angled */
.stack-card.active-project-card {
  background: linear-gradient(155deg, rgba(16, 32, 28, 0.98), rgba(12, 13, 19, 0.99));
  border: 1.5px solid #10b981;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.65rem;
  cursor: pointer;
}

.stack-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.stack-card-title-wrap {
  min-width: 0;
  overflow: hidden;
}

.stack-card-title {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 400;
  line-height: 1.05;
  color: #ffffff;
}

.stack-card-subtitle {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: #f59e0b;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stack-slot-num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  flex-shrink: 0;
}

.project-logo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.85rem;
  border-radius: 12px;
  background: rgba(9, 9, 13, 0.82);
  border: 1px solid rgba(16, 185, 129, 0.4);
  text-decoration: none;
  color: #fff;
  transition: border-color 0.25s, transform 0.25s;
}

.project-logo-link:hover {
  border-color: #38bdf8;
  transform: scale(1.02);
}

.project-logo-caption {
  margin-top: 0.35rem;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  color: #10b981;
}

.project-bullets {
  padding-left: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  color: #d1d5db;
  font-size: 0.73rem;
  line-height: 1.36;
  overflow: hidden;
}

/* Layers 02–08: Stacked Non-Interactive Grey Photo Frame Cards with "yet to build😝" */
.stack-card.grey-layer-card {
  background: linear-gradient(160deg, #1a1b23 0%, #111218 100%);
  border: 1px solid rgba(255, 255, 255, 0.13);
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
  user-select: none;
}

.grey-layer-card .stack-slot-num {
  color: #71717a;
}

.grey-photo-frame {
  flex: 1;
  width: 100%;
  margin-top: 0.7rem;
  border-radius: 12px;
  background: linear-gradient(145deg, #272832 0%, #1c1d25 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.55);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.yet-to-build-text {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #8e929f;
  letter-spacing: 0.06em;
  text-align: center;
}

/* ==========================================================================
   5. JULIAN GARNIER (juliangarnier.com) CHAT-FORM CONTACT ME SECTION
      (Longer Stream, ~6s Slow Cadence, No Intro Fluff, No Buttons, No Phone)
   ========================================================================== */
.dark-to-white-transition {
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, #09090d 0%, #f7f6f2 100%);
}

.minimal-white-contact {
  background: #f7f6f2;
  color: #141413;
  min-height: 86vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 5vw 4.5rem;
  position: relative;
  z-index: 10;
}

.minimal-contact-inner {
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.contact-me-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.5rem, 4.4vw, 3.6rem);
  color: #141413;
  letter-spacing: -0.01em;
}

.minimal-chat-stream {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  min-height: 360px;
  padding: 0.5rem 0;
}

.minimal-bubble {
  max-width: 88%;
  padding: 1.05rem 1.45rem;
  border-radius: 24px;
  border-bottom-left-radius: 6px;
  background: #e9e7e0;
  color: #141413;
  font-size: 1.06rem;
  line-height: 1.56;
  letter-spacing: -0.01em;
  animation: minimalFadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes minimalFadeUp {
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.minimal-bubble a {
  color: #141413;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.2s;
}

.minimal-bubble a:hover {
  opacity: 0.6;
}

.minimal-typing {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 1.05rem 1.3rem;
  border-radius: 24px;
  border-bottom-left-radius: 6px;
  background: #e9e7e0;
}

.minimal-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #78756e;
  animation: minimalBounce 1.1s infinite ease-in-out;
}

.minimal-typing span:nth-child(2) { animation-delay: 0.15s; }
.minimal-typing span:nth-child(3) { animation-delay: 0.3s; }

@keyframes minimalBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-4px); opacity: 1; }
}

.minimal-contact-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #dfdcd3;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.86rem;
  color: #78756e;
}

.minimal-contact-footer a {
  color: #141413;
  text-decoration: none;
}

.minimal-contact-footer a:hover {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .stage-bento-panel, .stage-outside-quote-wrap { width: 92vw; }
  .part-link-callout { display: none; }
  .stack-card-slot { margin: 0 -100px; }
  .stack-card { width: 265px; height: 445px; }
}
```

### File 4: `scripts/laptop3d.js`
```javascript
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
```

### File 5: `scripts/main.js`
```javascript
import { PORTFOLIO_DATA } from '../data/portfolioData.js';
import { initLaptop3D } from './laptop3d.js';

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

// Non-scrollable Typewriter Effect for Landing Page Name After Loading Completes
function runHeroTypewriter(firstName, lastName) {
  const firstEl = document.getElementById('hero-first');
  const lastEl = document.getElementById('hero-last');
  if (!firstEl || !lastEl) return;

  firstEl.textContent = '';
  lastEl.textContent = '';
  firstEl.classList.add('typing');

  let i = 0;
  const firstTimer = setInterval(() => {
    i += 1;
    firstEl.textContent = firstName.slice(0, i);
    if (i >= firstName.length) {
      clearInterval(firstTimer);
      firstEl.classList.remove('typing');
      lastEl.classList.add('typing');

      let j = 0;
      const lastTimer = setInterval(() => {
        j += 1;
        lastEl.textContent = lastName.slice(0, j);
        if (j >= lastName.length) {
          clearInterval(lastTimer);
          setTimeout(() => lastEl.classList.remove('typing'), 450);
        }
      }, 95);
    }
  }, 95);
}

window.addEventListener('DOMContentLoaded', () => {
  const { profile, laptopStages, reelFrames, projects, contactMessages } = PORTFOLIO_DATA;

  // 0. Initial Loading Screen (~4.1s total — 1 second slower than v5, no name on loader)
  const loaderOverlay = document.getElementById('loader-overlay');
  const loaderCount = document.getElementById('loader-count');
  const loaderBarFill = document.getElementById('loader-bar-fill');

  let loadVal = 0;
  const loadTimer = setInterval(() => {
    loadVal = Math.min(100, loadVal + 1);
    if (loaderCount) loaderCount.textContent = String(loadVal).padStart(3, '0');
    if (loaderBarFill) loaderBarFill.style.width = `${loadVal}%`;
    if (loadVal >= 100) {
      clearInterval(loadTimer);
      setTimeout(() => {
        if (loaderOverlay) loaderOverlay.classList.add('loaded');
        document.body.classList.remove('is-loading');
        setTimeout(() => runHeroTypewriter(profile.firstName, profile.lastName), 320);
      }, 450);
    }
  }, 36);

  // 2. Render Laptop Disassembly Stages
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
          <a href="${profile.github}" target="_blank" rel="noopener noreferrer">@${st.githubUsername} ↗</a>
        </div>
        <div class="github-chart-wrap">
          <img
            src="https://ghchart.rshah.org/10b981/${st.githubUsername}"
            alt="Suyash Sharma GitHub Contribution Graph"
            class="github-chart-img"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="github-badges-row">
          <span class="badges-title">${st.badgesTitle || 'Badges'}</span>
          <span class="badges-placeholder">${st.badgesPlaceholder || 'Yet to earn'}</span>
        </div>
      </div>
    ` : '';

    const outsideQuoteHtml = st.outsideQuote ? `
      <div class="stage-outside-quote-wrap">
        <svg class="mini-leaf" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M36 20C24 18 14 13 4 4" stroke="#6ee7b7" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M24 17C22 11 16 9 12 10C14 15 19 17 24 17Z" fill="rgba(110,231,183,0.2)" stroke="#6ee7b7" stroke-width="1.1"/>
        </svg>
        <blockquote class="stage-mini-quote">“${st.outsideQuote}”</blockquote>
        <svg class="mini-leaf" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4 20C16 18 26 13 36 4" stroke="#6ee7b7" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M16 17C18 11 24 9 28 10C26 15 21 17 16 17Z" fill="rgba(110,231,183,0.2)" stroke="#6ee7b7" stroke-width="1.1"/>
        </svg>
      </div>
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
        <h2 class="stage-title ${st.isCompactLanguages ? 'small-stage-title' : ''}">${st.title}</h2>
        ${paragraphsHtml}
        ${st.quote ? `<blockquote class="stage-quote">“${st.quote}”</blockquote>` : ''}
        ${cardsHtml}
        ${compactLangHtml}
        ${skillsHtml}
        ${pillsHtml}
      </article>
      ${outsideQuoteHtml}`;

    const chartImg = section.querySelector('.github-chart-img');
    if (chartImg) {
      chartImg.addEventListener('error', () => {
        chartImg.src = fallbackChartUri;
      }, { once: true });
    }

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
      if (progress >= 0.10 && progress < 0.79) {
        calloutEl.classList.add('visible');
        const clampedX = Math.max(40, Math.min(window.innerWidth * 0.46, activeCoords.x));
        const clampedY = Math.max(60, Math.min(window.innerHeight - 60, activeCoords.y));
        calloutEl.style.left = `${clampedX}px`;
        calloutEl.style.top = `${clampedY}px`;
      } else {
        calloutEl.classList.remove('visible');
      }

      if (progress >= 0.79) {
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

  // 3. Render 35mm Camera Reel (All 8 cards start unlit; Card 01A lights up after scrolling into section!)
  const reelTrack = document.getElementById('reel-track');
  reelFrames.forEach((rf) => {
    const card = document.createElement('article');
    card.className = 'reel-card';
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

  // 4. Render 8 Steeply Angled Horizontal Project Cards (Hovering Pulls Card to Exact Center + Blurs Website & Other Tabs!)
  const projectsSection = document.getElementById('section-projects');
  const projectsStack = document.getElementById('projects-stack');
  const focusBackdrop = document.getElementById('projects-focus-backdrop');
  const totalLayers = projects.length;

  projects.forEach((proj, idx) => {
    const slot = document.createElement('div');
    slot.className = 'stack-card-slot';
    slot.style.zIndex = String(totalLayers - idx);

    const card = document.createElement('article');
    if (!proj.isPlaceholder) {
      card.className = 'stack-card active-project-card';
      card.innerHTML = `
        <div class="stack-card-top">
          <div class="stack-card-title-wrap">
            <h3 class="stack-card-title">${proj.title}</h3>
            <p class="stack-card-subtitle">${proj.subtitle}</p>
          </div>
          <span class="stack-slot-num">${proj.slot}</span>
        </div>
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-logo-link" title="Open SanitX GitHub Repository">
          <svg width="56" height="56" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 8L16 22V46C16 67.2 29.6 86.8 48 92C66.4 86.8 80 67.2 80 46V22L48 8Z" stroke="#10b981" stroke-width="4" fill="rgba(16,185,129,0.12)"/>
            <rect x="34" y="28" width="28" height="36" rx="4" stroke="#38bdf8" stroke-width="3"/>
            <path d="M41 40H55M41 48H55M41 56H49" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <span class="project-logo-caption">View SanitX on GitHub ↗</span>
        </a>
        <div class="pills-wrap">${proj.tech.map(t => `<span class="color-pill" style="--pill-color:${proj.accent};font-size:0.68rem;padding:0.22rem 0.5rem">${t}</span>`).join('')}</div>
        <ul class="project-bullets">${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    } else {
      card.className = 'stack-card grey-layer-card';
      card.setAttribute('aria-hidden', 'true');
      card.innerHTML = `
        <div class="stack-card-top">
          <span class="stack-slot-num">${proj.slot}</span>
        </div>
        <div class="grey-photo-frame">
          <span class="yet-to-build-text">${proj.emptyLabel || 'yet to build😝'}</span>
        </div>`;
    }

    slot.appendChild(card);
    projectsStack.appendChild(slot);
  });

  const allSlots = projectsStack.querySelectorAll('.stack-card-slot');
  const allStackCards = projectsStack.querySelectorAll('.stack-card');
  const activeSlot = allSlots[0];

  function focusCardToViewportCenter(targetIdx) {
    const targetSlot = allSlots[targetIdx];
    const targetCard = allStackCards[targetIdx];
    if (!targetSlot || !targetCard) return;

    // Calculate exact horizontal pixel delta from this slot's center to the viewport center
    const slotRect = targetSlot.getBoundingClientRect();
    const slotCenterX = slotRect.left + slotRect.width / 2;
    const viewportCenterX = window.innerWidth / 2;
    const deltaX = viewportCenterX - slotCenterX;
    targetCard.style.setProperty('--center-shift', `${deltaX}px`);

    if (focusBackdrop) focusBackdrop.classList.add('active');
    if (projectsSection) projectsSection.classList.add('has-focused-card');
    targetSlot.classList.add('slot-focused');

    allStackCards.forEach((c, i) => {
      c.classList.remove('is-centered', 'blurred-left', 'blurred-right');
      allSlots[i].style.zIndex = i === targetIdx ? '90' : String(totalLayers - i);
      if (i === targetIdx) {
        c.classList.add('is-centered');
      } else if (i < targetIdx) {
        c.classList.add('blurred-left');
      } else {
        c.classList.add('blurred-right');
      }
    });
  }

  function resetProjectStack() {
    if (focusBackdrop) focusBackdrop.classList.remove('active');
    if (projectsSection) projectsSection.classList.remove('has-focused-card');
    allSlots.forEach((s) => s.classList.remove('slot-focused'));
    allStackCards.forEach((c, i) => {
      c.classList.remove('is-centered', 'blurred-left', 'blurred-right');
      allSlots[i].style.zIndex = String(totalLayers - i);
    });
  }

  if (activeSlot) {
    activeSlot.addEventListener('pointerenter', () => focusCardToViewportCenter(0));
    activeSlot.addEventListener('pointerleave', resetProjectStack);
  }

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
        const contentSpan = Math.max(0, Math.min(0.999, (self.progress - 0.10) / 0.69));
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

    // Scroll-Driven 35mm Camera Reel Animation (Card 01A lights up after scrolling into section: self.progress >= 0.04)
    const filmStripWrapper = document.getElementById('film-strip-wrapper');
    const reelCards = document.querySelectorAll('.reel-card');
    const reelActiveIndicator = document.getElementById('reel-active-indicator');
    const reelProgressFill = document.getElementById('reel-progress-fill');

    ScrollTrigger.create({
      trigger: '#section-reel',
      start: 'top 65%',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const maxShift = Math.max(0, filmStripWrapper.scrollWidth - window.innerWidth + 120);
        const shiftX = -self.progress * maxShift;
        filmStripWrapper.style.transform = `rotate(-1deg) translate3d(${shiftX}px, 0, 0)`;

        const totalFrames = reelFrames.length;
        const activeFrameIdx = Math.min(totalFrames - 1, Math.floor(self.progress * totalFrames));

        reelCards.forEach((card, i) => {
          const threshold = 0.04 + (i / totalFrames) * 0.82;
          if (self.progress >= threshold) {
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
          reelProgressFill.style.width = `${Math.max(0, self.progress * 100)}%`;
        }
      }
    });
  }

  // 5. Julian Garnier (juliangarnier.com) Slow ~6s Chat-Form Contact Me Section
  const chatMessagesEl = document.getElementById('chat-messages');

  function appendChatBubble(html) {
    const b = document.createElement('div');
    b.className = 'minimal-bubble';
    b.innerHTML = html;
    chatMessagesEl.appendChild(b);
  }

  function showTypingThenBubble(html, typingDuration = 1150, pauseAfter = 350) {
    return new Promise((resolve) => {
      const typing = document.createElement('div');
      typing.className = 'minimal-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      chatMessagesEl.appendChild(typing);
      setTimeout(() => {
        typing.remove();
        appendChatBubble(html);
        setTimeout(resolve, pauseAfter);
      }, typingDuration);
    });
  }

  let contactStarted = false;
  async function startJulianGarnierChat() {
    if (contactStarted || !chatMessagesEl) return;
    contactStarted = true;
    // 4 messages * (1150ms typing + 350ms pause) = 6000ms (~6 seconds total animation)
    for (const msg of contactMessages) {
      await showTypingThenBubble(msg, 1150, 350);
    }
  }

  const contactSection = document.getElementById('section-contact');
  if ('IntersectionObserver' in window && contactSection) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startJulianGarnierChat();
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(contactSection);
  } else {
    startJulianGarnierChat();
  }
});
```

### File 6: `server.js`
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('405 Method Not Allowed');
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent((req.url || '/').split('?')[0]);
  } catch {
    res.writeHead(400, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('400 Bad Request');
  }

  if (decodedPath.includes('\0')) {
    res.writeHead(400, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('400 Bad Request');
  }

  const relPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const resolvedPath = path.resolve(ROOT_DIR, '.' + relPath);

  // Prevent directory traversal outside ROOT_DIR and block hidden dotfiles (.git, .env, .vercel)
  const relFromRoot = path.relative(ROOT_DIR, resolvedPath);
  if (
    relFromRoot.startsWith('..') ||
    path.isAbsolute(relFromRoot) ||
    relFromRoot.split(path.sep).some((part) => part.startsWith('.'))
  ) {
    res.writeHead(403, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Forbidden');
  }

  fs.stat(resolvedPath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      res.writeHead(404, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(resolvedPath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('500 Internal Server Error');
      }
      res.writeHead(200, { ...SECURITY_HEADERS, 'Content-Type': contentType });
      if (req.method === 'HEAD') return res.end();
      res.end(data);
    });
  });
}).listen(PORT, () => console.log(`Portfolio running securely at http://localhost:${PORT}`));
```

### File 7: `vercel.json`
```json
{
  "version": 2,
  "framework": null,
  "outputDirectory": ".",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

---

## 3. One-Step Deployment Commands
```bash
cd "E:\Website Portfolio\My-Portfolio"
git add data/portfolioData.js index.html styles/main.css scripts/laptop3d.js scripts/main.js server.js vercel.json
git commit -m "feat: implement v6 refinements and security hardening"
git push origin main
```
