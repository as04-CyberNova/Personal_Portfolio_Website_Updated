import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Layers, PieChart } from 'lucide-react';

const DATASETS = {
  apple: {
    title: 'Apple Retail Attachment & AOV Lift',
    type: 'area',
    metrics: [
      { month: 'Q1', AOV: 840, AttachmentRate: 34, RevenueLift: 12 },
      { month: 'Q2', AOV: 920, AttachmentRate: 42, RevenueLift: 18 },
      { month: 'Q3', AOV: 1050, AttachmentRate: 51, RevenueLift: 24 },
      { month: 'Q4', AOV: 1180, AttachmentRate: 64, RevenueLift: 34 }
    ],
    summary: [
      { lbl: 'AOV Lift', val: '+34%', sub: 'Trade-in Cohort' },
      { lbl: 'Attach Rate', val: '1.8x', sub: 'Accessories per Device' },
      { lbl: 'Total Records', val: '300K+', sub: 'Retail Transactions' }
    ]
  },
  hospital: {
    title: 'Hospital Admission & Cancellation Telemetry',
    type: 'line',
    metrics: [
      { month: 'Jan', Admissions: 420, NoShowRate: 24, Utilization: 68 },
      { month: 'Feb', Admissions: 510, NoShowRate: 21, Utilization: 74 },
      { month: 'Mar', Admissions: 630, NoShowRate: 19, Utilization: 81 },
      { month: 'Apr', Admissions: 740, NoShowRate: 16, Utilization: 86 },
      { month: 'May', Admissions: 890, NoShowRate: 14, Utilization: 90 }
    ],
    summary: [
      { lbl: 'No-Show Reduction', val: '-18%', sub: 'Optimization' },
      { lbl: 'Staff Utilization', val: '+22%', sub: 'Schedule Efficiency' },
      { lbl: 'Load Time', val: '14ms', sub: 'Star Schema Query' }
    ]
  },
  covid: {
    title: 'Global Infection & Vaccine Pipeline Analytics',
    type: 'bar',
    metrics: [
      { region: 'NA', Cases: 85, Vaccinations: 210, Accuracy: 99.8 },
      { region: 'EU', Cases: 64, Vaccinations: 185, Accuracy: 99.7 },
      { region: 'APAC', Cases: 112, Vaccinations: 340, Accuracy: 99.9 },
      { region: 'LATAM', Cases: 48, Vaccinations: 120, Accuracy: 99.5 }
    ],
    summary: [
      { lbl: 'ETL Speed Boost', val: '80%', sub: 'Python Scripting' },
      { lbl: 'Cleaned Records', val: '1.2M', sub: 'Automated Pipeline' },
      { lbl: 'Accuracy', val: '99.8%', sub: 'Normalized Median' }
    ]
  }
};

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('apple');
  const current = DATASETS[activeTab];

  return (
    <div className="analytics-dashboard bento-item" style={{
      background: 'rgba(15, 23, 42, 0.75)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.8rem',
      color: '#fff',
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-primary)' }}>
          <BarChart3 size={22} />
          <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Interactive BI Telemetry</h3>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.3rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <button 
            onClick={() => setActiveTab('apple')} 
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'apple' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'apple' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Apple Retail
          </button>
          <button 
            onClick={() => setActiveTab('hospital')} 
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'hospital' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'hospital' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Hospital Patients
          </button>
          <button 
            onClick={() => setActiveTab('covid')} 
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'covid' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'covid' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            COVID-19 Pipeline
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {current.summary.map((s, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)', display: 'block', fontFamily: 'var(--font-heading)' }}>{s.val}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginTop: '0.2rem' }}>{s.lbl}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div style={{ width: '100%', height: 260 }}>
        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <TrendingUp size={14} /> {current.title}
        </h4>
        <ResponsiveContainer>
          {current.type === 'area' ? (
            <AreaChart data={current.metrics}>
              <defs>
                <linearGradient id="colorAOV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="AOV" stroke="#6366f1" fillOpacity={1} fill="url(#colorAOV)" strokeWidth={2} />
            </AreaChart>
          ) : current.type === 'line' ? (
            <LineChart data={current.metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="Admissions" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
              <Line type="monotone" dataKey="Utilization" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          ) : (
            <BarChart data={current.metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="region" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Bar dataKey="Vaccinations" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Cases" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

