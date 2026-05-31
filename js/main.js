(function () {
    'use strict';

    const CAREER_START_YEAR = 2023;

    function getYearsOfExperience() {
        return new Date().getFullYear() - CAREER_START_YEAR;
    }

    function formatYearsFr(years) {
        if (years <= 0) return 'moins d\'un an';
        if (years === 1) return '1 an';
        return `${years} ans`;
    }

    function initExperienceYears() {
        const years = getYearsOfExperience();
        const label = formatYearsFr(years);

        document.querySelectorAll('[data-exp-years]').forEach((el) => {
            el.textContent = label;
        });

        const heroExp = document.querySelector('[data-exp-hero]');
        if (heroExp) {
            heroExp.textContent = `${label} d'expérience professionnelle`;
        }

        const badge = document.querySelector('[data-exp-badge]');
        if (badge) {
            badge.textContent = `${label} d'expérience · Développement web`;
        }
    }

    initExperienceYears();

    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id], footer[id]');

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    navAnchors.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Active nav link on scroll
    const observerOptions = { rootMargin: '-40% 0px -55% 0px' };

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));

    // Scroll reveal animation
    const revealElements = document.querySelectorAll(
        '.section-header, .projects-featured, .project-card, .about-grid, .skills-group, .timeline-item, .footer-inner'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
})();
