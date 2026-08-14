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

  /* --------------------------------------------------------------------------
     13. VOICE INTRO AUDIO SPEECH PRESENTATION & SOUND CONTROL
     -------------------------------------------------------------------------- */
  const soundBtn = document.getElementById('sound-toggle-btn');
  const bgProfile3D = document.querySelector('.bg-profile-3d');

  if (soundBtn && 'speechSynthesis' in window) {
    let hasAutoPlayed = false;

    const stopSpeech = () => {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      soundBtn.innerHTML = '🔇';
      soundBtn.classList.remove('is-playing');
      soundBtn.setAttribute('title', 'Play Voice Presentation');
      if (bgProfile3D) bgProfile3D.classList.remove('audio-active');
    };

    const startSpeech = () => {
      window.speechSynthesis.cancel();
      
      const introText = "Welcome to my portfolio! I am Praveen Kumar S, a Computer Science Engineering student at R.M.D. Engineering College and a Full-Stack Developer. Explore my built projects, skills, and certifications!";
      const utterance = new SpeechSynthesisUtterance(introText);
      utterance.rate = 0.95;
      utterance.pitch = 0.9; // Deeper pitch for crisp male voice signature

      // Select MALE English voice strictly
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => 
        v.lang.startsWith('en') && (
          v.name.includes('David') || 
          v.name.includes('Daniel') || 
          v.name.includes('Alex') || 
          v.name.includes('Guy') || 
          v.name.includes('George') || 
          v.name.includes('James') || 
          v.name.includes('Mark') || 
          v.name.includes('Male') ||
          v.name.includes('Natural (Male)')
        )
      ) || voices.find(v => 
        v.lang.startsWith('en') && 
        !v.name.toLowerCase().includes('zira') && 
        !v.name.toLowerCase().includes('samantha') && 
        !v.name.toLowerCase().includes('hazel') && 
        !v.name.toLowerCase().includes('susan') && 
        !v.name.toLowerCase().includes('female') &&
        !v.name.toLowerCase().includes('victoria') &&
        !v.name.toLowerCase().includes('karen')
      );

      if (maleVoice) utterance.voice = maleVoice;

      utterance.onstart = () => {
        isSpeaking = true;
        soundBtn.innerHTML = '🔊';
        soundBtn.classList.add('is-playing');
        soundBtn.setAttribute('title', 'Click to Mute Sound');
        if (bgProfile3D) bgProfile3D.classList.add('audio-active');
      };

      utterance.onend = () => {
        isSpeaking = false;
        soundBtn.innerHTML = '🔊';
        soundBtn.classList.remove('is-playing');
        soundBtn.setAttribute('title', 'Play Voice Presentation');
        if (bgProfile3D) bgProfile3D.classList.remove('audio-active');
      };

      utterance.onerror = () => {
        stopSpeech();
      };

      window.speechSynthesis.speak(utterance);
    };

    // Pre-fetch voices
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    const triggerAutoSpeech = () => {
      if (hasAutoPlayed || localStorage.getItem('portfolio-sound-muted') === 'true') return;
      hasAutoPlayed = true;
      startSpeech();

      document.removeEventListener('click', triggerAutoSpeech);
      document.removeEventListener('scroll', triggerAutoSpeech);
      document.removeEventListener('touchstart', triggerAutoSpeech);
      document.removeEventListener('keydown', triggerAutoSpeech);
    };

    // 1. Attempt immediate auto-play on load
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!hasAutoPlayed && localStorage.getItem('portfolio-sound-muted') !== 'true') {
          try {
            startSpeech();
            hasAutoPlayed = true;
          } catch(e) {
            // Autoplay blocked by browser policy; will trigger on first interaction gesture
          }
        }
      }, 500);
    });

    // 2. Guaranteed auto-play on first user interaction gesture (click/scroll/touch/keypress)
    document.addEventListener('click', triggerAutoSpeech, { once: true });
    document.addEventListener('scroll', triggerAutoSpeech, { once: true });
    document.addEventListener('touchstart', triggerAutoSpeech, { once: true });
    document.addEventListener('keydown', triggerAutoSpeech, { once: true });

    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isSpeaking || window.speechSynthesis.speaking) {
        localStorage.setItem('portfolio-sound-muted', 'true');
        stopSpeech();
      } else {
        localStorage.removeItem('portfolio-sound-muted');
        startSpeech();
      }
    });
  }
  }

});