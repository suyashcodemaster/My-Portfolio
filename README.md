# Suyash Sharma — Portfolio

> My personal portfolio website featuring an interactive 3D laptop breakdown, project showcases, and a darkroom-inspired editorial aesthetic.

🔗 **Live Site:** [suyashcodemaster.vercel.app](https://suyashcodemaster.vercel.app)

---

## About

Hi, I'm Suyash Sharma — a Computer Science & Engineering undergraduate at Vellore Institute of Technology.

This is the source code for my personal portfolio website. I built it as a lightweight static web app using vanilla web technologies, custom WebGL 3D graphics, and smooth scroll animations with zero heavy frontend frameworks.

## Tech Stack & Specs

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+ modules, zero build step)
- **3D Graphics:** [Three.js](https://threejs.org/) (r128) — procedural 3D WebGL rendering
- **Animations:** [GSAP](https://greensock.com/) (3.12.5) & ScrollTrigger
- **Typography:** Newsreader, Plus Jakarta Sans, JetBrains Mono
- **Deployment:** [Vercel](https://vercel.com/) (Edge Network with custom caching headers)
- **Local Dev Server:** Built-in zero-dependency Node.js HTTP server (`server.js`)

## Main Sections

- **3D Hardware Breakdown:** A procedural 3D laptop that disassembles as you scroll through my background, skills, and coursework.
- **Projects:** Interactive cards showcasing my featured projects with GitHub links.
- **35mm Analog Reel:** A horizontal film reel section highlighting personal interests and milestones.
- **Contact Terminal:** An interactive conversational terminal to easily reach out or download my resume.

## Running Locally

Clone the repo and start the local server:

```bash
git clone https://github.com/suyashcodemaster/My-Portfolio.git
cd My-Portfolio
npm start
```

*Or directly:*

```bash
node server.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
My-Portfolio/
├── data/
│   └── portfolioData.js     # Bio, project details, and contact terminal data
├── public/
│   └── assets/              # Static assets (CV and photo)
├── scripts/
│   ├── laptop3d.js          # Three.js 3D laptop scene & scroll disassembly
│   └── main.js              # Page logic, DOM rendering & scroll triggers
├── styles/
│   └── main.css             # Main stylesheet & responsive layout
├── index.html               # Main HTML entry point
├── server.js                # Zero-dependency local dev server
├── Suyash-CV.pdf            # Resume
├── suyash-photo.jpeg        # Profile photo
└── vercel.json              # Vercel caching & security headers
```

## Contact

- **Email:** [sharma.suyash.in@gmail.com](mailto:sharma.suyash.in@gmail.com)
- **LinkedIn:** [linkedin.com/in/suyashsharmadev](https://linkedin.com/in/suyashsharmadev)
- **GitHub:** [@suyashcodemaster](https://github.com/suyashcodemaster)

## License

[MIT](LICENSE)
