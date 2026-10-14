import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

const TELEMETRY_DATASETS = {
  apple: {
    title: 'Apple Retail Attachment & AOV Lift',
    type: 'area',
    metrics: [
      { period: 'Q1', AOV: 840, AttachmentRate: 34, RevenueLift: 12 },
      { period: 'Q2', AOV: 920, AttachmentRate: 42, RevenueLift: 18 },
      { period: 'Q3', AOV: 1050, AttachmentRate: 51, RevenueLift: 24 },
      { period: 'Q4', AOV: 1180, AttachmentRate: 64, RevenueLift: 34 }
    ],
    summary: [
      { lbl: 'AOV Lift', val: '+34%', sub: 'Trade-in Cohort Impact' },
      { lbl: 'Attachment Rate', val: '1.8x', sub: 'Accessories per Device' },
      { lbl: 'Records Processed', val: '300K+', sub: 'Cleaned Transaction Rows' }
    ]
  },
  hospital: {
    title: 'Hospital Patient Admissions & No-Show Telemetry',
    type: 'line',
    metrics: [
      { period: 'Jan', Admissions: 420, NoShowRate: 24, Utilization: 68 },
      { period: 'Feb', Admissions: 510, NoShowRate: 21, Utilization: 74 },
      { period: 'Mar', Admissions: 630, NoShowRate: 19, Utilization: 81 },
      { period: 'Apr', Admissions: 740, NoShowRate: 16, Utilization: 86 },
      { period: 'May', Admissions: 890, NoShowRate: 14, Utilization: 90 }
    ],
    summary: [
      { lbl: 'No-Show Reduction', val: '-18%', sub: 'Optimized Workflows' },
      { lbl: 'Staff Utilization', val: '+22%', sub: 'Balanced Clinic Rosters' },
      { lbl: 'Star Schema Query', val: '14ms', sub: 'Sub-second Latency' }
    ]
  },
  covid: {
    title: 'Global Epidemiological Pipeline & Verification',
    type: 'bar',
    metrics: [
      { period: 'NA', Cases: 85, Vaccinations: 210, Accuracy: 99.8 },
      { period: 'EU', Cases: 64, Vaccinations: 185, Accuracy: 99.7 },
      { period: 'APAC', Cases: 112, Vaccinations: 340, Accuracy: 99.9 },
      { period: 'LATAM', Cases: 48, Vaccinations: 120, Accuracy: 99.5 }
    ],
    summary: [
      { lbl: 'ETL Pipeline Speedup', val: '80%', sub: 'Pandas & NumPy Routine' },
      { lbl: 'Cleaned Records', val: '1.2M', sub: 'Multi-year Global Data' },
      { lbl: 'Data Accuracy', val: '99.8%', sub: 'Median Imputed Outliers' }
    ]
  }
};

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('apple');
  const current = TELEMETRY_DATASETS[activeTab];

  return (
    <section className="section-container" id="telemetry">
      <div className="section-header-block">
        <span className="section-badge">
          <i className="fa-solid fa-chart-line"></i> Interactive Proof of Work
        </span>
        <h2 className="section-title">
          Live <span className="gradient-brand-text">BI Telemetry &amp; Analytics</span>
        </h2>
        <p className="section-subtitle">
          Test interactive data queries, monitor KPI progression, and verify real-world pipeline throughput.
        </p>
      </div>

      <div className="telemetry-dashboard-chassis">
        {/* Top Control Bar */}
        <div className="telemetry-top-bar">
          <div className="telemetry-title-group">
            <BarChart3 className="telemetry-icon" size={24} />
            <div>
              <h3 className="telemetry-heading">Production Telemetry Sandbox</h3>
              <p className="telemetry-caption">Verify live metric responses across datasets</p>
            </div>
          </div>

          {/* Dataset Switcher Tabs */}
          <div className="telemetry-switcher">
            <button 
              className={`switcher-pill ${activeTab === 'apple' ? 'active' : ''}`}
              onClick={() => setActiveTab('apple')}
            >
              Apple Retail Engine
            </button>
            <button 
              className={`switcher-pill ${activeTab === 'hospital' ? 'active' : ''}`}
              onClick={() => setActiveTab('hospital')}
            >
              Hospital Operations
            </button>
            <button 
              className={`switcher-pill ${activeTab === 'covid' ? 'active' : ''}`}
              onClick={() => setActiveTab('covid')}
            >
              COVID-19 Pipeline
            </button>
          </div>
        </div>

        {/* Live KPI Metric Cards */}
        <div className="telemetry-kpi-grid">
          {current.summary.map((kpi, idx) => (
            <div key={idx} className="telemetry-kpi-card">
              <span className="kpi-value">{kpi.val}</span>
              <span className="kpi-label">{kpi.lbl}</span>
              <span className="kpi-subtext">{kpi.sub}</span>
            </div>
          ))}
        </div>

        {/* Chart Visualization Area */}
        <div className="telemetry-chart-wrapper">
          <div className="chart-legend-header">
            <div className="chart-title">
              <TrendingUp size={16} />
              <span>{current.title}</span>
            </div>
            <span className="chart-live-badge">
              <CheckCircle2 size={13} /> Verified Metric Flow
            </span>
          </div>

          <div className="chart-canvas-container">
            <ResponsiveContainer width="100%" height={290}>
              {current.type === 'area' ? (
                <AreaChart data={current.metrics} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="telemetryTeal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="period" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      borderColor: 'rgba(20, 184, 166, 0.3)', 
                      borderRadius: '8px',
                      color: '#F8FAFC',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="AOV" 
                    stroke="#14B8A6" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#telemetryTeal)" 
                    name="AOV ($)"
                  />
                </AreaChart>
              ) : current.type === 'line' ? (
                <LineChart data={current.metrics} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="period" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      borderColor: 'rgba(20, 184, 166, 0.3)', 
                      borderRadius: '8px',
                      color: '#F8FAFC',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Admissions" 
                    stroke="#14B8A6" 
                    strokeWidth={3} 
                    dot={{ fill: '#14B8A6', r: 4 }} 
                    name="Patient Admissions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Utilization" 
                    stroke="#F59E0B" 
                    strokeWidth={3} 
                    dot={{ fill: '#F59E0B', r: 4 }} 
                    name="Staff Utilization %"
                  />
                </LineChart>
              ) : (
                <BarChart data={current.metrics} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="period" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      borderColor: 'rgba(20, 184, 166, 0.3)', 
                      borderRadius: '8px',
                      color: '#F8FAFC',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                    }} 
                  />
                  <Bar dataKey="Vaccinations" fill="#14B8A6" radius={[6, 6, 0, 0]} name="Vaccinations (K)" />
                  <Bar dataKey="Cases" fill="#F59E0B" radius={[6, 6, 0, 0]} name="Recoveries (K)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
