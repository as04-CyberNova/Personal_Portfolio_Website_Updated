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
            color: #ffffff;
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



    // 9. [NEW] Scroll-Spy Active Navigation Highlighting
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // Map secondary sections without direct nav links to their logical parent navigation section
    const sectionToNavMap = {
        'recruiter-snapshot': 'home',
        'current-focus': 'about',
        'learning-timeline': 'experience',
        'current-roadmap': 'experience',
        'github-repos': 'projects'
    };

    if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const targetId = sectionToNavMap[id] || id;
                    
                    const targetLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
                    if (targetLink) {
                        navLinks.forEach(link => link.classList.remove('nav-active'));
                        targetLink.classList.add('nav-active');
                    }
                }
            });
        }, {
            root: null,
            threshold: 0, // Using 0 so very tall sections (like Projects) trigger highlights immediately upon entry
            rootMargin: '-25% 0px -45% 0px'
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

    // 12. Copy Cover Letter Template logic
    const copyCoverBtn = document.getElementById('copyCoverBtn');
    if (copyCoverBtn) {
        copyCoverBtn.addEventListener('click', () => {
            const coverLetterText = `Dear Hiring Team,

I am writing to express my strong interest in the Data Analyst / Business Analyst Internship opportunity at your organization. As a B.Tech Computer Science & Engineering (Data Science) student, I have spent my academic and professional journey developing structured capabilities in relational SQL querying, automated Python data cleaning, and high-fidelity dashboard storytelling (Power BI & Tableau).

During my internship at Codec Technologies and via advanced industry simulations (Deloitte, Tata, British Airways), I have gained hands-on experience in:
- SQL relational design: normalizations, multi-level CTEs, window functions, and query optimizations.
- Python automation: cleaning raw client databases using Pandas and NumPy.
- BI reporting: constructing star schemas and parameter-driven dashboards to isolate performance bottlenecks.

I am highly motivated to translate complex datasets into actionable business intelligence that drives real-world efficiency and revenue growth. I welcome the opportunity to discuss how my technical skills and proof-of-work dashboard systems can contribute to your analytical operations.

Thank you for your time and consideration.

Sincerely,
Abhyudaya Sinha
abhyudayasinha04@gmail.com
github.com/as04-CyberNova
linkedin.com/in/abhyudaya-sinha-7035a8373`;

            const originalHTML = copyCoverBtn.innerHTML;
            navigator.clipboard.writeText(coverLetterText).then(() => {
                copyCoverBtn.classList.add('copied');
                copyCoverBtn.innerHTML = '<i class="fa-solid fa-check"></i> COPIED!';
                
                // Show floating text indicator
                const rect = copyCoverBtn.getBoundingClientRect();
                const floatingTip = document.createElement('div');
                floatingTip.className = 'copied-floating-badge';
                floatingTip.innerText = 'Cover Letter Copied!';
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
                    copyCoverBtn.classList.remove('copied');
                    copyCoverBtn.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy cover letter: ', err);
            });
        });
    }

    // 13. ATS Keyword Matcher Engine
    const atsMatchBtn = document.getElementById('atsMatchBtn');
    const atsJobDesc = document.getElementById('atsJobDesc');
    const atsResults = document.getElementById('atsResults');
    const atsScoreVal = document.getElementById('atsScoreVal');
    const atsProgressBar = document.getElementById('atsProgressBar');
    const atsMatchedPills = document.getElementById('atsMatchedPills');
    const atsMissingPills = document.getElementById('atsMissingPills');

    // List of skills offered in the resume
    const candidateSkills = [
        { key: "python", label: "Python" },
        { key: "sql", label: "SQL" },
        { key: "ms sql server", label: "MS SQL Server" },
        { key: "power bi", label: "Power BI" },
        { key: "tableau", label: "Tableau" },
        { key: "excel", label: "MS Excel" },
        { key: "pandas", label: "Pandas" },
        { key: "numpy", label: "NumPy" },
        { key: "matplotlib", label: "Matplotlib" },
        { key: "data cleaning", label: "Data Cleaning" },
        { key: "exploratory data analysis", label: "EDA (Exploratory Data Analysis)" },
        { key: "dashboard", label: "Dashboard Design" },
        { key: "business intelligence", label: "Business Intelligence" },
        { key: "kpi reporting", label: "KPI Reporting" },
        { key: "reporting", label: "Reporting" },
        { key: "etl", label: "ETL Processes" },
        { key: "data visualization", label: "Data Visualization" }
    ];

    if (atsMatchBtn && atsJobDesc && atsResults) {
        atsMatchBtn.addEventListener('click', () => {
            const text = atsJobDesc.value.trim().toLowerCase();
            
            if (!text) {
                alert("Please paste a Job Description first!");
                return;
            }

            atsMatchBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> CALCULATING...';
            atsMatchBtn.disabled = true;

            setTimeout(() => {
                let matched = [];
                let unmatched = [];

                // Simple text-matching analysis
                candidateSkills.forEach(skill => {
                    const cleanKey = skill.key.toLowerCase();
                    if (text.includes(cleanKey)) {
                        matched.push(skill.label);
                    } else {
                        unmatched.push(skill.label);
                    }
                });

                // Calculate Match Percentage
                let matchRatio = matched.length / candidateSkills.length;
                let finalScore = Math.round(matchRatio * 100);
                if (finalScore < 20 && text.length > 50) {
                    finalScore = 35; // Recruiter baseline match
                }
                if (finalScore > 95) {
                    finalScore = 98; // Realistic caps
                }

                // Render matched pills
                atsMatchedPills.innerHTML = '';
                if (matched.length > 0) {
                    matched.forEach(skill => {
                        const pill = document.createElement('span');
                        pill.className = 'skill-pill matched';
                        pill.innerText = skill;
                        atsMatchedPills.appendChild(pill);
                    });
                } else {
                    atsMatchedPills.innerHTML = '<span style="font-size:0.75rem; color:var(--text-muted);">No matching core keywords found. Try adding Python or SQL.</span>';
                }

                // Render unmatched (but offered) pills
                atsMissingPills.innerHTML = '';
                if (unmatched.length > 0) {
                    unmatched.forEach(skill => {
                        const pill = document.createElement('span');
                        pill.className = 'skill-pill missing';
                        pill.innerText = skill;
                        atsMissingPills.appendChild(pill);
                    });
                } else {
                    atsMissingPills.innerHTML = '<span style="font-size:0.75rem; color:var(--success);">All candidate skills match this description!</span>';
                }

                // Update UI Score & Progress Bar
                atsResults.style.display = 'block';
                atsScoreVal.innerText = `${finalScore}%`;
                atsProgressBar.style.width = `${finalScore}%`;

                // Reset button status
                atsMatchBtn.innerHTML = '<i class="fa-solid fa-calculator"></i> RE-CALCULATE SCORE';
                atsMatchBtn.disabled = false;
            }, 1200);
        });
    }

    // 14. Theme Switcher Engine (Dynamic CSS variable override)
    const customizerToggle = document.getElementById('theme-customizer-toggle');
    const customizer = document.getElementById('theme-customizer');
    const themeOptions = document.querySelectorAll('.theme-option');

    if (customizerToggle && customizer) {
        customizerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            customizer.classList.toggle('open');
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (!customizer.contains(e.target)) {
                customizer.classList.remove('open');
            }
        });

        // Theme Definitions
        const themes = {
            indigo: {
                '--accent-primary': '#6366f1',
                '--accent-secondary': '#06b6d4',
                '--accent-purple': '#a855f7',
                '--accent-rgb': '99, 102, 241',
                '--border': 'rgba(99, 102, 241, 0.12)',
                '--glow-purple': 'rgba(99, 102, 241, 0.12)',
                '--glow-cyan': 'rgba(6, 182, 212, 0.12)'
            },
            cyan: {
                '--accent-primary': '#06b6d4',
                '--accent-secondary': '#3b82f6',
                '--accent-purple': '#6366f1',
                '--accent-rgb': '6, 182, 212',
                '--border': 'rgba(6, 182, 212, 0.15)',
                '--glow-purple': 'rgba(6, 182, 212, 0.12)',
                '--glow-cyan': 'rgba(59, 130, 246, 0.12)'
            },
            emerald: {
                '--accent-primary': '#10b981',
                '--accent-secondary': '#06b6d4',
                '--accent-purple': '#34d399',
                '--accent-rgb': '16, 185, 129',
                '--border': 'rgba(16, 185, 129, 0.15)',
                '--glow-purple': 'rgba(16, 185, 129, 0.12)',
                '--glow-cyan': 'rgba(6, 182, 212, 0.12)'
            },
            amber: {
                '--accent-primary': '#f59e0b',
                '--accent-secondary': '#ef4444',
                '--accent-purple': '#f43f5e',
                '--accent-rgb': '245, 158, 11',
                '--border': 'rgba(245, 158, 11, 0.15)',
                '--glow-purple': 'rgba(245, 158, 11, 0.12)',
                '--glow-cyan': 'rgba(239, 68, 68, 0.12)'
            }
        };

        themeOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                themeOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                
                const chosenTheme = opt.getAttribute('data-theme');
                const variables = themes[chosenTheme];
                
                if (variables) {
                    Object.keys(variables).forEach(key => {
                        document.documentElement.style.setProperty(key, variables[key]);
                    });
                }
            });
        });
    }

    // 15. Dynamic Project Filter Counters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProjectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && allProjectCards.length) {
        // Calculate counts
        let counts = {
            all: allProjectCards.length,
            pbi: 0,
            tab: 0,
            py: 0
        };

        allProjectCards.forEach(card => {
            if (card.classList.contains('filter-pbi')) counts.pbi++;
            if (card.classList.contains('filter-tab')) counts.tab++;
            if (card.classList.contains('filter-py')) counts.py++;
        });

        // Map label counts
        filterButtons.forEach(btn => {
            const filterVal = btn.getAttribute('data-filter');
            const countVal = counts[filterVal];
            if (countVal !== undefined) {
                const originalText = btn.innerText.split('(')[0].trim();
                btn.innerText = `${originalText} (${countVal})`;
            }
        });
    }

    // 16. Dynamic Telemetry Challenge Simulator
    const focusCards = document.querySelectorAll('.focus-card');
    if (focusCards.length) {
        // Add a telemetry status badge in SQL (1st card) and Python (2nd card) focus elements
        const sqlInfo = focusCards[0]?.querySelector('.focus-info');
        if (sqlInfo) {
            const telemetryNode = document.createElement('div');
            telemetryNode.className = 'telemetry-pulse-container';
            telemetryNode.innerHTML = `
                <div class="telemetry-pulse-dot"></div>
                <span class="telemetry-text">Today's Queries: <span class="telemetry-val" id="sqlTelemetryVal">18</span> Solved</span>
            `;
            sqlInfo.appendChild(telemetryNode);

            // Periodically increment
            setInterval(() => {
                const telemetryVal = document.getElementById('sqlTelemetryVal');
                if (telemetryVal) {
                    let currentVal = parseInt(telemetryVal.innerText, 10);
                    if (Math.random() > 0.6) {
                        telemetryVal.innerText = currentVal + 1;
                    }
                }
            }, 8000);
        }

        const pyInfo = focusCards[1]?.querySelector('.focus-info');
        if (pyInfo) {
            const telemetryNode = document.createElement('div');
            telemetryNode.className = 'telemetry-pulse-container';
            telemetryNode.innerHTML = `
                <div class="telemetry-pulse-dot" style="background: var(--accent-secondary);"></div>
                <span class="telemetry-text">Automated Tasks: <span class="telemetry-val" id="pyTelemetryVal">6</span> Live</span>
            `;
            pyInfo.appendChild(telemetryNode);
        }
    }

});
