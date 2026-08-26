import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

const CANDIDATE_SKILLS = [
  { key: "python", label: "Python" },
  { key: "sql", label: "SQL" },
  { key: "ms sql server", label: "MS SQL Server" },
  { key: "power bi", label: "Power BI" },
  { key: "tableau", label: "Tableau" },
  { key: "excel", label: "MS Excel" },
  { key: "pandas", label: "Pandas" },
  { key: "numpy", label: "NumPy" },
  { key: "matplotlib", label: "Matplotlib" },
  { key: "data cleaning", label: "Data Cleaning" },
  { key: "exploratory data analysis", label: "EDA (Exploratory Data Analysis)" },
  { key: "dashboard", label: "Dashboard Design" },
  { key: "business intelligence", label: "Business Intelligence" },
  { key: "kpi reporting", label: "KPI Reporting" },
  { key: "reporting", label: "Reporting" },
  { key: "etl", label: "ETL Processes" },
  { key: "data visualization", label: "Data Visualization" }
];

export default function AtsMatcher() {
  const [jobDesc, setJobDesc] = useState('');
  const [score, setScore] = useState(null);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [calculating, setCalculating] = useState(false);

  const handleMatch = () => {
    const text = jobDesc.trim().toLowerCase();
    if (!text) {
      alert("Please paste a Job Description first!");
      return;
    }

    setCalculating(true);

    setTimeout(() => {
      let matched = [];
      let unmatched = [];

      CANDIDATE_SKILLS.forEach(skill => {
        const cleanKey = skill.key.toLowerCase();
        if (text.includes(cleanKey)) {
          matched.push(skill.label);
        } else {
          unmatched.push(skill.label);
        }
      });

      let matchRatio = matched.length / CANDIDATE_SKILLS.length;
      let finalScore = Math.round(matchRatio * 100);
      if (finalScore < 20 && text.length > 50) {
        finalScore = 35;
      }
      if (finalScore > 95) {
        finalScore = 98;
      }

      setScore(finalScore);
      setMatchedSkills(matched);
      setMissingSkills(unmatched);
      setCalculating(false);
    }, 1000);
  };

  return (
    <div className="ats-matcher bento-item" style={{
      background: 'rgba(10, 15, 30, 0.7)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.5rem',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
        <Calculator size={20} />
        <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>ATS Keyword Matcher Engine</h3>
      </div>
      
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Paste a data/business analyst job description below to check the real-time ATS match rating.
      </p>

      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Paste job description here..."
        style={{
          width: '100%',
          height: '100px',
          background: '#040814',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontSize: '0.85rem',
          padding: '0.8rem',
          resize: 'none',
          marginBottom: '1rem',
          boxSizing: 'border-box'
        }}
      />

      <button onClick={handleMatch} disabled={calculating} className="btn-primary" style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        {calculating ? (
          <>
            <span className="fa-solid fa-circle-notch fa-spin"></span> CALCULATING MATCH...
          </>
        ) : (
          <>
            <Calculator size={16} /> CALCULATE SCORE
          </>
        )}
      </button>

      {score !== null && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>ATS Compatibility:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: score > 70 ? '#10b981' : '#f59e0b' }}>{score}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ width: `${score}%`, height: '100%', background: score > 70 ? '#10b981' : '#f59e0b', transition: 'width 0.5s ease-in-out' }}></div>
          </div>

          <div className="ats-action-grid">
            <div>
              <h5 style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={12} /> Matched ({matchedSkills.length})
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {matchedSkills.length > 0 ? matchedSkills.map(skill => (
                  <span key={skill} className="skill-pill matched" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>{skill}</span>
                )) : <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None matched yet</span>}
              </div>
            </div>

            <div>
              <h5 style={{ fontSize: '0.8rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                <AlertCircle size={12} /> Skills Offered ({missingSkills.length})
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {missingSkills.length > 0 ? missingSkills.map(skill => (
                  <span key={skill} className="skill-pill missing" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }}>{skill}</span>
                )) : <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None missing</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
