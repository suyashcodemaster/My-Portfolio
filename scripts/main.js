import { PORTFOLIO_DATA } from '../data/portfolioData.js';
import { initLaptop3D } from './laptop3d.js';

window.addEventListener('DOMContentLoaded', () => {
  const { profile, laptopStages, reelFrames, projects, chat } = PORTFOLIO_DATA;

  // 1. Populate Hero (Single-line name + inline photo, no tagline)
  document.getElementById('hero-first').textContent = profile.firstName;
  document.getElementById('hero-last').textContent = profile.lastName;

  // 2. Render 5 Developer/Person Laptop Disassembly Stages + Final Detached Touchpad Hold Stage
  const stagesContainer = document.getElementById('laptop-stages-container');
  const dotsContainer = document.getElementById('stage-dots');

  laptopStages.forEach((st, idx) => {
    const dot = document.createElement('div');
    dot.className = `stage-dot ${idx === 0 ? 'active' : ''}`;
    dot.style.background = idx === 0 ? st.accent : 'rgba(255,255,255,0.2)';
    dotsContainer.appendChild(dot);

    const cardsHtml = st.cards ? `<div class="stage-cards-grid">${st.cards.map(c => `
      <div class="stage-subcard">
        <h4>${c.heading}</h4>
        <p>${c.sub}</p>
        <span class="subcard-meta">${c.meta}</span>
      </div>`).join('')}</div>` : '';

    const skillsHtml = st.skillGroups ? `<div class="skill-groups-wrap">${st.skillGroups.map(g => `
      <div class="skill-group-row">
        <span class="skill-group-label" style="color:${g.color}">${g.label}</span>
        <div class="pills-wrap">${g.items.map(item => `<span class="color-pill" style="--pill-color:${g.color}">${item}</span>`).join('')}</div>
      </div>`).join('')}</div>` : '';

    const pillsHtml = st.pills ? `
      <div>
        <p class="mono-tag" style="margin-bottom:0.55rem;color:${st.accent}">${st.pillsTitle}</p>
        <div class="pills-wrap">${st.pills.map(p => `<span class="color-pill" style="--pill-color:${st.accent}">${p}</span>`).join('')}</div>
      </div>` : '';

    const section = document.createElement('div');
    section.className = 'laptop-stage';
    section.innerHTML = `
      <article class="stage-bento-panel" style="--stage-accent:${st.accent}">
        <div class="stage-part-chip">
          <span>HARDWARE MATCH: ${st.partLabel}</span>
          <span>•</span>
          <span>${st.traitLabel}</span>
        </div>
        <span class="mono-tag" style="color:${st.accent}">${st.index}</span>
        <h2 class="stage-title">${st.title}</h2>
        ${st.summary ? `<p class="stage-summary">${st.summary}</p>` : ''}
        ${st.quote ? `<blockquote class="stage-quote">“${st.quote}”</blockquote>` : ''}
        ${cardsHtml}
        ${skillsHtml}
        ${pillsHtml}
      </article>`;
    stagesContainer.appendChild(section);
  });

  // Final Scroll Hold Stage: Laptop disassembly completes and Touchpad detaches with "Download CV" button on it
  const finalHoldStage = document.createElement('div');
  finalHoldStage.className = 'laptop-stage final-disassembly-hold';
  stagesContainer.appendChild(finalHoldStage);

  const calloutEl = document.getElementById('part-link-callout');
  const calloutPartName = document.getElementById('callout-part-name');
  const calloutTraitName = document.getElementById('callout-trait-name');
  const hoverTooltip = document.getElementById('part-hover-tooltip');
  const touchpadOverlay = document.getElementById('touchpad-cv-overlay');
  const touchpadAnchor = document.getElementById('touchpad-cv-anchor');

  if (touchpadAnchor) {
    touchpadAnchor.href = profile.cvUrl;
    touchpadAnchor.download = profile.cvDownloadName;
  }

  // Initialize 3D Laptop & Real-Time Screen-Space Callout / Touchpad Button Tracking
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
        hoverTooltip.textContent = `[ ${label} ]`;
        hoverTooltip.style.left = `${clientX}px`;
        hoverTooltip.style.top = `${clientY}px`;
        hoverTooltip.classList.add('visible');
      } else {
        hoverTooltip.classList.remove('visible');
      }
    },
    ({ activeCoords, touchpadCoords, progress }) => {
      // Position active part-to-section callout
      if (progress > 0.03 && progress < 0.80) {
        calloutEl.classList.add('visible');
        const clampedX = Math.max(120, Math.min(window.innerWidth * 0.46, activeCoords.x));
        const clampedY = Math.max(110, Math.min(window.innerHeight - 110, activeCoords.y));
        calloutEl.style.left = `${clampedX}px`;
        calloutEl.style.top = `${clampedY}px`;
      } else {
        calloutEl.classList.remove('visible');
      }

      // Position Download CV button directly on the disassembled 3D Touchpad when scroll animation completes
      if (progress >= 0.78) {
        touchpadOverlay.classList.add('visible');
        const padX = Math.max(140, Math.min(window.innerWidth - 140, touchpadCoords.x));
        const padY = Math.max(120, Math.min(window.innerHeight - 90, touchpadCoords.y));
        touchpadOverlay.style.left = `${padX}px`;
        touchpadOverlay.style.top = `${padY}px`;
      } else {
        touchpadOverlay.classList.remove('visible');
      }
    }
  );

  // 3. Render 35mm Camera Reel (Hobbies & Aspirations)
  const reelTrack = document.getElementById('reel-track');
  reelFrames.forEach((rf, idx) => {
    const card = document.createElement('article');
    card.className = `reel-card ${idx === 0 ? 'revealed' : ''}`;
    card.style.setProperty('--frame-color', rf.color);
    card.innerHTML = `
      <div class="reel-frame-meta">
        <span>FRAME ${rf.frame}</span>
        <span>${rf.tag}</span>
      </div>
      <div class="reel-card-body">
        <h3>${rf.title}</h3>
        <p>${rf.desc}</p>
      </div>
      <div class="reel-frame-footer">
        <span>ISO 400 // 35MM</span>
        <span>EXP 0${idx + 1}</span>
      </div>`;
    reelTrack.appendChild(card);
  });

  // 4. Render 8 Stacked Library-Book Project Layers (Layer 01 Active + Layers 02-08 Non-Interactive Grey Photo Frames)
  const projectsStack = document.getElementById('projects-stack');
  projects.forEach((proj, idx) => {
    const layer = document.createElement('article');
    layer.style.zIndex = String(20 - idx);

    if (!proj.isPlaceholder) {
      layer.className = 'library-layer active-book';
      layer.innerHTML = `
        <div class="book-spine">
          <span class="spine-num">${proj.slot}</span>
          <span class="spine-vertical-label">${proj.title} // ${proj.category}</span>
          <span class="spine-num">●</span>
        </div>
        <div class="book-body">
          <div>
            <span class="mono-tag" style="color:${proj.accent}">LAYER ${proj.slot} // ${proj.category}</span>
            <h3 class="stage-title" style="font-size:2.3rem;margin-top:0.3rem">${proj.title}</h3>
            <p class="mono-tag" style="color:#f59e0b;margin-top:0.25rem">${proj.subtitle}</p>
          </div>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-logo-link" title="Open SanitX GitHub Repository">
            <svg width="88" height="88" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48 8L16 22V46C16 67.2 29.6 86.8 48 92C66.4 86.8 80 67.2 80 46V22L48 8Z" stroke="#10b981" stroke-width="4" fill="rgba(16,185,129,0.12)"/>
              <rect x="34" y="28" width="28" height="36" rx="4" stroke="#38bdf8" stroke-width="3"/>
              <path d="M41 40H55M41 48H55M41 56H49" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <span class="project-logo-caption">SANITX // OPEN GITHUB REPOSITORY ↗</span>
          </a>
          <div class="pills-wrap">${proj.tech.map(t => `<span class="color-pill" style="--pill-color:${proj.accent}">${t}</span>`).join('')}</div>
          <ul class="project-bullets">${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>`;
    } else {
      layer.className = 'library-layer stacked-book';
      layer.setAttribute('aria-hidden', 'true');
      layer.innerHTML = `
        <div class="book-spine">
          <span class="spine-num">${proj.slot}</span>
          <span class="spine-vertical-label">LAYER ${proj.slot}</span>
          <span class="spine-num"></span>
        </div>
        <div class="stacked-book-inner">
          <div class="grey-photo-frame"></div>
        </div>`;
    }
    projectsStack.appendChild(layer);
  });

  // GSAP ScrollTrigger Animations (Laptop Disassembly + Scrollable 35mm Film Reel)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const stageEls = document.querySelectorAll('.laptop-stage:not(.final-disassembly-hold)');
    const dotEls = document.querySelectorAll('.stage-dot');

    ScrollTrigger.create({
      trigger: '#section-laptop',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        // First 80% of scroll covers the 5 sections; final 20% holds full disassembly with detached touchpad CV button
        const stageScrollPortion = Math.min(0.999, self.progress / 0.80);
        const idx = Math.min(laptopStages.length - 1, Math.floor(stageScrollPortion * laptopStages.length));
        const activeStage = laptopStages[idx];

        laptop3D.setDisassemblyState(self.progress, activeStage.partKey, activeStage.accent);

        calloutEl.style.setProperty('--callout-color', activeStage.accent);
        calloutPartName.textContent = activeStage.partLabel;
        calloutTraitName.textContent = `→ ${activeStage.traitLabel} (${activeStage.title.toUpperCase()})`;

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
          { opacity: 0.12, y: 45 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'top 28%', scrub: true }
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
        filmStripWrapper.style.transform = `rotate(-1.2deg) translate3d(${shiftX}px, 0, 0)`;

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
          reelActiveIndicator.textContent = `FRAME ${reelFrames[activeFrameIdx].frame} / 0${totalFrames}A`;
          reelActiveIndicator.style.color = reelFrames[activeFrameIdx].color;
        }
        if (reelProgressFill) {
          reelProgressFill.style.width = `${Math.max(14, self.progress * 100)}%`;
        }
      }
    });
  }

  // 5. Minimalist White Contact Section (Julian Garner Style — Scroll-Triggered)
  const chatMessages = document.getElementById('chat-messages');
  const chatPrompts = document.getElementById('chat-prompts');

  function appendBubble(html, type = 'bot') {
    const b = document.createElement('div');
    b.className = `minimal-bubble ${type}`;
    b.innerHTML = html;
    chatMessages.appendChild(b);
  }

  function showTypingThenMessage(html, delay = 650) {
    return new Promise((resolve) => {
      const typing = document.createElement('div');
      typing.className = 'minimal-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      chatMessages.appendChild(typing);
      setTimeout(() => {
        typing.remove();
        appendBubble(html, 'bot');
        resolve();
      }, delay);
    });
  }

  let chatInitialized = false;
  async function startMinimalChat() {
    if (chatInitialized) return;
    chatInitialized = true;
    for (const msg of chat.introMessages) {
      await showTypingThenMessage(msg, 600);
    }
    chat.prompts.forEach((p) => {
      const btn = document.createElement('button');
      btn.className = 'minimal-prompt-pill';
      btn.textContent = p.label;
      btn.addEventListener('click', async () => {
        appendBubble(p.label, 'user');
        await showTypingThenMessage(p.replyHtml, 550);
      });
      chatPrompts.appendChild(btn);
    });
  }

  const contactSection = document.getElementById('section-contact');
  if ('IntersectionObserver' in window && contactSection) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startMinimalChat();
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(contactSection);
  } else {
    startMinimalChat();
  }
});
