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
  }

  function next() { if (!lightboxOpen && current < total - 1) { current++; show(current); } }
  function prev() { if (!lightboxOpen && current > 0) { current--; show(current); } }

  document.getElementById('nav-next').addEventListener('click', next);
  document.getElementById('nav-prev').addEventListener('click', prev);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOpen) { closeLightbox(); return; }
    if (lightboxOpen) {
      if (e.key === 'ArrowRight') { e.preventDefault(); lbNext(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); lbPrev(); }
      return;
    }
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
})();
