/* ==========================================================================
   DEVELOPER PORTFOLIO 2026 — INTERACTIVE SCRIPT
   Praveen Kumar S — Full-Stack Developer & CSE Student
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. SCROLL PROGRESS BAR
     -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  /* --------------------------------------------------------------------------
     2. STICKY NAVBAR & SCROLLSPY
     -------------------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow background change
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link indicator
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. MOBILE DRAWER MENU
     -------------------------------------------------------------------------- */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileBtn && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', isOpen);
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      mobileBtn.textContent = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileBtn.addEventListener('click', () => toggleMenu());

    // Close on navigation click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) toggleMenu(false);
      });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     5. PROJECT CATEGORY FILTER
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-wrapper');
  const noResultsMsg = document.getElementById('no-projects-found');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        let visibleCount = 0;
        projectCards.forEach(card => {
          const tags = card.dataset.tags || '';
          if (filterValue === 'all' || tags.includes(filterValue)) {
            card.style.display = 'block';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (noResultsMsg) {
          noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. DYNAMIC THEME TOGGLE (DARK / LIGHT)
     -------------------------------------------------------------------------- */
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    const applyTheme = (isLight) => {
      document.body.classList.toggle('light-theme', isLight);
      themeBtn.textContent = isLight ? '🌙' : '☀️';
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    };

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      applyTheme(true);
    } else {
      applyTheme(false);
    }

    themeBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('light-theme');
      const nextThemeIsLight = !isCurrentlyLight;
      localStorage.setItem('portfolio-theme', nextThemeIsLight ? 'light' : 'dark');
      applyTheme(nextThemeIsLight);
    });
  }

  /* --------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION & WEB3FORMS SUBMISSION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formSuccessBox = document.getElementById('form-success-box');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const showError = (input, errorId, msg) => {
      const errorSpan = document.getElementById(errorId);
      if (errorSpan) errorSpan.textContent = msg;
      input.style.borderColor = 'var(--accent-pink)';
    };

    const clearError = (input, errorId) => {
      const errorSpan = document.getElementById(errorId);
      if (errorSpan) errorSpan.textContent = '';
      input.style.borderColor = 'var(--border-light)';
    };

    // Live validation
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        if (!nameInput.value.trim()) {
          showError(nameInput, 'name-error', 'Full name is required');
        } else if (nameInput.value.trim().length < 2) {
          showError(nameInput, 'name-error', 'Name must be at least 2 characters');
        } else {
          clearError(nameInput, 'name-error');
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
          showError(emailInput, 'email-error', 'Email address is required');
        } else if (!emailRegex.test(emailInput.value.trim())) {
          showError(emailInput, 'email-error', 'Please enter a valid email address');
        } else {
          clearError(emailInput, 'email-error');
        }
      });
    }

    if (messageInput) {
      messageInput.addEventListener('blur', () => {
        if (!messageInput.value.trim()) {
          showError(messageInput, 'message-error', 'Message is required');
        } else if (messageInput.value.trim().length < 20) {
          showError(messageInput, 'message-error', 'Please enter at least 20 characters');
        } else {
          clearError(messageInput, 'message-error');
        }
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameVal || nameVal.length < 2) {
        showError(nameInput, 'name-error', 'Please enter your full name');
        isValid = false;
      }
      if (!emailVal || !emailRegex.test(emailVal)) {
        showError(emailInput, 'email-error', 'Please enter a valid email address');
        isValid = false;
      }
      if (!messageVal || messageVal.length < 20) {
        showError(messageInput, 'message-error', 'Please enter a message of at least 20 characters');
        isValid = false;
      }

      if (!isValid) return;

      // AJAX Submit using Web3Forms
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          contactForm.reset();
          contactForm.style.display = 'none';
          if (formSuccessBox) formSuccessBox.classList.add('visible');
        } else {
          alert(data.message || 'Error submitting message. Please try again.');
        }
      })
      .catch(err => {
        alert('Network error submitting message. Please check your connection.');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. PHOTO LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close modal">✕</button>
    <img src="" alt="Full view profile image" />
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(lightboxOverlay);

  const lightboxImg = lightboxOverlay.querySelector('img');
  const lightboxCaption = lightboxOverlay.querySelector('.lightbox-caption');
  const lightboxClose = lightboxOverlay.querySelector('.lightbox-close');

  const openLightbox = (src, captionText) => {
    lightboxImg.src = src;
    lightboxCaption.textContent = captionText || 'Praveen Kumar S';
    lightboxOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const img = trigger.querySelector('img') || trigger;
      if (img && img.src) {
        openLightbox(img.src, img.alt);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     9. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     10. CODE SNIPPET COPY BUTTON
     -------------------------------------------------------------------------- */
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeSnippet = `const praveen = {
  name: "PRAVEEN KUMAR S",
  role: "Full-Stack Developer",
  college: "R.M.D. Engineering College",
  degree: "B.E. Computer Science & Engineering (2nd Year)",
  skills: ["React", "Node.js", "Express", "MongoDB", "Python", "JavaScript", "C"],
  status: "Available for Internships & Opportunities"
};`;
      navigator.clipboard.writeText(codeSnippet).then(() => {
        copyBtn.textContent = 'Copied! ✓';
        setTimeout(() => {
          copyBtn.textContent = 'Copy JSON';
        }, 2000);
      });
    });
  }

});