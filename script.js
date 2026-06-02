// Professional Data Analyst Portfolio - Vanilla JS Engine
document.addEventListener('DOMContentLoaded', () => {

    // 1. Inject Lightweight Scroll Reveal Styles dynamically to keep stylesheet pristine
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .reveal-on-scroll, section, .bento-item, .project-card, .repo-card-lite {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }
        .reveal-on-scroll.revealed, section.revealed, .bento-item.revealed, .project-card.revealed, .repo-card-lite.revealed {
            opacity: 1;
            transform: translateY(0);
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

    // 5. Interactive Project Filters (Vanilla JS Show/Hide)
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
                                 (filterValue === 'tab' && card.classList.contains('filter-tab'));
                
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
                const response = await fetch('/api/booking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pilotName: nameVal,
                        pilotEmail: emailVal,
                        collaborationPack: selectedPack,
                        pilotMessage: messageVal
                    })
                });
                
                const data = await response.json();
                
                if (response.ok && data.success) {
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! Thank you for connecting.';
                    formStatus.className = 'form-status success';
                    
                    setTimeout(() => {
                        contactForm.reset();
                        formStatus.style.display = 'none';
                    }, 4000);
                } else {
                    throw new Error(data.error || 'API response failed.');
                }
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
});
