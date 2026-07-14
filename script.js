// Professional Data Analyst Portfolio - Vanilla JS Engine v7.0
document.addEventListener('DOMContentLoaded', () => {

    // 1. Inject Lightweight Scroll Reveal Styles dynamically to keep stylesheet pristine
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .reveal-on-scroll, section, .bento-item, .project-card, .repo-card-lite {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }
        .reveal-on-scroll.revealed, section.revealed, .bento-item.revealed, .project-card.revealed, .repo-card-lite.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
            .reveal-on-scroll, section, .bento-item, .project-card, .repo-card-lite {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
            }
        }
        .copied-floating-badge {
            position: fixed;
            background: var(--accent);
            color: #000000;
            padding: 0.3rem 0.7rem;
            border-radius: 6px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 700;
            z-index: 99999;
            pointer-events: none;
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // 1.5. Trailing Mouse Cursor Glow Background
    const glow = document.getElementById('cursor-glow');
    if (glow) {
        let mx = window.innerWidth / 2, my = window.innerHeight / 2, gx = mx, gy = my;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        function animGlow() {
            gx += (mx - gx) * 0.06; gy += (my - gy) * 0.06;
            glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
            requestAnimationFrame(animGlow);
        }
        animGlow();
    }

    // 2. High-Performance Scroll Reveals using standard IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-on-scroll, section, .bento-item, .project-card, .repo-card-lite');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Unobserve element once revealed to conserve memory
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -10px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers: show all elements instantly
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // 3. Navigation Scroll Shrinker State
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 4. Mobile Menu Navigation Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navContainer = document.getElementById('navContainer');
    
    if (mobileMenuBtn && navContainer) {
        const menuIcon = mobileMenuBtn.querySelector('i');
        
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navContainer.classList.toggle('active');
            
            if (navContainer.classList.contains('active')) {
                menuIcon.className = 'fa-solid fa-xmark';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                menuIcon.className = 'fa-solid fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile nav when clicking anchor links
        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                menuIcon.className = 'fa-solid fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile nav when clicking outside navbar bounds
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navContainer.classList.remove('active');
                menuIcon.className = 'fa-solid fa-bars';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 5. Interactive Project Filters (Vanilla JS Show/Hide) - now supports Python filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Determine matches
                const showCard = (filterValue === 'all') || 
                                 (filterValue === 'pbi' && card.classList.contains('filter-pbi')) || 
                                 (filterValue === 'tab' && card.classList.contains('filter-tab')) ||
                                 (filterValue === 'py' && card.classList.contains('filter-py'));
                
                if (showCard) {
                    card.style.display = 'flex';
                    // Quick async fade-in trigger for vanilla smooth entry
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    card.style.display = 'none';
                }
            });
        });
    });

    // 6. Recruiter Clipboard Telemetry Copier
    const clipboardBtns = document.querySelectorAll('.hud-copy-btn');
    
    clipboardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            const originalHTML = btn.innerHTML;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                btn.classList.add('copied');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> COPIED!';
                
                // Show floating text indicator
                const rect = btn.getBoundingClientRect();
                const floatingTip = document.createElement('div');
                floatingTip.className = 'copied-floating-badge';
                floatingTip.innerText = 'Copied to Clipboard!';
                floatingTip.style.left = `${rect.left + rect.width / 2}px`;
                floatingTip.style.top = `${rect.top - 15}px`;
                floatingTip.style.transform = 'translate(-50%, -50%)';
                document.body.appendChild(floatingTip);
                
                // Animate floating tip
                setTimeout(() => {
                    floatingTip.style.opacity = '0';
                    floatingTip.style.transform = 'translate(-50%, -30px)';
                    setTimeout(() => floatingTip.remove(), 500);
                }, 800);
                
                // Reset button text
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy keywords: ', err);
            });
        });
    });

    // 7. Accessible Professional Contact Form Transmitter
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const collaborationPackInput = document.getElementById('collaborationPackInput');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Map clean HTML inputs to backward-compatible API payload parameters
            const selectedPack = collaborationPackInput ? collaborationPackInput.value : "General Inquiry";
            const nameVal = document.getElementById('name').value;
            const emailVal = document.getElementById('email').value;
            const messageVal = document.getElementById('message').value;
            
            const submitBtn = contactForm.querySelector('#submit-btn');
            const originalBtnHTML = submitBtn.innerHTML;
            
            // Configure mailto offline fallback link
            const mailtoLink = `mailto:abhyudayasinha04@gmail.com?subject=Contact Inquiry: ${selectedPack} from ${nameVal}&body=Name: ${nameVal}%0D%0AEmail: ${emailVal}%0D%0A%0D%0AMessage:%0D%0A${messageVal}`;
            
            // Display standard professional sending status
            formStatus.style.display = 'flex';
            formStatus.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...';
            formStatus.className = 'form-status transmitting';
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> SENDING...';
            
            try {
                // Initialize EmailJS with Public Key
                emailjs.init('0radgAcsuvaKv3pPc');
                
                // Transmit form data client-side using EmailJS
                await emailjs.send('service_q2lh3yp', 'template_jjntvbt', {
                    from_name: nameVal,
                    reply_to: emailVal,
                    message: messageVal,
                    to_name: 'Abhyudaya',
                    collaboration_pack: selectedPack
                });
                
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! Thank you for connecting.';
                formStatus.className = 'form-status success';
                
                setTimeout(() => {
                    contactForm.reset();
                    formStatus.style.display = 'none';
                }, 4000);
            } catch (error) {
                console.warn("API Transmission failed, executing client mailto fallback:", error);
                
                formStatus.innerHTML = '<i class="fa-solid fa-envelope-open-text"></i> Opening your email client to send message...';
                formStatus.className = 'form-status success';
                
                setTimeout(() => {
                    window.location.href = mailtoLink;
                    contactForm.reset();
                    formStatus.style.display = 'none';
                }, 1500);
            } finally {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }, 1500);
            }
        });
    }

    // 8. [NEW] Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 9. [NEW] Scroll-Spy Active Navigation Highlighting
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('nav-active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('nav-active');
                        }
                    });
                }
            });
        }, {
            root: null,
            threshold: 0.3,
            rootMargin: '-10% 0px -50% 0px'
        });

        sections.forEach(section => navObserver.observe(section));
    }

    // 10. [NEW] Animated Counter Numbers in Hero Stats
    const counterSpans = document.querySelectorAll('.hst-n[data-target]');
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counterSpans.forEach(span => {
            const target = parseInt(span.getAttribute('data-target'), 10);
            const suffix = span.getAttribute('data-suffix') || '';
            const duration = 1200; // ms
            const startTime = performance.now();

            // Special formatting for 1000 → "1K"
            const isKilo = target >= 1000;

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                if (isKilo) {
                    span.innerHTML = `${(current / 1000).toFixed(current < 1000 ? 1 : 0)}K<span>${suffix}</span>`;
                } else {
                    span.innerHTML = `${current}<span>${suffix}</span>`;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    // Trigger counters when hero stats section enters view
    const heroStats = document.querySelector('.h-stats');
    if (heroStats && counterSpans.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(heroStats);
    }

    // 11. [NEW] GitHub Stats Widget Error Fallback
    document.querySelectorAll('.stats-svg').forEach(img => {
        img.addEventListener('error', () => {
            img.outerHTML = `<div class="github-stats-fallback" style="border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem 2rem; min-width: 200px; text-align: center; background: rgba(255,255,255,0.01);">
                <i class="fab fa-github" style="font-size: 1.5rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem;"></i>
                <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">GitHub stats loading...</span>
            </div>`;
        });
    });

});
