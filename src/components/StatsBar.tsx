import React from 'react';
import { color, shadow, radius } from '../design-system/tokens';

interface StatCardProps {
  label: string;
  value: string;
  chart: React.ReactNode;
}

function StatCard({ label, value, chart }: StatCardProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: 1,
      background: color['bg-primary'],
      border: `1px solid ${color['border-primary']}`,
      borderRadius: radius['cards'],
      padding: '12px 16px',
      boxShadow: shadow['card'],
    }}>
      <div>
        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          color: color['text-secondary'],
          marginBottom: 4,
          lineHeight: 1,
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 24,
          fontWeight: 600,
          color: color['text-primary'],
          lineHeight: 1,
        }}>
          {value}
        </p>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {chart}
      </div>
    </div>
  );
}

// Simple bar chart for course progress
function ProgressBarChart({ percent }: { percent: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
      {[100, 75, 60, 85, 55, 70, 40].map((h, i) => (
        <div key={i} style={{
          width: 8,
          height: h * 0.4,
          borderRadius: 2,
          background: i < Math.round(percent / 14) ? color['text-brand'] : color['border-primary'],
        }} />
      ))}
    </div>
  );
}

// Donut chart for average score
function DonutChart({ percent, color: chartColor }: { percent: number; color: string }) {
  const r = 18;
  const cx = 22;
  const cy = 22;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={44} height={44} viewBox="0 0 44 44">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color['border-primary']} strokeWidth={5} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={chartColor}
        strokeWidth={5}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

// Bar chart for attendance
function AttendanceChart() {
  const bars = [80, 60, 90, 44, 70, 50, 85];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: 8,
          height: h * 0.35,
          borderRadius: 2,
          background: i === 3 ? color['text-brand'] : color['border-primary'],
        }} />
      ))}
    </div>
  );
}

export function StatsBar() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <StatCard
        label="Course progress"
        value="55%"
        chart={<ProgressBarChart percent={55} />}
      />
      <StatCard
        label="Average score"
        value="55%"
        chart={<DonutChart percent={55} color={color['text-brand']} />}
      />
      <StatCard
        label="Attendance"
        value="44%"
        chart={<AttendanceChart />}
      />
    </div>
  );
}
