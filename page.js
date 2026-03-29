const nav = document.querySelector('.nav-strip');
const navLinks = document.querySelectorAll('.nav-inner a');
const sections = document.querySelectorAll('.issue[id]');

// Intercept nav clicks and scroll so section top sits just below nav
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const navBottom = nav.getBoundingClientRect().bottom;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: targetTop - navBottom - 8, behavior: 'smooth' });
    });
});

// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
    }
    });
}, { threshold: 0.08 });

sections.forEach(el => fadeObserver.observe(el));

// Active nav tab highlight
const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector('.nav-inner a[href="#' + e.target.id + '"]');
        if (link) {
        link.classList.add('active');
        link.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        }
    }
    });
}, {
    rootMargin: '-' + (nav.offsetHeight + 8) + 'px 0px -60% 0px',
    threshold: 0
});

sections.forEach(s => activeObserver.observe(s));