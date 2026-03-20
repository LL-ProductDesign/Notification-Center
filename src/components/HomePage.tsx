import { useState } from 'react';
import { color } from '../design-system/tokens';
import { Navbar } from './Navbar';
import { StatsBar } from './StatsBar';
import { ActivityCard, PrepareClassIllustration, ReviewReportIllustration } from './ActivityCard';
import { NextClassWidget } from './NextClassWidget';
import { ProgramDetailsWidget } from './ProgramDetailsWidget';

export function HomePage() {
  const [notifCount, setNotifCount] = useState(2);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: color['bg-secondary'],
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Fira Sans', sans-serif",
    }}>
      <Navbar
        notificationCount={notifCount}
        onNotificationClick={() => setPanelOpen(o => !o)}
        notificationPanelOpen={panelOpen}
        onNotificationClose={() => setPanelOpen(false)}
        onUnreadCountChange={setNotifCount}
      />

      <main style={{ flex: 1, padding: '0 64px 16px' }}>
        {/* Welcome header row — title+subtitle on left, stats bar on right */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 0',
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: 26,
              fontWeight: 600,
              color: color['text-primary'],
              margin: 0,
              lineHeight: '40px',
            }}>
              Welcome, Alex!
            </h1>
            <p style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: color['text-primary'],
              margin: 0,
              lineHeight: '24px',
            }}>
              You have new items to complete today, selected specifically for you
            </p>
          </div>

          <StatsBar />
        </div>

        {/* Activity cards + right widgets area */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '0 0 16px' }}>
          {/* Left column — activity cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <ActivityCard
              illustration={<PrepareClassIllustration />}
              title="Prepare an upcoming class"
              description="Complete at least one of the activities prepared by your trainer for your class on Wednesday, 12 November at 13:30"
              meta="Estimated time: up to 15 minutes"
              buttonLabel="Prepare Class"
              buttonVariant="primary"
            />

            <ActivityCard
              illustration={<ReviewReportIllustration />}
              title="Review your class report"
              description="View your trainer's feedback from your class on Monday, 3 November at 11:00"
              meta="Estimated time: up to 15 minutes"
              buttonLabel="Review report"
              buttonVariant="secondary"
            />
          </div>

          {/* Right column — widgets */}
          <div style={{
            width: 312,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            <NextClassWidget />
            <ProgramDetailsWidget />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${color['border-primary']}`,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: color['bg-primary'],
      }}>
        <span style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 12,
          color: color['text-secondary'],
        }}>
          ©2025 Learnlight. All Rights Reserved
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#" style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-brand'], textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-brand'], textDecoration: 'none' }}>Cookies</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-secondary'] }}>
              🌐 EN ▾
            </span>
            <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-secondary'] }}>
              Powered by: <strong style={{ color: color['text-brand'] }}>learnlight</strong>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
