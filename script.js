// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 800);

    // Start typewriter after preloader hides
    setTimeout(() => {
        initTypewriter();
    }, 1200);
});

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const titles = [
        'Visionary Administrator',
        'Nation Builder',
        'Cultural Reformer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 500;

    function tick() {
        const current = titles[titleIndex];

        if (!isDeleting) {
            // Typing
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                // Finished typing — pause then start deleting
                isDeleting = true;
                setTimeout(tick, pauseAfterType);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            // Deleting
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                // Finished deleting — move to next title
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(tick, pauseAfterDelete);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    tick();
}

// ============================================
// HERO PARTICLES
// ============================================
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
}
createParticles();

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active section highlight
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === id) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', updateActiveLink);

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = target > 100 ? 2000 : 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

const tickerEl = document.querySelector('.hero-ticker');
if (tickerEl) counterObserver.observe(tickerEl);

// ============================================
// SCROLL REVEAL
// ============================================
function initReveals() {
    const revealItems = document.querySelectorAll(
        '.section-label, .section-heading, .section-desc, ' +
        '.about-portrait, .about-mini-gallery, .about-lead, .about-body, .credentials, ' +
        '.vision-card, ' +
        '.content-text, .media-main, .media-row, .highlight-box, .justice-quote-block, ' +
        '.gallery-card, .edu-card, ' +
        '.tl-item, ' +
        '.contact-left, .contact-right, ' +
        '.credential-card, .pillar-item'
    );

    revealItems.forEach(el => el.classList.add('reveal-up'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.reveal-up')) : [];
                const idx = siblings.indexOf(entry.target);
                const delay = Math.min(idx * 60, 400);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(el => revealObserver.observe(el));
}
initReveals();

// ============================================
// TIMELINE
// ============================================
const tlItems = document.querySelectorAll('.tl-item');
const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            tlObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
tlItems.forEach(item => tlObserver.observe(item));

// ============================================
// LIGHTBOX with NAVIGATION
// ============================================
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const galleryCards = document.querySelectorAll('.gallery-card');
let currentImageIndex = 0;
const galleryImages = [];

galleryCards.forEach((card, i) => {
    const img = card.querySelector('img');
    const caption = card.dataset.caption || '';
    galleryImages.push({ src: img.src, alt: img.alt, caption });

    card.addEventListener('click', () => {
        openLightbox(i);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const data = galleryImages[currentImageIndex];
    lbImage.src = data.src;
    lbImage.alt = data.alt;
    lbCaption.textContent = data.caption;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

document.querySelector('.lb-close').addEventListener('click', closeLightbox);
document.querySelector('.lb-overlay').addEventListener('click', closeLightbox);
document.querySelector('.lb-next').addEventListener('click', nextImage);
document.querySelector('.lb-prev').addEventListener('click', prevImage);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btnSpan = submitBtn.querySelector('span');
        const originalText = btnSpan.textContent;

        btnSpan.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            btnSpan.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #138808, #0D6106)';
            submitBtn.style.opacity = '1';

            setTimeout(() => {
                contactForm.reset();
                btnSpan.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ============================================
// PARALLAX on Hero
// ============================================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const heroLeft = document.querySelector('.hero-left');
            const heroRight = document.querySelector('.hero-right');

            if (heroLeft && scrolled < window.innerHeight) {
                const factor = scrolled / window.innerHeight;
                heroLeft.style.transform = `translateY(${scrolled * 0.08}px)`;
                heroLeft.style.opacity = 1 - factor * 0.7;
            }
            if (heroRight && scrolled < window.innerHeight) {
                heroRight.style.transform = `translateY(${scrolled * 0.12}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// Hide scroll indicator on scroll
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
}

console.log('B. H. Anil Kumar – Political Portfolio loaded');
