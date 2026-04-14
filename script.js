/* ═══════════════════════════════════════
   PORTFOLIO — DARK MODERN
   script.js
═══════════════════════════════════════ */

// ── GLOBAL THEME TOGGLE FUNCTION ──────
window.toggleTheme = function() {
  console.log('Button clicked - toggleTheme called');
  const btn = document.getElementById('themeToggle');
  const body = document.body;
  
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  if (btn) {
    btn.textContent = isLight ? '☀️' : '🌙';
  }
  console.log('Theme toggled to:', isLight ? 'LIGHT MODE' : 'DARK MODE');
};

document.addEventListener('DOMContentLoaded', () => {

  // ── THEME TOGGLE ────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Load saved theme on page load
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
    console.log('Loaded LIGHT mode from storage');
  } else {
    document.body.classList.remove('light-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
    console.log('Loaded DARK mode from storage');
  }
  
  // Add event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.toggleTheme();
    });
    console.log('Click listener added to theme toggle button');
  }

  // ── NAV SCROLL ──────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── HAMBURGER (mobile) ──────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav__links');
  
  if (hamburger && navLinks) {
    let menuOpen = false;

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      menuOpen = !menuOpen;
      if (menuOpen) {
        navLinks.classList.add('mobile-open');
      } else {
        navLinks.classList.remove('mobile-open');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        menuOpen = false;
        navLinks.classList.remove('mobile-open');
      }
    });

    // Close menu on link click
    document.querySelectorAll('.nav__links a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // ── REVEAL ON SCROLL ───────────────────
  const revealElements = document.querySelectorAll(
    '.section-label, .section-title, .skill-card, .project-card, .testi-card, .about__grid, .contact__grid, .hero__stats'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));

  // ── STAGGERED CARD REVEAL ──────────────
  const cardGroups = [
    document.querySelectorAll('.skill-card'),
    document.querySelectorAll('.project-card'),
    document.querySelectorAll('.testi-card'),
  ];

  cardGroups.forEach(cards => {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.parentElement.querySelectorAll('.reveal');
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 120);
          });
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));
  });

  // ── SKILL BAR ANIMATION ────────────────
  const skillBars = document.querySelectorAll('.skill-bar__fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ── CONTACT FORM ───────────────────────
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        successMsg.style.display = 'block';
        form.reset();
        btn.textContent = 'Send Message →';
        btn.disabled = false;

        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 4000);
      }, 1200);
    });
  }

  // ── ACTIVE NAV LINK (scrollspy) ────────
  const sections = document.querySelectorAll('section[id]');
  const navMenuLinks = document.querySelectorAll('.nav__links a');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navMenuLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = '#c9a84c';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => spyObserver.observe(s));

  // ── TYPEWRITER EFFECT (hero sub) ──────
  const subEl = document.querySelector('.hero__sub');
  if (subEl) {
    const texts = ['Innovative · Technical · Results-Driven', 'AI Engineer · Problem Solver', 'Building Intelligent Systems'];
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseTimer = null;

    const type = () => {
      const current = texts[textIndex];
      if (!deleting) {
        subEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          pauseTimer = setTimeout(type, 2200);
          return;
        }
      } else {
        subEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
      setTimeout(type, deleting ? 40 : 80);
    };
    setTimeout(type, 1500);
  }

  // ── PARALLAX ORBS ──────────────────────
  const orb1 = document.querySelector('.orb--1');
  const orb2 = document.querySelector('.orb--2');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
    if (orb2) orb2.style.transform = `translate(${-x}px, ${-y}px)`;
  });

  // ── COUNTER ANIMATION (stats) ─────────
  const statNums = document.querySelectorAll('.stat__num');
  const targets = [5, 40, 20];

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach((el, i) => {
          let count = 0;
          const target = targets[i];
          const step = Math.ceil(target / 30);
          const interval = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count + '+';
            if (count >= target) clearInterval(interval);
          }, 40);
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero__stats');
  if (statsEl) counterObserver.observe(statsEl);

  // ── MODAL CLICK-OUTSIDE TO CLOSE ──────
  const cvModal = document.getElementById('cvModal');
  const paperModal = document.getElementById('paperModal');

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.style.display = 'none';
      }
    });
  }

  if (paperModal) {
    paperModal.addEventListener('click', (e) => {
      if (e.target === paperModal) {
        paperModal.style.display = 'none';
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cvModal) cvModal.style.display = 'none';
      if (paperModal) paperModal.style.display = 'none';
    }
  });

});
