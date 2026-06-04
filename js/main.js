/* ========================
   MAIN.JS — Portfolio Website
   All interactive features
======================== */

/* ---- Mobile Menu Toggle ---- */
(function () {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('open', !isOpen);
    menuBtn.textContent = isOpen ? '☰' : '✕';
    menuBtn.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
      menuBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      menuBtn.textContent = '☰';
      menuBtn.setAttribute('aria-label', 'Open navigation menu');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      menuBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      menuBtn.textContent = '☰';
      menuBtn.focus();
    }
  });
})();


/* ---- Sticky Header Shadow ---- */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.style.boxShadow = !entry.isIntersecting
        ? '0 4px 32px rgba(0,0,0,0.4)'
        : 'none';
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );

  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  document.body.insertAdjacentElement('afterbegin', sentinel);
  observer.observe(sentinel);
})();


/* ---- Scroll Reveal Animations ---- */
(function () {
  const elements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-form');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ---- Project Filter (projects.html) ---- */
(function () {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectItems = document.querySelectorAll('#projects-list li');
  const noResults = document.getElementById('no-results');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterBtns.forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');
      btn.setAttribute('aria-pressed', 'true');

      // Filter items
      let visibleCount = 0;
      projectItems.forEach((item) => {
        const tags = item.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        item.hidden = !show;
        if (show) visibleCount++;
      });

      if (noResults) {
        noResults.hidden = visibleCount > 0;
      }
    });
  });
})();


/* ---- Contact Form Validation (contact.html) ---- */
(function () {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input && error) {
      error.textContent = message;
      input.setAttribute('aria-invalid', 'true');
    }
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input && error) {
      error.textContent = '';
      input.removeAttribute('aria-invalid');
    }
  }

  // Live validation on blur
  document.getElementById('name')?.addEventListener('blur', () => {
    const val = document.getElementById('name').value.trim();
    if (!val) showError('name', 'name-error', 'Name is required.');
    else if (val.length < 2) showError('name', 'name-error', 'Name must be at least 2 characters.');
    else clearError('name', 'name-error');
  });

  document.getElementById('email')?.addEventListener('blur', () => {
    const val = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) showError('email', 'email-error', 'Email address is required.');
    else if (!emailRegex.test(val)) showError('email', 'email-error', 'Please enter a valid email address.');
    else clearError('email', 'email-error');
  });

  document.getElementById('message')?.addEventListener('blur', () => {
    const val = document.getElementById('message').value.trim();
    if (!val) showError('message', 'message-error', 'Message is required.');
    else if (val.length < 20) showError('message', 'message-error', 'Please write at least 20 characters.');
    else clearError('message', 'message-error');
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.length < 2) {
      showError('name', 'name-error', 'Name is required (minimum 2 characters).');
      hasError = true;
    } else {
      clearError('name', 'name-error');
    }

    if (!email || !emailRegex.test(email)) {
      showError('email', 'email-error', 'Please enter a valid email address.');
      hasError = true;
    } else {
      clearError('email', 'email-error');
    }

    if (!message || message.length < 20) {
      showError('message', 'message-error', 'Message must be at least 20 characters.');
      hasError = true;
    } else {
      clearError('message', 'message-error');
    }

    if (hasError) {
      // Focus first error field
      const firstError = form.querySelector('[aria-invalid="true"]');
      firstError?.focus();
      return;
    }

    // Send using Formspree AJAX
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        form.reset();
        form.hidden = true;
        if (successMsg) {
          successMsg.classList.add('visible');
          successMsg.focus();
        }
      } else {
        alert(data.message || "Oops! There was a problem submitting your form");
      }
    })
    .catch(error => {
      alert("Oops! There was a network problem submitting your form");
    })
    .finally(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
  });
})();


/* ---- Dynamic Light/Dark Mode Theme ---- */
(function () {
  const themeBtn = document.getElementById('theme-btn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.body.classList.add('light-theme');
    themeBtn.textContent = '🌙';
    themeBtn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    themeBtn.textContent = '☀️';
    themeBtn.setAttribute('aria-label', 'Switch to light mode');
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    
    themeBtn.textContent = isLight ? '🌙' : '☀️';
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  });
})();


/* ---- Form Select Placeholder Style Helper ---- */
(function () {
  const select = document.getElementById('project-type');
  if (!select) return;

  // Initial check
  if (select.value === "") {
    select.style.color = "var(--color-text-muted)";
  }

  select.addEventListener('change', () => {
    if (select.value === "") {
      select.style.color = "var(--color-text-muted)";
    } else {
      select.style.color = "var(--color-text)";
    }
  });
})();