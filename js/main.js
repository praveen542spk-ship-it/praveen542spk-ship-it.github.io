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
     4. SCROLL REVEAL & DIRECTION-AWARE ANIMATIONS (IntersectionObserver)
     -------------------------------------------------------------------------- */
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
  }, { passive: true });

  const revealElements = document.querySelectorAll('.reveal');
  
  // Safety Guarantee: Immediately activate Hero, hash targets, and initial viewport elements
  const activateInitialElements = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 || el.closest('#home, .hero-section')) {
        el.classList.add('active');
      }
    });

    if (window.location.hash) {
      const targetSec = document.querySelector(window.location.hash);
      if (targetSec) {
        targetSec.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
      }
    }
  };

  activateInitialElements();
  window.addEventListener('load', activateInitialElements);

  // Activate section reveal on navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.includes('#')) {
        const hash = href.substring(href.indexOf('#'));
        const targetSec = document.querySelector(hash);
        if (targetSec) {
          targetSec.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }
      }
    });
  });

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.toggle('scroll-down', scrollDirection === 'down');
          entry.target.classList.toggle('scroll-up', scrollDirection === 'up');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
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

    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon moon-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

    const applyTheme = (isLight) => {
      document.documentElement.classList.toggle('light-theme', isLight);
      document.body.classList.toggle('light-theme', isLight);
      themeBtn.innerHTML = isLight ? moonIcon : sunIcon;
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      themeBtn.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
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

  /* --------------------------------------------------------------------------
     11. LIQUID BUTTON HOVER & CLICK RIPPLE ANIMATIONS
     -------------------------------------------------------------------------- */
  const interactiveButtons = document.querySelectorAll('.btn, .filter-btn');

  interactiveButtons.forEach(button => {
    // Pointer Position Tracking for Liquid Directional Highlight
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--mouse-x', `${x}px`);
      button.style.setProperty('--mouse-y', `${y}px`);
    });

    // Expanding Liquid Ripple Wave on Click / Tap
    const triggerRipple = (e) => {
      const rect = button.getBoundingClientRect();
      const oldRipples = button.querySelectorAll('.btn-ripple');
      oldRipples.forEach(r => r.remove());

      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + radius);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + radius);

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${clientX - rect.left - radius}px`;
      circle.style.top = `${clientY - rect.top - radius}px`;
      circle.classList.add('btn-ripple');

      button.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 550);
    };

    button.addEventListener('click', triggerRipple);
  });

  /* --------------------------------------------------------------------------
     12. 3D INTERACTIVE PROFILE BACKDROP & AVATAR CARD TILT
     -------------------------------------------------------------------------- */
  const bg3DInner = document.querySelector('.bg-profile-3d-inner');
  const heroCard = document.querySelector('.hero-avatar-card');

  if (bg3DInner || heroCard) {
    let requestAnimId = null;

    document.addEventListener('mousemove', (e) => {
      if (requestAnimId) cancelAnimationFrame(requestAnimId);

      requestAnimId = requestAnimationFrame(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const mouseX = (e.clientX / windowWidth) * 2 - 1;
        const mouseY = (e.clientY / windowHeight) * 2 - 1;

        // Ambient 3D Backdrop Parallax Tilt
        if (bg3DInner) {
          bg3DInner.style.transform = `rotateY(${mouseX * 14}deg) rotateX(${-mouseY * 14}deg) translateZ(15px)`;
        }

        // Hero Profile Card 3D Perspective Tilt
        if (heroCard) {
          const rect = heroCard.getBoundingClientRect();
          if (e.clientX >= rect.left - 150 && e.clientX <= rect.right + 150 &&
              e.clientY >= rect.top - 150 && e.clientY <= rect.bottom + 150) {
            const cardX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const cardY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            heroCard.style.transform = `perspective(1000px) rotateY(${cardX * 15}deg) rotateX(${-cardY * 15}deg) scale3d(1.02, 1.02, 1.02)`;
          } else {
            heroCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
          }
        }
      });
    });
  }

  // Initialize Stacked 3D Certificate Card Deck
  initCertCardDeck();

});

/* --------------------------------------------------------------------------
   14. GLOBAL CERTIFICATE PREVIEW MODAL
   -------------------------------------------------------------------------- */
window.openCertModal = (title, issuer, imgSrc, pdfUrl, credlyUrl) => {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const titleEl = document.getElementById('cert-modal-title');
  const issuerEl = document.getElementById('cert-modal-issuer');
  const imgEl = document.getElementById('cert-modal-img');
  const pdfBtn = document.getElementById('cert-pdf-download-btn');
  const credlyBtn = document.getElementById('cert-credly-btn');

  if (titleEl) titleEl.textContent = title;
  if (issuerEl) issuerEl.textContent = issuer || 'Verified Certificate';
  if (imgEl && imgSrc) imgEl.src = imgSrc;

  if (pdfBtn) {
    if (pdfUrl) {
      pdfBtn.href = pdfUrl;
      pdfBtn.style.display = 'inline-flex';
    } else {
      pdfBtn.style.display = 'none';
    }
  }

  if (credlyBtn) {
    if (credlyUrl) {
      credlyBtn.href = credlyUrl;
      credlyBtn.style.display = 'inline-flex';
    } else {
      credlyBtn.style.display = 'none';
    }
  }

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

window.closeCertModal = () => {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeCertModal();
  }
});

/* --------------------------------------------------------------------------
   15. INTERACTIVE STACKED CERTIFICATE CARD DECK ENGINE
   -------------------------------------------------------------------------- */
function initCertCardDeck() {
  const cards = document.querySelectorAll('.cert-deck-card');
  const prevBtn = document.getElementById('cert-prev-btn');
  const nextBtn = document.getElementById('cert-next-btn');
  const dotsContainer = document.getElementById('cert-deck-dots');
  const counterEl = document.getElementById('cert-deck-counter');

  if (!cards.length) return;

  let currentIndex = 0;
  const totalCards = cards.length;
  let isAnimating = false;

  // Render navigation dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('button');
      dot.className = `cert-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to certificate ${i + 1}`);
      dot.addEventListener('click', () => {
        if (!isAnimating && currentIndex !== i) {
          goToCard(i);
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  const updateCardPositions = () => {
    cards.forEach((card, i) => {
      // Remove position & animation classes
      card.classList.remove(
        'is-active', 
        'is-stack-1', 
        'is-stack-2', 
        'is-stack-3', 
        'is-hidden-back',
        'anim-swipe-next',
        'anim-swipe-prev'
      );

      // Relative index from active top card
      const relIndex = (i - currentIndex + totalCards) % totalCards;

      if (relIndex === 0) {
        card.classList.add('is-active');
      } else if (relIndex === 1) {
        card.classList.add('is-stack-1');
      } else if (relIndex === 2) {
        card.classList.add('is-stack-2');
      } else if (relIndex === 3) {
        card.classList.add('is-stack-3');
      } else {
        card.classList.add('is-hidden-back');
      }
    });

    // Update Counter & Dots
    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${totalCards}`;
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.cert-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  };

  const nextCard = () => {
    if (isAnimating) return;
    isAnimating = true;

    const currentCard = cards[currentIndex];
    currentCard.classList.add('anim-swipe-next');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCardPositions();
      isAnimating = false;
    }, 450);
  };

  const prevCard = () => {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCardPositions();

    const activeCard = cards[currentIndex];
    activeCard.classList.add('anim-swipe-prev');

    setTimeout(() => {
      activeCard.classList.remove('anim-swipe-prev');
      isAnimating = false;
    }, 550);
  };

  const goToCard = (targetIndex) => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = targetIndex;
    updateCardPositions();
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  };

  // Card Click Handler
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      // Don't flip deck if user clicked inside PDF or Credly action link
      if (e.target.closest('a') || e.target.closest('button')) return;

      const relIndex = (i - currentIndex + totalCards) % totalCards;
      if (relIndex === 0) {
        nextCard();
      } else {
        goToCard(i);
      }
    });
  });

  // Control Buttons
  if (nextBtn) nextBtn.addEventListener('click', nextCard);
  if (prevBtn) prevBtn.addEventListener('click', prevCard);

  // Touch Swipe Gesture Support
  let touchStartX = 0;
  let touchEndX = 0;
  const stage = document.getElementById('cert-deck-stage');

  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) {
          nextCard();
        } else {
          prevCard();
        }
      }
    }, { passive: true });
  }

  // Keyboard arrow keys
  document.addEventListener('keydown', (e) => {
    const achievementsSection = document.getElementById('achievements');
    if (!achievementsSection) return;

    const rect = achievementsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      if (e.key === 'ArrowRight') {
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        prevCard();
      }
    }
  });

  // Initial render
  updateCardPositions();

  /* --------------------------------------------------------------------------
     14. HERO TYPEWRITER ANIMATION
     -------------------------------------------------------------------------- */
  const typewriterTarget = document.getElementById('typewriter-text');
  if (typewriterTarget) {
    const roles = [
      'Computer Science Student',
      'Full-Stack MERN Developer',
      'Python & Voice AI Engineer',
      'B.E. CSE Undergrad @ R.M.D.'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    const typeRole = () => {
      const currentRole = roles[roleIdx];
      
      if (isDeleting) {
        typewriterTarget.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        typewriterTarget.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2200; // Pause at end
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400; // Pause before typing next
      }

      setTimeout(typeRole, typeSpeed);
    };

    setTimeout(typeRole, 600);
  }

  /* --------------------------------------------------------------------------
     15. ANIMATED STAT COUNTER (0 -> 7+, 0 -> 3, 0 -> 6, 0.0 -> 8.47)
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const isDecimal = el.getAttribute('data-decimal') === 'true';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const startTime = performance.now();

          const animateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            if (isDecimal) {
              el.textContent = currentVal.toFixed(2) + suffix;
            } else {
              el.textContent = Math.floor(currentVal) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
            }
          };

          requestAnimationFrame(animateCount);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));
  }

  /* --------------------------------------------------------------------------
     16. ANIMATED SKILL PROGRESS BARS
     -------------------------------------------------------------------------- */
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  if (skillFills.length > 0) {
    const skillObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const progress = fill.getAttribute('data-progress') || '85%';
          fill.style.width = progress;
          obs.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });

    skillFills.forEach(fill => skillObserver.observe(fill));
  }

  /* --------------------------------------------------------------------------
     17. PROJECT CATEGORY FILTER
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter || card.classList.contains(filter)) {
            card.classList.remove('is-filtered-out');
          } else {
            card.classList.add('is-filtered-out');
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     18. 3D CARD HOVER TILT EFFECT
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.tilt-card, .project-card, .skill-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* --------------------------------------------------------------------------
     19. TOAST NOTIFICATION & COPY-TO-CLIPBOARD
     -------------------------------------------------------------------------- */
  window.showToast = (message) => {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        window.showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        window.showToast('Failed to copy');
      });
    });
  });

  /* --------------------------------------------------------------------------
     20. COMMAND PALETTE (Ctrl + K / Cmd + K)
     -------------------------------------------------------------------------- */
  const cmdOverlay = document.getElementById('cmd-palette');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList = document.getElementById('cmd-list');

  const navItems = [
    { title: 'Home / Hero', icon: '🏠', action: () => window.location.href = 'index.html#home', tag: 'Navigation' },
    { title: 'About Me', icon: '👨‍💻', action: () => window.location.href = 'about.html', tag: 'Page' },
    { title: 'Tech Stack & Skills', icon: '⚡', action: () => window.location.href = 'index.html#skills', tag: 'Navigation' },
    { title: 'Projects Showcase', icon: '🚀', action: () => window.location.href = 'projects.html', tag: 'Page' },
    { title: 'Certifications & Achievements', icon: '📜', action: () => window.location.href = 'index.html#achievements', tag: 'Navigation' },
    { title: 'Education & Marksheets', icon: '🎓', action: () => window.location.href = 'index.html#education', tag: 'Navigation' },
    { title: 'Developer Journey', icon: '⏳', action: () => window.location.href = 'index.html#journey', tag: 'Navigation' },
    { title: 'Contact Me', icon: '📬', action: () => window.location.href = 'contact.html', tag: 'Page' },
    { title: 'Formal Printable Resume', icon: '📄', action: () => window.location.href = 'resume.html?v=2.0', tag: 'Document' },
    { title: 'Copy Email (praveen542spk@gmail.com)', icon: '📧', action: () => { navigator.clipboard.writeText('praveen542spk@gmail.com'); window.showToast('Copied email to clipboard!'); }, tag: 'Action' }
  ];

  if (cmdOverlay && cmdInput && cmdList) {
    let selectedIndex = 0;

    const renderCmdItems = (filter = '') => {
      const query = filter.toLowerCase().trim();
      const filtered = navItems.filter(item => item.title.toLowerCase().includes(query) || item.tag.toLowerCase().includes(query));
      
      cmdList.innerHTML = '';
      if (filtered.length === 0) {
        cmdList.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.9rem;">No matching commands found</div>`;
        return;
      }

      filtered.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = `cmd-item ${idx === selectedIndex ? 'selected' : ''}`;
        div.innerHTML = `
          <div class="cmd-item-left">
            <span style="font-size:1.1rem;">${item.icon}</span>
            <span>${item.title}</span>
          </div>
          <span class="cmd-shortcut">${item.tag}</span>
        `;

        div.addEventListener('click', () => {
          closeCmdPalette();
          item.action();
        });

        cmdList.appendChild(div);
      });
    };

    const openCmdPalette = () => {
      cmdOverlay.classList.add('open');
      cmdInput.value = '';
      selectedIndex = 0;
      renderCmdItems();
      setTimeout(() => cmdInput.focus(), 50);
      document.body.style.overflow = 'hidden';
    };

    const closeCmdPalette = () => {
      cmdOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdOverlay.classList.contains('open')) {
          closeCmdPalette();
        } else {
          openCmdPalette();
        }
      } else if (e.key === 'Escape' && cmdOverlay.classList.contains('open')) {
        closeCmdPalette();
      }
    });

    cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) closeCmdPalette();
    });

    cmdInput.addEventListener('input', () => {
      selectedIndex = 0;
      renderCmdItems(cmdInput.value);
    });

    const cmdTrigger = document.getElementById('cmd-trigger-btn');
    if (cmdTrigger) {
      cmdTrigger.addEventListener('click', openCmdPalette);
    }
  }

  /* --------------------------------------------------------------------------
     21. FLOATING BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}