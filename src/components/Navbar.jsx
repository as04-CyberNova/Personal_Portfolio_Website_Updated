import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo" onClick={closeMenu}>
          <div className="logo-symbol">
            <span className="logo-dot"></span>
          </div>
          <div className="logo-text-group">
            <span className="logo-name">ABHYUDAYA SINHA</span>
            <span className="logo-tag">ENGINEER & BUILDER</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className={`nav-links-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links-list">
            <li><a href="#home" onClick={closeMenu}>Overview</a></li>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#solutions" onClick={closeMenu}>Solutions</a></li>
            <li><a href="#telemetry" onClick={closeMenu}>Telemetry</a></li>
            <li><a href="#expertise" onClick={closeMenu}>Expertise</a></li>
            <li><a href="#impact" onClick={closeMenu}>Track Record</a></li>
            <li><a href="#endorsements" onClick={closeMenu}>Testimonials</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>

          {/* Mobile extra CTAs */}
          <div className="mobile-drawer-cta">
            <a 
              href="/Abhyudaya_Sinha_Resume.pdf" 
              download="Abhyudaya_Sinha_Resume.pdf" 
              className="btn-resume-nav"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-arrow-down-to-line"></i> Download Resume
            </a>
            <a 
              href="#contact" 
              className="btn-connect-nav"
              onClick={closeMenu}
            >
              Let's Connect
            </a>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="nav-actions">
          {/* Status Badge */}
          <div className="nav-status-indicator" title="Currently open for high-impact roles & collaborations">
            <span className="status-ping"></span>
            <span className="status-text">Available</span>
          </div>

          {/* Social Profiles */}
          <a 
            href="https://github.com/as04-CyberNova" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-icon-link" 
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/abhyudaya-sinha-7035a8373" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-icon-link" 
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>

          {/* Resume Download CTA */}
          <a 
            href="/Abhyudaya_Sinha_Resume.pdf" 
            download="Abhyudaya_Sinha_Resume.pdf" 
            className="btn-resume-nav desktop-only"
            title="Download ATS-Friendly PDF Resume"
          >
            <i className="fa-solid fa-file-arrow-down"></i> Resume
          </a>

          {/* Primary CTA */}
          <a href="#contact" className="btn-connect-nav desktop-only">
            Let's Connect
          </a>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
