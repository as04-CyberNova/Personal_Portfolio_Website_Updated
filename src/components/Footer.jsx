import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="brand-footer">
      <div className="footer-content-container">
        <div className="footer-top-row">
          {/* Brand Info */}
          <div className="footer-brand-info">
            <a href="#home" className="footer-logo">
              <span className="logo-dot"></span>
              <span className="logo-text">ABHYUDAYA SINHA</span>
            </a>
            <p className="footer-tagline">
              Building intelligent digital products, modern web applications, and scalable data solutions for real-world impact.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-nav-col">
            <span className="footer-nav-heading">Navigation</span>
            <ul className="footer-links-list">
              <li><a href="#home">Overview</a></li>
              <li><a href="#about">About &amp; Philosophy</a></li>
              <li><a href="#solutions">Featured Solutions</a></li>
              <li><a href="#telemetry">Live Telemetry</a></li>
              <li><a href="#expertise">Technical Expertise</a></li>
              <li><a href="#impact">Track Record</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="footer-social-col">
            <span className="footer-nav-heading">Connect</span>
            <div className="footer-social-icons">
              <a 
                href="https://github.com/as04-CyberNova" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-icon-link"
                aria-label="GitHub Profile"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/abhyudaya-sinha-7035a8373" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-icon-link"
                aria-label="LinkedIn Profile"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a 
                href="mailto:abhyudayasinha04@gmail.com" 
                className="footer-icon-link"
                aria-label="Send Direct Email"
              >
                <i className="fa-regular fa-envelope"></i>
              </a>
            </div>

            <div className="footer-availability-note">
              <span className="pulsing-radar-dot"></span>
              <span>Available for hire &amp; consulting</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {currentYear} Abhyudaya Sinha. Engineered with React 19 &amp; Vite. Built for speed, scale &amp; impact.
          </p>
          <div className="footer-badges">
            <span className="footer-spec-badge">ATS Optimized</span>
            <span className="footer-spec-badge">Modern Glassmorphism</span>
            <span className="footer-spec-badge">WCAG Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
