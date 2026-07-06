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

// Contact form → submits to the form's `action` (Formspree) via AJAX so the
// visitor stays on the page. Falls back to an error note if the request fails.
const form = document.getElementById('contact-form');
if (form) {
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn ? submitBtn.textContent : '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.name.value.trim() || !form.email.value.includes('@')) {
      form.reportValidity();
      return;
    }

    if (successEl) successEl.classList.add('hidden');
    if (errorEl) errorEl.classList.add('hidden');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        form.reset();
        if (successEl) successEl.classList.remove('hidden');
      } else {
        if (errorEl) errorEl.classList.remove('hidden');
      }
    } catch (err) {
      if (errorEl) errorEl.classList.remove('hidden');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitLabel; }
    }
  });
}
