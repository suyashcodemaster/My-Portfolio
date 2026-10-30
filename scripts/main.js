import { PORTFOLIO_DATA } from '../data/portfolioData.js';
import { initLaptop3D } from './laptop3d.js';

window.addEventListener('DOMContentLoaded', () => {
  const { profile, laptopStages, reelFrames, projects, chat } = PORTFOLIO_DATA;

  // 1. Populate Hero Content
  const firstEl = document.getElementById('hero-first');
  const lastEl = document.getElementById('hero-last');
  const photoEl = document.getElementById('hero-photo');
  const tagEl = document.getElementById('hero-tagline');

  if (firstEl) firstEl.textContent = profile.firstName;
  if (lastEl) lastEl.textContent = profile.lastName;
  if (photoEl) photoEl.src = profile.photoUrl;
  if (tagEl) tagEl.textContent = profile.tagline;

  // 2. Render 6 Laptop Disassembly Bento Stages
  const stagesContainer = document.getElementById('laptop-stages-container');
  const dotsContainer = document.getElementById('stage-dots');

  if (stagesContainer && dotsContainer) {
    laptopStages.forEach((st, idx) => {
      // Stage Indicator Dot
      const dot = document.createElement('div');
      dot.className = `stage-dot ${idx === 0 ? 'active' : ''}`;
      dot.style.background = idx === 0 ? st.accent : 'rgba(255,255,255,0.2)';
      dot.addEventListener('click', () => {
        const targetStage = stagesContainer.children[idx];
        if (targetStage) targetStage.scrollIntoView({ behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);

      // Subcards (Education / Languages / Achievements)
      const cardsHtml = st.cards ? `
        <div class="stage-cards-grid">
          ${st.cards.map(c => `
            <div class="stage-subcard">
              <h4>${c.heading}</h4>
              <p>${c.sub}</p>
              <span class="subcard-meta">${c.meta}</span>
            </div>
          `).join('')}
        </div>` : '';

      // Skills Category Rows
      const skillsHtml = st.skillGroups ? `
        <div class="skill-groups-wrap">
          ${st.skillGroups.map(g => `
            <div class="skill-group-row">
              <span class="skill-group-label" style="color:${g.color}">${g.label}</span>
              <div class="pills-wrap">
                ${g.items.map(item => `<span class="color-pill" style="--pill-color:${g.color}">${item}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>` : '';

      // Soft Skills / Pillars Pills
      const pillsHtml = st.pills ? `
        <div>
          <p class="mono-tag" style="margin-bottom:0.6rem;color:${st.accent}">${st.pillsTitle}</p>
          <div class="pills-wrap">
            ${st.pills.map(p => `<span class="color-pill" style="--pill-color:${st.accent}">${p}</span>`).join('')}
          </div>
        </div>` : '';

      // Touchpad Download CV — Strictly ONLY "Download CV" button
      const touchpadHtml = st.isTouchpadStage ? `
        <div class="touchpad-surface">
          <a href="${profile.cvUrl}" download="${profile.cvDownloadName}" class="touchpad-cv-btn">
            Download CV
          </a>
        </div>` : '';

      // Full Bento Stage Article
      const section = document.createElement('div');
      section.className = 'laptop-stage';
      section.id = `laptop-stage-${idx}`;
      section.innerHTML = `
        <article class="stage-bento-panel" style="--stage-accent:${st.accent}">
          <span class="mono-tag" style="color:${st.accent}">${st.index}</span>
          <h2 class="stage-title">${st.title}</h2>
          ${st.summary ? `<p class="stage-summary">${st.summary}</p>` : ''}
          ${st.quote ? `<blockquote class="stage-quote">“${st.quote}”</blockquote>` : ''}
          ${cardsHtml}
          ${skillsHtml}
          ${pillsHtml}
          ${touchpadHtml}
        </article>`;
      stagesContainer.appendChild(section);
    });
  }

  // 3. Initialize 3D Laptop Disassembly & ScrollTrigger Sync
  const canvas = document.getElementById('laptop-canvas');
  if (canvas) {
    const laptop3D = initLaptop3D(
      canvas,
      () => {
        // Direct CV Download on touchpad click
        const link = document.createElement('a');
        link.href = profile.cvUrl;
        link.download = profile.cvDownloadName;
        link.click();
      },
      (stageIndex) => {
        // Smooth scroll to stage when clicking 3D laptop part
        const target = document.getElementById(`laptop-stage-${stageIndex}`);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    );

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      const stageEls = document.querySelectorAll('.laptop-stage');
      const dotEls = document.querySelectorAll('.stage-dot');

      ScrollTrigger.create({
        trigger: '#section-laptop',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const idx = Math.min(laptopStages.length - 1, Math.floor(self.progress * laptopStages.length));
          const activeStage = laptopStages[idx];
          laptop3D.setDisassemblyState(self.progress, activeStage.partKey, activeStage.accent);
          dotEls.forEach((d, i) => {
            d.classList.toggle('active', i === idx);
            d.style.background = i === idx ? laptopStages[i].accent : 'rgba(255,255,255,0.2)';
          });
        }
      });

      stageEls.forEach((el) => {
        gsap.fromTo(el.querySelector('.stage-bento-panel'),
          { opacity: 0.25, y: 35 },
          { opacity: 1, y: 0, scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 25%', scrub: true } }
        );
      });
    }
  }

  // 4. Render 35mm Camera Film Reel (Hobbies & Aspirations)
  const reelTrack = document.getElementById('reel-track');
  if (reelTrack && reelFrames) {
    reelFrames.forEach((rf) => {
      const card = document.createElement('article');
      card.className = 'reel-card';
      card.style.setProperty('--frame-color', rf.color);
      card.innerHTML = `
        <div class="reel-frame-meta"><span>FRAME ${rf.frame}</span><span>${rf.tag}</span></div>
        <h3>${rf.title}</h3>
        <p>${rf.desc}</p>`;
      reelTrack.appendChild(card);
    });
  }

  // 5. Render Project Layers (SanitX Active + 4 Sleek Dark Architectural Slots)
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid && projects) {
    projects.forEach((proj) => {
      const card = document.createElement('article');
      if (!proj.isPlaceholder) {
        card.className = 'project-layer-card active-project';
        card.innerHTML = `
          <div>
            <span class="mono-tag" style="color:${proj.accent}">${proj.slot}</span>
            <h3 class="stage-title" style="font-size:2.2rem;margin-top:0.35rem">${proj.title}</h3>
            <p class="mono-tag" style="color:#f59e0b;margin-top:0.25rem">${proj.subtitle}</p>
          </div>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-logo-link" title="Open SanitX GitHub Repository">
            <svg width="80" height="80" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48 8L16 22V46C16 67.2 29.6 86.8 48 92C66.4 86.8 80 67.2 80 46V22L48 8Z" stroke="#10b981" stroke-width="4" fill="rgba(16,185,129,0.12)"/>
              <rect x="34" y="28" width="28" height="36" rx="4" stroke="#38bdf8" stroke-width="3"/>
              <path d="M41 40H55M41 48H55M41 56H49" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <span class="project-logo-caption">SANITX // VIEW ON GITHUB ↗</span>
          </a>
          <div class="pills-wrap">
            ${proj.tech.map(t => `<span class="color-pill" style="--pill-color:${proj.accent}">${t}</span>`).join('')}
          </div>
          <ul class="project-bullets">
            ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>`;
      } else {
        // Minimal architectural dark card with NO "placeholder" text
        card.className = 'project-layer-card reserved-layer';
        card.innerHTML = `
          <div class="reserved-header">
            <span class="reserved-number">${proj.slot}</span>
            <div class="reserved-line"></div>
          </div>
          <div class="reserved-body">
            <div class="reserved-icon"></div>
          </div>
          <div class="reserved-footer">
            <span class="mono-tag" style="opacity:0.35">// ARCHITECTURE // RESERVED</span>
          </div>`;
      }
      projectsGrid.appendChild(card);
    });
  }

  // 6. Julian Garner Inspired Conversational Chat Terminal
  // ONLY loads with typing animation when user reaches the contact section!
  const contactSection = document.getElementById('section-contact');
  const chatMessages = document.getElementById('chat-messages');
  const chatPrompts = document.getElementById('chat-prompts');

  let chatStarted = false;

  function appendBubble(html, type = 'bot', color = '#38bdf8') {
    const b = document.createElement('div');
    b.className = `chat-bubble ${type}`;
    if (type === 'user') b.style.setProperty('--user-bubble-color', color);
    b.innerHTML = html;
    chatMessages.appendChild(b);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const t = document.createElement('div');
    t.className = 'chat-bubble bot typing-indicator';
    t.id = 'chat-typing-dots';
    t.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(t);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const t = document.getElementById('chat-typing-dots');
    if (t) t.remove();
  }

  function initChatExperience() {
    if (chatStarted || !chat) return;
    chatStarted = true;

    // Show initial typing indicator
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      appendBubble(chat.introMessages[0], 'bot');

      // Second typing indicator
      setTimeout(() => {
        showTypingIndicator();

        setTimeout(() => {
          removeTypingIndicator();
          appendBubble(chat.introMessages[1], 'bot');

          // Render interactive prompt pills
          renderPromptButtons();
        }, 1100);
      }, 400);
    }, 1200);
  }

  function renderPromptButtons() {
    if (!chatPrompts || !chat.prompts) return;
    chatPrompts.innerHTML = '';

    chat.prompts.forEach((p) => {
      const btn = document.createElement('button');
      btn.className = 'chat-prompt-btn';
      btn.style.setProperty('--btn-color', p.color);
      btn.textContent = p.label;

      btn.addEventListener('click', () => {
        // Append user selection
        appendBubble(p.label, 'user', p.color);

        // Show bot typing before reply
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          appendBubble(p.replyHtml, 'bot');
        }, 650);
      });

      chatPrompts.appendChild(btn);
    });
  }

  // IntersectionObserver: trigger chat typing animation ONLY when reaching #section-contact
  if (contactSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !chatStarted) {
          initChatExperience();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(contactSection);
  }
});
