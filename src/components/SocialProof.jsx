import React from 'react';

const TESTIMONIALS = [
  {
    quote: 'Abhyudaya stands out because he never writes code in a vacuum. He constantly interrogates what core business problem needs to be solved, then engineers with rare clarity, architectural discipline, and velocity.',
    author: 'Senior Systems Architect & Mentor',
    role: 'Enterprise Data & Systems Practice',
    avatarLetter: 'S',
    accentColor: '#14B8A6'
  },
  {
    quote: 'His ability to transform unstructured, messy multi-table databases into automated Python pipelines and crystal-clear executive dashboards in Tableau was remarkable. He bridges data and business strategy seamlessly.',
    author: 'Lead Analytics Program Manager',
    role: 'Codec Technologies Project Delivery',
    avatarLetter: 'L',
    accentColor: '#F59E0B'
  },
  {
    quote: 'In collaborative sprints and technical architectures, Abhyudaya pairs deep relational SQL expertise with modern frontend design. He thinks like a high-value product builder rather than just a developer.',
    author: 'Full-Stack Engineering Colleague',
    role: 'Data Science & Applied ML Cohort',
    avatarLetter: 'E',
    accentColor: '#38BDF8'
  }
];

export default function SocialProof() {
  return (
    <section className="section-container" id="endorsements">
      {/* Section Header */}
      <div className="section-header-block">
        <span className="section-badge">
          <i className="fa-solid fa-comments"></i> Endorsements &amp; Strategic Proof
        </span>
        <h2 className="section-title">
          Collaborator <span className="gradient-brand-text">Endorsements &amp; Social Proof</span>
        </h2>
        <p className="section-subtitle">
          Feedback from technical mentors, project leaders, and collaborative peers on problem-solving ability.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="quote-mark-icon" style={{ color: t.accentColor }}>
              <i className="fa-solid fa-quote-left"></i>
            </div>
            <p className="testimonial-quote">"{t.quote}"</p>

            <div className="testimonial-author-row">
              <div className="author-avatar" style={{ backgroundColor: t.accentColor }}>
                {t.avatarLetter}
              </div>
              <div className="author-details">
                <h4 className="author-name">{t.author}</h4>
                <p className="author-role">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Meta Case Study: Portfolio Repositioning */}
      <div className="meta-case-study-box">
        <div className="meta-badge-tag">
          <i className="fa-solid fa-wand-magic-sparkles"></i> Live Demonstration of Product Thinking
        </div>
        <h3 className="meta-box-headline">
          Case Study: Reimagining the Personal Brand Experience
        </h3>
        <p className="meta-box-summary">
          Reimagined my portfolio from a traditional developer showcase into a personal branding platform focused on communicating impact, technical expertise, and problem-solving ability. Redesigned the user experience, visual identity, information architecture, and project storytelling to improve recruiter engagement and increase professional opportunities.
        </p>

        <div className="before-after-matrix">
          <div className="matrix-column before-column">
            <div className="matrix-header">
              <span className="matrix-icon red"><i className="fa-solid fa-xmark"></i></span>
              <h4>Before (Traditional Portfolio)</h4>
            </div>
            <ul className="matrix-list">
              <li>Generic developer template with minimal differentiation</li>
              <li>Simple listing of coding assignments &amp; features</li>
              <li>Skill badges without real-world business context</li>
              <li>Unclear conversion pathways for recruiters &amp; clients</li>
            </ul>
          </div>

          <div className="matrix-column after-column">
            <div className="matrix-header">
              <span className="matrix-icon green"><i className="fa-solid fa-check"></i></span>
              <h4>After (Personal Brand Platform)</h4>
            </div>
            <ul className="matrix-list">
              <li>Custom high-conversion layout with curated color palette</li>
              <li>Product case studies highlighting Problem, Solution &amp; Hard ROI</li>
              <li>Interactive telemetry sandbox proving live competency</li>
              <li>Frictionless conversion: 1-click CV download &amp; direct scheduling</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
