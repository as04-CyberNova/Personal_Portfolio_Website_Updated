import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, AlertTriangle } from 'lucide-react';

const SKILLS_DATA = [
  { id: 1, name: 'Python', category: 'Programming', level: 'Expert' },
  { id: 2, name: 'SQL', category: 'Databases', level: 'Expert' },
  { id: 3, name: 'Power BI', category: 'Visualization', level: 'Expert' },
  { id: 4, name: 'Tableau', category: 'Visualization', level: 'Intermediate' },
  { id: 5, name: 'Pandas', category: 'Python Libraries', level: 'Expert' },
  { id: 6, name: 'NumPy', category: 'Python Libraries', level: 'Intermediate' },
  { id: 7, name: 'MS SQL Server', category: 'Databases', level: 'Intermediate' },
];

const PROJECTS_DATA = [
  { id: 1, title: 'Apple Retail Analytics', tool: 'Tableau', impact: '+34% AOV' },
  { id: 2, title: 'Covid19 Spread Tracker', tool: 'Python/Power BI', impact: 'Interactive dashboard' },
  { id: 3, title: 'Hospital Patient Analytics', tool: 'Tableau', impact: 'Star schema optimized' },
  { id: 4, title: 'Sentiment Classification', tool: 'Python', impact: 'NLP modeling' }
];

export default function SqlSandbox() {
  const [query, setQuery] = useState('SELECT * FROM skills WHERE level = \'Expert\';');
  const [results, setResults] = useState(SKILLS_DATA.filter(s => s.level === 'Expert'));
  const [columns, setColumns] = useState(['id', 'name', 'category', 'level']);
  const [error, setError] = useState(null);

  const presets = [
    { label: 'All Skills', sql: 'SELECT * FROM skills;' },
    { label: 'Expert Skills', sql: 'SELECT * FROM skills WHERE level = \'Expert\';' },
    { label: 'All Projects', sql: 'SELECT title, tool, impact FROM projects;' },
    { label: 'Tableau Projects', sql: 'SELECT * FROM projects WHERE tool LIKE \'%Tableau%\';' }
  ];

  const handleRun = () => {
    setError(null);
    const cleanSql = query.trim().replace(/\s+/g, ' ').toLowerCase();

    try {
      if (cleanSql.startsWith('select * from skills')) {
        let data = [...SKILLS_DATA];
        if (cleanSql.includes("where level = 'expert'")) {
          data = data.filter(s => s.level === 'Expert');
        } else if (cleanSql.includes("where category = 'databases'")) {
          data = data.filter(s => s.category === 'Databases');
        }
        setColumns(['id', 'name', 'category', 'level']);
        setResults(data);
      } else if (cleanSql.startsWith('select * from projects')) {
        let data = [...PROJECTS_DATA];
        if (cleanSql.includes("tool like '%tableau%'")) {
          data = data.filter(p => p.tool.toLowerCase().includes('tableau'));
        }
        setColumns(['id', 'title', 'tool', 'impact']);
        setResults(data);
      } else if (cleanSql.startsWith('select title, tool, impact from projects')) {
        setColumns(['title', 'tool', 'impact']);
        setResults(PROJECTS_DATA.map(({ title, tool, impact }) => ({ title, tool, impact })));
      } else {
        throw new Error("Syntax Error: Table not found or unsupported query filter. Try selecting from 'skills' or 'projects' table.");
      }
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  };

  const handleReset = () => {
    setQuery('SELECT * FROM skills WHERE level = \'Expert\';');
    setResults(SKILLS_DATA.filter(s => s.level === 'Expert'));
    setColumns(['id', 'name', 'category', 'level']);
    setError(null);
  };

  return (
    <div className="sql-sandbox-wrapper bento-item" style={{
      background: 'rgba(10, 15, 30, 0.7)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
          <Terminal size={20} />
          <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Interactive SQL Sandbox</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleRun} className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Play size={14} /> RUN
          </button>
          <button onClick={handleReset} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <RotateCcw size={14} /> RESET
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {presets.map((preset, idx) => (
          <button 
            key={idx} 
            onClick={() => { setQuery(preset.sql); setError(null); }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer'
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          height: '80px',
          background: '#040814',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          color: '#38bdf8',
          fontSize: '0.9rem',
          padding: '0.8rem',
          resize: 'none',
          marginBottom: '1rem',
          boxSizing: 'border-box'
        }}
      />

      {error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}>
          <AlertTriangle size={16} />
          {error}
        </div>
      ) : (
        <div className="table-responsive" style={{ maxHeight: '180px', overflowY: 'auto', background: '#040814', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                {columns.map(col => (
                  <th key={col} style={{ padding: '0.6rem 0.8rem', textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? results.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  {columns.map(col => (
                    <td key={col} style={{ padding: '0.6rem 0.8rem', color: 'var(--text-secondary)' }}>{row[col]}</td>
                  ))}
                </tr>
              )) : (
                <tr>
                  <td colSpan={columns.length} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No data matched this query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
