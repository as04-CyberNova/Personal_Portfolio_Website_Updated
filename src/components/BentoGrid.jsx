import React, { useState, useEffect } from 'react';
import SqlSandbox from './SqlSandbox';
import AnalyticsDashboard from './AnalyticsDashboard';
import ResumeGenerator from './ResumeGenerator';
import AtsMatcher from './AtsMatcher';
import ContactForm from './ContactForm';

export default function BentoGrid({ recruiterMode }) {
  const [projectFilter, setProjectFilter] = useState('all');
  const [copiedText, setCopiedText] = useState(null);

  // Projects data matching original files
  const projects = [
    {
      id: 'apple',
      title: 'Apple Retail Analytics Dashboard',
      tech: 'Tableau & Excel',
      techClass: 'filter-tab filter-py',
      tagClass: 'tag-tab',
      iconClass: 'fa-solid fa-table-columns',
      demo: 'Dashboard storytelling & analytical interpretation',
      problem: 'Apple retail stores lacked consolidated visibility into how trade-in promotions directly influenced accessory attachment rates and high-value product sales, leading to misaligned inventory.',
      dataset: 'Simulated transactional database of 300,000+ retail records containing product lines, discount codes, customer type markers, and trade-in valuations.',
      tools: ['Tableau', 'MS Excel', 'Power Query'],
      approach: 'Cleaned transaction logs using Power Query, verified database relationship integrity, created secondary classification metrics for trade-in cohorts, and designed dynamic dual-axis charts to trace seasonal purchase spikes.',
      kpis: [
        { val: '+34%', lbl: 'AOV Increase' },
        { val: '1.8x', lbl: 'Attachment Rate' },
        { val: '+12%', lbl: 'Revenue Lift' }
      ],
      lessons: 'Handled high record counts directly in Tableau; learned that caching strategies and pre-aggregating data in Excel significantly improves dashboard load times and visual transition responsiveness.',
      repoLink: 'https://github.com/as04-CyberNova/Tableau-BI-Dashboards',
      imgSrc: 'images/Screenshot 2026-06-03 001716.png'
    },
    {
      id: 'hospital',
      title: 'Hospital Patient Record Analysis Dashboard',
      tech: 'Tableau & SQL',
      techClass: 'filter-tab',
      tagClass: 'tag-tab',
      iconClass: 'fa-solid fa-table-columns',
      demo: 'Multi-table schema relational modeling',
      problem: 'Clinic operations managers struggled to isolate patient appointment cancellations by provider and department in real-time, resulting in unoptimized doctor schedules.',
      dataset: 'Fictional patient cohort transaction records spanning 2 years of admissions, clinical diagnosis codes, discharge states, and billing fees.',
      tools: ['Tableau', 'SQL Queries', 'Star Schema modeling'],
      approach: 'Constructed an optimized dimensional star schema, established custom query measures for admission rolling averages, and developed dynamic filter matrices to track department workload variations.',
      kpis: [
        { val: '-18%', lbl: 'No-Show Rate' },
        { val: '+22%', lbl: 'Staff Utilization' },
        { val: '14s', lbl: 'Report Load Speed' }
      ],
      lessons: 'Understood standard normalizations. Realized that computing heavy column metrics upstream in relational SQL tables is far faster than relying purely on client-side visual aggregations.',
      repoLink: 'https://github.com/as04-CyberNova/Power-BI-Analytics-Dashboards',
      imgSrc: 'images/Hospital_Patient_Record_Analysis_Dashboard.png'
    },
    {
      id: 'covid',
      title: 'COVID-19 Analytics Dashboard',
      tech: 'Power BI, Excel & Python',
      techClass: 'filter-pbi filter-py',
      tagClass: 'tag-pbi',
      iconClass: 'fa-solid fa-chart-line',
      demo: 'Wrangling messy raw CSV records into normalized views',
      problem: 'Legacy COVID-19 dataset streams contained misaligned region entries, missing coordinate values, and duplicate case entries, skewing global infection trends.',
      dataset: 'Johns Hopkins University global vaccine, recovery, and death records containing millions of unstructured daily data arrays.',
      tools: ['Python', 'Pandas', 'NumPy', 'Power BI'],
      approach: 'Developed automated Python ETL cleaning scripts, replaced empty cells with regional median statistics, mapped coordinate ranges, and plotted dynamic spatial maps in Power BI.',
      kpis: [
        { val: '99.8%', lbl: 'Clean Data Accuracy' },
        { val: '80%', lbl: 'ETL Speed Boost' },
        { val: '1.2M', lbl: 'Cleaned Records' }
      ],
      lessons: 'Learned the importance of automation. Scripting Python routines to automatically filter data saves hours compared to manual spreadsheet cleans.',
      repoLink: 'https://github.com/as04-CyberNova/COVID-19-Data-Visualization',
      imgSrc: 'images/Covid19_Analysis_Dashboard.png'
    }
  ];

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const filteredProjects = projects.filter(p => {
    if (projectFilter === 'all') return true;
    return p.techClass.includes(`filter-${projectFilter}`);
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-card-frame">
          <div className="hero-content">
            <p className="hero-label"><i className="fa-solid fa-database"></i> DATA ANALYST | BUSINESS ANALYST</p>
            
            <h1 className="hero-main-title">
              Abhyudaya <em>Sinha</em>
            </h1>
            <p className="hero-subtitle-p">Python • SQL • Power BI • Tableau • Data Science</p>
            
            <div className="hero-meta-info">
              <span className="meta-pill"><i className="fa-solid fa-graduation-cap"></i> B.Tech CSE (Data Science) Student</span>
              <span className="meta-pill open-to-work"><span className="h-dot"></span> Seeking Data / Business Analytics Internships</span>
              <span className="meta-pill location-pill"><i className="fa-solid fa-location-dot"></i> India &middot; Open to Remote</span>
            </div>
            
            <p className="hero-description">
              Translating complex datasets into actionable business intelligence. Specialized in clean SQL query architecture, automated Python pipelines, and dynamic interactive dashboard systems (Power BI & Tableau) to drive data-driven decision making.
            </p>
            
            <div className="hero-btns-grid">
              <a href="#projects" className="btn-primary"><i class="fa-solid fa-chart-line"></i> View Projects</a>
              <a href="AbhyudayaSinha Resume.pdf" download="Abhyudaya_Sinha_Resume.pdf" className="btn-secondary"><i class="fa-solid fa-file-pdf"></i> Download Resume</a>
              <a href="#contact" className="btn-secondary"><i class="fa-solid fa-envelope"></i> Contact Me</a>
              <a href="https://github.com/as04-CyberNova" target="_blank" rel="noopener noreferrer" className="btn-secondary"><i class="fab fa-github"></i> GitHub</a>
            </div>

            <div className="h-stats">
              <div className="hst"><span className="hst-n">1K<span>+</span></span><span className="hst-l">LinkedIn Followers</span></div>
              <div className="hst"><span className="hst-n">14<span>+</span></span><span className="hst-l">GitHub Repositories</span></div>
              <div className="hst"><span className="hst-n">5<span>+</span></span><span className="hst-l">Projects Built</span></div>
              <div className="hst"><span className="hst-n">6<span>+</span></span><span className="hst-l">SQL Optimizations</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter Highlight Header */}
      {recruiterMode && (
        <section id="recruiter-fast-track" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '2px solid var(--accent-primary)', borderRadius: '16px', padding: '1.5rem', margin: '2rem auto', maxWidth: '1200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
            <i className="fa-solid fa-bolt" style={{ fontSize: '1.5rem' }}></i>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>Recruiter Fast-Track Dashboard</h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
            Welcome! This panel aggregates Abhyudaya's resume builder, custom SQL capabilities, and chatbot features to speed up your vetting process.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <ResumeGenerator />
            <AtsMatcher />
          </div>
        </section>
      )}

      {/* Recruiter Snapshot */}
      <section id="recruiter-snapshot">
        <div className="section-head">
          <p><i className="fa-solid fa-bolt"></i> FAST SUMMARY</p>
          <h2>Recruiter Snapshot</h2>
        </div>
        <div className="snapshot-grid">
          <div className="snapshot-card bento-item">
            <div className="snapshot-icon"><i className="fa-solid fa-bullseye"></i></div>
            <div className="snapshot-info">
              <h3>Role Target</h3>
              <p>Data Analytics Intern</p>
            </div>
          </div>
          <div className="snapshot-card bento-item">
            <div className="snapshot-icon"><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <div className="snapshot-info">
              <h3>Core Tools</h3>
              <p>Python, SQL, Power BI, Tableau</p>
            </div>
          </div>
          <div className="snapshot-card bento-item">
            <div className="snapshot-icon"><i className="fa-solid fa-chart-pie"></i></div>
            <div className="snapshot-info">
              <h3>Focus Areas</h3>
              <p>Dashboards, BI, Data Viz, Reporting</p>
            </div>
          </div>
          <div className="snapshot-card bento-item">
            <div className="snapshot-icon"><i className="fa-solid fa-briefcase"></i></div>
            <div className="snapshot-info">
              <h3>Current Experience</h3>
              <p>Data Intern at Codec Tech + Industry Simulations</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="section-head">
          <p><i className="fa-solid fa-user"></i> PROFESSIONAL BRIEF</p>
          <h2>About Me</h2>
        </div>
        
        <div className="about-grid-container">
          <div className="about-card bento-item">
            <div className="about-content" style={{ maxWidth: '950px', margin: '0 auto' }}>
              <p className="about-body-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                I am a B.Tech CSE (Data Science) student focused on translating raw data streams into actionable business intelligence. Through academic studies, industry simulations, and hands-on internship projects at Codec Technologies, I build scalable data pipelines, clean messy files, and design executive dashboards that isolate bottlenecks and highlight growth.
              </p>
              
              <div className="about-competencies-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="about-comp-card">
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-brands fa-python"></i> Data Pipeline Automation</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Structuring clean, reusable Python code to automate ETL tasks. Proficient in NumPy and Pandas for data wrangling, handling missing values, profiling distributions, and preprocessing data for analytical modeling.</p>
                </div>
                
                <div className="about-comp-card">
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-database"></i> Relational SQL Modeling</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Querying large databases with complex SQL. Skilled in implementing window functions (ranking, partition cohorts), recursive CTEs, subqueries, and table joins to transform transactional data into structured reports.</p>
                </div>
                
                <div className="about-comp-card">
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chart-column"></i> BI & KPI Visualization</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Translating business requirements into dynamic visual stories in Tableau and Power BI. Experienced in custom DAX modeling, parameter-driven toggles, star-schema optimization, and operational dashboards.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="different-card bento-item">
            <h3 className="different-head">What Makes Me Different</h3>
            <div className="different-list">
              <div className="diff-item">
                <span className="diff-icon">📈</span>
                <div>
                  <div className="diff-h">Analyst, not just a coder</div>
                  <div className="diff-p">I bridge raw data and business logic—querying and cleaning to drive actual revenue and operational metrics.</div>
                </div>
              </div>
              <div className="diff-item">
                <span className="diff-icon">🛡️</span>
                <div>
                  <div className="diff-h">Relational database focus</div>
                  <div className="diff-p">Writing clean, normalized SQL query architectures (CTEs, window functions) to prevent downstream reporting lag.</div>
                </div>
              </div>
              <div className="diff-item">
                <span className="diff-icon">🎨</span>
                <div>
                  <div className="diff-h">Eye-friendly visual design</div>
                  <div className="diff-p">Building high-contrast, premium, and accessible Tableau & Power BI dashboards that communicate stats without visual fatigue.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SQL Sandbox & Analytics Section */}
      <section id="interactive-data-panels" style={{ padding: '2rem 0' }}>
        <div className="section-head">
          <p><i className="fa-solid fa-code"></i> PLAYABLE INTELLIGENCE</p>
          <h2>Interactive SQL Sandbox & Portfolio Analytics</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <SqlSandbox />
          <AnalyticsDashboard />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="section-head">
          <p><i className="fa-solid fa-layer-group"></i> COMPETENCY INDEX</p>
          <h2>Skills & Technologies</h2>
        </div>
        <div className="skills-grid-new">
          <div className="skills-card">
            <h3><i className="fa-solid fa-code"></i> Programming</h3>
            <div className="skills-list-tags">
              <span className="skill-pill">Python</span>
            </div>
          </div>
          <div className="skills-card">
            <h3><i className="fa-solid fa-database"></i> Databases</h3>
            <div className="skills-list-tags">
              <span className="skill-pill">SQL</span>
              <span className="skill-pill">MS SQL Server</span>
            </div>
          </div>
          <div className="skills-card">
            <h3><i className="fa-solid fa-chart-column"></i> BI & Visualization</h3>
            <div className="skills-list-tags">
              <span className="skill-pill">Power BI</span>
              <span className="skill-pill">Tableau</span>
              <span className="skill-pill">Excel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="section-head">
          <p><i className="fa-solid fa-chart-line"></i> CASE STUDY SHOWCASE</p>
          <h2>Featured Analytics Case Studies</h2>
          <div className="hud-filter-controls">
            <button className={`filter-btn ${projectFilter === 'all' ? 'active' : ''}`} onClick={() => setProjectFilter('all')}>ALL</button>
            <button className={`filter-btn ${projectFilter === 'pbi' ? 'active' : ''}`} onClick={() => setProjectFilter('pbi')}>POWER BI</button>
            <button className={`filter-btn ${projectFilter === 'tab' ? 'active' : ''}`} onClick={() => setProjectFilter('tab')}>TABLEAU</button>
            <button className={`filter-btn ${projectFilter === 'py' ? 'active' : ''}`} onClick={() => setProjectFilter('py')}>PYTHON</button>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card bento-item">
              <div className="project-image-placeholder">
                <img src={project.imgSrc} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="proj-card-body" style={{ padding: '1.5rem' }}>
                <span className={`tag ${project.tagClass || 'tag-tab'}`}><i className={project.iconClass}></i> {project.tech}</span>
                <h3 style={{ margin: '0.8rem 0 0.4rem', fontSize: '1.25rem' }}>{project.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{project.demo}</p>
                <details className="case-study-details">
                  <summary className="case-study-trigger" style={{ cursor: 'pointer', outline: 'none', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    VIEW DETAILED CASE STUDY
                  </summary>
                  <div className="case-study-content" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}><strong>Problem Statement:</strong> {project.problem}</p>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}><strong>Dataset & Context:</strong> {project.dataset}</p>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}><strong>Tools:</strong> {project.tools.join(', ')}</p>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}><strong>Analytical Approach:</strong> {project.approach}</p>
                    <div className="kpi-cards-grid" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      {project.kpis.map((kpi, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem', flex: 1, textAlign: 'center' }}>
                          <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{kpi.val}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{kpi.lbl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" style={{ padding: '4rem 0' }}>
        <div className="section-head">
          <p><i className="fa-solid fa-file-invoice"></i> TALENT ACQUISITION</p>
          <h2>Vetting & Credentials</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <ResumeGenerator />
          <AtsMatcher />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '4rem 0' }}>
        <div className="section-head">
          <p><i className="fa-solid fa-envelope"></i> LET'S CONNECT</p>
          <h2>Initiate Collaboration</h2>
        </div>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
