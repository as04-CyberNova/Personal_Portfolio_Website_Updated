import React from 'react';

const SKILL_PILLARS = [
  {
    category: 'Frontend & Web Architecture',
    icon: 'fa-solid fa-code',
    accentColor: '#14B8A6',
    description: 'Crafting responsive, high-performance interfaces that combine intuitive user experiences with rock-solid component design.',
    skills: [
      { name: 'React 19 & Next.js Ecosystem', level: 'Advanced' },
      { name: 'Modern JavaScript (ES6+)', level: 'Advanced' },
      { name: 'Semantic HTML5 & Vanilla CSS', level: 'Expert' },
      { name: 'State Management & Hooks', level: 'Advanced' },
      { name: 'Responsive Mobile-First UX', level: 'Advanced' },
      { name: 'GSAP & Micro-Interactions', level: 'Intermediate' }
    ]
  },
  {
    category: 'Backend, APIs & Relational Systems',
    icon: 'fa-solid fa-server',
    accentColor: '#38BDF8',
    description: 'Engineering robust server-side APIs, optimized schema structures, and reliable data pipelines.',
    skills: [
      { name: 'Python (OOP & Scripting)', level: 'Advanced' },
      { name: 'Relational SQL & Star Schemas', level: 'Advanced' },
      { name: 'FastAPI & RESTful APIs', level: 'Proficient' },
      { name: 'MS SQL Server & PostgreSQL', level: 'Advanced' },
      { name: 'Recursive CTEs & Window Functions', level: 'Advanced' },
      { name: 'Database Normalization', level: 'Advanced' }
    ]
  },
  {
    category: 'AI, Machine Learning & Automation',
    icon: 'fa-solid fa-brain',
    accentColor: '#F59E0B',
    description: 'Developing automated data transformations, predictive machine learning models, and automated inference routines.',
    skills: [
      { name: 'Pandas & NumPy Data Wrangling', level: 'Advanced' },
      { name: 'Scikit-Learn Predictive Modeling', level: 'Proficient' },
      { name: 'Automated Python ETL Pipelines', level: 'Advanced' },
      { name: 'Statistical Imputation & Cleaning', level: 'Advanced' },
      { name: 'Exploratory Data Analysis (EDA)', level: 'Advanced' },
      { name: 'Algorithmic Anomaly Detection', level: 'Proficient' }
    ]
  },
  {
    category: 'Cloud, DevOps & Business Intelligence',
    icon: 'fa-solid fa-cloud',
    accentColor: '#10B981',
    description: 'Deploying reliable visualization systems, version control, and continuous integration workflows.',
    skills: [
      { name: 'Tableau Visual Storytelling', level: 'Advanced' },
      { name: 'Power BI & DAX Calculations', level: 'Advanced' },
      { name: 'Git & GitHub Collaboration', level: 'Advanced' },
      { name: 'Power Query & Advanced Excel', level: 'Expert' },
      { name: 'Docker Containerization', level: 'Intermediate' },
      { name: 'CI/CD Automated Deployment', level: 'Proficient' }
    ]
  }
];

export default function TechnicalExpertise() {
  return (
    <section className="section-container" id="expertise">
      {/* Section Header */}
      <div className="section-header-block">
        <span className="section-badge">
          <i className="fa-solid fa-cubes"></i> Technical Expertise
        </span>
        <h2 className="section-title">
          Building <span className="gradient-brand-text">Technology That Matters</span>
        </h2>
        <p className="section-subtitle">
          A disciplined stack engineered for scalability, speed, and real-world commercial impact.
        </p>
      </div>

      {/* Expertise Grid */}
      <div className="expertise-grid">
        {SKILL_PILLARS.map((pillar, idx) => (
          <div key={idx} className="expertise-card">
            <div className="expertise-card-header">
              <div className="expertise-icon-chassis">
                <i className={pillar.icon} style={{ color: pillar.accentColor }}></i>
              </div>
              <div>
                <h3 className="expertise-card-title">{pillar.category}</h3>
                <span className="expertise-card-tag">Production Ready</span>
              </div>
            </div>

            <p className="expertise-card-desc">{pillar.description}</p>

            <div className="skills-badge-list">
              {pillar.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-item-badge">
                  <span className="skill-dot" style={{ backgroundColor: pillar.accentColor }}></span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Architectural Guarantee Callout */}
      <div className="architecture-banner">
        <div className="banner-icon-side">
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <div className="banner-text-side">
          <h4>Enterprise Standards Guaranteed</h4>
          <p>
            Every solution is developed adhering to clean code conventions, comprehensive documentation, 
            relational database integrity, and responsive accessibility standards.
          </p>
        </div>
        <div className="banner-action-side">
          <a href="#contact" className="btn-secondary-action">
            Discuss Stack Compatibility
          </a>
        </div>
      </div>
    </section>
  );
}
