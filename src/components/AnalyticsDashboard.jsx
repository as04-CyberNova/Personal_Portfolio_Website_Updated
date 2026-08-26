import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

const TRAFFIC_DATA = [
  { name: 'Jan', Views: 120, Downloads: 15 },
  { name: 'Feb', Views: 210, Downloads: 34 },
  { name: 'Mar', Views: 340, Downloads: 67 },
  { name: 'Apr', Views: 410, Downloads: 89 },
  { name: 'May', Views: 580, Downloads: 142 },
  { name: 'Jun', Views: 720, Downloads: 188 }
];

const SOURCE_DATA = [
  { source: 'LinkedIn', Sessions: 420 },
  { source: 'GitHub', Sessions: 280 },
  { source: 'Direct', Sessions: 140 },
  { source: 'Search', Sessions: 60 }
];

export default function AnalyticsDashboard() {
  return (
    <div className="analytics-dashboard bento-item" style={{
      background: 'rgba(10, 15, 30, 0.7)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.5rem',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
        <BarChart3 size={20} />
        <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Portfolio Self-Analytics</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', minHeight: '300px' }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <TrendingUp size={14} /> Views & Resume Downloads Trend
          </h4>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <LineChart data={TRAFFIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid var(--border)' }} />
                <Line type="monotone" dataKey="Views" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} />
                <Line type="monotone" dataKey="Downloads" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Users size={14} /> Traffic Channels (Sessions)
          </h4>
          <div style={{ width: '100%', height: 160 }}>
            <ResponsiveContainer>
              <BarChart data={SOURCE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis dataKey="source" type="category" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid var(--border)' }} />
                <Bar dataKey="Sessions" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
