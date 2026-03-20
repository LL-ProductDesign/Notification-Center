import React from 'react';
import { color, shadow } from '../design-system/tokens';
import { Avatar } from '../design-system/Avatar';
import { Icon } from '../design-system/Icon';
import { NotificationPanel } from './NotificationPanel';

// Bell SVG (not in icon set, defined inline)
function BellIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6z" />
      <path d="M10 18a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" />
    </svg>
  );
}

function CaretDownIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M8 1.5C8 1.5 5.5 4 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4 10.5 8S8 14.5 8 14.5M1.5 8h13M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function SettingsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

interface NavbarProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
  notificationPanelOpen?: boolean;
  onNotificationClose?: () => void;
  onUnreadCountChange?: (count: number) => void;
}

export function Navbar({
  notificationCount = 2,
  onNotificationClick,
  notificationPanelOpen = false,
  onNotificationClose,
  onUnreadCountChange,
}: NavbarProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 52,
        paddingLeft: 24,
        paddingRight: 24,
        background: color['bg-primary'],
        boxShadow: shadow['page-header'],
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: 24,
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <span style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: color['text-brand'],
          letterSpacing: -0.5,
        }}>
          learnlight
        </span>
      </a>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
        {(['Study', 'Connect', 'Review'] as const).map(label => (
          <NavLink key={label} label={label} />
        ))}
      </nav>

      {/* Right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Language selector */}
        <button style={ghostButtonStyle}>
          <span style={{ fontSize: 13, fontFamily: "'Fira Sans', sans-serif", color: color['text-primary'] }}>
            English
          </span>
          <CaretDownIcon size={11} />
        </button>

        {/* AI / translate icon */}
        <IconButton aria-label="Translate">
          <Icon name="translator" size={18} color={color['text-secondary']} />
        </IconButton>

        {/* Settings */}
        <IconButton aria-label="Settings">
          <SettingsIcon size={18} />
        </IconButton>

        {/* Notification bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={onNotificationClick}
            aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
            style={{
              ...ghostButtonStyle,
              position: 'relative',
              padding: 8,
            }}
          >
            <BellIcon size={18} />
            {notificationCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 4,
                right: 4,
                minWidth: 16,
                height: 16,
                borderRadius: 999,
                background: '#ca2b34',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "'Fira Sans', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                padding: '0 3px',
                boxSizing: 'border-box',
                border: `2px solid ${color['bg-primary']}`,
              }}>
                {notificationCount}
              </span>
            )}
          </button>
          {notificationPanelOpen && onNotificationClose && (
            <NotificationPanel
              onClose={onNotificationClose}
              onUnreadCountChange={onUnreadCountChange}
            />
          )}
        </div>

        {/* User avatar */}
        <button style={{ ...ghostButtonStyle, gap: 6 }}>
          <Avatar initials="AL" size="s" />
          <CaretDownIcon size={11} />
        </button>
      </div>
    </header>
  );
}

function NavLink({ label }: { label: string }) {
  return (
    <button style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 36,
      padding: '0 10px',
      background: 'none',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: 14,
      fontWeight: 400,
      color: color['text-primary'],
    }}>
      {label}
      <CaretDownIcon size={10} />
    </button>
  );
}

function IconButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        padding: 0,
        background: 'none',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        color: color['text-secondary'],
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

const ghostButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '0 8px',
  height: 36,
  background: 'none',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  color: color['text-secondary'],
};
