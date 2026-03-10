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

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    const headerHeight = header.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 60;
        const sectionBottom = sectionTop + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinkEls.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Reveal on scroll (Intersection Observer)
const revealElements = document.querySelectorAll(
    '.about-grid, .cakes-grid, .menu-category, .pricing-card, .location-grid, .section-header'
);

revealElements.forEach(el => {
    el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Staggered reveal for grid children (menu categories, pricing cards)
const staggerContainers = [
    { parent: '.menu-categories', children: '.menu-category', delay: 80 },
    { parent: '.pricing-grid', children: '.pricing-card', delay: 120 }
];

staggerContainers.forEach(({ parent, children, delay }) => {
    const parentEl = document.querySelector(parent);
    if (!parentEl) return;
    const items = parentEl.querySelectorAll(children);
    items.forEach(item => {
        item.classList.add('reveal');
    });

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll(children);
                items.forEach((item, index) => {
                    setTimeout(() => item.classList.add('visible'), index * delay);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    staggerObserver.observe(parentEl);
});

