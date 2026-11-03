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
      }, 90);
    }
  }, 90);
}

window.addEventListener('DOMContentLoaded', () => {
  const { profile, laptopStages, reelFrames, projects, contactMessages } = PORTFOLIO_DATA;

  // 0. Fast, Smooth Initial Loading Screen (~0.68s total on every visit, never skipped)
  const loaderOverlay = document.getElementById('loader-overlay');
  const loaderCount = document.getElementById('loader-count');
  const loaderBarFill = document.getElementById('loader-bar-fill');

  let loadVal = 0;
  const loadTimer = setInterval(() => {
    loadVal = Math.min(100, loadVal + 2);
    if (loaderCount) loaderCount.textContent = String(loadVal).padStart(3, '0');
    if (loaderBarFill) loaderBarFill.style.width = `${loadVal}%`;
    if (loadVal >= 100) {
      clearInterval(loadTimer);
      setTimeout(() => {
        if (loaderOverlay) loaderOverlay.classList.add('loaded');
        document.body.classList.remove('is-loading');
        setTimeout(() => runHeroTypewriter(profile.firstName, profile.lastName), 120);
      }, 140);
    }
  }, 9);

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
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="github-badges-row">
          <span class="badges-title">${st.badgesTitle || 'Badges'}</span>
          <span class="badges-placeholder">${st.badgesPlaceholder || 'Yet to earn'}</span>
        </div>
        <div class="casual-lang-line">
          <span>Spoken Languages</span>
          <strong>${st.casualLanguagesText || 'English & Hindi'}</strong>
        </div>
      </div>
    ` : '';

    const skillsHtml = st.skillGroups ? `<div class="skill-groups-wrap">${st.skillGroups.map(g => `
      <div class="skill-group-row">
        <span class="skill-group-label" style="color:${g.color || st.accent}">${g.label}</span>
        <div class="pills-wrap">${g.items.map(item => `<span class="color-pill" style="--pill-color:${g.color || st.accent}">${item}</span>`).join('')}</div>
      </div>`).join('')}</div>` : '';

    const pillsHtml = st.pills ? `
      <div>
        <p class="mono-tag" style="margin-bottom:0.4rem;color:${st.accent}">${st.pillsTitle}</p>
        <div class="pills-wrap">${st.pills.map(p => `<span class="color-pill" style="--pill-color:${st.accent}">${p}</span>`).join('')}</div>
      </div>` : '';

    const section = document.createElement('div');
    section.className = `laptop-stage ${st.isCompactLanguages ? 'compact-stage' : ''}`;
    section.dataset.stageIndex = String(idx);
    section.innerHTML = `
      <article class="stage-bento-panel ${st.isCompactLanguages ? 'compact-panel' : ''}" style="--stage-accent:${st.accent}">
        <span class="stage-part-chip">${st.partLabel}</span>
        ${st.title ? `<h2 class="stage-title">${st.title}</h2>` : ''}
        ${paragraphsHtml}
        ${st.quote ? `<blockquote class="stage-quote">“${st.quote}”</blockquote>` : ''}
        ${cardsHtml}
        ${compactLangHtml}
        ${skillsHtml}
        ${pillsHtml}
      </article>`;

    const chartImg = section.querySelector('.github-chart-img');
    if (chartImg) {
      chartImg.addEventListener('error', () => {
        chartImg.src = fallbackChartUri;
      }, { once: true });
    }

    stagesContainer.appendChild(section);

    if (st.outsideQuote) {
      const betweenQuote = document.createElement('div');
      betweenQuote.className = 'between-stages-quote';
      betweenQuote.innerHTML = `
        <div class="quote-frame">
          <svg class="quote-leaf leaf-left" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M58 34C42 32 24 24 8 8" stroke="#34d399" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M44 31C42 22 34 18 28 20C30 27 37 31 44 31Z" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1.2"/>
            <path d="M30 24C28 15 20 11 14 13C16 20 23 24 30 24Z" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1.2"/>
          </svg>
          <blockquote class="interlude-text">“${st.outsideQuote}”</blockquote>
          <svg class="quote-leaf leaf-right" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 34C22 32 40 24 56 8" stroke="#34d399" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M20 31C22 22 30 18 36 20C34 27 27 31 20 31Z" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1.2"/>
            <path d="M34 24C36 15 44 11 50 13C48 20 41 24 34 24Z" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1.2"/>
          </svg>
        </div>`;
      stagesContainer.appendChild(betweenQuote);
    }
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
      if (progress >= 0.13 && progress < 0.81) {
        calloutEl.classList.add('visible');
        const clampedX = Math.max(40, Math.min(window.innerWidth * 0.50, activeCoords.x));
        const clampedY = Math.max(70, Math.min(window.innerHeight - 70, activeCoords.y));
        calloutEl.style.left = `${clampedX}px`;
        calloutEl.style.top = `${clampedY}px`;
      } else {
        calloutEl.classList.remove('visible');
      }

      if (progress >= 0.81) {
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

  // 3. Render 35mm Camera Reel (Hobbies)
  const reelTrack = document.getElementById('reel-track');
  reelFrames.forEach((rf) => {
    const card = document.createElement('article');
    card.className = 'reel-card';
    card.style.setProperty('--frame-color', rf.color || '#38bdf8');
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

  // 4. Render 6 Horizontally Stacked Landscape Project Cards + Single Long Non-Clashing Ruler Line Per Card
  const projectsSection = document.getElementById('section-projects');
  const projectsStack = document.getElementById('projects-stack');
  const indexLinesContainer = document.getElementById('projects-index-lines');
  const focusBackdrop = document.getElementById('projects-focus-backdrop');
  const totalLayers = projects.length;

  projects.forEach((proj, idx) => {
    const slot = document.createElement('div');
    slot.className = 'stack-card-slot';
    slot.dataset.slotIndex = String(idx);
    slot.style.zIndex = String(totalLayers - idx);

    const card = document.createElement('article');
    if (!proj.isPlaceholder) {
      card.className = 'stack-card active-project-card';
      card.innerHTML = `
        <div class="stack-card-top">
          <span class="stack-frame-label">PROJECT</span>
          <span class="stack-slot-num">${proj.slot}</span>
        </div>
        <div class="project-photo-frame">
          <svg width="48" height="48" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 8L16 22V46C16 67.2 29.6 86.8 48 92C66.4 86.8 80 67.2 80 46V22L48 8Z" stroke="#10b981" stroke-width="3.5" fill="rgba(16,185,129,0.14)"/>
            <rect x="34" y="28" width="28" height="36" rx="4" stroke="#38bdf8" stroke-width="2.8"/>
            <path d="M41 40H55M41 48H55M41 56H49" stroke="#f59e0b" stroke-width="2.8" stroke-linecap="round"/>
          </svg>
          <span class="photo-frame-title">${proj.title}</span>
        </div>
        <div class="project-hover-popup">
          <div class="popup-header">
            <div class="stack-card-top">
              <h3>${proj.title}</h3>
              <span class="stack-slot-num">${proj.slot}</span>
            </div>
            <p>${proj.subtitle}</p>
          </div>
          <div class="popup-pills-wrap">${proj.tech.map(t => `<span class="popup-pill">${t}</span>`).join('')}</div>
          <ul class="project-bullets">${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="popup-github-btn">
            <span>View on GitHub ↗</span>
          </a>
        </div>`;
    } else {
      card.className = 'stack-card grey-layer-card';
      card.innerHTML = `
        <div class="stack-card-top">
          <span class="stack-frame-label">ARCHIVE</span>
          <span class="stack-slot-num">${proj.slot}</span>
        </div>
        <div class="grey-photo-frame">
          <span class="yet-to-build-text">${proj.emptyLabel || 'yet to build😝'}</span>
        </div>`;
    }

    slot.appendChild(card);
    projectsStack.appendChild(slot);

    if (indexLinesContainer) {
      const tickGroup = document.createElement('div');
      tickGroup.className = 'index-tick-group';
      tickGroup.dataset.tickIndex = String(idx);
      tickGroup.innerHTML = `
        <span class="index-tick major-tick"></span>
        <span class="index-tick-num">${proj.slot}</span>`;
      indexLinesContainer.appendChild(tickGroup);
    }
  });

  const allSlots = projectsStack.querySelectorAll('.stack-card-slot');
  const allStackCards = projectsStack.querySelectorAll('.stack-card');
  const allTickGroups = indexLinesContainer ? indexLinesContainer.querySelectorAll('.index-tick-group') : [];
  const allMajorTicks = indexLinesContainer ? indexLinesContainer.querySelectorAll('.major-tick') : [];

  let currentFocusedIdx = -1;
  let hoverOpenTimer = null;
  let hoverCloseTimer = null;
  let hoveredCandidateIdx = -1;
  let hasEnteredCenteredCard = false;
  let openedScrollY = 0;
  let triggerOriginRect = null;

  function isMobileProjectsMode() {
    return window.innerWidth <= 900;
  }

  function isPointInRect(x, y, rect, pad = 6) {
    if (!rect) return false;
    return (
      x >= rect.left - pad &&
      x <= rect.right + pad &&
      y >= rect.top - pad &&
      y <= rect.bottom + pad
    );
  }

  function focusCardToViewportCenter(targetIdx, sourceEl) {
    clearTimeout(hoverOpenTimer);
    hoverOpenTimer = null;
    clearTimeout(hoverCloseTimer);
    hoverCloseTimer = null;

    currentFocusedIdx = targetIdx;
    hasEnteredCenteredCard = false;
    openedScrollY = window.scrollY;

    const targetSlot = allSlots[targetIdx];
    const targetCard = allStackCards[targetIdx];
    if (!targetSlot || !targetCard) return;

    triggerOriginRect = (sourceEl || targetSlot).getBoundingClientRect();

    if (isMobileProjectsMode()) {
      targetCard.style.setProperty('--center-shift', '0px');
      targetSlot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      const slotRect = targetSlot.getBoundingClientRect();
      const slotCenterX = slotRect.left + slotRect.width / 2;
      const viewportCenterX = window.innerWidth / 2;
      const deltaX = viewportCenterX - slotCenterX;
      targetCard.style.setProperty('--center-shift', `${deltaX}px`);
      if (focusBackdrop) focusBackdrop.classList.add('active');
    }

    if (projectsSection) projectsSection.classList.add('has-focused-card');
    allSlots.forEach((s, i) => s.classList.toggle('slot-focused', i === targetIdx));
    allTickGroups.forEach((g, i) => g.classList.toggle('active', i === targetIdx));
    allMajorTicks.forEach((t, i) => t.classList.toggle('active', i === targetIdx));

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
    clearTimeout(hoverOpenTimer);
    hoverOpenTimer = null;
    clearTimeout(hoverCloseTimer);
    hoverCloseTimer = null;
    currentFocusedIdx = -1;
    hoveredCandidateIdx = -1;
    hasEnteredCenteredCard = false;
    triggerOriginRect = null;

    if (focusBackdrop) focusBackdrop.classList.remove('active');
    if (projectsSection) projectsSection.classList.remove('has-focused-card');
    allSlots.forEach((s) => s.classList.remove('slot-focused'));
    if (!isMobileProjectsMode()) {
      allTickGroups.forEach((g) => g.classList.remove('active'));
      allMajorTicks.forEach((t) => t.classList.remove('active'));
    }
    allStackCards.forEach((c, i) => {
      c.classList.remove('is-centered', 'blurred-left', 'blurred-right');
      allSlots[i].style.zIndex = String(totalLayers - i);
    });
  }

  // Desktop Open Delay = 0.8s (800ms) continuous hover on a card or its single vertical line
  function startOpenTimer(idx, sourceEl) {
    if (isMobileProjectsMode() || currentFocusedIdx !== -1) return;
    hoveredCandidateIdx = idx;
    clearTimeout(hoverOpenTimer);
    hoverOpenTimer = setTimeout(() => {
      if (hoveredCandidateIdx === idx && currentFocusedIdx === -1) {
        focusCardToViewportCenter(idx, sourceEl);
      }
    }, 800);
  }

  function cancelOpenTimer(idx) {
    if (hoveredCandidateIdx === idx) {
      hoveredCandidateIdx = -1;
      clearTimeout(hoverOpenTimer);
      hoverOpenTimer = null;
    }
  }

  // Desktop Close Delay = 0.9s (900ms) when mouse is NOT on the active card
  function ensureCloseTimerRunning() {
    if (isMobileProjectsMode() || hoverCloseTimer) return;
    hoverCloseTimer = setTimeout(() => {
      hoverCloseTimer = null;
      if (currentFocusedIdx !== -1) {
        resetProjectStack();
      }
    }, 900);
  }

  function cancelCloseTimer() {
    if (hoverCloseTimer) {
      clearTimeout(hoverCloseTimer);
      hoverCloseTimer = null;
    }
  }

  allStackCards.forEach((cardEl, idx) => {
    cardEl.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch' || isMobileProjectsMode()) return;
      if (currentFocusedIdx === -1) {
        startOpenTimer(idx, cardEl);
      } else if (currentFocusedIdx === idx) {
        hasEnteredCenteredCard = true;
        cancelCloseTimer();
      }
    });

    cardEl.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch' || isMobileProjectsMode()) return;
      if (currentFocusedIdx === -1) {
        cancelOpenTimer(idx);
      } else if (currentFocusedIdx === idx) {
        ensureCloseTimerRunning();
      }
    });

    // On mobile/tablet swipeable carousel: tapping a card toggles its expanded detail view
    cardEl.addEventListener('click', (e) => {
      if (e.target.closest('.popup-github-btn')) return;
      if (isMobileProjectsMode()) {
        if (currentFocusedIdx === idx) {
          resetProjectStack();
        } else {
          focusCardToViewportCenter(idx, cardEl);
        }
      }
    });
  });

  allTickGroups.forEach((tickGroupEl, idx) => {
    tickGroupEl.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch' || isMobileProjectsMode()) return;
      if (currentFocusedIdx === -1) {
        startOpenTimer(idx, tickGroupEl);
      }
    });
    tickGroupEl.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch' || isMobileProjectsMode()) return;
      if (currentFocusedIdx === -1) {
        cancelOpenTimer(idx);
      }
    });
    tickGroupEl.addEventListener('click', () => {
      if (isMobileProjectsMode()) {
        allSlots[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        focusCardToViewportCenter(idx, allStackCards[idx]);
      }
    });
  });

  // Sync active 01..06 index indicator when swiping the mobile horizontal carousel
  if (projectsStack) {
    projectsStack.addEventListener('scroll', () => {
      if (!isMobileProjectsMode()) return;
      const stackCenter = projectsStack.scrollLeft + projectsStack.clientWidth / 2;
      let closestIdx = 0;
      let minDist = Infinity;
      allSlots.forEach((slotEl, i) => {
        const slotCenter = slotEl.offsetLeft + slotEl.offsetWidth / 2;
        const d = Math.abs(slotCenter - stackCenter);
        if (d < minDist) {
          minDist = d;
          closestIdx = i;
        }
      });
      allTickGroups.forEach((g, i) => g.classList.toggle('active', i === closestIdx));
      allMajorTicks.forEach((t, i) => t.classList.toggle('active', i === closestIdx));
    }, { passive: true });
  }

  // Track pointer position on desktop while a card is focused so removing the mouse ALWAYS starts the 0.9s close timer
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || isMobileProjectsMode() || currentFocusedIdx === -1) return;
    const activeCard = allStackCards[currentFocusedIdx];
    if (!activeCard) return;

    const cardRect = activeCard.getBoundingClientRect();
    const onCenteredCard = isPointInRect(e.clientX, e.clientY, cardRect, 8);

    if (onCenteredCard) {
      hasEnteredCenteredCard = true;
      cancelCloseTimer();
      return;
    }

    if (!hasEnteredCenteredCard && isPointInRect(e.clientX, e.clientY, triggerOriginRect, 10)) {
      cancelCloseTimer();
      return;
    }

    ensureCloseTimerRunning();
  }, { passive: true });

  // Close expanded mobile card when tapping outside the card
  document.addEventListener('pointerdown', (e) => {
    if (!isMobileProjectsMode() || currentFocusedIdx === -1) return;
    if (!e.target.closest('.stack-card') && !e.target.closest('.index-tick-group')) {
      resetProjectStack();
    }
  }, { passive: true });

  if (focusBackdrop) {
    focusBackdrop.addEventListener('click', resetProjectStack);
  }

  // Close open card automatically if the user scrolls past the Projects section (or scrolls > 160px away)
  window.addEventListener('scroll', () => {
    if (currentFocusedIdx === -1 || !projectsSection) return;
    const rect = projectsSection.getBoundingClientRect();
    const scrolledDistance = Math.abs(window.scrollY - openedScrollY);
    if (rect.bottom < window.innerHeight * 0.25 || rect.top > window.innerHeight * 0.75 || scrolledDistance > 160) {
      resetProjectStack();
    }
  }, { passive: true });
  // GSAP ScrollTrigger Animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const stageEls = Array.from(document.querySelectorAll('.laptop-stage:not(.laptop-intro-stage):not(.final-disassembly-hold)'));
    const dotEls = document.querySelectorAll('.stage-dot');

    function getActiveStageIndexFromViewport() {
      const viewMid = window.innerHeight * 0.5;
      let bestIdx = 0;
      let bestDist = Infinity;
      stageEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const cardMid = rect.top + rect.height * 0.5;
        const dist = Math.abs(cardMid - viewMid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      return bestIdx;
    }

    ScrollTrigger.create({
      trigger: '#section-laptop',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.45,
      onUpdate: (self) => {
        const idx = getActiveStageIndexFromViewport();
        const activeStage = laptopStages[idx] || laptopStages[0];

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
          { opacity: 0.15, y: 24 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: { trigger: el, start: 'top 86%', end: 'top 45%', scrub: true }
          }
        );
      }
    });

    // Scroll-Driven 35mm Camera Reel Animation
    const filmStripWrapper = document.getElementById('film-strip-wrapper');
    const reelCards = document.querySelectorAll('.reel-card');
    const reelActiveIndicator = document.getElementById('reel-active-indicator');
    const reelProgressFill = document.getElementById('reel-progress-fill');

    ScrollTrigger.create({
      trigger: '#section-reel',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.45,
      onUpdate: (self) => {
        const holdEnd = 0.15;
        const horizProgress = Math.max(0, (self.progress - holdEnd) / (1 - holdEnd));
        const padRight = window.innerWidth <= 768 ? 24 : 100;
        const maxShift = Math.max(0, filmStripWrapper.scrollWidth - window.innerWidth + padRight);
        const shiftX = -horizProgress * maxShift;
        filmStripWrapper.style.transform = `rotate(-0.8deg) translate3d(${shiftX}px, 0, 0)`;

        const totalFrames = reelFrames.length;
        const activeFrameIdx = Math.min(totalFrames - 1, Math.floor(horizProgress * totalFrames));

        reelCards.forEach((card, i) => {
          const threshold = i === 0 ? 0.02 : holdEnd + ((i - 0.35) / (totalFrames - 1)) * 0.78;
          if (self.progress >= threshold) {
            card.classList.add('revealed');
          } else {
            card.classList.remove('revealed');
          }
        });

        if (reelActiveIndicator) {
          reelActiveIndicator.textContent = `Frame ${reelFrames[activeFrameIdx].frame} / 0${totalFrames}A`;
          reelActiveIndicator.style.color = reelFrames[activeFrameIdx].color || '#f59e0b';
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
