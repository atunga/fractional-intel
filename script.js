// ===================================
// The Fractional Intelligence Company
// Retro Sunset Wave Animations
// ===================================

// ===================================
// Smooth Scroll with Offset
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ===================================
// Navigation State Management
// ===================================
const nav = document.querySelector('.nav');
let lastScroll = 0;

function updateNavState() {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(26, 58, 74, 0.15)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
}

window.addEventListener('scroll', updateNavState, { passive: true });

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Advanced Intersection Observer
// ===================================
const observerOptions = {
    root: null,
    rootMargin: '-50px 0px',
    threshold: [0, 0.1, 0.25]
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize scroll animations
function initAnimations() {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        animationObserver.observe(el);
    });

    // Section tags
    document.querySelectorAll('.section-tag').forEach(el => {
        el.classList.add('fade-in');
        animationObserver.observe(el);
    });

    // Problem list items
    document.querySelectorAll('.problem-list li').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.15}s`;
        animationObserver.observe(el);
    });

    // Service cards
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.15}s`;
        animationObserver.observe(el);
    });

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.2}s`;
        animationObserver.observe(el);
    });

    // Result cards
    document.querySelectorAll('.result-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });

    // Stat card
    document.querySelectorAll('.stat-card').forEach(el => {
        el.classList.add('fade-in');
        animationObserver.observe(el);
    });

    // Testimonial
    document.querySelectorAll('.testimonial').forEach(el => {
        el.classList.add('fade-in');
        animationObserver.observe(el);
    });

    // CTA content
    document.querySelectorAll('.cta-content').forEach(el => {
        el.classList.add('fade-in');
        animationObserver.observe(el);
    });
}

// ===================================
// Animated Counter with Easing
// ===================================
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);

        let current = start + (target - start) * easedProgress;

        // Handle decimal places
        if (target % 1 !== 0) {
            current = current.toFixed(1);
        } else {
            current = Math.floor(current);
        }

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Observe stat numbers for animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';

            const text = entry.target.textContent;
            const num = parseFloat(text);

            if (!isNaN(num)) {
                let suffix = '';
                if (text.includes('%')) suffix = '%';
                else if (text.includes('x')) suffix = 'x';

                animateCounter(entry.target, num, 2000, suffix);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .result-number').forEach(el => {
    statObserver.observe(el);
});

// ===================================
// Timeline Progress Animation
// ===================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const trackProgress = document.querySelector('.track-progress');
            if (trackProgress) {
                trackProgress.style.height = '100%';
            }
        }
    });
}, { threshold: 0.3 });

const approachSection = document.querySelector('.approach');
if (approachSection) {
    timelineObserver.observe(approachSection);
}

// ===================================
// Calendly Integration
// ===================================
function openCalendly(e) {
    e.preventDefault();
    // Replace with your actual Calendly URL
    // window.Calendly.initPopupWidget({url: 'https://calendly.com/your-link'});
    alert('Calendly integration: Replace with your booking link in script.js');
}

// ===================================
// Parallax Effect for Hero Elements
// ===================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const graphicSun = document.querySelector('.graphic-sun');
    const waveStack = document.querySelector('.wave-stack');
    const retroBgSun = document.querySelector('.sun');

    if (scrolled < window.innerHeight) {
        if (graphicSun) {
            graphicSun.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
        }
        if (waveStack) {
            waveStack.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        if (retroBgSun) {
            retroBgSun.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${scrolled * 0.15}px)`;
        }
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// ===================================
// Scroll Indicator Fade
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');

function updateScrollIndicator() {
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - (window.pageYOffset / 200));
        scrollIndicator.style.opacity = opacity;
        scrollIndicator.style.pointerEvents = opacity < 0.5 ? 'none' : 'auto';
    }
}

window.addEventListener('scroll', updateScrollIndicator, { passive: true });

// ===================================
// Button Bounce Effect
// ===================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'translate(6px, 6px)';
        btn.style.boxShadow = '0 0 0 var(--color-navy)';
    });

    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
    });
});

// ===================================
// Card Tilt Effect (Desktop)
// ===================================
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.service-card, .result-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===================================
// Stripe Animation on Tags
// ===================================
document.querySelectorAll('.tag-stripes, .badge-stripe, .scroll-wave span').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transform = 'scaleY(1.3)';
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
});

// ===================================
// Reveal Sections on Scroll
// ===================================
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('section-visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });

// ===================================
// Wave Animation Enhancement
// ===================================
function initWaveAnimations() {
    const waves = document.querySelectorAll('.wave-ribbon');
    let scrollProgress = 0;

    window.addEventListener('scroll', () => {
        scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);

        waves.forEach((wave, index) => {
            const offset = Math.sin(scrollProgress * Math.PI * 2 + index) * 10;
            wave.style.transform = `translateX(${offset}px)`;
        });
    }, { passive: true });
}

// ===================================
// Dynamic Color Stripe on Hover
// ===================================
document.querySelectorAll('.problem-list li').forEach((item, index) => {
    const colors = ['var(--color-coral)', 'var(--color-teal)', 'var(--color-amber)'];
    item.addEventListener('mouseenter', () => {
        item.style.borderLeftColor = colors[index % colors.length];
        item.style.borderLeftWidth = '6px';
    });
    item.addEventListener('mouseleave', () => {
        item.style.borderLeftColor = '';
        item.style.borderLeftWidth = '';
    });
});

// ===================================
// Contact Form Handler
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: form.name.value,
                company: form.company.value,
                email: form.email.value,
                revenue: form.revenue.value,
                message: form.message.value,
                timestamp: new Date().toISOString()
            };

            console.log('Form submitted:', formData);

            form.style.display = 'none';
            formSuccess.style.display = 'block';

            form.reset();
        });
    }
}

// ===================================
// FAQ Accordion
// ===================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ===================================
// Initialize on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Mark body as loaded for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Initialize scroll animations
    initAnimations();
    initWaveAnimations();
    initFAQ();
    initContactForm();

    // Initial calls
    updateNavState();
    revealOnScroll();
    updateScrollIndicator();

    // Console branding
    console.log(
        '%c FIC %c The Fractional Intelligence Company ',
        'background: linear-gradient(135deg, #e8715e, #e6a23c); color: #f5f0e6; font-weight: bold; padding: 8px 12px; border-radius: 4px 0 0 4px;',
        'background: #1a3a4a; color: #f5f0e6; padding: 8px 12px; border-radius: 0 4px 4px 0;'
    );
});

// ===================================
// Preload & Final Setup
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('fully-loaded');

    // Ensure all animations are ready
    document.querySelectorAll('.fade-in').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});
