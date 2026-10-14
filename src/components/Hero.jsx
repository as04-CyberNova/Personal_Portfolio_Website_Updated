import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid-layout">
        {/* Left Column: Personal Value Proposition */}
        <div className="hero-text-block">
          {/* Availability Status Badge */}
          <div className="hero-availability-pill">
            <span className="pulsing-radar-dot"></span>
            <span className="availability-label">Available for Full-time Roles & High-Impact Contracts</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-main-heading">
            Building <span className="gradient-brand-text">Intelligent Digital Products</span> for Real-World Impact.
          </h1>

          {/* Subheadline */}
          <p className="hero-subheadline">
            I develop modern web applications, AI-powered solutions, and scalable digital experiences that help businesses and people achieve more.
          </p>

          {/* High-Conversion CTAs */}
          <div className="hero-cta-group">
            <a href="#solutions" className="btn-primary-action">
              <span>View My Work</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#contact" className="btn-secondary-action">
              <span>Let's Connect</span>
              <i className="fa-regular fa-paper-plane"></i>
            </a>
            <a 
              href="/Abhyudaya_Sinha_Resume.pdf" 
              download="Abhyudaya_Sinha_Resume.pdf" 
              className="btn-outline-action"
              title="Download ATS-Optimized PDF Resume"
            >
              <i className="fa-solid fa-file-arrow-down"></i>
              <span>Download CV</span>
            </a>
          </div>

          {/* Trust Metric Signals */}
          <div className="hero-stats-strip">
            <div className="stat-item">
              <span className="stat-number">3<span className="stat-accent">+</span></span>
              <span className="stat-label">Years of Engineering & Analytics</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15<span className="stat-accent">+</span></span>
              <span className="stat-label">Delivered Products & Dashboards</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20<span className="stat-accent">+</span></span>
              <span className="stat-label">Technologies Mastered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.8<span className="stat-accent">%</span></span>
              <span className="stat-label">Data Accuracy & Verification</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="hero-visual-block">
          <div className="hero-visual-chassis">
            {/* Ambient Background Aura */}
            <div className="hero-glow-aura"></div>
            
            {/* Visual Frame */}
            <div className="hero-image-wrapper">
              <img 
                src="/images/hero_brand_visual.jpg" 
                alt="Intelligent Digital Products & AI Architecture Visual" 
                className="hero-image-display"
                loading="eager"
              />
              <div className="hero-image-overlay"></div>
            </div>

            {/* Floating Telemetry Micro-Badges */}
            <div className="floating-badge badge-top-right">
              <div className="badge-icon-box">
                <i className="fa-solid fa-brain"></i>
              </div>
              <div className="badge-text-box">
                <span className="badge-title">AI Core Architecture</span>
                <span className="badge-subtitle">Predictive & Autonomous</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom-left">
              <div className="badge-icon-box teal-icon">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div className="badge-text-box">
                <span className="badge-title">High-Throughput ETL</span>
                <span className="badge-subtitle">14ms Average Latency</span>
              </div>
            </div>

            {/* Live Terminal Status Tag */}
            <div className="hero-terminal-pill">
              <span className="code-dot green"></span>
              <code>sys.status: optimal // 100% production uptime</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
