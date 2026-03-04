document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor Logic ---
    const customCursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('cursor-glow');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Move cursor dot
            customCursor.style.left = x + 'px';
            customCursor.style.top = y + 'px';

            // Move glow follower with slight delay using CSS transforms inside requestAnimationFrame for performance
            requestAnimationFrame(() => {
                cursorGlow.style.left = x + 'px';
                cursorGlow.style.top = y + 'px';
            });
        });

        // Add hover effect to links and buttons
        const hoverElements = document.querySelectorAll('a, button, input, textarea');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('link-hover'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('link-hover'));
        });
    }

    // --- Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');
    const textsToType = [
        "Backend API w C#",
        "Aplikacje Blazor Web",
        "Nowoczesne Strony WWW",
        "Systemy WPF"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = textsToType[textIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 70;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 1500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
            typeSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingTextElement) {
        setTimeout(typeEffect, 1000); // Start after 1s
    }

    // --- 3D Hover Tilt Effect ---
    const tiltElements = document.querySelectorAll('.hover-tilt');

    if (window.innerWidth > 768) {
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position widthin the element

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate rotation (max rotation is 10 degrees)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                this.style.transition = 'none';
            });

            el.addEventListener('mouseleave', function () {
                this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });
    }

    // --- Navbar & Scroll Progress Effect ---
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Navbar Scrolled Class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Calculation
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileBtn) mobileBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Code Particles Animation ---
    const particlesContainer = document.getElementById('particles-container');
    const symbols = [
        'public async Task<IActionResult>',
        'var user = await _db.GetAsync();',
        'services.AddControllers();',
        'SELECT * FROM Table;',
        '<div class="container"></div>',
        'document.getElementById("app");',
        'Console.WriteLine("Hello C#");',
        'return Ok(data);',
        'Entity Framework Core',
        '{ get; set; }'
    ];
    const maxParticles = window.innerWidth < 768 ? 10 : 25;

    function createParticle() {
        if (!particlesContainer || particlesContainer.children.length >= maxParticles) return;
        const particle = document.createElement('div');
        particle.classList.add('code-symbol');
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = Math.random() * 100 + 'vw';

        const duration = Math.random() * 15 + 10; // 10s to 25s
        particle.style.animationDuration = duration + 's';
        particle.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';

        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
    }

    for (let i = 0; i < maxParticles / 2; i++) {
        setTimeout(createParticle, Math.random() * 3000);
    }
    setInterval(createParticle, 2000);

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn-nav)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
