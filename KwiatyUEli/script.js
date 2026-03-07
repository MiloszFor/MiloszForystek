document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // CUSTOM CURSOR
    // =====================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactives = document.querySelectorAll('a, button, .advantage-card, .offer-card, .gallery-item, .step-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.width = '52px';
                cursorRing.style.height = '52px';
                cursorRing.style.borderColor = '#c9a96e';
                cursorRing.style.opacity = '1';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.style.width = '36px';
                cursorRing.style.height = '36px';
                cursorRing.style.borderColor = '#8b9a89';
                cursorRing.style.opacity = '0.6';
            });
        });
    }

    // =====================================================
    // PETAL ANIMATION
    // =====================================================
    const petalsContainer = document.getElementById('petalsContainer');

    if (petalsContainer) {
        const petalColors = [
            'rgba(245, 182, 193, 0.8)',  // różowy
            'rgba(255, 218, 225, 0.7)',  // jasnoróżowy
            'rgba(201, 169, 110, 0.5)',  // złoty
            'rgba(184, 201, 182, 0.6)',  // zielony szałwiowy
            'rgba(255, 255, 255, 0.5)',  // biały
        ];

        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            const size = Math.random() * 10 + 8;        // 8–18px
            const left = Math.random() * 100;           // % od lewej
            const duration = Math.random() * 8 + 7;    // 7–15s
            const delay = Math.random() * 10;           // 0–10s opóźnienie
            const color = petalColors[Math.floor(Math.random() * petalColors.length)];
            const rotation = Math.random() * 60 - 30;  // -30 do +30 stopni

            petal.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                background: ${color};
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                transform: rotate(${rotation}deg);
                border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
            `;

            petalsContainer.appendChild(petal);

            // Usuń płatek po skończonej animacji
            setTimeout(() => petal.remove(), (duration + delay) * 1000);
        }

        // Generuj płatki co jakiś czas
        for (let i = 0; i < 20; i++) createPetal();
        setInterval(() => createPetal(), 800);
    }

    // =====================================================
    // MOBILE NAVIGATION TOGGLE
    // =====================================================
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // =====================================================
    // STICKY NAVBAR
    // =====================================================
    const header = document.querySelector('.header');
    if (window.scrollY > 50) header.classList.add('scrolled');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // =====================================================
    // BACK TO TOP
    // =====================================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =====================================================
    // SCROLL ANIMATION (Intersection Observer)
    // =====================================================
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    fadeElements.forEach(el => appearOnScroll.observe(el));

    // =====================================================
    // ANIMATED COUNTERS
    // =====================================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { start = target; clearInterval(timer); }
            element.textContent = Math.floor(start).toLocaleString('pl-PL');
        }, 16);
    }

    const statsBar = document.querySelector('.stats-bar');
    let countersStarted = false;

    if (statsBar) {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    document.querySelectorAll('.stat-number').forEach(el => {
                        animateCounter(el, parseInt(el.getAttribute('data-target')), 2200);
                    });
                }
            });
        }, { threshold: 0.5 }).observe(statsBar);
    }

    // =====================================================
    // SEASONAL FLOWER CYCLE
    // =====================================================
    const flowers = [
        { name: 'Piwonia', img: 'assets/images/bouquet_peonies.png' },
        { name: 'Czerwona Róża', img: 'assets/images/bouquet_roses.png' },
        { name: 'Ślubna Wiązanka', img: 'assets/images/wedding_bouquet.png' },
    ];

    const flowerNameEl = document.getElementById('flowerName');
    const flowerImgEl = document.getElementById('seasonalFlowerImg');

    if (flowerNameEl && flowerImgEl) {
        let current = 0;
        flowerImgEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        flowerNameEl.style.transition = 'opacity 0.6s ease';

        setInterval(() => {
            current = (current + 1) % flowers.length;
            flowerImgEl.style.opacity = '0';
            flowerImgEl.style.transform = 'scale(0.92)';
            flowerNameEl.style.opacity = '0';

            setTimeout(() => {
                flowerImgEl.src = flowers[current].img;
                flowerNameEl.textContent = flowers[current].name;
                setTimeout(() => {
                    flowerImgEl.style.opacity = '1';
                    flowerImgEl.style.transform = 'scale(1)';
                    flowerNameEl.style.opacity = '1';
                }, 80);
            }, 500);
        }, 5000);
    }

    // =====================================================
    // PARALLAX HERO (subtle)
    // =====================================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight) {
                hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.3}px)`;
            }
        }, { passive: true });
    }

    // =====================================================
    // MODAL SYSTEM
    // =====================================================
    let activeModal = null;

    function openModal(id) {
        const overlay = document.getElementById(id);
        if (!overlay) return;
        activeModal = overlay;
        overlay.classList.add('is-open');
        document.body.classList.add('modal-open');

        // Przesuń fokus na panel dla dostępności
        const panel = overlay.querySelector('.modal-panel');
        if (panel) {
            panel.setAttribute('tabindex', '-1');
            panel.focus();
        }
    }

    function closeModal(overlay) {
        if (!overlay) return;
        overlay.classList.remove('is-open');
        document.body.classList.remove('modal-open');
        activeModal = null;
    }

    // Otwieranie — przyciski "Dowiedz się więcej"
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(btn.getAttribute('data-modal'));
        });
    });

    // Zamykanie — przycisk × wewnątrz modalu
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal-overlay'));
        });
    });

    // Zamykanie — kliknięcie w tło overlay (nie panel)
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    // Zamykanie — linki "Napisz do nas" / "Zapytaj o termin"
    document.querySelectorAll('.modal-close-link').forEach(link => {
        link.addEventListener('click', () => {
            closeModal(link.closest('.modal-overlay'));
        });
    });

    // Zamykanie — klawisz Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    });

});
