// Global Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Scroll effect for header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navContainer = document.getElementById('navContainer');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuBtn && navContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Set Progress Bar Widths Statically
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
    });
});

// Contact Form Handler
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.classList.add('success');
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('success');
        e.target.reset();
    }, 3000);
}
