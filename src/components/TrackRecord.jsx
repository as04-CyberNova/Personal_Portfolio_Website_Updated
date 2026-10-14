import React from 'react';

const EXPERIENCES = [
  {
    role: 'Data & Systems Engineering Intern',
    organization: 'Codec Technologies',
    period: 'Internship Experience',
    type: 'Engineering & Analytics',
    description: 'Spearheaded automated data pipelines and relational database restructuring to optimize internal business reporting.',
    achievements: [
      'Engineered automated Python ETL routines, slashing manual data manipulation and recurring cleanup hours by 75%.',
      'Refactored relational SQL database queries using window functions and CTEs to accelerate dashboard load performance.',
      'Designed executive KPI dashboards providing daily operational visibility to cross-functional stakeholders.',
      'Conducted rigorous exploratory data analysis (EDA) to flag data inconsistencies and safeguard report accuracy.'
    ]
  },
  {
    role: 'Enterprise Simulation Fellow',
    organization: 'Deloitte, Tata Group & British Airways',
    period: 'Industry Simulations',
    type: 'Strategy & Enterprise Analytics',
    description: 'Completed rigorous industry-standard simulations solving high-stakes corporate analytics and engineering scenarios.',
    achievements: [
      'Deloitte Australia: Formulated forensic telemetry models to isolate operational bottlenecks and customer churn vectors.',
      'Tata Group: Designed executive BI dashboards delivering actionable insights for international supply chain and retail metrics.',
      'British Airways: Parsed unstructured customer flight booking datasets using Python sentiment analysis and regression models.',
      'Presented data-backed strategic recommendations addressing core commercial challenges.'
    ]
  },
  {
    role: 'B.Tech in Computer Science & Engineering (Data Science)',
    organization: 'Undergraduate Program',
    period: 'Academic Foundation',
    type: 'Computer Science & Engineering',
    description: 'Rigorous foundation in software engineering, distributed database architecture, algorithms, and applied machine learning.',
    achievements: [
      'Specialized coursework in Relational Database Systems (RDBMS), Data Structures & Algorithms, and Applied AI.',
      'Built multi-disciplinary capstone engineering projects spanning real-time data visualization and predictive models.',
      'Maintained top academic standing while actively shipping open-source repositories and analytical tools.'
    ]
  }
];

const CREDENTIALS = [
  {
    title: 'Advanced Relational SQL & Database Architecture',
    issuer: 'Relational Database Authority',
    badge: 'fa-solid fa-database',
    focus: 'Window Functions, CTEs, Star Schema Modeling, Query Optimization'
  },
  {
    title: 'Python for Data Science, Automation & ML',
    issuer: 'Applied Machine Learning',
    badge: 'fa-brands fa-python',
    focus: 'NumPy, Pandas, Scikit-Learn, Automated Data Cleansing'
  },
  {
    title: 'Executive BI & Interactive Storytelling',
    issuer: 'Tableau & Power BI Ecosystem',
    badge: 'fa-solid fa-chart-pie',
    focus: 'DAX Modeling, Dual-Axis Dashboards, Parameter Toggles'
  },
  {
    title: 'High-Impact Engineering & Agile Practices',
    issuer: 'Software Craftsmanship',
    badge: 'fa-solid fa-award',
    focus: 'Git/GitHub, CI/CD, Enterprise Documentation, Clean Code'
  }
];

export default function TrackRecord() {
  return (
    <section className="section-container" id="impact">
      {/* Section Header */}
      <div className="section-header-block">
        <span className="section-badge">
          <i className="fa-solid fa-timeline"></i> Impact-Driven Accomplishments
        </span>
        <h2 className="section-title">
          Experience &amp; <span className="gradient-brand-text">Track Record</span>
        </h2>
        <p className="section-subtitle">
          Demonstrated history of driving measurable performance lift, operational efficiency, and scalable software delivery.
        </p>
      </div>

      <div className="experience-timeline-container">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="timeline-card">
            <div className="timeline-card-header">
              <div className="timeline-role-info">
                <span className="timeline-type-pill">{exp.type}</span>
                <h3 className="timeline-role-title">{exp.role}</h3>
                <span className="timeline-company-name">
                  <i className="fa-regular fa-building"></i> {exp.organization}
                </span>
              </div>
              <div className="timeline-period-badge">
                <i className="fa-regular fa-calendar"></i> {exp.period}
              </div>
            </div>

            <p className="timeline-summary-text">{exp.description}</p>

            <div className="timeline-achievements-box">
              <h4 className="achievements-heading">
                <i className="fa-solid fa-check-double text-teal"></i> Key Impact &amp; Contributions:
              </h4>
              <ul className="achievements-list">
                {exp.achievements.map((item, aIdx) => (
                  <li key={aIdx}>
                    <span className="bullet-arrow">➔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications & Trust Signals */}
      <div className="credentials-section-block">
        <div className="credentials-head">
          <h3 className="credentials-title">
            <i className="fa-solid fa-certificate text-amber"></i> Verified Certifications &amp; Competencies
          </h3>
          <p className="credentials-subtitle">Third-party accredited proficiencies in software engineering and data systems.</p>
        </div>

        <div className="credentials-grid">
          {CREDENTIALS.map((cred, idx) => (
            <div key={idx} className="credential-card">
              <div className="credential-icon-chassis">
                <i className={cred.badge}></i>
              </div>
              <div className="credential-content">
                <h4 className="credential-title">{cred.title}</h4>
                <span className="credential-issuer">{cred.issuer}</span>
                <p className="credential-focus">{cred.focus}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recruiter Quick-Action Bar */}
        <div className="resume-conversion-banner">
          <div className="conversion-text">
            <h4>Ready to review the full verified credentials?</h4>
            <p>Download the ATS-friendly one-page resume detailing technical competencies and project metrics.</p>
          </div>
          <div className="conversion-buttons">
            <a 
              href="/Abhyudaya_Sinha_Resume.pdf" 
              download="Abhyudaya_Sinha_Resume.pdf" 
              className="btn-primary-action"
            >
              <i className="fa-solid fa-file-pdf"></i>
              <span>Download Official Resume</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/abhyudaya-sinha-7035a8373" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary-action"
            >
              <i className="fa-brands fa-linkedin"></i>
              <span>Verify on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
