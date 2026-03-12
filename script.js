// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.querySelector('.material-icons').textContent = isOpen ? 'close' : 'menu';
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.querySelector('.material-icons').textContent = 'menu';
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Header shadow on scroll
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
}

// Reveal on scroll (Intersection Observer)
const revealElements = document.querySelectorAll(
    '.about-grid, .cakes-grid, .menu-category, .pricing-card, .location-grid, .section-header, .highlight-card, .contact-grid, .contact-note, .contact-cta-box'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Staggered reveal for grid children
const staggerContainers = [
    { parent: '.menu-categories', children: '.menu-category', delay: 80 },
    { parent: '.pricing-grid', children: '.pricing-card', delay: 120 },
    { parent: '.highlights-grid', children: '.highlight-card', delay: 100 }
];

staggerContainers.forEach(({ parent, children, delay }) => {
    const parentEl = document.querySelector(parent);
    if (!parentEl) return;
    parentEl.querySelectorAll(children).forEach(item => item.classList.add('reveal'));

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll(children).forEach((item, index) => {
                    setTimeout(() => item.classList.add('visible'), index * delay);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    staggerObserver.observe(parentEl);
});
