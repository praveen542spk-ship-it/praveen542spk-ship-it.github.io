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

  /* --------------------------------------------------------------------------
     22. HTML5 CANVAS WEBGL PARTICLE CONSTELLATION ENGINE
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('hero-particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const particles = [];
    const particleCount = Math.min(50, Math.floor(width / 25));
    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, '
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 0.6;
          p.y -= (dy / dist) * 0.6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - distance / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    };

    drawParticles();
  }

  /* --------------------------------------------------------------------------
     23. LIVE TERMINAL CONSOLE EXECUTION
     -------------------------------------------------------------------------- */
  const runCodeBtn = document.getElementById('run-code-btn');
  const consoleOutput = document.getElementById('terminal-console-output');

  if (runCodeBtn && consoleOutput) {
    runCodeBtn.addEventListener('click', () => {
      consoleOutput.classList.toggle('show');
      if (consoleOutput.classList.contains('show')) {
        consoleOutput.innerHTML = `
          <div><span style="color:#10b981;">[SUCCESS]</span> Compiled developer.json successfully.</div>
          <div>&gt; Name: <span style="color:#f8fafc;">PRAVEEN KUMAR S</span></div>
          <div>&gt; Degree: <span style="color:#06b6d4;">B.E. Computer Science & Engineering (2nd Year)</span></div>
          <div>&gt; Academic CGPA: <span style="color:#8b5cf6;">8.47 / 10 (Sem 1: 8.21 | Sem 2: 8.73)</span></div>
          <div>&gt; Stack: <span style="color:#6366f1;">["React", "Node.js", "Python", "MongoDB"]</span></div>
          <div>&gt; Status: <span style="color:#10b981;">🟢 Ready for Full-Stack Internships</span></div>
        `;
        window.showToast('Ran developer.json script');
      }
    });
  }

  /* --------------------------------------------------------------------------
     24. FEATURE 1: EMBEDDED SPK AI ASSISTANT WIDGET
     -------------------------------------------------------------------------- */
  const jarvisTrigger = document.getElementById('jarvis-trigger-btn');
  const jarvisDialog = document.getElementById('jarvis-chat-dialog');
  const jarvisClose = document.getElementById('jarvis-close-btn');
  const jarvisBody = document.getElementById('jarvis-chat-body');
  const jarvisInput = document.getElementById('jarvis-input');
  const jarvisSend = document.getElementById('jarvis-send-btn');
  const jarvisSpeechToggle = document.getElementById('jarvis-speech-toggle');
  let isSpeechEnabled = false;

  if (jarvisTrigger && jarvisDialog) {
    jarvisTrigger.addEventListener('click', () => {
      jarvisDialog.classList.toggle('open');
      if (jarvisDialog.classList.contains('open') && jarvisInput) {
        setTimeout(() => jarvisInput.focus(), 100);
      }
    });

    if (jarvisClose) {
      jarvisClose.addEventListener('click', () => jarvisDialog.classList.remove('open'));
    }

    if (jarvisSpeechToggle) {
      jarvisSpeechToggle.addEventListener('click', () => {
        isSpeechEnabled = !isSpeechEnabled;
        jarvisSpeechToggle.classList.toggle('active', isSpeechEnabled);
        jarvisSpeechToggle.textContent = isSpeechEnabled ? '🔊 Audio ON' : '🔇 Audio OFF';
        window.showToast(isSpeechEnabled ? 'SPK AI Voice Output Enabled' : 'Voice Output Muted');
      });
    }

    const speakText = (text) => {
      if (!isSpeechEnabled || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    };

    const addJarvisMsg = (text, sender = 'bot') => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `jarvis-msg ${sender}`;
      msgDiv.innerHTML = text;
      jarvisBody.appendChild(msgDiv);
      jarvisBody.scrollTop = jarvisBody.scrollHeight;
      if (sender === 'bot') speakText(text);
    };

    const getRankOrdinal = (pos, isLowest) => {
      const type = isLowest ? 'lowest' : 'highest';
      if (pos === 1) return `${type}`;
      if (pos === 2) return `second ${type}`;
      if (pos === 3) return `third ${type}`;
      if (pos === 4) return `fourth ${type}`;
      if (pos === 5) return `fifth ${type}`;
      return `${pos}th ${type}`;
    };

    const handleRankingQuery = (q) => {
      // Determine academic level
      let level = null;
      if (q.includes('10th') || q.includes('10 th') || q.includes('sslc') || q.includes('tenth')) {
        level = '10th';
      } else if (q.includes('12th') || q.includes('12 th') || q.includes('hsc') || q.includes('twelfth') || q.includes('plus two')) {
        level = '12th';
      } else if (q.includes('1st sem') || q.includes('first sem') || q.includes('sem 1') || q.includes('semester 1')) {
        level = 'sem1';
      } else if (q.includes('2nd sem') || q.includes('second sem') || q.includes('sem 2') || q.includes('semester 2')) {
        level = 'sem2';
      } else {
        const semMatch = q.match(/(\d+)(?:st|nd|rd|th)?\s*(?:sem|semester)/i) || q.match(/(?:sem|semester)\s*(\d+)/i);
        if (semMatch) {
          const semNum = parseInt(semMatch[1], 10);
          if (semNum > 2) {
            const suffix = semNum === 3 ? 'rd' : 'th';
            return `Invalid academic record. ${semNum}${suffix} semester marks are not available in the student's records.`;
          }
        }
      }

      const isLowest = q.includes('lowest') || q.includes('least') || q.includes('minimum') || q.includes('bottom');
      let rankPos = 1;
      if (q.includes('second') || q.includes('2nd')) rankPos = 2;
      else if (q.includes('third') || q.includes('3rd')) rankPos = 3;
      else if (q.includes('fourth') || q.includes('4th')) rankPos = 4;
      else if (q.includes('fifth') || q.includes('5th')) rankPos = 5;

      // 10th Standard Ranking
      if (level === '10th') {
        const records10th = [
          { subject: 'Science', mark: 94 },
          { subject: 'Mathematics', mark: 90 },
          { subject: 'Social Science', mark: 88 },
          { subject: 'English', mark: 87 },
          { subject: 'Tamil', mark: 83 }
        ];
        const sorted = [...records10th].sort((a, b) => isLowest ? a.mark - b.mark : b.mark - a.mark);
        const distinctMarks = [...new Set(sorted.map(item => item.mark))];
        const targetMark = distinctMarks[rankPos - 1];
        if (!targetMark) {
          return `Invalid rank position. 10th standard has only ${distinctMarks.length} distinct mark tiers.`;
        }
        const matchingSubjects = sorted.filter(item => item.mark === targetMark).map(item => item.subject);
        const rankText = getRankOrdinal(rankPos, isLowest);
        const subjStr = matchingSubjects.join(' and ');
        return `Your ${rankText} mark in 10th standard is <strong>${targetMark} / 100</strong> in <strong>${subjStr}</strong>.`;
      }

      // 12th Standard Ranking
      if (level === '12th') {
        const records12th = [
          { subject: 'Chemistry', mark: 98 },
          { subject: 'Tamil', mark: 92 },
          { subject: 'Mathematics', mark: 91 },
          { subject: 'Physics', mark: 88 },
          { subject: 'Biology', mark: 85 },
          { subject: 'English', mark: 78 }
        ];
        const sorted = [...records12th].sort((a, b) => isLowest ? a.mark - b.mark : b.mark - a.mark);
        const distinctMarks = [...new Set(sorted.map(item => item.mark))];
        const targetMark = distinctMarks[rankPos - 1];
        if (!targetMark) {
          return `Invalid rank position. 12th standard has only ${distinctMarks.length} distinct mark tiers.`;
        }
        const matchingSubjects = sorted.filter(item => item.mark === targetMark).map(item => item.subject);
        const rankText = getRankOrdinal(rankPos, isLowest);
        const subjStr = matchingSubjects.join(' and ');
        return `Your ${rankText} mark in 12th standard is <strong>${targetMark} / 100</strong> in <strong>${subjStr}</strong>.`;
      }

      // 1st Semester Ranking
      if (level === 'sem1') {
        if (!isLowest && rankPos === 1) {
          return `Your highest grade in 1st semester is <strong>Grade A+</strong> in <strong>Matrices and Calculus</strong> and <strong>Interpersonal Skills</strong>.`;
        }
        if (isLowest && rankPos === 1) {
          return `Your lowest grade in 1st semester is <strong>Grade A</strong> in <strong>Heritage of Tamils, Engineering Chemistry, Programming in C++, Software Development Practices, Digital Principles and System Design, and Idea Lab - I</strong>.`;
        }
        if (!isLowest && rankPos === 2) {
          return `Your second highest grade in 1st semester is <strong>Grade A</strong> in <strong>Heritage of Tamils, Engineering Chemistry, Programming in C++, Software Development Practices, Digital Principles and System Design, and Idea Lab - I</strong>.`;
        }
      }

      // 2nd Semester Ranking
      if (level === 'sem2') {
        if (!isLowest && rankPos === 1) {
          return `Your highest grade in 2nd semester is <strong>Grade S (Outstanding)</strong> in <strong>Data Structures</strong> and <strong>Innovation and Creativity Skills Development</strong>.`;
        }
        if (isLowest && rankPos === 1) {
          return `Your lowest grade in 2nd semester is <strong>Grade B+</strong> in <strong>Idea Lab - II</strong>.`;
        }
        if (!isLowest && rankPos === 2) {
          return `Your second highest grade in 2nd semester is <strong>Grade A+</strong> in <strong>Java Programming</strong> and <strong>Linear Algebra and Applications</strong>.`;
        }
        if (isLowest && rankPos === 2) {
          return `Your second lowest grade in 2nd semester is <strong>Grade A</strong> in <strong>Tamils and Technology, Introduction to Artificial Intelligence, and Physics for Information Science</strong>.`;
        }
        if (!isLowest && rankPos === 3) {
          return `Your third highest grade in 2nd semester is <strong>Grade A</strong> in <strong>Tamils and Technology, Introduction to Artificial Intelligence, and Physics for Information Science</strong>.`;
        }
        if (isLowest && rankPos === 3) {
          return `Your third lowest grade in 2nd semester is <strong>Grade A+</strong> in <strong>Java Programming</strong> and <strong>Linear Algebra and Applications</strong>.`;
        }
      }

      // Overall across all records if no specific level mentioned
      if (!isLowest && rankPos === 1) {
        return `Your overall highest mark is <strong>98 / 100</strong> in <strong>Chemistry (12th Standard)</strong>.`;
      }
      if (isLowest && rankPos === 1) {
        return `Your overall lowest mark is <strong>78 / 100</strong> in <strong>English (12th Standard)</strong>.`;
      }

      return null;
    };

    const handleDocumentLinkQuery = (q) => {
      const isAskingLinkOrDoc = q.includes('link') || q.includes('pdf') || q.includes('download') || q.includes('document') || q.includes('certificate') || q.includes('marksheet') || q.includes('resume') || q.includes('cv');

      if (!isAskingLinkOrDoc) return null;

      // CodeAlpha Certificate
      if (q.includes('codealpha') || q.includes('code alpha')) {
        return `📄 <strong>CodeAlpha Internship Certificate Link:</strong><br><a href="assets/certificates/codealpha-certificate.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View CodeAlpha Certificate (PDF) ↗</a>`;
      }

      // CodSoft Certificate
      if (q.includes('codsoft') || q.includes('cod soft')) {
        return `📄 <strong>CodSoft Internship Certificate Link:</strong><br><a href="assets/certificates/codsoft-certificate.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View CodSoft Certificate (PDF) ↗</a>`;
      }

      // Thiranex Certificate
      if (q.includes('thiranex')) {
        return `📄 <strong>Thiranex Web Development Certificate Link:</strong><br><a href="assets/certificates/thiranex-certificate.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View Thiranex Certificate (PDF) ↗</a>`;
      }

      // Infosys Springboard Certificates
      if (q.includes('infosys css') || q.includes('css3 cert')) {
        return `📄 <strong>Infosys Springboard CSS3 Certificate Link:</strong><br><a href="assets/certificates/infosys-css3.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View Infosys CSS3 Certificate (PDF) ↗</a>`;
      }
      if (q.includes('infosys java') || (q.includes('infosys') && q.includes('java'))) {
        return `📄 <strong>Infosys Springboard Java Certificate Link:</strong><br><a href="assets/certificates/infosys-java.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View Infosys Java Certificate (PDF) ↗</a>`;
      }
      if (q.includes('infosys')) {
        return `📄 <strong>Infosys Springboard Certificate Links:</strong><br>• <a href="assets/certificates/infosys-css3.pdf" target="_blank" style="color:var(--accent-cyan);">Infosys CSS3 Certificate (PDF) ↗</a><br>• <a href="assets/certificates/infosys-java.pdf" target="_blank" style="color:var(--accent-cyan);">Infosys Java Certificate (PDF) ↗</a>`;
      }

      // NPTEL / Swayam Certificate
      if (q.includes('nptel') || q.includes('swayam')) {
        return `📄 <strong>NPTEL Course Certificate Link:</strong><br><a href="assets/certificates/nptel-certificate.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View NPTEL Certificate (PDF) ↗</a>`;
      }

      // HP LIFE AI Certificate
      if (q.includes('hp life') || q.includes('hp ai') || (q.includes('hp') && q.includes('ai'))) {
        return `📄 <strong>HP LIFE AI for Beginners Certificate Link:</strong><br><a href="assets/certificates/hp-life-ai-beginners.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View HP LIFE AI Certificate (PDF) ↗</a>`;
      }

      // MongoDB Certificates
      if (q.includes('mongodb basics')) {
        return `📄 <strong>MongoDB Basics Certificate Link:</strong><br><a href="assets/certificates/mongodb-basics.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View MongoDB Basics Certificate (PDF) ↗</a>`;
      }
      if (q.includes('mongodb ai') || q.includes('mongodb strategy')) {
        return `📄 <strong>MongoDB AI Strategy Certificate Link:</strong><br><a href="assets/certificates/mongodb-ai-strategy.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View MongoDB AI Strategy Certificate (PDF) ↗</a>`;
      }
      if (q.includes('mongodb')) {
        return `📄 <strong>MongoDB Certificate Links:</strong><br>• <a href="assets/certificates/mongodb-basics.pdf" target="_blank" style="color:var(--accent-cyan);">MongoDB Basics Certificate (PDF) ↗</a><br>• <a href="assets/certificates/mongodb-ai-strategy.pdf" target="_blank" style="color:var(--accent-cyan);">MongoDB AI Strategy Certificate (PDF) ↗</a>`;
      }

      // Marksheets
      if (q.includes('10th') || q.includes('10 th') || q.includes('sslc')) {
        if (q.includes('link') || q.includes('pdf') || q.includes('download') || q.includes('certificate') || q.includes('marksheet')) {
          return `📄 <strong>10th Standard SSLC Marksheet Link:</strong><br><a href="assets/marksheets/sslc-10th-marksheet.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View 10th Marksheet (PDF) ↗</a>`;
        }
      }
      if (q.includes('12th') || q.includes('12 th') || q.includes('hsc')) {
        if (q.includes('link') || q.includes('pdf') || q.includes('download') || q.includes('certificate') || q.includes('marksheet')) {
          return `📄 <strong>12th Standard HSC Marksheet Link:</strong><br><a href="assets/marksheets/hsc-12th-marksheet.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View 12th Marksheet (PDF) ↗</a>`;
        }
      }
      if (q.includes('1st sem') || q.includes('first sem') || q.includes('sem 1') || q.includes('semester 1')) {
        if (q.includes('link') || q.includes('pdf') || q.includes('download') || q.includes('certificate') || q.includes('marksheet')) {
          return `📄 <strong>1st Semester Marksheet Link:</strong><br><a href="assets/marksheets/college-sem1-marksheet.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View 1st Sem Marksheet (PDF) ↗</a>`;
        }
      }
      if (q.includes('2nd sem') || q.includes('second sem') || q.includes('sem 2') || q.includes('semester 2')) {
        if (q.includes('link') || q.includes('pdf') || q.includes('download') || q.includes('certificate') || q.includes('marksheet')) {
          return `📄 <strong>2nd Semester Marksheet Link:</strong><br><a href="assets/marksheets/college-sem2-marksheet.pdf" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View 2nd Sem Marksheet (PDF) ↗</a>`;
        }
      }

      // Check for unavailable semester marksheet link requests (e.g. "3rd sem marksheet link")
      const semMatch = q.match(/(\d+)(?:st|nd|rd|th)?\s*(?:sem|semester)/i) || q.match(/(?:sem|semester)\s*(\d+)/i);
      if (semMatch) {
        const semNum = parseInt(semMatch[1], 10);
        if (semNum > 2) {
          return `Sorry, the requested document or certificate link is not available in the student's records.`;
        }
      }

      // Resume / CV
      if (q.includes('resume') || q.includes('cv')) {
        return `📄 <strong>Praveen's Live Printable CV / Resume Link:</strong><br><a href="resume.html?v=2.0" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">View / Download Formal Resume (PDF Page) ↗</a>`;
      }

      // All Certificates List
      if (q.includes('certificates') || q.includes('all cert')) {
        return `📄 <strong>Praveen's Verified Certificate Links:</strong><br>
• <a href="assets/certificates/codealpha-certificate.pdf" target="_blank" style="color:var(--accent-cyan);">CodeAlpha Full-Stack Internship ↗</a><br>
• <a href="assets/certificates/codsoft-certificate.pdf" target="_blank" style="color:var(--accent-cyan);">CodSoft Web Internship ↗</a><br>
• <a href="assets/certificates/thiranex-certificate.pdf" target="_blank" style="color:var(--accent-cyan);">Thiranex Web Development ↗</a><br>
• <a href="assets/certificates/infosys-css3.pdf" target="_blank" style="color:var(--accent-cyan);">Infosys Springboard CSS3 ↗</a><br>
• <a href="assets/certificates/infosys-java.pdf" target="_blank" style="color:var(--accent-cyan);">Infosys Springboard Java ↗</a><br>
• <a href="assets/certificates/nptel-certificate.pdf" target="_blank" style="color:var(--accent-cyan);">NPTEL Course Certificate ↗</a><br>
• <a href="assets/certificates/hp-life-ai-beginners.pdf" target="_blank" style="color:var(--accent-cyan);">HP LIFE AI for Beginners ↗</a><br>
• <a href="assets/certificates/mongodb-basics.pdf" target="_blank" style="color:var(--accent-cyan);">MongoDB Basics ↗</a><br>
• <a href="assets/certificates/mongodb-ai-strategy.pdf" target="_blank" style="color:var(--accent-cyan);">MongoDB AI Strategy ↗</a>`;
      }

      // All Marksheets List
      if (q.includes('marksheets') || q.includes('all marksheets')) {
        return `📄 <strong>Praveen's Verified Marksheet Links:</strong><br>
• <a href="assets/marksheets/college-sem2-marksheet.pdf" target="_blank" style="color:var(--accent-cyan);">2nd Sem Marksheet (8.73 GPA) ↗</a><br>
• <a href="assets/marksheets/college-sem1-marksheet.pdf" target="_blank" style="color:var(--accent-cyan);">1st Sem Marksheet (8.21 GPA) ↗</a><br>
• <a href="assets/marksheets/hsc-12th-marksheet.pdf" target="_blank" style="color:var(--accent-cyan);">12th HSC Marksheet (532/600) ↗</a><br>
• <a href="assets/marksheets/sslc-10th-marksheet.pdf" target="_blank" style="color:var(--accent-cyan);">10th SSLC Marksheet (442/500) ↗</a>`;
      }

      // Check if user is asking for an unavailable certificate (e.g. Google, AWS, Microsoft, Coursera, etc.)
      if (q.includes('google') || q.includes('aws') || q.includes('microsoft') || q.includes('coursera') || q.includes('udemy') || q.includes('oracle')) {
        return `Sorry, the requested document or certificate link is not available in the student's records.`;
      }

      // Fallback for unspecified document/certificate link requests
      if (q.includes('certificate') || q.includes('marksheet link') || q.includes('document link')) {
        return `Sorry, the requested document or certificate link is not available in the student's records.`;
      }

      return null;
    };

    const getJarvisResponse = (query) => {
      const q = query.toLowerCase().trim();

      // --- 0. DOCUMENT & CERTIFICATE LINK PROVIDER (Priority Check) ---
      const docLinkRes = handleDocumentLinkQuery(q);
      if (docLinkRes) return docLinkRes;

      // --- 1. GENERAL & CONTACT QUERIES (Priority Check) ---
      if (q.includes('email') || q.includes('mail')) {
        return `Praveen's Email ID is 📧 <strong>praveen542spk@gmail.com</strong>.`;
      }
      if (q.includes('phone') || q.includes('mobile') || q.includes('number') || q.includes('call')) {
        return `Praveen's Mobile Number is 📞 <strong>+91 6374060801</strong>.`;
      }
      if (q.includes('contact') || q.includes('hire') || q.includes('reach')) {
        return `Reach Praveen via Phone: 📞 <strong>+91 6374060801</strong> | Email: 📧 <strong>praveen542spk@gmail.com</strong> | LinkedIn: 💼 <a href="https://www.linkedin.com/in/praveen-kumar-s-0bab05411" target="_blank" style="color:var(--accent-cyan);">LinkedIn Profile ↗</a>.`;
      }
      if (q.includes('linkedin')) {
        return `Praveen's LinkedIn profile: 💼 <a href="https://www.linkedin.com/in/praveen-kumar-s-0bab05411" target="_blank" style="color:var(--accent-cyan);">linkedin.com/in/praveen-kumar-s-0bab05411 ↗</a>`;
      }
      if (q.includes('github')) {
        return `Praveen's GitHub profile: 🐙 <a href="https://github.com/praveen542spk-ship-it" target="_blank" style="color:var(--accent-cyan);">github.com/praveen542spk-ship-it ↗</a>`;
      }

      // --- 2. MARK COMPARISON & RANKING ENGINE ---
      if (q.includes('highest') || q.includes('lowest') || q.includes('maximum') || q.includes('minimum') || q.includes('least') || q.includes('best mark') || q.includes('top mark') || q.includes('worst mark')) {
        const rankingRes = handleRankingQuery(q);
        if (rankingRes) return rankingRes;
      }

      // --- 3. ACADEMIC QUERY VALIDATION ENGINE ---

      // Check for unavailable semesters (3rd, 4th, 5th, 6th, 7th, 8th, etc.)
      const semMatch = q.match(/(\d+)(?:st|nd|rd|th)?\s*(?:sem|semester)/i) || q.match(/(?:sem|semester)\s*(\d+)/i);
      if (semMatch) {
        const semNum = parseInt(semMatch[1], 10);
        if (semNum > 2) {
          const suffix = semNum === 3 ? 'rd' : 'th';
          return `Invalid academic record. ${semNum}${suffix} semester marks are not available in the student's records.`;
        }
      }

      // Check specific 12th subject queries (12th Subjects: Tamil:92, English:78, Physics:88, Chemistry:98, Biology:85, Maths:91)
      if (q.includes('12th') || q.includes('12 th') || q.includes('hsc') || q.includes('twelfth') || q.includes('plus two')) {
        if (q.includes('computer') || /\bcs\b/i.test(q) || q.includes('commerce') || q.includes('account') || q.includes('economic') || q.includes('french') || q.includes('hindi')) {
          const subjName = (q.includes('computer') || /\bcs\b/i.test(q)) ? 'Computer Science' : 'The requested subject';
          return `Invalid subject. ${subjName} is not available in the student's 12th-standard academic records.`;
        }
        if (q.includes('tamil')) return `Praveen's 12th Tamil Mark is <strong>92 / 100</strong>.`;
        if (q.includes('english')) return `Praveen's 12th English Mark is <strong>78 / 100</strong>.`;
        if (q.includes('physic')) return `Praveen's 12th Physics Mark is <strong>88 / 100</strong>.`;
        if (q.includes('chem')) return `Praveen's 12th Chemistry Mark is <strong>98 / 100</strong>.`;
        if (q.includes('bio')) return `Praveen's 12th Biology Mark is <strong>85 / 100</strong>.`;
        if (q.includes('math') || q.includes('calculus')) return `Praveen's 12th Mathematics Mark is <strong>91 / 100</strong>.`;
        if (q.includes('mark') || q.includes('score') || q.includes('total')) return `Praveen's 12th HSC Total Mark is <strong>532 / 600 (88.67%)</strong>.`;
      }

      // Check specific 10th subject queries (10th Subjects: Tamil:83, English:87, Maths:90, Science:94, Social Science:88)
      if (q.includes('10th') || q.includes('10 th') || q.includes('sslc') || q.includes('tenth')) {
        if (q.includes('computer') || /\bcs\b/i.test(q) || q.includes('hindi') || q.includes('french') || q.includes('biology') || q.includes('chemistry') || q.includes('physics')) {
          const subjName = (q.includes('computer') || /\bcs\b/i.test(q)) ? 'Computer Science' : 'The requested subject';
          return `Invalid subject. ${subjName} is not available in the student's 10th-standard academic records.`;
        }
        if (q.includes('tamil')) return `Praveen's 10th Tamil Mark is <strong>83 / 100</strong>.`;
        if (q.includes('english')) return `Praveen's 10th English Mark is <strong>87 / 100</strong>.`;
        if (q.includes('math')) return `Praveen's 10th Mathematics Mark is <strong>90 / 100</strong>.`;
        if (q.includes('social')) return `Praveen's 10th Social Science Mark is <strong>88 / 100</strong>.`;
        if (q.includes('science')) return `Praveen's 10th Science Mark is <strong>94 / 100</strong>.`;
        if (q.includes('mark') || q.includes('score') || q.includes('total')) return `Praveen's 10th SSLC Total Mark is <strong>442 / 500 (88.40%)</strong>.`;
      }

      // Check specific 1st Semester subject queries
      if (q.includes('1st sem') || q.includes('first sem') || q.includes('sem 1') || q.includes('semester 1')) {
        if (q.includes('heritage') || q.includes('tamil')) return `Praveen's 1st Semester Heritage of Tamils Grade is <strong>A</strong>.`;
        if (q.includes('math') || q.includes('calculus') || q.includes('matrices')) return `Praveen's 1st Semester Matrices and Calculus Grade is <strong>A+</strong>.`;
        if (q.includes('chem')) return `Praveen's 1st Semester Engineering Chemistry Grade is <strong>A</strong>.`;
        if (q.includes('c++') || q.includes('cpp')) return `Praveen's 1st Semester Programming in C++ Grade is <strong>A</strong>.`;
        if (q.includes('software') || q.includes('sdp')) return `Praveen's 1st Semester Software Development Practices Grade is <strong>A</strong>.`;
        if (q.includes('digital') || q.includes('dpsd')) return `Praveen's 1st Semester Digital Principles and System Design Grade is <strong>A</strong>.`;
        if (q.includes('idea')) return `Praveen's 1st Semester Idea Lab - I Grade is <strong>A</strong>.`;
        if (q.includes('interpersonal') || q.includes('skill') || q.includes('career')) return `Praveen's 1st Semester Interpersonal Skills Grade is <strong>A+</strong>.`;
        if (q.includes('c ') || q.includes('c language')) return `Praveen's 1st Semester Programming in C (Non-Credit) Status is <strong>Completed</strong>.`;
        if (q.includes('mark') || q.includes('gpa') || q.includes('grade')) return `Praveen's 1st Semester College GPA is <strong>8.21 / 10</strong>.`;
      }

      // Check specific 2nd Semester subject queries
      if (q.includes('2nd sem') || q.includes('second sem') || q.includes('sem 2') || q.includes('semester 2')) {
        if (q.includes('tamil') || q.includes('technology')) return `Praveen's 2nd Semester Tamils and Technology Grade is <strong>A</strong>.`;
        if (/\bai\b/i.test(q) || q.includes('artificial intelligence')) return `Praveen's 2nd Semester Introduction to Artificial Intelligence Grade is <strong>A</strong>.`;
        if (q.includes('data structure') || q.includes('ds')) return `Praveen's 2nd Semester Data Structures Grade is <strong>S (Outstanding)</strong>.`;
        if (q.includes('java')) return `Praveen's 2nd Semester Java Programming Grade is <strong>A+</strong>.`;
        if (q.includes('math') || q.includes('linear algebra')) return `Praveen's 2nd Semester Linear Algebra and Applications Grade is <strong>A+</strong>.`;
        if (q.includes('physic')) return `Praveen's 2nd Semester Physics for Information Science Grade is <strong>A</strong>.`;
        if (q.includes('idea')) return `Praveen's 2nd Semester Idea Lab - II Grade is <strong>B+</strong>.`;
        if (q.includes('innovation') || q.includes('creativity')) return `Praveen's 2nd Semester Innovation and Creativity Skills Grade is <strong>S (Outstanding)</strong>.`;
        if (q.includes('mark') || q.includes('gpa') || q.includes('grade')) return `Praveen's 2nd Semester College GPA is <strong>8.73 / 10</strong>.`;
      }

      // Direct Subject Lookup without specifying semester/school level
      if (q.includes('physic')) {
        return `Praveen's Physics Scores:<br>• <strong>12th Physics:</strong> 88 / 100<br>• <strong>2nd Sem College Physics:</strong> Grade A`;
      }
      if (q.includes('chem')) {
        return `Praveen's Chemistry Scores:<br>• <strong>12th Chemistry:</strong> 98 / 100<br>• <strong>1st Sem Engineering Chemistry:</strong> Grade A`;
      }
      if (q.includes('bio')) {
        return `Praveen's 12th Biology Mark is <strong>85 / 100</strong>.`;
      }
      if (q.includes('math') || q.includes('calculus') || q.includes('algebra')) {
        return `Praveen's Mathematics Scores:<br>• <strong>2nd Sem Linear Algebra:</strong> Grade A+<br>• <strong>1st Sem Calculus:</strong> Grade A+<br>• <strong>12th Maths:</strong> 91 / 100<br>• <strong>10th Maths:</strong> 90 / 100`;
      }
      if (q.includes('data structure') || q.includes('ds grade')) {
        return `Praveen's 2nd Semester Data Structures Grade is <strong>S (Outstanding)</strong>.`;
      }
      if (q.includes('java')) {
        return `Praveen's 2nd Semester Java Programming Grade is <strong>A+</strong>.`;
      }
      if (q.includes('c++') || q.includes('cpp')) {
        return `Praveen's 1st Semester Programming in C++ Grade is <strong>A</strong>.`;
      }
      if (q.includes('c ') || q.includes('c language')) {
        return `Praveen's 1st Semester Programming in C (Non-Credit) Status is <strong>Completed</strong>.`;
      }
      if (/\bai\b/i.test(q) || q.includes('artificial intelligence')) {
        return `Praveen's 2nd Semester Introduction to Artificial Intelligence Grade is <strong>A</strong>.`;
      }
      if (q.includes('tamil')) {
        return `Praveen's Tamil Scores:<br>• <strong>2nd Sem Tamils & Technology:</strong> Grade A<br>• <strong>1st Sem Heritage of Tamils:</strong> Grade A<br>• <strong>12th Tamil:</strong> 92 / 100<br>• <strong>10th Tamil:</strong> 83 / 100`;
      }
      if (q.includes('english')) {
        return `Praveen's English Marks:<br>• <strong>10th English:</strong> 87 / 100<br>• <strong>12th English:</strong> 78 / 100`;
      }
      if (q.includes('science') && !q.includes('computer') && !q.includes('social')) {
        return `Praveen's 10th Science Mark is <strong>94 / 100</strong>.`;
      }
      if (q.includes('social')) {
        return `Praveen's 10th Social Science Mark is <strong>88 / 100</strong>.`;
      }

      // Explicit Invalid Subject Fallback
      if (q.includes('french') || q.includes('hindi') || q.includes('commerce') || q.includes('account') || q.includes('economic') || q.includes('history') || q.includes('geography')) {
        return `Invalid subject. The requested subject is not available in the student's academic records.`;
      }

      // College / Department / Year / Degree
      if (q.includes('college') || q.includes('degree') || q.includes('dept') || q.includes('department') || q.includes('rmd') || q.includes('cse') || q.includes('year') || q.includes('school')) {
        return `Praveen is studying <strong>B.E. Computer Science & Engineering (2nd Year)</strong> at <strong>R.M.D. Engineering College</strong>.`;
      }

      // Specific Projects
      if (q.includes('job') || q.includes('tracker')) {
        return `<strong>Job Application Tracker:</strong> A MERN stack application featuring a drag-and-drop Kanban interface for managing job statuses.`;
      }
      if (q.includes('social') || q.includes('media')) {
        return `<strong>Social Media Platform:</strong> A full-stack web application featuring user profiles, post creation, and responsive design (Deployed on Vercel).`;
      }
      if (q.includes('jarvis') || q.includes('voice assistant')) {
        return `<strong>Jarvis AI Voice Assistant:</strong> An intelligent desktop voice automation system developed using Python and NLP.`;
      }
      if (q.includes('ecom') || q.includes('shop') || q.includes('store') || q.includes('cart')) {
        return `<strong>E-Commerce MERN App:</strong> Full-stack shopping application featuring product filtering, cart management, and JWT authentication.`;
      }
      if (q.includes('todo') || q.includes('task')) {
        return `<strong>To-Do Productivity App:</strong> Task management application featuring priority levels, filters, and offline LocalStorage persistence.`;
      }
      if (q.includes('weather')) {
        return `<strong>Weather Dashboard:</strong> Dynamic weather application using HTML5 Geolocation and OpenWeather API.`;
      }
      if (q.includes('project') || q.includes('work') || q.includes('built')) {
        return `Praveen has built 7+ projects including Social Media Platform, Job Application Tracker, Jarvis AI Voice Assistant, and E-Commerce MERN App.`;
      }

      // Tech Stack / Skills
      if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        return `Praveen's Tech Stack:<br>• <strong>Frontend:</strong> React.js, HTML5, CSS3, JavaScript<br>• <strong>Backend:</strong> Node.js, Express.js, REST APIs<br>• <strong>Databases:</strong> MongoDB, LocalStorage<br>• <strong>Languages:</strong> Python, C, JavaScript`;
      }

      // Overall CGPA / GPA / Marks Summary
      if (q.includes('cgpa') || q.includes('gpa')) {
        return `Praveen's Cumulative College CGPA is <strong>8.47 / 10</strong> (Sem 1: 8.21 GPA | Sem 2: 8.73 GPA).`;
      }
      if (q.includes('mark') || q.includes('score') || q.includes('education') || q.includes('academic') || q.includes('record')) {
        return `Praveen's Academic Summary:<br>• <strong>College CGPA:</strong> 8.47 / 10 (Sem 1: 8.21 | Sem 2: 8.73)<br>• <strong>12th HSC:</strong> 532 / 600 (88.67%)<br>• <strong>10th SSLC:</strong> 442 / 500 (88.40%)`;
      }

      // Specific Projects
      if (q.includes('job') || q.includes('tracker')) {
        return `<strong>Job Application Tracker:</strong> A MERN stack application featuring a drag-and-drop Kanban interface for managing job statuses.`;
      }
      if (q.includes('social') || q.includes('media')) {
        return `<strong>Social Media Platform:</strong> A full-stack web application featuring user profiles, post creation, and responsive design (Deployed on Vercel).`;
      }
      if (q.includes('jarvis') || q.includes('voice assistant')) {
        return `<strong>Jarvis AI Voice Assistant:</strong> An intelligent desktop voice automation system developed using Python and NLP.`;
      }
      if (q.includes('ecom') || q.includes('shop') || q.includes('store') || q.includes('cart')) {
        return `<strong>E-Commerce MERN App:</strong> Full-stack shopping application featuring product filtering, cart management, and JWT authentication.`;
      }
      if (q.includes('todo') || q.includes('task')) {
        return `<strong>To-Do Productivity App:</strong> Task management application featuring priority levels, filters, and offline LocalStorage persistence.`;
      }
      if (q.includes('weather')) {
        return `<strong>Weather Dashboard:</strong> Dynamic weather application using HTML5 Geolocation and OpenWeather API.`;
      }
      if (q.includes('project') || q.includes('work') || q.includes('built')) {
        return `Praveen has built 7+ projects including Social Media Platform, Job Application Tracker, Jarvis AI Voice Assistant, and E-Commerce MERN App.`;
      }

      // Tech Stack / Skills
      if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        return `Praveen's Tech Stack:<br>• <strong>Frontend:</strong> React.js, HTML5, CSS3, JavaScript<br>• <strong>Backend:</strong> Node.js, Express.js, REST APIs<br>• <strong>Databases:</strong> MongoDB, LocalStorage<br>• <strong>Languages:</strong> Python, C, JavaScript`;
      }

      // Overall CGPA / GPA / Marks Summary
      if (q.includes('cgpa') || q.includes('gpa')) {
        return `Praveen's Cumulative College CGPA is <strong>8.47 / 10</strong> (Sem 1: 8.21 GPA | Sem 2: 8.73 GPA).`;
      }
      if (q.includes('mark') || q.includes('score') || q.includes('education') || q.includes('academic') || q.includes('record')) {
        return `Praveen's Academic Summary:<br>• <strong>College CGPA:</strong> 8.47 / 10 (Sem 1: 8.21 | Sem 2: 8.73)<br>• <strong>12th HSC:</strong> 532 / 600 (88.67%)<br>• <strong>10th SSLC:</strong> 442 / 500 (88.40%)`;
      }

      // Name / Who is Praveen
      if (q.includes('who') || q.includes('name') || q.includes('praveen')) {
        return `Praveen Kumar S is a 2nd Year Computer Science student at R.M.D. Engineering College and a Full-Stack Developer.`;
      }
      // Greetings
      if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings')) {
        return `Hello! I am SPK AI, Praveen's personal portfolio assistant. Ask me any subject mark or grade (e.g. "Physics mark", "10th Maths mark", "1st sem GPA", "12th Biology mark")!`;
      }

      // Default fallback
      return `I am SPK AI. Ask me specific subject marks (e.g. "12th Physics mark", "10th Maths mark", "1st sem GPA", "2nd sem Data Structures grade").`;
    };

    const handleJarvisSend = () => {
      const query = jarvisInput.value.trim();
      if (!query) return;
      addJarvisMsg(query, 'user');
      jarvisInput.value = '';
      setTimeout(() => {
        const resp = getJarvisResponse(query);
        addJarvisMsg(resp, 'bot');
      }, 400);
    };

    if (jarvisSend) jarvisSend.addEventListener('click', handleJarvisSend);
    if (jarvisInput) {
      jarvisInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleJarvisSend();
      });
    }

    document.querySelectorAll('.jarvis-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent;
        addJarvisMsg(text, 'user');
        setTimeout(() => {
          const resp = getJarvisResponse(text);
          addJarvisMsg(resp, 'bot');
        }, 300);
      });
    });
  }

  /* --------------------------------------------------------------------------
     25. FEATURE 2: CYBERPUNK TERMINAL / CLI MODE
     -------------------------------------------------------------------------- */
  const cliTrigger = document.getElementById('cli-trigger-btn');
  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalClose = document.getElementById('terminal-close-btn');
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-cli-input');

  if (terminalOverlay) {
    const openTerminal = () => {
      terminalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (terminalInput) setTimeout(() => terminalInput.focus(), 100);
    };

    const closeTerminal = () => {
      terminalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (cliTrigger) cliTrigger.addEventListener('click', openTerminal);
    if (terminalClose) terminalClose.addEventListener('click', closeTerminal);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        if (terminalOverlay.classList.contains('open')) closeTerminal();
        else openTerminal();
      } else if (e.key === 'Escape' && terminalOverlay.classList.contains('open')) {
        closeTerminal();
      }
    });

    if (terminalInput) {
      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = terminalInput.value.trim();
          terminalInput.value = '';
          if (!cmd) return;

          const line = document.createElement('div');
          line.innerHTML = `<span style="color:var(--accent-cyan);">praveen@dev:~$</span> ${cmd}`;
          terminalBody.appendChild(line);

          const res = document.createElement('div');
          res.style.marginBottom = '0.75rem';
          const c = cmd.toLowerCase();

          if (c === 'help') {
            res.innerHTML = `Available CLI Commands:<br>
  • <span style="color:#f59e0b;">cat resume.json</span> - View JSON candidate profile<br>
  • <span style="color:#f59e0b;">projects</span> - List portfolio projects &amp; repository URLs<br>
  • <span style="color:#f59e0b;">cgpa</span> / <span style="color:#f59e0b;">marks</span> - Print verified academic scores<br>
  • <span style="color:#f59e0b;">skills</span> - Display tech stack overview<br>
  • <span style="color:#f59e0b;">contact</span> - Print contact channels<br>
  • <span style="color:#f59e0b;">clear</span> - Clear terminal window<br>
  • <span style="color:#f59e0b;">exit</span> - Close CLI mode`;
          } else if (c === 'cat resume.json') {
            res.innerHTML = `<pre style="color:#38bdf8;">{
  "name": "PRAVEEN KUMAR S",
  "degree": "B.E. Computer Science & Engineering (2nd Year)",
  "institution": "R.M.D. Engineering College",
  "cgpa": 8.47,
  "status": "🟢 Available for Full-Stack Internships",
  "mobile": "+91 6374060801",
  "email": "praveen542spk@gmail.com"
}</pre>`;
          } else if (c === 'projects') {
            res.innerHTML = `1. Social Media Platform (Live Demo: code-alpha-social-media-platform-self.vercel.app)<br>
2. Job Application Tracker (GitHub: github.com/praveen542spk-ship-it/job-app)<br>
3. Jarvis AI Voice Assistant (GitHub: github.com/praveen542spk-ship-it/Jarvis-AI-Voice-Assistant)<br>
4. E-Commerce MERN Application (GitHub: github.com/praveen542spk-ship-it/ecom-app)`;
          } else if (c === 'cgpa' || c === 'marks') {
            res.innerHTML = `🎓 B.E. CSE College CGPA: <strong>8.47 / 10</strong> (Sem 1: 8.21 | Sem 2: 8.73)<br>
📜 12th HSC State Board: <strong>532 / 600 (88.67%)</strong><br>
📜 10th SSLC State Board: <strong>442 / 500 (88.40%)</strong>`;
          } else if (c === 'skills') {
            res.innerHTML = `Frontend: React.js, HTML5, CSS3, JavaScript (ES6+), Glassmorphism<br>Backend: Node.js, Express.js, REST APIs, JWT Auth, Vercel<br>Databases: MongoDB, LocalStorage<br>Languages: Python, C, JavaScript`;
          } else if (c === 'contact') {
            res.innerHTML = `Mobile: +91 6374060801<br>Email: praveen542spk@gmail.com<br>GitHub: github.com/praveen542spk-ship-it<br>LinkedIn: linkedin.com/in/praveen-kumar-s-0bab05411`;
          } else if (c === 'clear') {
            terminalBody.innerHTML = '';
            return;
          } else if (c === 'exit' || c === 'quit') {
            closeTerminal();
            return;
          } else {
            res.innerHTML = `<span style="color:#ef4444;">command not found: ${cmd}</span>. Type <span style="color:#f59e0b;">help</span> for available commands.`;
          }
          terminalBody.appendChild(res);
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     26. FEATURE 3: LIVE GITHUB ACTIVITY FETCH
     -------------------------------------------------------------------------- */
  const githubFeed = document.getElementById('github-commit-feed');
  if (githubFeed) {
    fetch('https://api.github.com/users/praveen542spk-ship-it/events')
      .then(res => res.json())
      .then(events => {
        const pushEvents = Array.isArray(events) ? events.filter(e => e.type === 'PushEvent').slice(0, 4) : [];
        if (pushEvents.length === 0) {
          githubFeed.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem;">Active Repository Highlights: Job Application Tracker, Jarvis Voice AI, Social Media Platform.</div>';
          return;
        }
        githubFeed.innerHTML = pushEvents.map(e => {
          const repoName = e.repo.name.replace('praveen542spk-ship-it/', '');
          const commitMsg = e.payload.commits && e.payload.commits[0] ? e.payload.commits[0].message : 'Pushed updates';
          const dateStr = new Date(e.created_at).toLocaleDateString();
          return `
            <div class="github-commit-item">
              <div>
                <strong style="color:var(--accent-primary);">${repoName}</strong>
                <div style="color:var(--text-main); font-size:0.82rem; margin-top:2px;">"${commitMsg}"</div>
              </div>
              <span style="color:var(--text-muted); font-size:0.75rem;">${dateStr}</span>
            </div>
          `;
        }).join('');
      })
      .catch(() => {
        githubFeed.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem;">Active Repository Highlights: Job Application Tracker, Jarvis Voice AI, Social Media Platform.</div>';
      });
  }

  /* --------------------------------------------------------------------------
     27. FEATURE 4: RECRUITER VERIFICATION INSPECTOR MODAL
     -------------------------------------------------------------------------- */
  const recruiterOverlay = document.getElementById('recruiter-overlay');
  const recruiterTrigger = document.getElementById('recruiter-trigger-btn');
  const recruiterClose = document.getElementById('recruiter-close-btn');
  const copyRecruiterBtn = document.getElementById('copy-recruiter-summary-btn');

  if (recruiterOverlay) {
    const openRecruiterModal = () => {
      recruiterOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeRecruiterModal = () => {
      recruiterOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (recruiterTrigger) recruiterTrigger.addEventListener('click', openRecruiterModal);
    if (recruiterClose) recruiterClose.addEventListener('click', closeRecruiterModal);

    recruiterOverlay.addEventListener('click', (e) => {
      if (e.target === recruiterOverlay) closeRecruiterModal();
    });

    if (copyRecruiterBtn) {
      copyRecruiterBtn.addEventListener('click', () => {
        const text = `EXECUTIVE CANDIDATE SUMMARY: PRAVEEN KUMAR S
------------------------------------------------
Role: Computer Science Student & Full-Stack Developer
Institution: R.M.D. Engineering College (B.E. CSE, 2nd Year)
Mobile: +91 6374060801 | Email: praveen542spk@gmail.com
Cumulative CGPA: 8.47 / 10 (Sem 1: 8.21 GPA | Sem 2: 8.73 GPA)
12th Standard HSC: 532 / 600 (88.67%)
10th Standard SSLC: 442 / 500 (88.40%)
Core Stack: React.js, Node.js, Express, MongoDB, Python, Voice AI, C
GitHub: https://github.com/praveen542spk-ship-it
Portfolio: https://praveen542spk-ship-it.github.io/
Status: Available for Internships & Full-Stack Roles`;

        navigator.clipboard.writeText(text).then(() => {
          window.showToast('Copied Recruiter Summary to Clipboard!');
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     28. FEATURE 5: INTERACTIVE SKILL GALAXY CANVAS NODE VISUALIZER
     -------------------------------------------------------------------------- */
  const galaxyCanvas = document.getElementById('skill-galaxy-canvas');
  if (galaxyCanvas) {
    const ctx = galaxyCanvas.getContext('2d');
    let width = galaxyCanvas.width = galaxyCanvas.parentElement.offsetWidth;
    let height = galaxyCanvas.height = galaxyCanvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (!galaxyCanvas.parentElement) return;
      width = galaxyCanvas.width = galaxyCanvas.parentElement.offsetWidth;
      height = galaxyCanvas.height = galaxyCanvas.parentElement.offsetHeight;
    });

    const nodes = [
      { label: 'React.js', x: width * 0.22, y: height * 0.35, r: 24, cat: 'react', color: '#06b6d4' },
      { label: 'Node.js', x: width * 0.45, y: height * 0.3, r: 24, cat: 'node', color: '#10b981' },
      { label: 'Python', x: width * 0.75, y: height * 0.35, r: 26, cat: 'python', color: '#8b5cf6' },
      { label: 'MongoDB', x: width * 0.32, y: height * 0.7, r: 22, cat: 'node', color: '#10b981' },
      { label: 'Express', x: width * 0.58, y: height * 0.65, r: 22, cat: 'node', color: '#6366f1' },
      { label: 'JavaScript', x: width * 0.12, y: height * 0.65, r: 24, cat: 'javascript', color: '#f59e0b' },
      { label: 'Voice AI', x: width * 0.88, y: height * 0.7, r: 22, cat: 'python', color: '#ec4899' }
    ];

    const links = [
      [0, 1], [1, 3], [1, 4], [0, 5], [2, 6], [4, 2]
    ];

    const drawGalaxy = () => {
      ctx.clearRect(0, 0, width, height);

      links.forEach(([i, j]) => {
        const n1 = nodes[i];
        const n2 = nodes[j];
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 17, 32, 0.9)';
        ctx.fill();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '600 11px var(--font-heading), sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });
    };

    drawGalaxy();

    galaxyCanvas.addEventListener('click', (e) => {
      const rect = galaxyCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      nodes.forEach(n => {
        const dist = Math.hypot(clickX - n.x, clickY - n.y);
        if (dist <= n.r) {
          window.showToast(`Selected ${n.label} node filter!`);
          const filterBtn = document.querySelector(`.filter-btn[data-filter="${n.cat}"]`);
          if (filterBtn) filterBtn.click();
        }
      });
    });
  }
}