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

    // 7. Cockpit Theme Configurator Switcher (Porsche Acid Green Fixed Theme)
    document.documentElement.setAttribute('data-theme', 'acid');

    // 8. Dashboard SVG Speedometers Scroll Animation with Elastic Velocity-Driven Revving Physics
    const speedoFills = document.querySelectorAll('.dial-fill');
    
    speedoFills.forEach(fill => {
        const targetPercent = parseInt(fill.getAttribute('data-pct'));
        const circumference = 251.2; // 2 * Math.PI * 40
        const baseOffset = circumference - (targetPercent / 100) * circumference;
        
        // Save these targets directly on the element for global RAF access
        fill.dataset.baseOffset = baseOffset;
        fill.dataset.currentOffset = circumference; // Start completely empty
        fill.dataset.circumference = circumference;
        fill.dataset.revealed = "false";
        
        // Start completely empty
        fill.style.strokeDashoffset = circumference;
        
        ScrollTrigger.create({
            trigger: fill,
            start: 'top 85%',
            onEnter: () => {
                fill.dataset.revealed = "true";
                gsap.to(fill, {
                    strokeDashoffset: baseOffset,
                    duration: 1.8,
                    ease: 'power3.out',
                    onUpdate: function() {
                        // Keep our current tracking offset in sync during the entry animation
                        fill.dataset.currentOffset = gsap.getProperty(fill, "stroke-dashoffset");
                    }
                });
            }
        });
    });

    // Reactive velocity engine mapping: modulating HUD gauges on extreme scroll shifts
    lenis.on('scroll', (e) => {
        const scrollVelocity = Math.abs(e.velocity);
        if (scrollVelocity > 0.1) {
            speedoFills.forEach(fill => {
                if (fill.dataset.revealed === "true") {
                    const baseOffset = parseFloat(fill.dataset.baseOffset);
                    
                    // The faster the scroll, the higher the tachometer "revs" (dashoffset decreases)
                    // Math.min(scrollVelocity * 4, 30) gives up to 30px elastic shift
                    const revFactor = Math.min(scrollVelocity * 4, 30);
                    const dynamicOffset = Math.max(baseOffset - revFactor, 0); // never go past full fill (0 offset)
                    
                    gsap.to(fill, {
                        strokeDashoffset: dynamicOffset,
                        duration: 0.3,
                        ease: 'power1.out',
                        overwrite: 'auto'
                    });
                }
            });
        } else {
            // Smoothly settle back to base values when scroll slows down
            speedoFills.forEach(fill => {
                if (fill.dataset.revealed === "true") {
                    const baseOffset = parseFloat(fill.dataset.baseOffset);
                    gsap.to(fill, {
                        strokeDashoffset: baseOffset,
                        duration: 0.8,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            });
        }
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

    // 13. Vehicle Booking Form Telemetry Mailto Submit (with Serverless API and fallback)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const selectedPack = collaborationPackInput ? collaborationPackInput.value : "General Inquiry";
            const pilotName = document.getElementById('pilotName').value;
            const pilotEmail = document.getElementById('pilotEmail').value;
            const pilotMessage = document.getElementById('pilotMessage').value;
            
            const mailtoLink = `mailto:abhyudayasinha04@gmail.com?subject=Mission Booking: ${selectedPack} from ${pilotName}&body=Pilot Name: ${pilotName}%0D%0APilot Email: ${pilotEmail}%0D%0A%0D%0ACollaboration Pack Selected: ${selectedPack}%0D%0A%0D%0AMission Flight Parameters:%0D%0A${pilotMessage}`;
            
            if (formStatus) {
                formStatus.style.display = 'flex';
                formStatus.innerHTML = '<i class="fa-solid fa-satellite-dish animate-pulse"></i> TRANSMITTING FLIGHT DATA // SECURING ENGINE PATH... 🏎️';
                formStatus.className = 'form-status transmitting';
                
                gsap.fromTo(formStatus, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                
                try {
                    const response = await fetch('/api/booking', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pilotName: pilotName,
                            pilotEmail: pilotEmail,
                            collaborationPack: selectedPack,
                            pilotMessage: pilotMessage
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok && data.success) {
                        formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message || 'TELEMETRY LOCKED // PILOT CONNECTED'}`;
                        formStatus.className = 'form-status success';
                        
                        setTimeout(() => {
                            contactForm.reset();
                            packBtns.forEach((b, i) => {
                                if (i === 0) {
                                    b.classList.add('active');
                                    if (collaborationPackInput) collaborationPackInput.value = b.getAttribute('data-pack');
                                } else {
                                    b.classList.remove('active');
                                }
                            });
                        }, 2000);
                    } else {
                        throw new Error(data.error || 'Serverless circuit failed.');
                    }
                } catch (error) {
                    console.warn("API Transmission failed, falling back to mailto client:", error);
                    formStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation animate-pulse"></i> OFFLINE FALLBACK ENABLED // LAUNCHING PILOT EMAIL CLIENT...`;
                    formStatus.className = 'form-status warning';
                    
                    setTimeout(() => {
                        window.location.href = mailtoLink;
                        contactForm.reset();
                        packBtns.forEach((b, i) => {
                            if (i === 0) {
                                b.classList.add('active');
                                if (collaborationPackInput) collaborationPackInput.value = b.getAttribute('data-pack');
                            } else {
                                b.classList.remove('active');
                            }
                        });
                    }, 2000);
                }
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

    // 16. Immersive 3D WebGL V6 Engine Block (Three.js) with 2D Neural Mesh Fallback
    const canvas = document.getElementById('neuralCanvas');
    if (canvas) {
        if (typeof THREE !== 'undefined') {
            console.log("WebGL Engine: Initializing 3D V6 Supercar Engine...");
            try {
                // Initialize Three.js scene, camera, renderer
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
                
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

                // Get theme color
                const rootStyles = getComputedStyle(document.documentElement);
                let themeColorHex = rootStyles.getPropertyValue('--accent').trim() || '#ccff00';
                
                // Create materials
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: new THREE.Color(themeColorHex),
                    transparent: true,
                    opacity: 0.28
                });

                const activeMaterial = new THREE.LineBasicMaterial({
                    color: new THREE.Color(themeColorHex),
                    transparent: true,
                    opacity: 0.7
                });

                // Create an Engine Block Group
                const engineGroup = new THREE.Group();
                scene.add(engineGroup);

                // 1. Crankcase (base box)
                const crankcaseGeo = new THREE.BoxGeometry(4, 2, 3, 2, 1, 2);
                const crankcaseLines = new THREE.LineSegments(
                    new THREE.WireframeGeometry(crankcaseGeo),
                    lineMaterial
                );
                engineGroup.add(crankcaseLines);

                // 2. V-Cylinders (arranged in V-shape V6)
                const cylinders = [];
                const pistons = [];
                const cylinderGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.4, 8, 1, true);
                
                const cylinderOffsets = [
                    { x: -1.2, z: 0.8, angle: Math.PI / 6 },  // Left bank cylinder 1
                    { x: 0, z: 0.8, angle: Math.PI / 6 },     // Left bank cylinder 2
                    { x: 1.2, z: 0.8, angle: Math.PI / 6 },    // Left bank cylinder 3
                    { x: -1.2, z: -0.8, angle: -Math.PI / 6 }, // Right bank cylinder 1
                    { x: 0, z: -0.8, angle: -Math.PI / 6 },    // Right bank cylinder 2
                    { x: 1.2, z: -0.8, angle: -Math.PI / 6 }   // Right bank cylinder 3
                ];

                cylinderOffsets.forEach((offset, idx) => {
                    const cylinderHolder = new THREE.Group();
                    cylinderHolder.position.set(offset.x, 1.1, offset.z);
                    cylinderHolder.rotation.z = offset.angle;

                    const cylLines = new THREE.LineSegments(
                        new THREE.WireframeGeometry(cylinderGeo),
                        lineMaterial
                    );
                    cylinderHolder.add(cylLines);

                    // Piston inside cylinder
                    const pistonGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8, 1);
                    const pistonLines = new THREE.LineSegments(
                        new THREE.WireframeGeometry(pistonGeo),
                        activeMaterial
                    );
                    pistonLines.datasetOffset = idx * Math.PI / 3; 
                    cylinderHolder.add(pistonLines);
                    pistons.push(pistonLines);

                    engineGroup.add(cylinderHolder);
                    cylinders.push(cylinderHolder);
                });

                // 3. Crankshaft (Central cylinder)
                const shaftGeo = new THREE.CylinderGeometry(0.18, 0.18, 4.8, 8, 1, false);
                const shaft = new THREE.LineSegments(
                    new THREE.WireframeGeometry(shaftGeo),
                    activeMaterial
                );
                shaft.rotation.z = Math.PI / 2;
                engineGroup.add(shaft);

                // 4. Exhaust manifold pipes (connected side pipes)
                const manifoldGeo = new THREE.TorusGeometry(0.8, 0.1, 8, 16, Math.PI);
                const leftManifold = new THREE.LineSegments(
                    new THREE.WireframeGeometry(manifoldGeo),
                    lineMaterial
                );
                leftManifold.position.set(0, 0.8, 1.5);
                leftManifold.rotation.x = Math.PI / 2;
                engineGroup.add(leftManifold);

                const rightManifold = new THREE.LineSegments(
                    new THREE.WireframeGeometry(manifoldGeo),
                    lineMaterial
                );
                rightManifold.position.set(0, 0.8, -1.5);
                rightManifold.rotation.x = -Math.PI / 2;
                engineGroup.add(rightManifold);

                // 5. Ambient Particles (fuel/spark combustion exhaust)
                const particleCount = 120;
                const particleGeo = new THREE.BufferGeometry();
                const positions = new Float32Array(particleCount * 3);
                const velocities = [];

                for (let i = 0; i < particleCount; i++) {
                    positions[i * 3] = (Math.random() - 0.5) * 8;
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

                    velocities.push({
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() + 0.15) * 0.03,
                        z: (Math.random() - 0.5) * 0.02
                    });
                }

                particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                
                const pMaterial = new THREE.PointsMaterial({
                    color: new THREE.Color(themeColorHex),
                    size: 0.09,
                    transparent: true,
                    opacity: 0.5
                });

                const particlesSystem = new THREE.Points(particleGeo, pMaterial);
                scene.add(particlesSystem);

                // Position camera
                camera.position.z = 6.2;
                camera.position.y = 0.5;

                // Track mouse dragging & cursor movement
                let targetX = 0, targetY = 0;
                let isDragging = false;
                let prevMouseX = 0, prevMouseY = 0;

                window.addEventListener('mousemove', (e) => {
                    if (!isDragging) {
                        targetX = (e.clientX - window.innerWidth / 2) * 0.0003;
                        targetY = (e.clientY - window.innerHeight / 2) * 0.0003;
                    }
                });

                // Touch & mouse drag listeners
                window.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    prevMouseX = e.clientX;
                    prevMouseY = e.clientY;
                });

                window.addEventListener('mousemove', (e) => {
                    if (isDragging) {
                        const deltaX = e.clientX - prevMouseX;
                        const deltaY = e.clientY - prevMouseY;
                        engineGroup.rotation.y += deltaX * 0.006;
                        engineGroup.rotation.x += deltaY * 0.006;
                        prevMouseX = e.clientX;
                        prevMouseY = e.clientY;
                    }
                });

                window.addEventListener('mouseup', () => { isDragging = false; });
                window.addEventListener('mouseleave', () => { isDragging = false; });

                let currentVelocity = 0;
                let clock = new THREE.Clock();

                function animate3D() {
                    requestAnimationFrame(animate3D);

                    const elapsedTime = clock.getElapsedTime();

                    // Sync visual theme accent if colorway updates
                    const updatedAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
                    if (updatedAccent && updatedAccent !== themeColorHex) {
                        themeColorHex = updatedAccent;
                        const newCol = new THREE.Color(themeColorHex);
                        lineMaterial.color = newCol;
                        activeMaterial.color = newCol;
                        pMaterial.color = newCol;
                    }

                    // Mouse follow lag (smooth rotation spring)
                    if (!isDragging) {
                        engineGroup.rotation.y += (targetX - engineGroup.rotation.y) * 0.05;
                        engineGroup.rotation.x += (targetY - engineGroup.rotation.x) * 0.05;
                    }

                    // Base idle rotation + dynamic speed from Lenis velocity
                    const scrollVel = (typeof lenis !== 'undefined') ? Math.abs(lenis.velocity) : 0;
                    currentVelocity += (scrollVel * 0.04 - currentVelocity) * 0.1; // Smooth dampening
                    
                    const rotationSpeed = 0.004 + currentVelocity * 0.08;
                    engineGroup.rotation.y += rotationSpeed;

                    // Piston reciprocating motion (V6 out-of-phase strokes)
                    pistons.forEach((piston) => {
                        const strokeSpeed = 5 + currentVelocity * 18;
                        piston.position.y = Math.sin(elapsedTime * strokeSpeed + parseFloat(piston.datasetOffset)) * 0.45;
                    });

                    // Spin the crankshaft in sync with pistons
                    shaft.rotation.y += (1 + currentVelocity * 4) * 0.05;

                    // Animate combustion/exhaust particle systems
                    const posAttr = particleGeo.getAttribute('position');
                    const posArray = posAttr.array;

                    for (let i = 0; i < particleCount; i++) {
                        const index = i * 3;
                        
                        posArray[index] += velocities[i].x * (1 + currentVelocity * 4);
                        posArray[index + 1] += velocities[i].y * (1 + currentVelocity * 7);
                        posArray[index + 2] += velocities[i].z * (1 + currentVelocity * 4);

                        // Re-spawn particles if they wander too far or float too high
                        if (Math.abs(posArray[index]) > 8 || posArray[index + 1] > 5 || Math.abs(posArray[index + 2]) > 8) {
                            posArray[index] = (Math.random() - 0.5) * 1.5;
                            posArray[index + 1] = -0.8;
                            posArray[index + 2] = (Math.random() - 0.5) * 1.5;
                        }
                    }
                    
                    posAttr.needsUpdate = true;

                    renderer.render(scene, camera);
                }

                // Resize event
                window.addEventListener('resize', () => {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                });

                // Start WebGL render loop
                animate3D();
            } catch (err) {
                console.warn("WebGL crash, falling back to 2D neural mesh:", err);
                init2DNeuralMeshFallback();
            }
        } else {
            console.warn("THREE undefined, falling back to 2D neural mesh.");
            init2DNeuralMeshFallback();
        }

        // 2D Neural Mesh Fallback System (Ensures visual background never breaks)
        function init2DNeuralMeshFallback() {
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
                
                const rootStyles = getComputedStyle(document.documentElement);
                const activeAccent = rootStyles.getPropertyValue('--accent').trim() || '#ccff00';
                
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
    }
});
