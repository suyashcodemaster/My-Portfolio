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

  // 6 Pinned 3D Laptop Disassembly Stages
  laptopStages: [
    {
      id: "about",
      partKey: "display",
      index: "01 // DISPLAY SUBSYSTEM",
      title: "About Me",
      accent: "#38bdf8", // Sky Cyan
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
      accent: "#a855f7", // Electric Purple
      quote: "My goal is to pair hard work with smart planning to ensure my engineering efforts are highly targeted and deliver the best possible results. Whether managing a team or competing as a regional basketball player, I have learned to adapt quickly and view challenges from multiple perspectives. I am dedicated to bringing this adaptability and grassroots approach to every technical solution I build.",
      pillsTitle: "Core Engineering Pillars",
      pills: ["Targeted Execution", "Cross-Perspective Thinking", "Team Synergy", "Grassroots Problem Solving"]
    },
    {
      id: "skills",
      partKey: "keyboard",
      index: "03 // KEYBOARD MATRIX & ENGINE",
      title: "Technical Skills",
      accent: "#10b981", // Emerald Green
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
      accent: "#f59e0b", // Amber Gold
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
      accent: "#ec4899", // Rose Magenta
      summary: "Direct access to official curriculum vitae and verified engineering background.",
      isTouchpadStage: true
    },
    {
      id: "achievements",
      partKey: "battery",
      index: "06 // POWER CORE & ARCHIVAL STORAGE",
      title: "Courses & Achievements",
      accent: "#6366f1", // Indigo Blue
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

  // 35mm Camera Reel — Hobbies & Aspirations
  reelFrames: [
    { frame: "01A", title: "Human Connections", tag: "COMMUNITY", color: "#f43f5e", desc: "Building meaningful connections with people, collaborating across diverse teams, and sharing ideas." },
    { frame: "02A", title: "Space & Aviation", tag: "AEROSPACE", color: "#38bdf8", desc: "Deep fascination with orbital mechanics, aircraft engineering, and the frontier of flight." },
    { frame: "03A", title: "Basketball & Sports", tag: "COMPETITION", color: "#f59e0b", desc: "District-level basketball player bringing court vision, composure, and fast adaptation to every challenge." },
    { frame: "04A", title: "Martial Arts", tag: "DISCIPLINE", color: "#10b981", desc: "Practicing martial arts for mental focus, kinetic precision, and resilience under pressure." },
    { frame: "05A", title: "Finance & Markets", tag: "STRATEGY", color: "#a855f7", desc: "Studying market dynamics, capital allocation, and quantitative decision-making." },
    { frame: "06A", title: "Nature, Animals & Travel", tag: "EXPLORATION", color: "#2dd4bf", desc: "Exploring new geographies, appreciating wildlife, and staying grounded in the natural world." },
    { frame: "07A", title: "Gaming & AI Aspirations", tag: "FUTURE", color: "#6366f1", desc: "Exploring interactive virtual worlds while aspiring to architect safe, high-impact AI systems." }
  ],

  // Side-by-Side Layers — Projects (SanitX + 4 Reserved Dark Layers)
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

  // Julian Roberts / Garner Inspired Conversational Chat
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
