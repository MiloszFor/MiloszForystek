document.addEventListener('DOMContentLoaded', () => {
    /* -----------------------------------
       1. Custom Cursor
       ----------------------------------- */
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorBlur.style.left = e.clientX + 'px';
        cursorBlur.style.top = e.clientY + 'px';
    });

    // Hover effect for interactive elements
    const linksAndButtons = document.querySelectorAll('a, button, .card, select, input');
    linksAndButtons.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--accent-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--accent-color)';
            cursor.style.border = 'none';
        });
    });

    /* -----------------------------------
       2. Hero Animations
       ----------------------------------- */
    document.querySelector('.hero').classList.add('active');

    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 100);

    /* -----------------------------------
       2.5. Floating Particles
       ----------------------------------- */
    const particlesContainer = document.getElementById('particlesContainer');
    if (particlesContainer) {
        function createParticles() {
            const particleCount = window.innerWidth < 768 ? 20 : 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');

                // Random properties
                const size = Math.random() * 3 + 1; // 1px to 4px
                const posX = Math.random() * 100; // 0% to 100% width
                const delay = Math.random() * 8; // 0s to 8s
                const duration = Math.random() * 5 + 5; // 5s to 10s

                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;

                particlesContainer.appendChild(particle);
            }
        }
        createParticles();
    }

    /* -----------------------------------
       3. Navbar Scroll Effect
       ----------------------------------- */

    /* -----------------------------------
       3. Navbar Scroll Effect
       ----------------------------------- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // keep dark navbar always
            // Changed: keeping scrolled class ensures background visibility upon scroll if we want transparent initially:
            if (window.scrollY < 10) navbar.classList.remove('scrolled');
        }
    });

    /* -----------------------------------
       3.5. Mobile Hamburger Menu
       ----------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* -----------------------------------
       4. Reveal on Scroll (Intersection Observer)
       ----------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If the element contains numbers that need animating
                if (entry.target.classList.contains('visual-content') || entry.target.classList.contains('container')) {
                    animateNumbers(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* -----------------------------------
       5. Number Counter Animation
       ----------------------------------- */
    let sectionsAnimated = new Set();

    function animateNumbers(container) {
        if (!container || sectionsAnimated.has(container)) return;
        sectionsAnimated.add(container);

        const statItems = container.querySelectorAll('.number');
        if (statItems.length === 0) return;

        statItems.forEach(item => {
            const targetStr = item.getAttribute('data-target');
            // extract number part
            const isTargetWithText = isNaN(targetStr);
            const targetNum = parseInt(targetStr.replace(/[^0-9]/g, ''));
            const extraStr = targetStr.replace(/[0-9]/g, '');

            if (isNaN(targetNum)) {
                item.innerText = targetStr; // If not a number, just set it
                return;
            }

            let current = 0;
            const increment = targetNum / 50; // Speed adjustment

            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                    item.innerText = targetNum + extraStr;
                    clearInterval(timer);
                } else {
                    item.innerText = Math.ceil(current) + extraStr;
                }
            }, 30);
        });
    }

    /* -----------------------------------
       6. Tilt Effect for Cards
       ----------------------------------- */
    const tiltContainers = document.querySelectorAll('.hover-tilt');

    tiltContainers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = (y - centerY) / 20;
            const tiltY = (centerX - x) / 20;

            container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});
