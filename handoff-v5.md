# Project Handoff Document v5.0: Suyash Sharma — 3D Disassembling Laptop & Editorial Portfolio (`My-Portfolio`)

**Document Name:** `handoff-v5.md`  
**Version:** 5.0 (All 5 Final Polish Updates Implemented)  
**Repository:** `https://github.com/suyashcodemaster/My-Portfolio`  
**Live Production URL:** `https://suyashcodemaster.vercel.app`  
**Primary Working Directory:** `E:\Website Portfolio\My-Portfolio`

---

## 1. Summary of All 5 Changes Implemented in v5.0

1. **Longer, Smoother Initial Loading Screen (`scripts/main.js`, `styles/main.css`)**:
   - Adjusted the initial preloader (`#loader-overlay`) progression to step in `1%–2%` increments every `42ms` with a `420ms` hold at `100%` (~3.0 seconds total) before smoothly lifting the curtain.
2. **Smaller, Philosophical Quote Typography + Botanical Leaves on Left & Right Ends + Tight Spacing Under Helen Keller Quote (`index.html`, `styles/main.css`)**:
   - Styled all quotes in italic `'Cormorant Garamond'` (`clamp(1.15rem, 1.78vw, 1.48rem)`, `font-weight: 300`, `letter-spacing: 0.03em`).
   - Added peaceful botanical leaf branch SVGs (`.quote-leaf.leaf-left` and `.quote-leaf.leaf-right`) flanking the left and right ends of each quote.
   - Reduced the bottom padding beneath the Helen Keller quote (`.quote-interlude.helen-keller-quote`) to `0.35rem` and tightened `#section-projects` top padding (`1.1rem`) so there is no dead gap before Projects.
3. **Refined 3D Laptop (Closed-to-Open Start, Compact Gaps, Front-Facing Unobstructed Touchpad, Complex Motherboard with Wiring, Ejecting RAM Sticks, Storage Module, Smaller Languages Heading & Badges) (`scripts/laptop3d.js`, `data/portfolioData.js`, `scripts/main.js`, `styles/main.css`)**:
   - **Opens from Closed Position**: The lid pivots from its rear hinge starting completely closed flat (`display.rotation.x = Math.PI / 2`) at `progress = 0` and hinges open smoothly before separating.
   - **Smaller Vertical Gaps & Front-Facing Rotation**: Tightened vertical separation distances so all 6 subsystems fit comfortably in the viewport simultaneously, and kept `root.rotation.y` in a front-facing isometric range (`+0.28` to `-0.24` rad, ending at `+0.16` rad) so the laptop never turns its back to the camera and the detached **Touchpad** + **Download CV** button remain 100% visible and unobstructed at the end.
   - **Motherboard (with Wiring & Circuitry)**: Renamed `Logic Board` to **`Motherboard`** and added gold/copper circuit traces, 3D arched insulated wiring cables (`THREE.TubeGeometry`), VRM choke coils, capacitors, copper heatpipes, and dual spinning cooling fans.
   - **RAM Sticks (Sliding Out While Scrolling)**: Replaced `Speakers` with dual DDR5 **`RAM Sticks`** (with gold edge pins and 4 memory ICs per stick) that visibly unclip and slide/eject outward from the laptop while scrolling.
   - **Storage**: Replaced `Battery` with **`Storage`** (dual NVMe M.2 SSD modules with finned heatsinks and gold connectors over the lower unibody base).
   - **Smaller *Languages I Know* Heading + *Badges* Subsection**: Reduced the *Languages I Know* heading size (`.small-stage-title`) and added a **`Badges`** row directly beneath the GitHub contribution graph with the temporary text **`Yet to earn`**.
4. **Template Repository Horizontal Overlapping Project Card Stack (Hovering Moves Card to Center) (`index.html`, `styles/main.css`, `scripts/main.js`)**:
   - Replaced the side-by-side accordion with the template repository's 8-card **horizontal 3D overlapping stack** (`.template-horizontal-stack`, `margin: 0 -115px`, `rotateY(-24deg)`).
   - Hovering the active project card (`01 — SanitX`) smoothly translates it horizontally to the exact center of the stage (`translateX(var(--center-shift)) translateZ(130px) rotateY(0deg) scale(1.04)`) while parting the remaining 7 non-interactive grey-framed cards (`02`–`08`).
5. **Julian Garnier (`https://juliangarnier.com/`) Chat-Form *Contact Me* Section (No Buttons, No Phone Number) (`index.html`, `styles/main.css`, `scripts/main.js`, `data/portfolioData.js`)**:
   - Kept the seamless transition into the minimalist warm-white (`#f7f6f2`) section titled simply **`Contact Me`**.
   - Removed all interactive prompt buttons and removed the phone number.
   - When scrolled into view, the messages automatically type out in sequence (`•••` typing indicator morphing into each chat bubble: *"Hey there 👋"*, *"I'm Suyash — a first-year CSE student at VIT Vellore."*, email link, LinkedIn & GitHub links, and CV download link).

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
      stageQuote: "If it doesn't challenge you, it won't change you."
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

  // Section 4: 8 Horizontally Stacked Project Layers (Hovering moves card to center like template repo)
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
  ],

  // Section 5: Julian Garnier (juliangarnier.com) Auto-Typing Chat Bubbles (No buttons, no phone number)
  contactMessages: [
    "Hey there 👋",
    "I'm Suyash — a first-year CSE student at VIT Vellore.",
    "I love building things from scratch and exploring C++, Data Structures & Algorithms, and AI.",
    "You can reach me by email at <a href=\"mailto:sharma.suyash.in@gmail.com\">sharma.suyash.in@gmail.com ↗</a>",
    "Or find me on <a href=\"https://linkedin.com/in/suyashsharmadev\" target=\"_blank\" rel=\"noopener\">LinkedIn ↗</a> and <a href=\"https://github.com/suyashcodemaster\" target=\"_blank\" rel=\"noopener\">GitHub ↗</a>",
    "Looking for my resume? <a href=\"./Suyash-CV.pdf\" download=\"Suyash-Sharma-CV.pdf\" class=\"chat-inline-cv\" data-cv-download=\"true\">Download my CV (PDF) ↓</a>"
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script type="module" src="./scripts/main.js" defer></script>
</head>
<body class="is-loading">
  <!-- INITIAL TEMPLATE REPO LOADING SCREEN (Longer, Smooth Progression) -->
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

  <!-- PHILOSOPHICAL QUOTE INTERLUDE 1 (With Peaceful Botanical Leaves on Left & Right Ends) -->
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

      <!-- Detached 3D Touchpad "Download CV" Button (Appears directly on the unobstructed touchpad when scroll finishes) -->
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

    <!-- Scroll Stages: Closed-to-Open Lead-In -> 5 Info Stages -> Final Detached Touchpad Hold -->
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

  <!-- 4. 8 HORIZONTALLY STACKED PROJECT CARDS (Template Repo Style: Hovering Moves Card to Center) -->
  <section id="section-projects" class="projects-section">
    <div class="section-header-wrap">
      <h2 class="section-heading">Projects</h2>
    </div>
    <div id="projects-stack" class="template-horizontal-stack"></div>
  </section>

  <!-- Seamless Visual Transition into Minimalist White Section -->
  <div class="dark-to-white-transition" aria-hidden="true"></div>

  <!-- 5. JULIAN GARNIER (juliangarnier.com) CHAT-FORM CONTACT ME SECTION (No Buttons, No Phone Number) -->
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
  --bg-panel: rgba(16, 17, 23, 0.84);
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
   0. INITIAL TEMPLATE REPO LOADING SCREEN (Longer, Deliberate Load Time)
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
   PHILOSOPHICAL QUOTES WITH PEACEFUL BOTANICAL LEAVES ON LEFT & RIGHT ENDS
   ========================================================================== */
.quote-interlude {
  padding: 4.2rem 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 5;
}

/* Remove majority of space beneath the Helen Keller quote */
.quote-interlude.helen-keller-quote {
  padding: 3.2rem 5vw 0.35rem;
}

.quote-frame {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.85rem, 2vw, 1.65rem);
  max-width: 820px;
  padding: 0.75rem 1.5rem;
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
  font-size: clamp(1.15rem, 1.78vw, 1.48rem);
  line-height: 1.5;
  letter-spacing: 0.03em;
  color: #d6d3cd;
}

.interlude-cite {
  display: block;
  margin-top: 0.45rem;
  font-family: var(--font-philo);
  font-style: normal;
  font-size: 0.88rem;
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
  background: radial-gradient(circle at 30% 52%, rgba(148, 163, 184, 0.13) 0%, rgba(30, 41, 59, 0.06) 40%, transparent 70%);
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

/* 3D Part Hover Tooltip — Strictly visible only when hovering directly on a 3D laptop mesh */
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

/* Opening Lead-In Stage: Laptop starts closed & centered, opens up, and glides left while disassembling before About Me starts */
.laptop-stage.laptop-intro-stage {
  min-height: 118vh;
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
  min-height: 76vh;
  padding: 1.75rem 4.5vw;
}

/* Final Disassembly Hold Stage for Unobstructed Touchpad CV */
.laptop-stage.final-disassembly-hold {
  min-height: 110vh;
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
  padding: 1.75rem 2.1rem;
  gap: 0.95rem;
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

/* Smaller heading specifically for Languages I Know */
.stage-title.small-stage-title {
  font-size: clamp(1.45rem, 2.1vw, 1.85rem);
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

/* Compact Languages Row + Embedded GitHub Contribution Graph + Badges + Philosophical Quote */
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

/* Badges Subsection under Contribution Graph */
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

.stage-mini-quote-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding-top: 0.2rem;
}

.mini-leaf {
  width: 24px;
  height: auto;
  opacity: 0.75;
  flex-shrink: 0;
}

.stage-mini-quote {
  font-family: var(--font-philo);
  font-style: italic;
  font-weight: 300;
  font-size: 1.08rem;
  letter-spacing: 0.025em;
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
   4. TEMPLATE REPO HORIZONTAL OVERLAPPING CARD STACK (Hover Moves Card to Center)
   ========================================================================== */
.projects-section {
  padding: 1.1rem 4.5vw 7rem;
  position: relative;
  z-index: 5;
  overflow: hidden;
}

.section-header-wrap {
  margin-bottom: 2rem;
  text-align: center;
}

.template-horizontal-stack {
  position: relative;
  width: 100%;
  min-height: 540px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  perspective: 1600px;
  padding: 2rem 0;
}

.stack-card {
  width: clamp(290px, 32vw, 390px);
  height: 470px;
  border-radius: 18px;
  margin: 0 -115px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateX(0px) translateY(0px) translateZ(0px) rotateY(-24deg) scale(0.94);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.55s ease, border-color 0.35s ease, opacity 0.4s ease;
  box-shadow: -18px 14px 38px rgba(0, 0, 0, 0.78);
  flex-shrink: 0;
}

/* When a card is hovered/focused, it glides horizontally to the center of the stage and rotates flat! */
.stack-card.is-centered {
  transform: translateX(var(--center-shift, 0px)) translateY(-12px) translateZ(130px) rotateY(0deg) scale(1.04);
  z-index: 60 !important;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.88), 0 0 42px rgba(16, 185, 129, 0.25);
}

.stack-card.pushed-left {
  transform: translateX(-145px) translateZ(-35px) rotateY(-28deg) scale(0.9);
  opacity: 0.72;
}

.stack-card.pushed-right {
  transform: translateX(145px) translateZ(-35px) rotateY(-28deg) scale(0.9);
  opacity: 0.72;
}

/* Layer 01: Active Project Card (SanitX) */
.stack-card.active-project-card {
  background: linear-gradient(155deg, rgba(18, 36, 31, 0.98), rgba(14, 15, 22, 0.99));
  border: 1.5px solid #10b981;
  padding: 1.65rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.9rem;
  cursor: pointer;
}

.stack-card-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.stack-slot-num {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
  color: #10b981;
}

.project-logo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(9, 9, 13, 0.8);
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
  margin-top: 0.45rem;
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 500;
  color: #10b981;
}

.project-bullets {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #d1d5db;
  font-size: 0.78rem;
  line-height: 1.42;
}

/* Layers 02–08: Stacked Non-Interactive Grey Photo Frame Cards */
.stack-card.grey-layer-card {
  background: linear-gradient(160deg, #1d1e26 0%, #13141a 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 1.35rem;
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
  margin-top: 0.75rem;
  border-radius: 12px;
  background: linear-gradient(145deg, #2a2b34 0%, #1e1f27 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.5);
  position: relative;
}

.grey-photo-frame::after {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  background: rgba(255, 255, 255, 0.015);
}

/* ==========================================================================
   5. JULIAN GARNIER (juliangarnier.com) CHAT-FORM CONTACT ME SECTION
      (Minimalist White, Sequential Chat Bubbles, No Buttons, No Phone Number)
   ========================================================================== */
.dark-to-white-transition {
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, #09090d 0%, #f7f6f2 100%);
}

.minimal-white-contact {
  background: #f7f6f2;
  color: #141413;
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 5vw 4rem;
  position: relative;
  z-index: 10;
}

.minimal-contact-inner {
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-me-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.4rem, 4.2vw, 3.4rem);
  color: #141413;
  letter-spacing: -0.01em;
}

.minimal-chat-stream {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  min-height: 290px;
}

.minimal-bubble {
  max-width: 88%;
  padding: 0.9rem 1.3rem;
  border-radius: 22px;
  border-bottom-left-radius: 6px;
  background: #e9e7e0;
  color: #141413;
  font-size: 1.02rem;
  line-height: 1.52;
  letter-spacing: -0.01em;
  animation: minimalFadeUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes minimalFadeUp {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
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

/* Julian Garnier ••• typing indicator pill */
.minimal-typing {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0.95rem 1.2rem;
  border-radius: 22px;
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
  .stage-bento-panel { width: 92vw; }
  .part-link-callout { display: none; }
  .stack-card { width: 270px; height: 440px; margin: 0 -95px; }
}
```

### File 4: `scripts/laptop3d.js`
```javascript
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

window.addEventListener('DOMContentLoaded', () => {
  const { profile, laptopStages, reelFrames, projects, contactMessages } = PORTFOLIO_DATA;

  // 0. Initial Template Repository Loading Screen (Longer ~3.0s smooth duration)
  const loaderOverlay = document.getElementById('loader-overlay');
  const loaderCount = document.getElementById('loader-count');
  const loaderBarFill = document.getElementById('loader-bar-fill');

  let loadVal = 0;
  const loadTimer = setInterval(() => {
    const step = loadVal < 35 ? 2 : loadVal < 78 ? 1 : 2;
    loadVal = Math.min(100, loadVal + step);
    if (loaderCount) loaderCount.textContent = String(loadVal).padStart(3, '0');
    if (loaderBarFill) loaderBarFill.style.width = `${loadVal}%`;
    if (loadVal >= 100) {
      clearInterval(loadTimer);
      setTimeout(() => {
        if (loaderOverlay) loaderOverlay.classList.add('loaded');
        document.body.classList.remove('is-loading');
      }, 420);
    }
  }, 42);

  // 1. Populate Hero
  document.getElementById('hero-first').textContent = profile.firstName;
  document.getElementById('hero-last').textContent = profile.lastName;

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
        <div class="github-badges-row">
          <span class="badges-title">${st.badgesTitle || 'Badges'}</span>
          <span class="badges-placeholder">${st.badgesPlaceholder || 'Yet to earn'}</span>
        </div>
      </div>
      <div class="stage-mini-quote-wrap">
        <svg class="mini-leaf" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 20C24 18 14 13 4 4" stroke="#6ee7b7" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M24 17C22 11 16 9 12 10C14 15 19 17 24 17Z" fill="rgba(110,231,183,0.2)" stroke="#6ee7b7" stroke-width="1.1"/>
        </svg>
        <blockquote class="stage-mini-quote">“${st.stageQuote}”</blockquote>
        <svg class="mini-leaf" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      if (progress >= 0.16 && progress < 0.79) {
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

  // 4. Render 8 Horizontally Stacked Project Layers (Template Repo Style: Hovering Moves Card to Center!)
  const projectsStack = document.getElementById('projects-stack');
  const totalLayers = projects.length;
  const middleIdx = (totalLayers - 1) / 2;

  projects.forEach((proj, idx) => {
    const card = document.createElement('article');
    card.style.zIndex = String(totalLayers - idx);
    // Calculate horizontal shift needed to bring this card to the exact center of the horizontal stack when hovered
    const offsetSteps = middleIdx - idx;
    const shiftPx = offsetSteps * 42;
    card.style.setProperty('--center-shift', `${shiftPx}px`);

    if (!proj.isPlaceholder) {
      card.className = 'stack-card active-project-card';
      card.innerHTML = `
        <div class="stack-card-top">
          <div>
            <h3 class="stage-title" style="font-size:1.95rem">${proj.title}</h3>
            <p class="mono-tag" style="color:#f59e0b;margin-top:0.2rem;font-size:0.65rem">${proj.subtitle}</p>
          </div>
          <span class="stack-slot-num">${proj.slot}</span>
        </div>
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-logo-link" title="Open SanitX GitHub Repository">
          <svg width="64" height="64" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 8L16 22V46C16 67.2 29.6 86.8 48 92C66.4 86.8 80 67.2 80 46V22L48 8Z" stroke="#10b981" stroke-width="4" fill="rgba(16,185,129,0.12)"/>
            <rect x="34" y="28" width="28" height="36" rx="4" stroke="#38bdf8" stroke-width="3"/>
            <path d="M41 40H55M41 48H55M41 56H49" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <span class="project-logo-caption">View SanitX on GitHub ↗</span>
        </a>
        <div class="pills-wrap">${proj.tech.map(t => `<span class="color-pill" style="--pill-color:${proj.accent};font-size:0.7rem;padding:0.25rem 0.55rem">${t}</span>`).join('')}</div>
        <ul class="project-bullets">${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    } else {
      card.className = 'stack-card grey-layer-card';
      card.setAttribute('aria-hidden', 'true');
      card.innerHTML = `
        <div class="stack-card-top">
          <span class="stack-slot-num">${proj.slot}</span>
        </div>
        <div class="grey-photo-frame"></div>`;
    }
    projectsStack.appendChild(card);
  });

  // Hovering the active project card smoothly moves it to the center and parts the rest of the stack
  const allStackCards = projectsStack.querySelectorAll('.stack-card');
  const activeProjectCard = projectsStack.querySelector('.active-project-card');

  function focusCardToCenter(targetIdx) {
    allStackCards.forEach((c, i) => {
      c.classList.remove('is-centered', 'pushed-left', 'pushed-right');
      if (i === targetIdx) {
        c.classList.add('is-centered');
      } else if (i < targetIdx) {
        c.classList.add('pushed-left');
      } else {
        c.classList.add('pushed-right');
      }
    });
  }

  function resetStack() {
    allStackCards.forEach((c) => {
      c.classList.remove('is-centered', 'pushed-left', 'pushed-right');
    });
  }

  if (activeProjectCard) {
    activeProjectCard.addEventListener('pointerenter', () => focusCardToCenter(0));
    projectsStack.addEventListener('pointerleave', resetStack);
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
        const contentSpan = Math.max(0, Math.min(0.999, (self.progress - 0.16) / 0.63));
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

  // 5. Julian Garnier (juliangarnier.com) Auto-Typing Chat-Form Contact Me Section (No Buttons, No Phone Number)
  const chatMessagesEl = document.getElementById('chat-messages');

  function appendChatBubble(html) {
    const b = document.createElement('div');
    b.className = 'minimal-bubble';
    b.innerHTML = html;
    chatMessagesEl.appendChild(b);
  }

  function showTypingThenBubble(html, delay = 650) {
    return new Promise((resolve) => {
      const typing = document.createElement('div');
      typing.className = 'minimal-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      chatMessagesEl.appendChild(typing);
      setTimeout(() => {
        typing.remove();
        appendChatBubble(html);
        resolve();
      }, delay);
    });
  }

  let contactStarted = false;
  async function startJulianGarnierChat() {
    if (contactStarted || !chatMessagesEl) return;
    contactStarted = true;
    for (const msg of contactMessages) {
      await showTypingThenBubble(msg, 620);
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

---

## 3. One-Step Deployment Commands
```bash
cd "E:\Website Portfolio\My-Portfolio"
git add data/portfolioData.js index.html styles/main.css scripts/laptop3d.js scripts/main.js
git commit -m "feat: implement v5 refinements (longer loader, philosophical leaf quotes, closed-to-open laptop with Motherboard/RAM/Storage, hover-to-center project stack, Julian Garnier chat Contact Me)"
git push origin main
```
