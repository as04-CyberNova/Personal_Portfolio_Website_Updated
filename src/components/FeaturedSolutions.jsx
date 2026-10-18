import React, { useState } from 'react';

const CASE_STUDIES = [
  {
    id: 'apple-retail',
    category: 'bi',
    categoryLabel: 'Retail Intelligence & E-Commerce',
    title: 'Apple Retail Attachment & AOV Optimization Engine',
    tagline: 'Translating 300K+ retail records into high-conversion merchandising and attachment velocity.',
    problem: 'Retail store leadership lacked consolidated visibility into how trade-in promotions directly influenced accessory attachment rates and premium device purchases, leading to misaligned inventory allocations and lost upsell revenue.',
    solution: 'Architected an interactive analytics engine and cohort model in Tableau & Excel. Engineered Power Query transformations to clean transaction logs, established secondary classification metrics for trade-in cohorts, and built dynamic dual-axis charts to trace seasonal purchase velocity.',
    technologies: ['Tableau', 'MS Excel', 'Power Query', 'Star Schema', 'Cohort Analysis'],
    features: [
      'Multi-tiered accessory attachment tracking across individual product lines',
      'Dynamic trade-in cohort segmentation and purchasing behavior analysis',
      'Inventory disparity forecasting with dual-axis seasonality models',
      'Pre-aggregated caching strategy for instant dashboard responsiveness'
    ],
    impact: [
      { val: '+34%', lbl: 'AOV Lift' },
      { val: '1.8x', lbl: 'Attach Rate' },
      { val: '+12%', lbl: 'Revenue Lift' }
    ],
    image: `${import.meta.env.BASE_URL}images/Screenshot 2026-06-03 001716.png`,
    github: 'https://github.com/as04-CyberNova/Tableau-BI-Dashboards',
    demo: 'https://github.com/as04-CyberNova/Tableau-BI-Dashboards',
    lessons: 'Handling 300K+ transaction lines taught me that upstream data transformation and caching in relational models dramatically outperform heavy client-side computations.'
  },
  {
    id: 'hospital-operations',
    category: 'bi',
    categoryLabel: 'Healthcare Operations & Systems',
    title: 'Clinical Capacity & Patient Operations Dashboard',
    tagline: 'Optimizing healthcare provider scheduling and slashing appointment cancellations through relational SQL modeling.',
    problem: 'Multi-specialty clinic operations suffered from severe patient no-shows and unbalanced clinical provider rosters due to fragmented, multi-department relational tables that delayed executive decision-making.',
    solution: 'Engineered an optimized dimensional star schema in SQL and Tableau. Created custom query window functions, established rolling-average admission thresholds, and generated dynamic filter matrices for cross-department workload balancing.',
    technologies: ['SQL Queries', 'Tableau', 'Star Schema', 'Window Functions', 'Relational Normalization'],
    features: [
      'Real-time patient no-show cohort isolation by department and provider',
      'Clinical provider schedule heatmaps and utilization index modeling',
      'Rolling-average admission benchmarks with automatic anomaly alerts',
      'Sub-second query response times across multi-year admission tables'
    ],
    impact: [
      { val: '-18%', lbl: 'No-Show Rate' },
      { val: '+22%', lbl: 'Staff Utilization' },
      { val: '14ms', lbl: 'Query Latency' }
    ],
    image: `${import.meta.env.BASE_URL}images/Hospital_Patient_Record_Analysis_Dashboard.png`,
    github: 'https://github.com/as04-CyberNova/Power-BI-Analytics-Dashboards',
    demo: 'https://github.com/as04-CyberNova/Power-BI-Analytics-Dashboards',
    lessons: 'Demonstrated the power of moving business logic upstream into clean SQL schemas rather than relying on brittle visualization-layer filters.'
  },
  {
    id: 'covid-pipeline',
    category: 'pipeline',
    categoryLabel: 'Automated Pipelines & Data Science',
    title: 'Global Epidemiological Pipeline & Geospatial Telemetry',
    tagline: 'Automating high-volume ETL wrangling and spatial analytics across millions of unformatted data records.',
    problem: 'Multi-source global infection data streams from Johns Hopkins suffered from severe schema drift, missing coordinate values, and duplicate records that distorted critical trend forecasts.',
    solution: 'Constructed an automated Python ETL cleaning pipeline utilizing Pandas and NumPy. Developed regional median imputation routines for coordinate recovery and built interactive geospatial visual telemetry in Power BI.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Power BI', 'Geospatial Analytics', 'Automated ETL'],
    features: [
      'Automated batch ingestion and cleaning of multi-million record CSV streams',
      'Regional median imputation replacing corrupt and null geo-coordinates',
      'Dynamic spatial heatmaps and temporal infection transmission graphs',
      '80% reduction in manual data processing time'
    ],
    impact: [
      { val: '99.8%', lbl: 'Clean Accuracy' },
      { val: '80%', lbl: 'ETL Speedup' },
      { val: '1.2M', lbl: 'Records Cleaned' }
    ],
    image: `${import.meta.env.BASE_URL}images/Covid19_Analysis_Dashboard.png`,
    github: 'https://github.com/as04-CyberNova/COVID-19-Data-Visualization',
    demo: 'https://github.com/as04-CyberNova/COVID-19-Data-Visualization',
    lessons: 'Validated that automated Python data cleansing scripts prevent countless hours of manual spreadsheet repairs and guarantee verifiable dataset integrity.'
  },
  {
    id: 'ai-predictive',
    category: 'ai',
    categoryLabel: 'AI & Full-Stack Platform',
    title: 'Autonomous Anomaly Forecasting & Decision Suite',
    tagline: 'Production-ready predictive intelligence platform detecting transactional anomalies before business impact.',
    problem: 'Traditional batch reporting fails to identify micro-anomalies and customer churn vectors until weeks after revenue leakage has occurred.',
    solution: 'Designed an intelligent decision service combining Scikit-Learn predictive modeling, a fast Python API layer, and an interactive reactive frontend for real-time anomaly detection and parameter simulation.',
    technologies: ['Python', 'FastAPI', 'React', 'Scikit-Learn', 'Docker', 'RESTful API'],
    features: [
      'Real-time anomaly risk scoring engine with adjustable sensitivity bounds',
      'Interactive parameter simulator for testing algorithmic threshold changes',
      'Automated webhook dispatcher notifying operational managers instantly',
      'Containerized deployment architecture built for horizontal scaling'
    ],
    impact: [
      { val: '94.2%', lbl: 'Precision' },
      { val: '<50ms', lbl: 'Inference' },
      { val: '4.5x', lbl: 'Faster Action' }
    ],
    image: `${import.meta.env.BASE_URL}images/hero_brand_visual.jpg`,
    github: 'https://github.com/as04-CyberNova',
    demo: '#telemetry',
    lessons: 'Proved that machine learning only creates business value when paired with a clean, low-friction user interface that non-technical leaders can understand and trust.'
  }
];

export default function FeaturedSolutions() {
  const [filter, setFilter] = useState('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const filteredStudies = CASE_STUDIES.filter(cs => {
    if (filter === 'all') return true;
    return cs.category === filter;
  });

  return (
    <section className="section-container" id="solutions">
      {/* Section Header */}
      <div className="section-header-block">
        <span className="section-badge">
          <i className="fa-solid fa-layer-group"></i> Projects That Deliver Results
        </span>
        <h2 className="section-title">
          Featured <span className="gradient-brand-text">Solutions &amp; Case Studies</span>
        </h2>
        <p className="section-subtitle">
          Real products built to resolve operational bottlenecks, scale revenue, and automate data intelligence.
        </p>

        {/* Filter Navigation */}
        <div className="filter-pill-nav">
          <button 
            className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Solutions ({CASE_STUDIES.length})
          </button>
          <button 
            className={`filter-tab-btn ${filter === 'bi' ? 'active' : ''}`}
            onClick={() => setFilter('bi')}
          >
            Business Intelligence
          </button>
          <button 
            className={`filter-tab-btn ${filter === 'pipeline' ? 'active' : ''}`}
            onClick={() => setFilter('pipeline')}
          >
            Automated Pipelines
          </button>
          <button 
            className={`filter-tab-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            AI &amp; Web Apps
          </button>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="solutions-grid">
        {filteredStudies.map((study) => (
          <div key={study.id} className="case-study-card">
            {/* Visual Header */}
            <div className="case-study-media">
              <img 
                src={study.image} 
                alt={study.title} 
                className="case-study-img" 
                loading="lazy" 
              />
              <div className="case-study-badge">
                {study.categoryLabel}
              </div>
            </div>

            {/* Content Body */}
            <div className="case-study-body">
              <h3 className="case-study-title">{study.title}</h3>
              <p className="case-study-tagline">{study.tagline}</p>

              {/* Problem / Solution Snapshot */}
              <div className="case-study-narrative-box">
                <div className="narrative-mini-item">
                  <span className="narrative-label red-accent">
                    <i className="fa-solid fa-triangle-exclamation"></i> Problem:
                  </span>
                  <p className="narrative-text">{study.problem}</p>
                </div>
                <div className="narrative-mini-item">
                  <span className="narrative-label teal-accent">
                    <i className="fa-solid fa-lightbulb"></i> Solution:
                  </span>
                  <p className="narrative-text">{study.solution}</p>
                </div>
              </div>

              {/* Hard Impact Metrics */}
              <div className="impact-metrics-row">
                {study.impact.map((metric, idx) => (
                  <div key={idx} className="impact-metric-pill">
                    <span className="metric-figure">{metric.val}</span>
                    <span className="metric-desc">{metric.lbl}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Badges */}
              <div className="tech-tags-list">
                {study.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag-item">{tech}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="case-study-actions">
                <button 
                  onClick={() => setSelectedCaseStudy(study)} 
                  className="btn-case-study-primary"
                >
                  <span>Read Full Case Study</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
                <a 
                  href={study.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-case-study-github"
                  title="Inspect Source Code on GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                  <span>Code</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Deep-Dive Modal */}
      {selectedCaseStudy && (
        <div className="modal-backdrop" onClick={() => setSelectedCaseStudy(null)}>
          <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <span className="modal-category">{selectedCaseStudy.categoryLabel}</span>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedCaseStudy(null)}
                aria-label="Close Case Study"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="modal-scrollable-content">
              <h2 className="modal-headline">{selectedCaseStudy.title}</h2>
              <p className="modal-tagline">{selectedCaseStudy.tagline}</p>

              <div className="modal-image-chassis">
                <img 
                  src={selectedCaseStudy.image} 
                  alt={selectedCaseStudy.title} 
                  className="modal-full-img" 
                />
              </div>

              {/* Verified Impact Metrics */}
              <div className="modal-metrics-grid">
                {selectedCaseStudy.impact.map((m, idx) => (
                  <div key={idx} className="modal-metric-card">
                    <span className="modal-metric-value">{m.val}</span>
                    <span className="modal-metric-label">{m.lbl}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Breakdown */}
              <div className="modal-sections-stack">
                <div className="modal-section-block">
                  <h4><i className="fa-solid fa-fire text-amber"></i> The Business &amp; Technical Problem</h4>
                  <p>{selectedCaseStudy.problem}</p>
                </div>

                <div className="modal-section-block">
                  <h4><i className="fa-solid fa-code-merge text-teal"></i> The Solution Architecture</h4>
                  <p>{selectedCaseStudy.solution}</p>
                </div>

                <div className="modal-section-block">
                  <h4><i className="fa-solid fa-list-check text-teal"></i> Key Engineering Features</h4>
                  <ul className="modal-features-list">
                    {selectedCaseStudy.features.map((feat, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-check-circle"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section-block">
                  <h4><i className="fa-solid fa-graduation-cap text-amber"></i> Key Architectural Lesson</h4>
                  <p className="modal-lesson-box">{selectedCaseStudy.lessons}</p>
                </div>

                <div className="modal-section-block">
                  <h4><i className="fa-solid fa-microchip text-teal"></i> Technologies &amp; Frameworks</h4>
                  <div className="tech-tags-list">
                    {selectedCaseStudy.technologies.map((t, idx) => (
                      <span key={idx} className="tech-tag-item">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="modal-footer-cta-row">
                <a 
                  href={selectedCaseStudy.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary-action"
                >
                  <i className="fa-brands fa-github"></i>
                  <span>Inspect Code on GitHub</span>
                </a>
                <button 
                  onClick={() => setSelectedCaseStudy(null)} 
                  className="btn-secondary-action"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
