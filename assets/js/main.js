/**
 * Main JavaScript for Pantelis Tzamalis Portfolio
 * Dark/light mode, navigation, scroll behavior
 */

(function () {
  'use strict';

  // ── Dark / Light Mode ──────────────────────────────────────────────
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.classList.contains('dark') ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Mobile Menu Toggle ─────────────────────────────────────────────
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isOpen = !mobileMenu.classList.contains('hidden');
      // When the dropdown is open, force the navbar to its solid (frosted)
      // background so menu items aren't see-through over the hero content.
      // When it's closed again, restore the background based on scroll position.
      if (isOpen) {
        navbar?.classList.add('nav-scrolled');
      } else {
        updateNavbar();
      }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        updateNavbar();
      });
    });
  }

  // ── Navbar Background on Scroll ────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ── Active Section Highlighting ────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ── Smooth Scroll for Anchor Links ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll Reveal Animation ────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

})();
