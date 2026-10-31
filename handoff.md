# Project Handoff Document: Suyash Sharma — 3D Disassembling Laptop & Editorial Portfolio

**Document Version:** 2.0 (Post-Production Release & Live Verification)  
**Date:** October 31, 2026  
**Repository:** [github.com/suyashcodemaster/My-Portfolio](https://github.com/suyashcodemaster/My-Portfolio)  
**Live Deployment:** [suyashcodemaster.vercel.app](https://suyashcodemaster.vercel.app)  
**Primary Working Directory:** `E:\Website Portfolio\My-Portfolio`

---

## 1. Executive Summary

This handoff document encapsulates the complete technical, architectural, aesthetic, and operational state of the personal portfolio website for **Suyash Sharma** (B.Tech Computer Science & Engineering undergraduate at Vellore Institute of Technology, '26–'30).

The portfolio is built as a zero-dependency, high-performance static web application powered by **Three.js (r128)** for procedural 3D WebGL rendering and **GSAP 3.12.5 + ScrollTrigger** for cinematic scroll synchronization. It merges a darkroom editorial aesthetic (`#09090d` background, film grain overlay, Instrument Serif + Inter + JetBrains Mono typography) with a modular 3D exploding laptop architecture, an authentic 35mm camera film reel, architectural project layer cards, and a Julian Garner–inspired conversational contact terminal.

All content, profile information, skills, projects, and chat scripts are strictly isolated in `data/portfolioData.js` so that content updates never require editing 3D WebGL code or CSS stylesheets.

---

## 2. Live URLs, Repositories & Environments

- **Production URL:** `https://suyashcodemaster.vercel.app` (HTTP 200 OK across all routes and assets)
- **GitHub Remote:** `https://github.com/suyashcodemaster/My-Portfolio.git` (Branch: `main`)
- **Hosting Platform:** Vercel (Configured via `vercel.json` with zero-build static routing)
- **Local Dev Server:** Built-in zero-dependency Node server (`node server.js`) or Python HTTP server (`python -m http.server 8000`)

---

## 3. Repository File Structure

```
E:\Website Portfolio\My-Portfolio\
├── .gitignore                     # Ignores node_modules, .DS_Store, .vercel
├── data\
│   └── portfolioData.js          # Central content manifest (Profile, 6 Stages, 7 Reel Frames, Projects, Chat)
├── favicon.svg                   # Vector camera lens / shutter favicon
├── index.html                    # Single HTML5 entrypoint with CDNs and semantic layout
├── logo.svg                      # Monochrome vector brand logo
├── package.json                  # Project manifest with npm start / dev scripts
├── public\
│   └── assets\
│       ├── suyash-photo.jpeg     # High-res portrait asset (240 KB)
│       └── Suyash-CV.pdf         # Official Curriculum Vitae PDF (105 KB)
├── README.md                     # Repository documentation & quickstart
├── scripts\
│   ├── laptop3d.js               # Three.js procedural 3D modular laptop & disassembly controller
│   └── main.js                   # Application controller, DOM generator & ScrollTrigger bindings
├── server.js                     # Zero-dependency local development server (Node.js)
├── styles\
│   └── main.css                  # Unified stylesheet with design tokens, bento cards & animations
├── Suyash-CV.pdf                 # Root fallback copy of CV (for direct links)
├── suyash-photo.jpeg             # Root fallback copy of photo (for direct links)
└── vercel.json                   # Vercel deployment configuration
```

> [!NOTE]
> All obsolete assets from earlier camera experiments (e.g., `cannonF1_v2.glb`, `6.jpg`, `uv-filter.jpg`, `index.js`, `index.css`, `_astro/`) were purged from the git tree to keep the repository under 1 MB and guarantee instantaneous Vercel deployments.

---

## 4. Key User Decisions & Design Implementations

### A. Landing / Hero Section
- **Removed Top HUD Bar:** The previous camera clone's top bar (timer `00:00:34`, FPS counter, resolution `1536x695`, corner reticles) and the tagline *"analog editorial x system architecture"* were **completely removed** as requested.
- **Enlarged Inline Portrait:** Suyash's portrait (`suyash-photo.jpeg`) is positioned **inline directly between the first and last name**: `SUYASH` `[Framed Photo]` `SHARMA`.
  - Dimensions: `width: clamp(140px, 18vw, 280px)`, `height: clamp(180px, 23vw, 360px)`.
  - Border: 2px solid `rgba(245, 158, 11, 0.7)` with ambient amber glow and hover-lift/rotate transition (`scale(1.05) rotate(-1.5deg)`).
- **Tagline:** `COMPUTER SCIENCE UNDERGRADUATE AT VIT // FULL-STACK & AI SYSTEMS BUILDER`.
- **Bottom-Left Jump Button:** `01 // DIRECT JUMP` `JUMP TO PROJECTS ↓` smoothly navigates to `#section-projects`.
- **Bottom-Center Scroll Indicator:** `SCROLL TO DISASSEMBLE` with vertical gradient pulsing line.

### B. 3D Modular Disassembling Laptop (`#section-laptop`)
- **Procedural Three.js Model:** No bulky external `.glb` files. The laptop is procedurally generated with high-performance PBR materials (`MeshStandardMaterial`), ACESFilmic tonemapping, and dynamic directional lights.
- **6 Separated Subsystems:**
  1. `display`: Screen lid with metallic chassis, thin bezel, emissive 120Hz IPS panel, webcam dot, and cylindrical hinge.
  2. `logicBoard`: Dark green PCB with CPU silicon die, copper heat pipes, dual RAM modules with gold contacts, NVMe M.2 SSD, and twin turbine fan housings.
  3. `keyboard`: Recessed keyboard deck plate with full 5-row keycap matrix (function keys, letters, spacebar).
  4. `speakers`: Left and right acoustic transducer grilles plus side USB-C / Thunderbolt gold contact ports.
  5. `touchpad`: Precision frosted glass touchpad with gold chamfered rim. Raycasted for click-to-download and hover cursor.
  6. `battery`: Lower unibody aluminum tray, 4-cell lithium battery pack, and bottom rubber feet.
- **Scroll Disassembly Physics:**
  - As the user scrolls across the 6 stages, each subsystem smoothly expands along its axes (`display` tilts back and floats up +Y/-Z; `keyboard` floats up +Y; `logicBoard` hovers mid-air; `speakers` spread outward +/-X; `touchpad` floats forward toward the camera +Z/+Y; `battery` drops downward -Y).
  - Slow cinematic rotation around Y and X axes.
- **Hover Detection & HUD Badging:**
  - Hovering the mouse over any part displays a floating cyan HUD badge near the cursor (e.g. `[ PART 02 // LOGIC BOARD & CPU SILICON ]`).
  - Clicking any part smoothly scrolls to that stage in the page.
  - Clicking the 3D touchpad triggers an instantaneous download of `Suyash-CV.pdf`.
- **Touchpad Stage Minimalism:**
  - On Stage 05 (Precision Glass Touchpad), all redundant copy was stripped. It contains **strictly only the glowing "Download CV" button**.

### C. 35mm Camera Film Reel (`#section-reel`)
- Authentic horizontal 35mm camera film strip with top and bottom sprocket perforation tracks.
- Populated with **7 frames of Hobbies & Aspirations**:
  - `Frame 01A` (Rose `#f43f5e`): **Human Connections** (Community)
  - `Frame 02A` (Sky Cyan `#38bdf8`): **Space & Aviation** (Aerospace)
  - `Frame 03A` (Amber Gold `#f59e0b`): **Basketball & Sports** (Competition)
  - `Frame 04A` (Emerald `#10b981`): **Martial Arts** (Discipline)
  - `Frame 05A` (Electric Purple `#a855f7`): **Finance & Markets** (Strategy)
  - `Frame 06A` (Teal `#2dd4bf`): **Nature, Animals & Travel** (Exploration)
  - `Frame 07A` (Indigo `#6366f1`): **Gaming & AI Aspirations** (Future)

### D. Removal of Formula 1 / Color Inversion Scan
- The Canon F-1 raw negative / color inversion scan section (`#section-scan`) was completely removed.

### E. Side-by-Side Project Layers (`#section-projects`)
- Inspired by the layer stack from the reference repository:
  - **Layer 01 (Featured Live Layer): SanitX**
    - Links to `https://github.com/suyashcodemaster/SanitX`.
    - Features a custom vector shield-and-document logo with cyan/emerald glowing borders.
    - Displays hackathon badge: *DevJams '26 Hackathon • Reached Review 3 (Top 11 Teams)*.
    - Tech badges: Python, FastAPI, PyMuPDF, Gemini API, Next.js, TypeScript, Tailwind CSS.
    - Bullet points detailing the two-layer prompt injection defense pipeline and system architecture.
  - **Layers 02–05 (Reserved Architecture Slots):**
    - Sleek dark architectural cards (`#13141a` to `#1a1a24`) with thin subtle borders and slot numbers (`02`, `03`, `04`, `05`).
    - **Zero "placeholder" text anywhere** (labeled strictly as `// ARCHITECTURE // RESERVED`).

### F. Julian Garner Inspired Conversational Chat Terminal (`#section-contact`)
- **Scroll-Triggered Initialization:** Unlike naive chatbots that load on page open, this uses an `IntersectionObserver` on `#section-contact` (threshold 0.25). The chat animation begins **only when the user scrolls down to this section**.
- **Typing Indicator Animation:** Three bouncing animated dots inside a bot bubble (`.typing-indicator`) appear before every bot message.
- **Intro Flow:** Typing indicator (1.2s) → Intro Message 1 → Typing indicator (1.1s) → Intro Message 2 → Interactive prompt buttons fade in.
- **Interactive Quick-Reply Pills:**
  1. `Direct contact info 📇`: Drops Email, Phone, LinkedIn, and GitHub links.
  2. `Download CV 📄`: Generates an in-chat CV download pill button.
  3. `What are you learning right now? 🚀`: C++, DSA, AI, and Harvard CS50x.
  4. `Collaborate / Build together 🤝`: One-click email draft link.
- **Direct Contact Grid:** Static fallback contact cards placed below the chat window (Email, Phone, LinkedIn, GitHub).

---

## 5. Candidate Profile & Resume Ground Truth

All verified information extracted from `Suyash-CV.pdf` and conversation context:

- **Name:** Suyash Sharma
- **Academic Program:** B.Tech in Computer Science & Engineering (July 2026 – May 2030)
- **Institution:** Vellore Institute of Technology (VIT), Tamil Nadu, India
- **Secondary Education:**
  - Class XII, CBSE: Mahaveer English Medium School (Grade: A1)
  - Class X, CBSE: Delhi Public School, Pune (Grade: A1)
- **Direct Contact:**
  - Email: `sharma.suyash.in@gmail.com`
  - Phone: `+91 7888222223`
  - LinkedIn: `https://linkedin.com/in/suyashsharmadev`
  - GitHub: `https://github.com/suyashcodemaster`
- **Verbatim Engineering Mission Quote:**
  > "My goal is to pair hard work with smart planning to ensure my engineering efforts are highly targeted and deliver the best possible results. Whether managing a team or competing as a regional basketball player, I have learned to adapt quickly and view challenges from multiple perspectives. I am dedicated to bringing this adaptability and grassroots approach to every technical solution I build."
- **Featured Project — SanitX:**
  - Repo: `https://github.com/suyashcodemaster/SanitX`
  - Recognition: Top 11 Finalist out of all teams at DevJams '26 Hackathon
  - Architecture: Two-layer pipeline (rule-based scanner for hidden/low-contrast text + Gemini API semantic safety analysis) detecting prompt injections in PDF/Markdown files.
- **Technical Skills:**
  - Languages: Python, C, SQL, JavaScript, TypeScript, HTML/CSS
  - Currently Learning: Python, C++, DSA, Artificial Intelligence
  - Frameworks: FastAPI, Next.js, React, Node.js, Flask, Tailwind CSS
  - Libraries: pandas, NumPy, Matplotlib, PyMuPDF
  - Developer Tools: Git, GitHub, Docker, VS Code, Visual Studio, PyCharm
- **Courses & Certifications:**
  - Harvard University: CS50x Introduction to Computer Science (In Progress)
  - Amazon Web Services: AWS Workshop Certificate: Cloud Intelligence
- **Athletics & Honors:**
  - District-Level Basketball (Class 5–8)
  - Mathematics & Mental Math Competitions Winner (Class 2–8)

---

## 6. Full Code Implementation Reference

### A. Central Content Manifest (`data/portfolioData.js`)

```javascript
export const PORTFOLIO_DATA = {
  profile: {
    firstName: "SUYASH",
    lastName: "SHARMA",
    tagline: "COMPUTER SCIENCE UNDERGRADUATE AT VIT // FULL-STACK & AI SYSTEMS BUILDER",
    photoUrl: "./suyash-photo.jpeg",
    cvUrl: "./Suyash-CV.pdf",
    cvDownloadName: "Suyash-Sharma-CV.pdf",
    email: "sharma.suyash.in@gmail.com",
    phone: "+91 7888222223",
    linkedin: "https://linkedin.com/in/suyashsharmadev",
    github: "https://github.com/suyashcodemaster",
    location: "Vellore, Tamil Nadu & Pune, India"
  },

  laptopStages: [
    {
      id: "about",
      partKey: "display",
      index: "01 // DISPLAY SUBSYSTEM",
      title: "About Me",
      accent: "#38bdf8",
      summary: "Computer Science & Engineering undergraduate combining strong academic foundations with hands-on full-stack engineering and AI security architecture.",
      cards: [
        {
          heading: "Vellore Institute of Technology (VIT)",
          sub: "B.Tech in Computer Science & Engineering • July 2026 – May 2030",
          meta: "Tamil Nadu, India"
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
      pillsTitle: "Core Soft Skills",
      pills: [
        "Communication", "Adaptability & Flexibility", "Problem Solving",
        "Teamwork", "Leadership", "Critical Thinking", "Work Ethic & Dependability"
      ]
    },
    {
      id: "mission",
      partKey: "logicBoard",
      index: "02 // LOGIC BOARD & CPU CORE",
      title: "The Mission",
      accent: "#a855f7",
      quote: "My goal is to pair hard work with smart planning to ensure my engineering efforts are highly targeted and deliver the best possible results. Whether managing a team or competing as a regional basketball player, I have learned to adapt quickly and view challenges from multiple perspectives. I am dedicated to bringing this adaptability and grassroots approach to every technical solution I build.",
      pillsTitle: "Core Engineering Pillars",
      pills: ["Targeted Execution", "Cross-Perspective Thinking", "Team Synergy", "Grassroots Problem Solving"]
    },
    {
      id: "skills",
      partKey: "keyboard",
      index: "03 // KEYBOARD MATRIX & ENGINE",
      title: "Technical Skills",
      accent: "#10b981",
      skillGroups: [
        { label: "Programming Languages", color: "#10b981", items: ["Python", "C", "SQL", "JavaScript", "TypeScript", "HTML/CSS"] },
        { label: "Currently Learning", color: "#f59e0b", items: ["Python", "C++", "Data Structures & Algorithms (DSA)", "Artificial Intelligence"] },
        { label: "Frameworks", color: "#38bdf8", items: ["FastAPI", "Next.js", "React", "Node.js", "Flask", "Tailwind CSS"] },
        { label: "Libraries", color: "#a855f7", items: ["pandas", "NumPy", "Matplotlib", "PyMuPDF"] },
        { label: "Developer Tools", color: "#f43f5e", items: ["Git", "GitHub", "Docker", "VS Code", "Visual Studio", "PyCharm"] }
      ]
    },
    {
      id: "languages",
      partKey: "speakers",
      index: "04 // ACOUSTIC & I/O ARRAY",
      title: "Languages I Know",
      accent: "#f59e0b",
      summary: "Spoken human languages that power clear cross-functional collaboration, technical presentations, and team leadership.",
      cards: [
        {
          heading: "English",
          sub: "Full Professional & Academic Fluency",
          meta: "Primary Technical & Collaborative Medium"
        },
        {
          heading: "Hindi",
          sub: "Native / Bilingual Proficiency",
          meta: "Native Spoken & Written Fluency"
        }
      ]
    },
    {
      id: "touchpad-cv",
      partKey: "touchpad",
      index: "05 // PRECISION GLASS TOUCHPAD",
      title: "Curriculum Vitae",
      accent: "#ec4899",
      summary: "Direct access to official curriculum vitae and verified engineering background.",
      isTouchpadStage: true
    },
    {
      id: "achievements",
      partKey: "battery",
      index: "06 // POWER CORE & ARCHIVAL STORAGE",
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
          heading: "Mathematics & Mental Math (Class 2 – 8)",
          sub: "Won multiple mathematics and mental math competitions",
          meta: "Competitive Math"
        }
      ]
    }
  ],

  reelFrames: [
    { frame: "01A", title: "Human Connections", tag: "COMMUNITY", color: "#f43f5e", desc: "Building meaningful connections with people, collaborating across diverse teams, and sharing ideas." },
    { frame: "02A", title: "Space & Aviation", tag: "AEROSPACE", color: "#38bdf8", desc: "Deep fascination with orbital mechanics, aircraft engineering, and the frontier of flight." },
    { frame: "03A", title: "Basketball & Sports", tag: "COMPETITION", color: "#f59e0b", desc: "District-level basketball player bringing court vision, composure, and fast adaptation to every challenge." },
    { frame: "04A", title: "Martial Arts", tag: "DISCIPLINE", color: "#10b981", desc: "Practicing martial arts for mental focus, kinetic precision, and resilience under pressure." },
    { frame: "05A", title: "Finance & Markets", tag: "STRATEGY", color: "#a855f7", desc: "Studying market dynamics, capital allocation, and quantitative decision-making." },
    { frame: "06A", title: "Nature, Animals & Travel", tag: "EXPLORATION", color: "#2dd4bf", desc: "Exploring new geographies, appreciating wildlife, and staying grounded in the natural world." },
    { frame: "07A", title: "Gaming & AI Aspirations", tag: "FUTURE", color: "#6366f1", desc: "Exploring interactive virtual worlds while aspiring to architect safe, high-impact AI systems." }
  ],

  projects: [
    {
      slot: "LAYER 01 // FEATURED",
      isPlaceholder: false,
      title: "SanitX",
      subtitle: "DevJams '26 Hackathon • Reached Review 3 (Top 11 Teams)",
      accent: "#10b981",
      githubUrl: "https://github.com/suyashcodemaster/SanitX",
      tech: ["Python", "FastAPI", "PyMuPDF", "Gemini API", "Next.js", "TypeScript", "Tailwind CSS"],
      bullets: [
        "Built a document security tool with a team that detects prompt injection hidden inside PDF and Markdown files before they reach an AI system.",
        "Engineered a two-layer pipeline: a rule-based scanner for tiny text, low-contrast text, and hidden content, followed by Gemini analysis deciding document safety.",
        "Contributed across the stack: ideation, FastAPI backend, Next.js frontend, and designing and presenting the system architecture."
      ]
    },
    { slot: "02", isPlaceholder: true, title: "Next Architecture", subtitle: "Reserved Slot" },
    { slot: "03", isPlaceholder: true, title: "Next Architecture", subtitle: "Reserved Slot" },
    { slot: "04", isPlaceholder: true, title: "Next Architecture", subtitle: "Reserved Slot" },
    { slot: "05", isPlaceholder: true, title: "Next Architecture", subtitle: "Reserved Slot" }
  ],

  chat: {
    introMessages: [
      "Hello! Thanks for visiting my portfolio terminal.",
      "I'm Suyash Sharma — Computer Science undergraduate at VIT Vellore ('26–'30). Select any prompt below to explore:"
    ],
    prompts: [
      {
        id: "contact",
        label: "Direct contact info 📇",
        color: "#38bdf8",
        replyHtml: `Reach out directly anytime:<br><br>
          📧 <strong>Email:</strong> <a href="mailto:sharma.suyash.in@gmail.com">sharma.suyash.in@gmail.com</a><br>
          📱 <strong>Phone:</strong> <a href="tel:+917888222223">+91 7888222223</a><br>
          💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/suyashsharmadev" target="_blank" rel="noopener">linkedin.com/in/suyashsharmadev ↗</a><br>
          💻 <strong>GitHub:</strong> <a href="https://github.com/suyashcodemaster" target="_blank" rel="noopener">github.com/suyashcodemaster ↗</a>`
      },
      {
        id: "cv",
        label: "Download CV 📄",
        color: "#ec4899",
        replyHtml: `Here is my official CV:<br><br>
          <a href="./Suyash-CV.pdf" download="Suyash-Sharma-CV.pdf" class="chat-cv-chip">Download CV (PDF)</a>`
      },
      {
        id: "current",
        label: "What are you learning right now? 🚀",
        color: "#10b981",
        replyHtml: `Currently advancing in <strong>C++</strong>, <strong>Data Structures & Algorithms (DSA)</strong>, and <strong>Applied Artificial Intelligence</strong> alongside Harvard's <strong>CS50x</strong>.`
      },
      {
        id: "hire",
        label: "Collaborate / Build together 🤝",
        color: "#f59e0b",
        replyHtml: `Always open to internships, hackathons, and high-impact engineering projects. <a href="mailto:sharma.suyash.in@gmail.com?subject=Engineering%20Collaboration%20Inquiry">Click here to start an email draft directly to me ↗</a>`
      }
    ]
  }
};
```

---

### B. Vercel Deployment Configuration (`vercel.json`)

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
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

---

## 7. Operational & Maintenance Guide for Suyash

### How to Add a New Project to a Reserved Layer
1. Open `data/portfolioData.js`.
2. Locate `projects[1]` (slot `02`).
3. Change `isPlaceholder: true` to `false`.
4. Provide the project details:
   ```javascript
   {
     slot: "LAYER 02 // DISTRIBUTED SYSTEMS",
     isPlaceholder: false,
     title: "Your Project Name",
     subtitle: "Project Subtitle • Hackathon / Production",
     accent: "#38bdf8",
     githubUrl: "https://github.com/suyashcodemaster/your-repo",
     tech: ["Go", "Docker", "Redis", "gRPC"],
     bullets: [
       "Feature accomplishment 1...",
       "Feature accomplishment 2...",
       "Architecture accomplishment 3..."
     ]
   }
   ```
5. Commit and push:
   ```bash
   git add data/portfolioData.js
   git commit -m "feat: publish layer 02 project"
   git push origin main
   ```
   Vercel will automatically redeploy the site in less than 20 seconds.

### How to Update Your CV or Portrait Photo
- **New CV:** Save your updated PDF as `Suyash-CV.pdf` directly at the repository root (and optionally copy to `public/assets/Suyash-CV.pdf`).
- **New Photo:** Replace `suyash-photo.jpeg` at the repository root.
- Push to GitHub:
  ```bash
  git add -A
  git commit -m "chore: update resume and headshot"
  git push origin main
  ```

### How to Run Locally
If you want to preview the site locally on any computer:
```bash
# Option A: Python
python -m http.server 8000
# Open http://localhost:8000

# Option B: Node.js
node server.js
# Open http://localhost:3000
```

---

## 8. Current Deployment Status Checklist

- [x] **Repository initialized & connected:** `https://github.com/suyashcodemaster/My-Portfolio`
- [x] **Vercel automated deployment active:** `https://suyashcodemaster.vercel.app`
- [x] **HTTP Status 200 OK:** Verified for HTML, CSS, JS, Photo, and CV
- [x] **Hero design requirement fulfilled:** No top HUD bar, no camera tags, photo inline between names, Jump to Projects & Scroll buttons present
- [x] **Modular 3D laptop active:** 6 subsystems cleanly disassemble upon scroll with hover badging and click-to-download CV
- [x] **Touchpad stage minimalist:** Strictly contains only the "Download CV" button
- [x] **35mm film reel active:** 7 Hobbies & Aspirations frames populated with sprocket perforations
- [x] **Formula 1 scan purged:** `#section-scan` and color negative inversion deleted
- [x] **Project layers:** SanitX active with working GitHub link; 4 reserved slots have zero "placeholder" text
- [x] **Julian Garner chat terminal:** Fires typing indicator only when scrolled into view, with realistic delays and prompt responses
- [x] **Assets verified:** `suyash-photo.jpeg` and `Suyash-CV.pdf` intact and tested
