import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderServices } from './pages/services.js';
import { renderCaseStudies } from './pages/caseStudies.js';
import { renderInsights } from './pages/insights.js';
import { renderContact, initContactForm } from './pages/contact.js';
import { renderDownload, initDownloadForm } from './pages/download.js';
import { renderAdmin, initAdmin } from './pages/admin.js';

const routes = {
  '/': renderHome,
  '/about': renderAbout,
  '/services': renderServices,
  '/case-studies': renderCaseStudies,
  '/insights': renderInsights,
  '/contact': renderContact,
  '/download': renderDownload,
  '/admin': renderAdmin,
};

const mainEl = document.getElementById('main-content');

function navigate(path) {
  const renderer = routes[path];
  if (!renderer) {
    navigate('/');
    return;
  }

  mainEl.innerHTML = renderer();
  window.scrollTo(0, 0);
  updateActiveNav(path);
  closeMobileMenu();

  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
    initAnimations();
    initScrollIndicator();
    if (path === '/contact') initContactForm();
    if (path === '/download') initDownloadForm();
    if (path === '/admin') initAdmin();
  });
}

function updateActiveNav(path) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === path);
  });
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-link]');
  if (!link) return;

  e.preventDefault();
  const href = link.getAttribute('href');
  if (href && href !== window.location.pathname) {
    history.pushState(null, '', href);
    navigate(href);
  } else if (href === window.location.pathname) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});

const hamburger = document.getElementById('nav-hamburger');
const overlay = document.getElementById('mobile-overlay');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  overlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) {
    closeMobileMenu();
  }
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 10);
}, { passive: true });

let observer;

function initAnimations() {
  if (observer) observer.disconnect();

  const targets = mainEl.querySelectorAll('.animate-on-scroll, .stagger-children, .tag-animate');

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

function initScrollIndicator() {
  const indicator = document.getElementById('scroll-indicator');
  if (!indicator) return;

  const handleScroll = () => {
    indicator.classList.toggle('faded', window.scrollY > 100);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

navigate(window.location.pathname);
