import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileDown, CheckCircle } from 'lucide-react';

export default function ResumeGenerator() {
  const [roleType, setRoleType] = useState('data'); // 'data' or 'business'

  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Resume Styling and Content Generation
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(11, 18, 32);
    doc.text("Abhyudaya Sinha", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(100, 110, 120);
    doc.text("abhyudayasinha04@gmail.com | linkedin.com/in/abhyudaya-sinha-7035a8373 | github.com/as04-CyberNova", 20, 32);

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 36, 190, 36);

    // Section 1: Professional Target
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(11, 18, 32);
    doc.text("Professional Summary", 20, 46);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const summary = roleType === 'data' 
      ? "Analytical and outcome-driven B.Tech Computer Science student specializing in Relational SQL queries, data wrangling pipelines (Python/Pandas), and high-density KPI visualization dashboards (Power BI & Tableau) to extract actionable business intelligence."
      : "Business-oriented Computer Science student focused on bridging data engineering and strategic planning. Proficient in dashboard metrics modeling, analytical business pipelines, and cohort reporting schemas to identify product growth and cost-saving bottlenecks.";
    
    const splitSummary = doc.splitTextToSize(summary, 170);
    doc.text(splitSummary, 20, 52);

    // Section 2: Technical Skills
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(11, 18, 32);
    doc.text("Technical Core Competencies", 20, 72);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const skillsList = roleType === 'data'
      ? [
          "Databases: SQL, MS SQL Server, Relational schema modeling",
          "Languages & Libraries: Python (Pandas, NumPy, Matplotlib)",
          "BI Tools: Power BI (DAX queries), Tableau Dashboarding, MS Excel (Power Query)",
          "Analysis Focus: Data Cleaning, ETL pipelines, EDA (Exploratory Data Analysis)"
        ]
      : [
          "BI & Reporting: Tableau Public, Power BI Dashboard Design, Advanced Excel Pivots",
          "Analytical Languages: SQL queries, basic Python automation scripts",
          "Business Frameworks: KPI Metrics structuring, Cohort reporting, star-schemas",
          "Soft Competencies: Recruiter reporting templates, data storytelling, agile simulated sprints"
        ];
    
    let y = 78;
    skillsList.forEach(skill => {
      doc.text("• " + skill, 22, y);
      y += 6;
    });

    // Section 3: Professional Experience
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(11, 18, 32);
    doc.text("Experience", 20, 110);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Data Analytics Intern — Codec Technologies", 20, 118);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Ongoing / Current", 160, 118);
    
    const expPoints = [
      "Query large relational tables implementing advanced window functions, subqueries, and table joins.",
      "Design user-friendly dashboard KPIs for business stakeholders to isolate operational bottlenecks.",
      "Clean raw transaction logs using Python (Pandas) to prepare structured tables for analytical loads."
    ];
    let expY = 124;
    expPoints.forEach(point => {
      const splitPoint = doc.splitTextToSize("• " + point, 170);
      doc.text(splitPoint, 20, expY);
      expY += 6;
    });

    // Section 4: Projects
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Featured Case Studies", 20, 154);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Apple Retail Analytics System (Tableau)", 20, 162);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Cleaned transaction databases; visual charts generated AOV spikes of +34% and attachment metrics.", 22, 168);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Hospital Patient Record Analytics (Tableau)", 20, 178);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Designed star schema databases and custom dashboard filters to map clinic patient cancellation rates.", 22, 184);

    doc.save(`Abhyudaya_Sinha_${roleType === 'data' ? 'Data_Analyst' : 'Business_Analyst'}_Resume.pdf`);
  };

  return (
    <div className="resume-generator bento-item" style={{
      background: 'rgba(10, 15, 30, 0.7)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.5rem',
      color: '#fff'
    }}>
      <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
        Tailor Resume Generator
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
        Select a specific profile to adapt Abhyudaya's resume target keywords instantly and download a customized PDF.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
          <input 
            type="radio" 
            name="resumeRole" 
            checked={roleType === 'data'} 
            onChange={() => setRoleType('data')}
            style={{ accentColor: 'var(--accent-primary)' }}
          />
          Data Analyst Track (SQL, Python, ETL Focus)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
          <input 
            type="radio" 
            name="resumeRole" 
            checked={roleType === 'business'} 
            onChange={() => setRoleType('business')}
            style={{ accentColor: 'var(--accent-primary)' }}
          />
          Business Analyst Track (BI, Metrics, Reporting Focus)
        </label>
      </div>

      <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <FileDown size={16} /> GENERATE & DOWNLOAD PDF RESUME
      </button>
    </div>
  );
}
