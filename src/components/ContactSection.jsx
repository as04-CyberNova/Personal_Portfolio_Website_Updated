import React, { useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abhyudayasinha04@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section className="section-container" id="contact">
      {/* Section Header */}
      <div className="section-header-block">
        <span className="section-badge">
          <i className="fa-solid fa-handshake"></i> Start a Conversation
        </span>
        <h2 className="section-title">
          Let's Build Something <span className="gradient-brand-text">High-Impact Together</span>
        </h2>
        <p className="section-subtitle">
          Whether you have an engineering role to fill, need an intelligent digital product built, or want to discuss technical strategy—I'd love to connect.
        </p>
      </div>

      <div className="contact-main-grid">
        {/* Left Column: Direct Conversion Channels & Trust Signals */}
        <div className="contact-info-column">
          {/* Availability Card */}
          <div className="conversion-info-card">
            <div className="availability-card-header">
              <span className="pulsing-radar-dot"></span>
              <h4>Current Professional Availability</h4>
            </div>
            <p className="availability-desc">
              Currently available for <strong>Full-Time Software Engineering &amp; Data Roles</strong>, select AI/Web development contracts, and technical advisory projects.
            </p>
            <div className="availability-meta-tags">
              <span className="meta-tag"><i className="fa-solid fa-globe"></i> Remote Worldwide</span>
              <span className="meta-tag"><i className="fa-solid fa-plane-departure"></i> Open to Relocation</span>
              <span className="meta-tag"><i className="fa-regular fa-clock"></i> &lt; 24h Response</span>
            </div>
          </div>

          {/* Quick Resume Download Card */}
          <div className="conversion-info-card resume-feature-card">
            <div className="resume-card-content">
              <div className="resume-icon-badge">
                <i className="fa-solid fa-file-pdf"></i>
              </div>
              <div className="resume-details">
                <h4>Official Executive Resume</h4>
                <p>ATS-optimized, 1-page PDF detailing skills, metrics &amp; work history.</p>
              </div>
            </div>
            <a 
              href="/Abhyudaya_Sinha_Resume.pdf" 
              download="Abhyudaya_Sinha_Resume.pdf" 
              className="btn-download-resume-card"
            >
              <i className="fa-solid fa-arrow-down-to-bracket"></i>
              <span>Download Resume (PDF)</span>
            </a>
          </div>

          {/* Direct Communication Channels */}
          <div className="direct-channels-stack">
            <div className="channel-item-card" onClick={handleCopyEmail}>
              <div className="channel-icon teal">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div className="channel-text">
                <span className="channel-label">Direct Email</span>
                <span className="channel-value">abhyudayasinha04@gmail.com</span>
              </div>
              <button 
                type="button" 
                className={`btn-copy-chip ${copiedEmail ? 'copied' : ''}`}
                onClick={(e) => { e.stopPropagation(); handleCopyEmail(); }}
                title="Copy Email to Clipboard"
              >
                {copiedEmail ? (
                  <>
                    <i className="fa-solid fa-check"></i>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <i className="fa-regular fa-copy"></i>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <a 
              href="https://www.linkedin.com/in/abhyudaya-sinha-7035a8373" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="channel-item-card"
            >
              <div className="channel-icon linkedin">
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
              <div className="channel-text">
                <span className="channel-label">LinkedIn Connection</span>
                <span className="channel-value">linkedin.com/in/abhyudaya-sinha-7035a8373</span>
              </div>
              <span className="channel-arrow">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </span>
            </a>

            <a 
              href="https://github.com/as04-CyberNova" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="channel-item-card"
            >
              <div className="channel-icon github">
                <i className="fa-brands fa-github"></i>
              </div>
              <div className="channel-text">
                <span className="channel-label">GitHub Portfolio</span>
                <span className="channel-value">github.com/as04-CyberNova</span>
              </div>
              <span className="channel-arrow">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-column">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
