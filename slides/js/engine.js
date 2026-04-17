(() => {
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  const counter = document.getElementById('counter');
  const STORAGE_KEY = 'strategy-slide';
  let current = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  if (current >= total) current = 0;
  let lightboxOpen = false;

  // TOC
  const tocToggle = document.getElementById('toc-toggle');
  const tocPanel  = document.getElementById('toc-panel');
  const tocItems  = document.querySelectorAll('.toc-item[data-goto]');

  function updateTocActive(activeIdx) {
    tocItems.forEach(item => {
      const idx = parseInt(item.dataset.goto, 10);
      item.classList.toggle('active', idx === activeIdx);
    });
  }

  // ─── Step reveal (teclas . e , — só em slides com data-steps) ───
  let currentStep = 0;

  function slideStepTotal(slide) {
    const n = parseInt(slide.dataset.steps, 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function scrollStepIntoView(slide) {
    const activeEl = slide.querySelector('.step.active');
    const pre = slide.querySelector('pre.code-block');
    if (!activeEl || !pre) return;
    const preRect = pre.getBoundingClientRect();
    const elRect  = activeEl.getBoundingClientRect();
    if (preRect.height === 0) return;
    const scaler = document.getElementById('scaler');
    const m = (scaler && scaler.style.transform || '').match(/scale\(([\d.]+)\)/);
    const scale = m ? parseFloat(m[1]) : 1;
    const relTop   = (elRect.top - preRect.top) / scale + pre.scrollTop;
    const elHeight = elRect.height / scale;
    const visibleH = pre.clientHeight;
    const target   = relTop - Math.max(0, (visibleH - elHeight) / 2);
    pre.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }

  function applyStep(slide, step) {
    const total = slideStepTotal(slide);
    slide.querySelectorAll('.step').forEach(el => {
      const n = parseInt(el.dataset.step, 10);
      el.classList.remove('active', 'dim');
      if (step > 0) el.classList.add(n === step ? 'active' : 'dim');
    });
    slide.querySelectorAll('.step-note').forEach(n => {
      const s = parseInt(n.dataset.step, 10);
      n.classList.toggle('active', step > 0 && s === step);
    });
    const ind = slide.querySelector('.step-indicator');
    if (ind) {
      ind.innerHTML = step > 0
        ? `Passo ${step} / ${total} &nbsp; <kbd>,</kbd> voltar &nbsp; <kbd>.</kbd> próximo`
        : `<kbd>.</kbd> destacar trechos &nbsp;·&nbsp; <kbd>,</kbd> voltar`;
    }
    if (step > 0) {
      requestAnimationFrame(() => scrollStepIntoView(slide));
    } else {
      const pre = slide.querySelector('pre.code-block');
      if (pre) pre.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function nextStep() {
    const slide = slides[current];
    const t = slideStepTotal(slide);
    if (!t) return false;
    if (currentStep < t) { currentStep++; applyStep(slide, currentStep); return true; }
    return false;
  }
  function prevStep() {
    const slide = slides[current];
    const t = slideStepTotal(slide);
    if (!t) return false;
    if (currentStep > 0) { currentStep--; applyStep(slide, currentStep); return true; }
    return false;
  }

  function show(idx) {
    slides.forEach((s, i) => {
      s.classList.remove('active', 'exit-left', 'exit-right');
      if (i < idx) s.classList.add('exit-left');
      else if (i > idx) s.classList.add('exit-right');
    });
    slides[idx].classList.add('active');
    counter.textContent = `${idx + 1} / ${total}`;
    localStorage.setItem(STORAGE_KEY, idx);
    updateTocActive(idx);
    currentStep = 0;
    if (slideStepTotal(slides[idx])) applyStep(slides[idx], 0);
  }

  function next() {
    if (lightboxOpen || (typeof orchOpen !== 'undefined' && orchOpen)) return;
    if (current < total - 1) { current++; show(current); }
  }
  function prev() {
    if (lightboxOpen || (typeof orchOpen !== 'undefined' && orchOpen)) return;
    if (current > 0) { current--; show(current); }
  }

  document.getElementById('nav-next').addEventListener('click', next);
  document.getElementById('nav-prev').addEventListener('click', prev);

  function isModalOpen() {
    return lightboxOpen || (typeof orchOpen !== 'undefined' && orchOpen) || kenjiOpen;
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxOpen) { closeLightbox(); return; }
      if (typeof orchOpen !== 'undefined' && orchOpen) { closeOrchModal(); return; }
      if (kenjiOpen) { closeKenjiEgg(); return; }
    }
    if (lightboxOpen) {
      if (e.key === 'ArrowRight') { e.preventDefault(); lbNext(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); lbPrev(); }
      return;
    }
    if (typeof orchOpen !== 'undefined' && orchOpen) {
      if (e.key === 'ArrowRight') { e.preventDefault(); orchNext(); return; }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); orchPrev(); return; }
      return;
    }
    if (kenjiOpen) { e.preventDefault(); return; }
    if ((e.key === 'k' || e.key === 'K') && current === total - 1) {
      e.preventDefault(); openKenjiEgg(); return;
    }
    if (e.key === '.') { e.preventDefault(); nextStep(); return; }
    if (e.key === ',') { e.preventDefault(); prevStep(); return; }
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    if (e.key === 'Home') { current = 0; show(current); }
    if (e.key === 'End')  { current = total - 1; show(current); }
  });

  function resize() {
    const scaler = document.getElementById('scaler');
    const sw = 960, sh = 540;
    const ww = window.innerWidth, wh = window.innerHeight;
    const scale = Math.min(ww / sw, wh / sh, 2);
    scaler.style.transform = `scale(${scale})`;
  }

  window.addEventListener('resize', resize);
  resize();
  show(current);

  // Lightbox (carousel opcional — usado se houver screenshots)
  const overlay    = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbClose    = document.getElementById('lightbox-close');
  const lbPrevBtn  = document.getElementById('lightbox-prev');
  const lbNextBtn  = document.getElementById('lightbox-next');
  const lbCounter  = document.getElementById('lightbox-counter');
  const lbCaption  = document.getElementById('lightbox-caption');

  let lbGallery = [];
  let lbIndex = 0;

  function updateLightbox() {
    const item = lbGallery[lbIndex];
    lbImg.src = item.src;
    lbCaption.textContent = item.title || '';
    lbCounter.textContent = lbGallery.length > 1 ? `${lbIndex + 1} / ${lbGallery.length}` : '';
    lbPrevBtn.style.display = lbIndex > 0 ? 'flex' : 'none';
    lbNextBtn.style.display = lbIndex < lbGallery.length - 1 ? 'flex' : 'none';
  }

  function openLightbox(img) {
    const slide = img.closest('.slide');
    const galleryData = slide && slide.dataset.gallery;

    if (galleryData) {
      lbGallery = JSON.parse(galleryData);
      const clickedFile = img.src.split('/').pop();
      lbIndex = lbGallery.findIndex(g => g.src.includes(clickedFile));
      if (lbIndex === -1) lbIndex = 0;
    } else {
      lbGallery = [{ src: img.src, title: img.alt || '' }];
      lbIndex = 0;
    }

    updateLightbox();
    overlay.classList.add('open');
    lightboxOpen = true;
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    lightboxOpen = false;
  }

  function lbNext() { if (lbIndex < lbGallery.length - 1) { lbIndex++; updateLightbox(); } }
  function lbPrev() { if (lbIndex > 0) { lbIndex--; updateLightbox(); } }

  document.querySelectorAll('.slide-screenshot').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img);
    });
  });

  lbPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); lbPrev(); });
  lbNextBtn.addEventListener('click', (e) => { e.stopPropagation(); lbNext(); });
  overlay.addEventListener('click', closeLightbox);
  lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });

  // Floating TOC panel
  tocToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    tocToggle.classList.toggle('open');
    tocPanel.classList.toggle('open');
  });

  tocItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const idx = parseInt(item.dataset.goto, 10);
      if (idx >= 0 && idx < total) {
        current = idx;
        show(current);
      }
      tocToggle.classList.remove('open');
      tocPanel.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (tocPanel.classList.contains('open') && !tocPanel.contains(e.target) && e.target !== tocToggle) {
      tocToggle.classList.remove('open');
      tocPanel.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tocPanel.classList.contains('open')) {
      tocToggle.classList.remove('open');
      tocPanel.classList.remove('open');
    }
  });

  // ─── Carousel modal (orchestrators) ───────────────────
  const orchModal    = document.getElementById('carousel-modal');
  const orchOpenBtn  = document.getElementById('orch-open-btn');
  const orchCloseBtn = document.getElementById('carousel-modal-close');
  const orchStage    = orchModal && orchModal.querySelector('.carousel-modal-stage');
  const orchTrack    = document.getElementById('orch-track');
  const orchPrevBtn  = document.getElementById('orch-prev');
  const orchNextBtn  = document.getElementById('orch-next');
  const orchDots     = orchModal ? orchModal.querySelectorAll('.carousel-dot') : [];
  const ORCH_TOTAL   = orchDots.length || 3;
  let   orchIndex    = 0;
  let   orchOpen     = false;

  function updateOrch() {
    if (orchTrack) {
      orchTrack.style.transform = `translateX(${-orchIndex * (100 / ORCH_TOTAL)}%)`;
    }
    orchDots.forEach((d, i) => d.classList.toggle('active', i === orchIndex));
    if (orchPrevBtn) orchPrevBtn.disabled = orchIndex === 0;
    if (orchNextBtn) orchNextBtn.disabled = orchIndex === ORCH_TOTAL - 1;
  }
  function orchGoTo(i) {
    if (i < 0 || i >= ORCH_TOTAL) return;
    orchIndex = i; updateOrch();
  }
  function orchNext() { if (orchIndex < ORCH_TOTAL - 1) { orchIndex++; updateOrch(); } }
  function orchPrev() { if (orchIndex > 0) { orchIndex--; updateOrch(); } }

  function openOrchModal() {
    if (!orchModal) return;
    orchIndex = 0;
    updateOrch();
    orchModal.classList.add('open');
    orchOpen = true;
  }
  function closeOrchModal() {
    if (!orchModal) return;
    orchModal.classList.remove('open');
    orchOpen = false;
  }
  if (orchOpenBtn)  orchOpenBtn.addEventListener('click', openOrchModal);
  if (orchCloseBtn) orchCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeOrchModal(); });
  if (orchPrevBtn)  orchPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); orchPrev(); });
  if (orchNextBtn)  orchNextBtn.addEventListener('click', (e) => { e.stopPropagation(); orchNext(); });
  orchDots.forEach((d, i) => d.addEventListener('click', (e) => { e.stopPropagation(); orchGoTo(i); }));
  if (orchModal)    orchModal.addEventListener('click', (e) => {
    if (!orchStage || !orchStage.contains(e.target)) closeOrchModal();
  });
  updateOrch();

  // Theme toggle
  const THEME_KEY = 'strategy-theme';
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const nxt = cur === 'light' ? 'dark' : 'light';
    if (nxt === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', nxt);
    }
    localStorage.setItem(THEME_KEY, nxt);
  });

  // ─── Easter egg: Parabéns Kenji (K no último slide) ───
  const kenjiEgg      = document.getElementById('kenji-egg');
  const kenjiConfetti = document.getElementById('kenji-confetti');
  const kenjiCloseBtn = document.getElementById('kenji-close');
  const kenjiModal    = document.getElementById('kenji-modal');
  let   kenjiOpen     = false;

  const CONFETTI_COLORS = [
    '#10b981', '#34d399', '#6ee7b7',
    '#fbbf24', '#f472b6', '#60a5fa',
    '#f87171', '#c084fc', '#fde047'
  ];

  function spawnConfetti(count = 140) {
    if (!kenjiConfetti) return;
    kenjiConfetti.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      const size = 6 + Math.random() * 9;
      const drift = (Math.random() - 0.5) * 240;
      const rot = 360 + Math.random() * 720;
      piece.style.left = (Math.random() * 100) + 'vw';
      piece.style.width  = size + 'px';
      piece.style.height = (size * 1.4) + 'px';
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.borderRadius = Math.random() < 0.25 ? '50%' : '2px';
      piece.style.animationDuration = (2.2 + Math.random() * 2.6) + 's';
      piece.style.animationDelay = (Math.random() * 0.9) + 's';
      piece.style.setProperty('--kx', drift + 'px');
      piece.style.setProperty('--kr', rot + 'deg');
      frag.appendChild(piece);
    }
    kenjiConfetti.appendChild(frag);
  }

  function openKenjiEgg() {
    if (!kenjiEgg || kenjiOpen) return;
    spawnConfetti();
    kenjiEgg.classList.add('open');
    kenjiOpen = true;
  }
  function closeKenjiEgg() {
    if (!kenjiEgg) return;
    kenjiEgg.classList.remove('open');
    if (kenjiConfetti) kenjiConfetti.innerHTML = '';
    kenjiOpen = false;
  }

  if (kenjiCloseBtn) kenjiCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeKenjiEgg(); });
  if (kenjiEgg) kenjiEgg.addEventListener('click', (e) => {
    if (!kenjiModal || !kenjiModal.contains(e.target)) closeKenjiEgg();
  });
})();
