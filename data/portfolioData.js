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
    location: "Vellore, Tamil Nadu & Pune, India"
  },

  // 5 Core Developer & Person Disassembly Stages
  // (At scroll completion, the 3D Touchpad detaches forward with the Download CV button directly on it)
  laptopStages: [
    {
      id: "about",
      partKey: "display",
      partLabel: "DISPLAY PANEL & OPTICS",
      traitLabel: "VISION & FOUNDATION",
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
      partLabel: "LOGIC BOARD & CPU SILICON",
      traitLabel: "CORE PROCESSING & MINDSET",
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
      partLabel: "MECHANICAL KEYBOARD MATRIX",
      traitLabel: "EXECUTION & TOOLKIT",
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
      partLabel: "ACOUSTIC TRANSDUCERS & I/O",
      traitLabel: "VOICE & COLLABORATION",
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
      id: "achievements",
      partKey: "battery",
      partLabel: "POWER CORE & UNIBODY CHASSIS",
      traitLabel: "ENDURANCE & MILESTONES",
      index: "05 // POWER CORE & ARCHIVAL STORAGE",
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

  // Section 3: Scroll-Animated 35mm Camera Reel — Hobbies & Aspirations
  reelFrames: [
    { frame: "01A", title: "Human Connections", tag: "COMMUNITY", color: "#f43f5e", desc: "Building meaningful connections with people, collaborating across diverse teams, and sharing ideas." },
    { frame: "02A", title: "Space & Aviation", tag: "AEROSPACE", color: "#38bdf8", desc: "Deep fascination with orbital mechanics, aircraft engineering, and the frontier of flight." },
    { frame: "03A", title: "Basketball & Sports", tag: "COMPETITION", color: "#f59e0b", desc: "District-level basketball player bringing court vision, composure, and fast adaptation to every challenge." },
    { frame: "04A", title: "Martial Arts", tag: "DISCIPLINE", color: "#10b981", desc: "Practicing martial arts for mental focus, kinetic precision, and resilience under pressure." },
    { frame: "05A", title: "Finance & Markets", tag: "STRATEGY", color: "#a855f7", desc: "Studying market dynamics, capital allocation, and quantitative decision-making." },
    { frame: "06A", title: "Nature, Animals & Travel", tag: "EXPLORATION", color: "#2dd4bf", desc: "Exploring new geographies, appreciating wildlife, and staying grounded in the natural world." },
    { frame: "07A", title: "Gaming & AI Aspirations", tag: "FUTURE", color: "#6366f1", desc: "Exploring interactive virtual worlds while aspiring to architect safe, high-impact AI systems." }
  ],

  // Section 4: 8 Stacked Library-Book Project Layers (Layer 01 Active + Layers 02-08 Non-Interactive Grey Photo Frames)
  projects: [
    {
      slot: "01",
      isPlaceholder: false,
      title: "SanitX",
      category: "AI SECURITY // FULL-STACK",
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
    { slot: "02", isPlaceholder: true },
    { slot: "03", isPlaceholder: true },
    { slot: "04", isPlaceholder: true },
    { slot: "05", isPlaceholder: true },
    { slot: "06", isPlaceholder: true },
    { slot: "07", isPlaceholder: true },
    { slot: "08", isPlaceholder: true }
  ],

  // Section 5: Minimalist White Contact Section (Julian Garner Style)
  chat: {
    introMessages: [
      "Hey, I'm Suyash.",
      "Thanks for scrolling through. Feel free to reach out or grab anything you need below."
    ],
    prompts: [
      {
        id: "contact",
        label: "How can I reach you?",
        replyHtml: `You can email me directly at <a href="mailto:sharma.suyash.in@gmail.com">sharma.suyash.in@gmail.com</a> or call/message <a href="tel:+917888222223">+91 7888222223</a>.<br><br>I'm also on <a href="https://linkedin.com/in/suyashsharmadev" target="_blank" rel="noopener">LinkedIn ↗</a> and <a href="https://github.com/suyashcodemaster" target="_blank" rel="noopener">GitHub ↗</a>.`
      },
      {
        id: "cv",
        label: "Can I grab a copy of your CV?",
        replyHtml: `Of course — here is the direct PDF download:<br><br><a href="./Suyash-CV.pdf" download="Suyash-Sharma-CV.pdf" class="minimal-cv-link">Download Suyash-Sharma-CV.pdf ↓</a>`
      },
      {
        id: "current",
        label: "What are you focused on right now?",
        replyHtml: `I'm pursuing my B.Tech in CSE at VIT Vellore while diving deeper into C++, Data Structures & Algorithms, and Applied AI alongside Harvard's CS50x.`
      },
      {
        id: "hire",
        label: "Let's collaborate on a project",
        replyHtml: `I'd love that. I'm always open to internships, hackathons, and building thoughtful software. <a href="mailto:sharma.suyash.in@gmail.com?subject=Hey%20Suyash%20—%20Let's%20Build%20Together">Send me an email ↗</a>`
      }
    ]
  }
};
