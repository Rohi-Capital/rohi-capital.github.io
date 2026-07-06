// Option E scroll engine: parallax layers, scroll-zoom images, hero fade, progress bar.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress bar
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);

  const parallaxEls = [...document.querySelectorAll('[data-speed]')];
  const zoomImgs = [...document.querySelectorAll('[data-zoom] img')];
  const heroFade = document.querySelector('[data-hero-fade]');

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    if (reduced) return;

    // Layers drift at their own speed relative to viewport center
    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-mid * parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`;
    });

    // Images relax from a zoomed state as they travel up the viewport
    zoomImgs.forEach((img) => {
      const r = img.getBoundingClientRect();
      const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
      img.style.transform = `scale(${(1.18 - 0.18 * p).toFixed(3)})`;
    });

    // Hero copy drifts down and fades while the backdrop stays
    if (heroFade) {
      heroFade.style.transform = `translate3d(0, ${(window.scrollY * 0.3).toFixed(1)}px, 0)`;
      heroFade.style.opacity = Math.max(1 - window.scrollY / 550, 0).toFixed(3);
    }
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
