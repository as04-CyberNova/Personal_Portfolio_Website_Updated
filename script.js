// Cinematic High-Performance Kawaii-Luxe Portfolio Engine 2026
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        lerp: 0.1, 
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.15,
        smoothTouch: false, 
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. GSAP ScrollTrigger Registration
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    // 4. Cinematic Section Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-on-scroll, section, .bento-item, .project-card, .repo-card-lite');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 40,
                filter: 'blur(5px)'
            }, 
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // 5. Cursor Spotlight Glow Tracking
    const cursorGlow = document.getElementById('cursorGlow');
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        gsap.to(cursorGlow, {
            left: clientX,
            top: clientY,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // 6. Magnetic Buttons & Badges
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .control-btn, .theme-opt, .preset-btn, .hud-copy-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            gsap.to(btn, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1.1, 0.4)'
            });
        });
    });

    // 7. Cockpit Theme Configurator Switcher
    const themeOpts = document.querySelectorAll('.theme-opt');
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('abhyudaya-portfolio-theme') || 'acid';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeOpts.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    themeOpts.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-theme');
            
            // Apply theme on html element
            document.documentElement.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('abhyudaya-portfolio-theme', selectedTheme);
            
            // Toggle active styling
            themeOpts.forEach(opt => opt.classList.remove('active'));
            btn.classList.add('active');

            // Visual feedback transition indicator on canvas mesh
            gsap.fromTo('#neuralCanvas', { opacity: 0.05 }, { opacity: 0.25, duration: 0.8 });
        });
    });

    // 8. Dashboard SVG Speedometers Scroll Animation
    const speedoFills = document.querySelectorAll('.dial-fill');
    
    speedoFills.forEach(fill => {
        const targetPercent = parseInt(fill.getAttribute('data-pct'));
        const circumference = 251.2; // 2 * Math.PI * 40
        
        // Start completely empty (dashoffset = circumference)
        fill.style.strokeDashoffset = circumference;
        
        ScrollTrigger.create({
            trigger: fill,
            start: 'top 85%',
            onEnter: () => {
                const targetOffset = circumference - (targetPercent / 100) * circumference;
                gsap.to(fill, {
                    strokeDashoffset: targetOffset,
                    duration: 1.8,
                    ease: 'power3.out'
                });
            }
        });
    });

    // 9. Interactive Fleet Filters (Projects Show/Hide)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from other btns
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    gsap.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.5, display: 'flex', ease: 'power2.out' });
                } else if (filterValue === 'pbi' && card.classList.contains('filter-pbi')) {
                    gsap.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.5, display: 'flex', ease: 'power2.out' });
                } else if (filterValue === 'tab' && card.classList.contains('filter-tab')) {
                    gsap.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.5, display: 'flex', ease: 'power2.out' });
                } else {
                    gsap.to(card, { opacity: 0, scale: 0.9, y: 15, duration: 0.4, display: 'none', ease: 'power2.out' });
                }
            });
            // Let ScrollTrigger refresh layouts
            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
    });

    // 10. Recruiter Clipboard Copiers
    const clipboardBtns = document.querySelectorAll('.hud-copy-btn');
    
    clipboardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            const originalHTML = btn.innerHTML;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                btn.classList.add('copied');
                btn.innerHTML = '<i class="fa-solid fa-square-check"></i> COPIED! 🏎️💨';
                
                // Show floating text indicator using GSAP
                const rect = btn.getBoundingClientRect();
                const floatingTip = document.createElement('div');
                floatingTip.className = 'copied-floating-badge';
                floatingTip.innerText = 'Telemetry Copied!';
                floatingTip.style.position = 'fixed';
                floatingTip.style.left = `${rect.left + rect.width/2}px`;
                floatingTip.style.top = `${rect.top - 15}px`;
                floatingTip.style.transform = 'translate(-50%, -50%)';
                floatingTip.style.background = 'var(--accent)';
                floatingTip.style.color = '#000';
                floatingTip.style.padding = '0.3rem 0.7rem';
                floatingTip.style.borderRadius = '6px';
                floatingTip.style.fontFamily = 'var(--font-mono)';
                floatingTip.style.fontSize = '0.6rem';
                floatingTip.style.fontWeight = '700';
                floatingTip.style.zIndex = '99999';
                document.body.appendChild(floatingTip);
                
                gsap.to(floatingTip, {
                    y: -25,
                    opacity: 0,
                    duration: 0.9,
                    onComplete: () => floatingTip.remove()
                });
                
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy details: ', err);
            });
        });
    });

    // 11. CSS Cat Floating Helper: Sparky 🌸 Chatbot Interactions (Conversational Engine)
    const sparkyAvatar = document.getElementById('sparkyAvatar');
    const sparkyChatBubble = document.getElementById('sparkyChatBubble');
    const closeSparkyChat = document.getElementById('closeSparkyChat');
    const presetsArea = document.getElementById('chatPresets');
    const chatHistory = document.getElementById('chatHistory');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    if (sparkyAvatar && sparkyChatBubble) {
        sparkyAvatar.addEventListener('click', () => {
            sparkyChatBubble.classList.toggle('active');
            
            // Fade-in chatbot notifications
            if (sparkyChatBubble.classList.contains('active')) {
                const dot = sparkyAvatar.querySelector('.sparky-notification-dot');
                if (dot) dot.remove(); // Remove blinking ping once recruiter engages
                gsap.fromTo(sparkyChatBubble, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
                setTimeout(scrollChat, 100);
            }
        });
    }

    if (closeSparkyChat) {
        closeSparkyChat.addEventListener('click', (e) => {
            e.stopPropagation();
            sparkyChatBubble.classList.remove('active');
        });
    }

    // Scroll Chat History window to the bottom
    function scrollChat() {
        if (chatHistory) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }

    // Intelligently map responses based on custom query keywords
    function getSparkyResponse(query) {
        const cleaned = query.toLowerCase().trim();
        
        // Conversational Keywords Routing
        if (cleaned.includes('internship') || cleaned.includes('intern') || cleaned.includes('hire') || cleaned.includes('available') || cleaned.includes('looking for job')) {
            return "Yes! 🚀 Abhyudaya is actively seeking a Data Scientist / Data Analyst internship starting Summer/Fall 2026! He has high-performance analytical engines ready to load, filter, and model data. Mew! 🌸";
        }
        
        if (cleaned.includes('python') || cleaned.includes('pandas') || cleaned.includes('numpy') || cleaned.includes('scikit') || cleaned.includes('machine learning') || cleaned.includes(' ml ')) {
            return "Mew! 🐍 Python is Abhyudaya's primary logic core! He builds predictive models using Pandas, NumPy, and Scikit-Learn pipelines, managing relational cleansing schemas seamlessly. 🧠";
        }
        
        if (cleaned.includes('sql') || cleaned.includes('database') || cleaned.includes('query') || cleaned.includes('queries') || cleaned.includes('relational')) {
            return "Purr... SQL databases are Abhyudaya's core data vaults! He structures complex relational joins, data schemas, and clean query architectures to analyze telemetry metrics efficiently. 💾";
        }
        
        if (cleaned.includes('tableau') || cleaned.includes('power bi') || cleaned.includes(' bi ') || cleaned.includes('excel') || cleaned.includes('visualization') || cleaned.includes('dashboard') || cleaned.includes('dashboards') || cleaned.includes('chart') || cleaned.includes('charts')) {
            // Specific Dashboard Routing
            if (cleaned.includes('hospital') || cleaned.includes('patient')) {
                return "🏥 **Hospital Patient Records Analysis**: Designed in Tableau, this dashboard tracks administrative metrics across 10K+ hospital records. Configured with dynamic triage filters, interactive calculations, and clean data prep in Tableau Prep! Mew! 🌸";
            }
            if (cleaned.includes('pokemon') || cleaned.includes('pocket')) {
                return "👾 **Pokémon Battle Stats**: A stunning widescreen Tableau dashboard comparing dual-axes battle stats, attribute combinations, and search filters for 800+ Pokémon! Mew! 📊";
            }
            if (cleaned.includes('covid') || cleaned.includes('corona')) {
                return "🦠 **COVID-19 Global Telemetry**: Built in Power BI to map infection paths, death metrics, and rolling averages across 100K+ lines of data. Features custom DAX queries and gauges! Purr... 📈";
            }
            if (cleaned.includes('faculty') || cleaned.includes('allocation') || cleaned.includes('staff')) {
                return "🏫 **Faculty & Staff Allocation**: Designed in Power BI to optimize departmental personnel distributions across 5K+ staff lines. High operational impact! Purr... 📈";
            }
            if (cleaned.includes('cookie') || cleaned.includes('sales')) {
                return "🍪 **Global Cookie Sales Tracker**: Built in Tableau to analyze consumer goods regional sales metrics. Utilizes coordinate mapping to trace international profits across 20K+ entries! Purr... 📈";
            }
            if (cleaned.includes('churn') || cleaned.includes('subscriber') || cleaned.includes('telco')) {
                return "📞 **Telco Subscriber Churn Insights**: Engineered in Tableau to evaluate subscriber loss risks across 7K+ subscriber accounts, utilizing cohort analytics. Mew! 📊";
            }
            if (cleaned.includes('netflix') || cleaned.includes('streaming')) {
                return "🍿 **Netflix Content Trends**: Designed in Tableau to analyze geographical distribution, tag word clouds, and release metrics for 8K+ entries! Mew! 📊";
            }
            if (cleaned.includes('ipl') || cleaned.includes('cricket')) {
                return "🏏 **IPL Historical Match Analytics**: Tableau dashboard visualization of Victory forecasting, player metrics, and victory graphs for 15K+ pitch-by-pitch lines! Purr... 🏎️💨";
            }
            
            return "📊 Abhyudaya is a visualization wizard! He builds high-fidelity dashboards in **Tableau** and **Power BI**. Ask me about the **Hospital Records**, **Pokémon Stats**, **COVID-19**, or **Telco Churn** cases! Mew! 🌸";
        }
        
        if (cleaned.includes('hospital') || cleaned.includes('patient')) {
            return "🏥 **Hospital Patient Records Analysis**: Configured in Tableau to track administrative telemetry dynamically across 10K+ hospital files. Optimized with interactive triage filters and calculations! High organizational impact! Mew! 🌸";
        }
        
        if (cleaned.includes('pokemon') || cleaned.includes('pocket')) {
            return "👾 **Pokémon Battle Performance Stats**: A visually spectacular Tableau dashboard analyzing combat variables, type combinations, and telemetry for 800+ Pokémon. Utilizes complex dual-axes graphing! Mew! 📊";
        }
        
        if (cleaned.includes('covid') || cleaned.includes('corona')) {
            return "🦠 **COVID-19 Global Telemetry**: Built in Power BI to map rolling averages, infection ratios, and global death records across 100K+ entries. Utilizes custom DAX query tables! Purr... 📈";
        }
        
        if (cleaned.includes('faculty') || cleaned.includes('allocation') || cleaned.includes('staff')) {
            return "🏫 **Faculty & Staff Allocation Matrix**: Designed in Power BI to optimize departmental staffing variables across 5K+ records. Pure operational telemetry! Mew! 🌸";
        }
        
        if (cleaned.includes('cookie') || cleaned.includes('sales')) {
            return "🍪 **Global Cookie Sales Tracker**: Built in Tableau to analyze consumer goods regional sales metrics. Utilizes coordinate mapping to trace international profits across 20K+ entries! Purr... 📈";
        }
        
        if (cleaned.includes('churn') || cleaned.includes('subscriber') || cleaned.includes('telco')) {
            return "📞 **Telco Customer Churn Insights**: Created in Tableau to evaluate subscriber loss risks across 7K+ subscribers. Synthesizes risk scores using cohort analysis! Mew! 📊";
        }
        
        if (cleaned.includes('netflix') || cleaned.includes('streaming')) {
            return "🍿 **Netflix Content Trends**: Designed in Tableau to analyze geographical distribution, tag word clouds, and release metrics for 8K+ entries! Mew! 📊";
        }
        
        if (cleaned.includes('ipl') || cleaned.includes('cricket')) {
            return "🏏 **IPL Historical Match Analytics**: Tableau dashboard visualization of Victory forecasting, player metrics, and victory graphs for 15K+ pitch-by-pitch lines! Purr... 🏎️💨";
        }

        if (cleaned.includes('project') || cleaned.includes('projects') || cleaned.includes('case study') || cleaned.includes('case studies') || cleaned.includes('fleet') || cleaned.includes('portfolio')) {
            return "Mew! 🏎️ Explore his featured fleets: \n1. **Hospital Patient Records** (Tableau dashboard)\n2. **Pokémon Battle Stats** (Tableau graphing)\n3. **COVID-19 Global Telemetry** (Power BI dashboard)\n4. **Telco Churn** (Tableau evaluation)\nWhich case study should I scan for you? Mew! 🌸";
        }
        
        if (cleaned.includes('github') || cleaned.includes('git') || cleaned.includes('repo') || cleaned.includes('amazon') || cleaned.includes('clone') || cleaned.includes('erp') || cleaned.includes('code')) {
            return "💻 Abhyudaya runs a pristine code engine! His active GitHub repos include Amazon Clones, C Practices, College ERP systems, Student Dashboards, and Spam Classifiers! Check them out at **github.com/as04-CyberNova**! Mew! 🏎️💨";
        }
        
        if (cleaned.includes('skill') || cleaned.includes('skills') || cleaned.includes('instrument') || cleaned.includes('dial') || cleaned.includes('dials') || cleaned.includes('tech') || cleaned.includes('tools')) {
            return "Mew! 📊 Abhyudaya's cockpit instruments are loaded: Python (75%), SQL DB (70%), Tableau (80%), Power BI (75%), Excel (70%), and web dev tools (80%)! Pure analytical speed! Purr... 🏎️💨";
        }
        
        if (cleaned.includes('contact') || cleaned.includes('email') || cleaned.includes('message') || cleaned.includes('reach') || cleaned.includes('linkedin') || cleaned.includes('connect') || cleaned.includes('booking')) {
            return "Mew! 🚀 Schedule a test drive! Email Abhyudaya at **abhyudayasinha04@gmail.com** or send a synaptic impulse on LinkedIn: **linkedin.com/in/abhyudaya-sinha-7035a8373**. You can also use the booking form below! Mew! 🌸";
        }
        
        if (cleaned.includes('resume') || cleaned.includes('cv') || cleaned.includes('pdf')) {
            return "📄 Abhyudaya's ATS-friendly resume is loaded directly in the Recruiter Control Center (the right pane)! You can copy metrics, download his PDF resume, or trigger print layout mode! Mew! 🌸";
        }
        
        if (cleaned.includes('education') || cleaned.includes('university') || cleaned.includes('college') || cleaned.includes('study') || cleaned.includes('academic') || cleaned.includes('displacement')) {
            return "🎓 Abhyudaya is a 20-year-old Data Science specialist. He tunes models to convert massive raw record displacement fields into pristine, predictable logic! Mew! 🧠🌸";
        }
        
        if (cleaned.includes('hello') || cleaned.includes('hi') || cleaned.includes('hey') || cleaned.includes('greeting') || cleaned.includes('welcome') || cleaned.includes('yo')) {
            return "Mew! Hello there! 🌸 I'm Sparky, Abhyudaya's faithful virtual cat copilot! Ask me about his Python ML scripts, SQL databases, Tableau visual dashboards, or how to contact him! Mew! 🏎️💨";
        }
        
        if (cleaned.includes('hobby') || cleaned.includes('hobbies') || cleaned.includes('fun') || cleaned.includes('fact') || cleaned.includes('aero') || cleaned.includes('tuning')) {
            return "Fun fact! 🌸 Abhyudaya views CSS visual tuning as the customized aero-body kit for his backend analytical equations! Everything should look as fast and responsive as a race car! Purr... 🏎️💨";
        }
        
        if (cleaned.includes('who') || cleaned.includes('about') || cleaned.includes('name') || cleaned.includes('age') || cleaned.includes('sinha') || cleaned.includes('abhyudaya')) {
            return "Mew! 🏎️ Abhyudaya Sinha is a 20-year-old Data Scientist and visual architect specializing in structuring massive datasets, running predictive models, and building premium web dashboards. Purr... 🌸";
        }

        // Standard, high-quality fallback queries
        return "Mew... I didn't quite parse that telemetry sensor. 😿 Try asking me about Abhyudaya's **skills**, **projects**, **internships**, **contact details**, or **resume parameters**! Purr... 🌸";
    }

    // Handles user sending typed input or presets
    function handleUserMessage(messageText) {
        if (!messageText.trim()) return;

        // 1. Add User Speech bubble
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'chat-msg user-msg';
        userMsgDiv.innerHTML = `
            <span class="msg-avatar">👤</span>
            <div class="msg-bubble">${escapeHTML(messageText)}</div>
        `;
        chatHistory.appendChild(userMsgDiv);
        scrollChat();

        // 2. Render Thinking/Typing dots
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatHistory.appendChild(typingDiv);
        scrollChat();

        // 3. Trigger simulated response typing delay
        setTimeout(() => {
            // Remove dots
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.remove();

            // Append bot response
            const sparkyReply = getSparkyResponse(messageText);
            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'chat-msg bot-msg';
            botMsgDiv.innerHTML = `
                <span class="msg-avatar">🐱</span>
                <div class="msg-bubble">${formatReplyText(sparkyReply)}</div>
            `;
            chatHistory.appendChild(botMsgDiv);
            scrollChat();
        }, 700);
    }

    // Escape raw HTML strings
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // Format rich text returns
    function formatReplyText(text) {
        // Convert Markdown Bold format (**text**) to HTML strong elements
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert linebreaks to HTML breaks
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    // Hook cockpit chat input key event and submission clicker
    if (sendChatBtn && chatInput) {
        sendChatBtn.addEventListener('click', () => {
            const query = chatInput.value;
            handleUserMessage(query);
            chatInput.value = '';
        });

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = chatInput.value;
                handleUserMessage(query);
                chatInput.value = '';
            }
        });
    }

    // Hook preset button recommendation suggestions
    if (presetsArea) {
        presetsArea.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const queryText = btn.getAttribute('data-query');
                if (queryText) {
                    handleUserMessage(queryText);
                }
            });
        });
    }

    // 12. Tesla/Porsche-Style Booking Form Option Clicks
    const packBtns = document.querySelectorAll('.package-selector-grid .pack-opt-btn');
    const collaborationPackInput = document.getElementById('collaborationPackInput');

    packBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            packBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedPackage = btn.getAttribute('data-pack');
            if (collaborationPackInput) {
                collaborationPackInput.value = selectedPackage;
            }
            
            // Add a little spring bounce trigger
            gsap.fromTo(btn, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
        });
    });

    // 13. Vehicle Booking Form Telemetry Mailto Submit
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedPack = collaborationPackInput ? collaborationPackInput.value : "General Inquiry";
            const pilotName = document.getElementById('pilotName').value;
            const pilotEmail = document.getElementById('pilotEmail').value;
            const pilotMessage = document.getElementById('pilotMessage').value;
            
            const mailtoLink = `mailto:abhyudayasinha04@gmail.com?subject=Mission Booking: ${selectedPack} from ${pilotName}&body=Pilot Name: ${pilotName}%0D%0APilot Email: ${pilotEmail}%0D%0A%0D%0ACollaboration Pack Selected: ${selectedPack}%0D%0A%0D%0AMission Flight Parameters:%0D%0A${pilotMessage}`;
            
            if (formStatus) {
                formStatus.style.display = 'flex';
                formStatus.innerHTML = '<i class="fa-solid fa-satellite-dish animate-pulse"></i> TRANSMITTING FLIGHT DATA // OPENING CLIENT...';
                formStatus.className = 'form-status success';
                
                // Triggers direct location mapping
                window.location.href = mailtoLink;
                
                gsap.fromTo(formStatus, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                
                setTimeout(() => {
                    contactForm.reset();
                    // Re-set active class on the first option
                    packBtns.forEach((b, i) => {
                        if (i === 0) {
                            b.classList.add('active');
                            if (collaborationPackInput) collaborationPackInput.value = b.getAttribute('data-pack');
                        } else {
                            b.classList.remove('active');
                        }
                    });
                }, 1000);
            }
        });
    }

    // 14. Mobile Menu Navigation Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navContainer = document.getElementById('navContainer');
    
    if (mobileMenuBtn && navContainer) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navContainer.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-xmark');
        });

        // Close on clicking links
        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });

        // Close on clicking outside navbar
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navContainer.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    }

    // 15. Header Scroll dynamic state scrolled shrinker
    const header = document.getElementById('header');
    if (header) {
        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: (self) => {
                if (self.direction === 1) {
                    header.classList.add('scrolled');
                } else if (self.scroll() < 60) {
                    header.classList.remove('scrolled');
                }
            }
        });
    }

    // 16. Local Interactive Background Neural Mesh Canvas Animation
    const canvas = document.getElementById('neuralCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function initNeuralMesh() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            const isMobile = window.innerWidth < 768;
            const particleCount = Math.floor((canvas.width * canvas.height) / (isMobile ? 35000 : 18000));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 2
                });
            }
        }

        function animateNeuralMesh() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dynamically fetch active accent colors from computed document variables
            const rootStyles = getComputedStyle(document.documentElement);
            const activeAccent = rootStyles.getPropertyValue('--accent').trim();
            
            ctx.fillStyle = activeAccent;
            ctx.strokeStyle = activeAccent;
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 135) {
                        ctx.beginPath();
                        ctx.lineWidth = (1 - dist / 135) * 0.6;
                        ctx.globalAlpha = (1 - dist / 135) * 0.35;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });
            
            requestAnimationFrame(animateNeuralMesh);
        }

        window.addEventListener('resize', initNeuralMesh);
        initNeuralMesh();
        animateNeuralMesh();
    }
});
