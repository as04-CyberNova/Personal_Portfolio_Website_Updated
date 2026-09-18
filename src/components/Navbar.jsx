import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('indigo');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    }
  };

  const changeTheme = (themeName) => {
    setActiveTheme(themeName);
    const variables = themes[themeName];
    if (variables) {
      Object.keys(variables).forEach(key => {
        document.documentElement.style.setProperty(key, variables[key]);
      });
    }
  };

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <nav className="navbar">
        <a href="#" className="logo" id="logoLink" aria-label="Abhyudaya Sinha Home">
          <i className="fa-solid fa-chart-line"></i> ABHYUDAYA SINHA <span className="logo-divider">|</span> <span className="logo-subtitle">DATA ANALYTICS</span>
        </a>

        <div className={`nav-container ${mobileMenuOpen ? 'active' : ''}`} id="navContainer">
          <ul className="nav-links">
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Overview</a></li>
            <li><a href="#analytics" onClick={() => setMobileMenuOpen(false)}>Analytics Dashboard</a></li>
            <li><a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>

        <div className="controls">
          {/* Theme customizer toggle */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setCustomizerOpen(!customizerOpen)}
              className="control-btn"
              title="Theme Colors"
            >
              <i className="fa-solid fa-palette"></i>
            </button>
            {customizerOpen && (
              <div 
                id="theme-customizer" 
                className="open"
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  background: '#0f172a',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  zIndex: 9999,
                  minWidth: '120px'
                }}
              >
                {Object.keys(themes).map(themeName => (
                  <button
                    key={themeName}
                    onClick={() => { changeTheme(themeName); setCustomizerOpen(false); }}
                    className={`theme-option ${activeTheme === themeName ? 'active' : ''}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeTheme === themeName ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      padding: '0.3rem 0.5rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontWeight: activeTheme === themeName ? 'bold' : 'normal'
                    }}
                  >
                    {themeName}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="https://github.com/as04-CyberNova" target="_blank" rel="noopener noreferrer" className="control-btn" title="GitHub Profile" id="navGithub" aria-label="Visit my GitHub">
            <i className="fab fa-github"></i>
          </a>
          
          <a href="https://www.linkedin.com/in/abhyudaya-sinha-7035a8373" target="_blank" rel="noopener noreferrer" className="control-btn" title="LinkedIn Profile" id="navLinkedin" aria-label="Visit my LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a href="#contact" className="btn-primary connect-btn" id="atsNavBtn">GET IN TOUCH</a>

          <button 
            className="mobile-menu-btn" 
            id="mobileMenuBtn" 
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}

