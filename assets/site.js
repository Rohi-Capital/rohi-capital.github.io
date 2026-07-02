// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const nowHidden = mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden', !nowHidden);
    iconClose.classList.toggle('hidden', nowHidden);
    menuBtn.setAttribute('aria-expanded', String(!nowHidden));
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Contact form (demo — no backend wired yet)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.name.value.trim() || !form.email.value.includes('@')) {
      form.reportValidity();
      return;
    }
    document.getElementById('form-success').classList.remove('hidden');
    form.reset();
  });
}
