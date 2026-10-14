import React from 'react';

export default function AboutSection() {
  const pillars = [
    {
      icon: 'fa-solid fa-crosshairs',
      title: 'Problem & ROI-First Engineering',
      desc: 'Code without business impact is technical debt. I design systems backwards from organizational goals—focusing on reducing operational friction, cutting latency, and delivering quantifiable ROI.'
    },
    {
      icon: 'fa-solid fa-cubes-stacked',
      title: 'Scalable & Resilient Architecture',
      desc: 'From normalized relational SQL databases to modular, responsive React frontends, every layer is engineered for high throughput, maintainability, and seamless future evolution.'
    },
    {
      icon: 'fa-solid fa-microchip',
      title: 'Applied AI & Intelligent Automation',
      desc: 'Harnessing modern predictive models, automated ETL routines, and machine intelligence to turn raw transactional chaos into decisive, actionable competitive advantage.'
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'Discover & Isolate',
      summary: 'Analyze domain bottlenecks, interrogate unstructured data streams, and define hard measurable KPIs before writing a line of code.'
    },
    {
      step: '02',
      title: 'Architect & Build',
      summary: 'Construct robust data schemas, clean API endpoints, and intuitive user interfaces built with modern reactive design principles.'
    },
    {
      step: '03',
      title: 'Deploy & Optimize',
      summary: 'Release with zero downtime, wire real-time telemetry analytics, and continually calibrate systems for peak performance and scale.'
    }
  ];

  return (
    <section className="section-container" id="about">
      {/* Section Header */}
      <div className="section-header-block">
        <span className="section-badge">
          <i className="fa-solid fa-compass"></i> Personal Brand Philosophy
        </span>
        <h2 className="section-title">
          Who I Am &amp; <span className="gradient-brand-text">How I Think</span>
        </h2>
        <p className="section-subtitle">
          Bridging the gap between software engineering, artificial intelligence, and strategic business value.
        </p>
      </div>

      {/* Main Philosophy Narrative */}
      <div className="about-narrative-card">
        <div className="narrative-content">
          <h3 className="narrative-headline">
            I don't just write code. I engineer solutions that turn complex operational chaos into clear, high-performing products.
          </h3>
          <p className="narrative-paragraph">
            I am a B.Tech Computer Science &amp; Engineering graduate specializing in Data Science and Modern Web Systems. 
            Throughout hands-on engineering internships at Codec Technologies and enterprise simulations for global firms like Deloitte, Tata, and British Airways, 
            I discovered that the greatest digital products are built by engineers who understand both the algorithmic intricacies of code and the real-world economics of business.
          </p>
          <p className="narrative-paragraph">
            My mission is to help forward-thinking teams transform raw ideas and fragmented databases into automated, scalable, and intelligent software experiences that create lasting market impact.
          </p>

          <div className="narrative-signature-row">
            <div className="spec-tag">
              <i className="fa-solid fa-shield-check"></i> Enterprise Mindset
            </div>
            <div className="spec-tag">
              <i className="fa-solid fa-code-branch"></i> Clean Code Standards
            </div>
            <div className="spec-tag">
              <i className="fa-solid fa-gauge-high"></i> High-Throughput Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Three Pillars: How I Think */}
      <div className="pillars-grid">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="pillar-card">
            <div className="pillar-icon-box">
              <i className={pillar.icon}></i>
            </div>
            <h4 className="pillar-title">{pillar.title}</h4>
            <p className="pillar-desc">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* Execution Methodology */}
      <div className="methodology-card">
        <div className="methodology-header">
          <h3 className="methodology-title">The Engineering Execution Framework</h3>
          <p className="methodology-subtitle">How every project evolves from ambiguous challenge to high-impact solution</p>
        </div>

        <div className="methodology-steps-grid">
          {methodology.map((m, idx) => (
            <div key={idx} className="methodology-step-item">
              <div className="step-number-tag">{m.step}</div>
              <h4 className="step-title">{m.title}</h4>
              <p className="step-summary">{m.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
