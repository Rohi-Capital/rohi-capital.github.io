// Option D motion layer: subtle glow cards, count-up numbers, chart animations.

// 1) Tag card-like elements with .glow-card (subtle border highlight + glow on hover)
document.querySelectorAll('div, a, li').forEach((el) => {
  const c = el.getAttribute('class') || '';
  const isRounded = /rounded-(xl|2xl)/.test(c);
  const isCard = /(border|shadow-sm|shadow-xl|bg-white\/5)/.test(c);
  const isMedia = el.querySelector(':scope > img') && !/(p-\d)/.test(c);
  if (isRounded && isCard && !isMedia) el.classList.add('glow-card');
});

// 2) Count-up counters (elements with .counter and data-target)
const animateCounter = (el) => {
  const target = +el.dataset.target;
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

// 3) Chart triggers: when a .chart-block scrolls into view, add .chart-on
//    (CSS keys line drawing / bar growth off .chart-on) and set donut arcs.
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('chart-on');
      e.target.querySelectorAll('[data-dash]').forEach((arc) => {
        arc.style.strokeDasharray = arc.dataset.dash;
      });
      chartObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.35 });
document.querySelectorAll('.chart-block').forEach((el) => chartObserver.observe(el));
