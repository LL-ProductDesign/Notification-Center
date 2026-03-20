import { useEffect, useRef, useState } from 'react';
import { color, shadow, radius } from '../design-system/tokens';
import { UnderlineTabs } from '../design-system/UnderlineTabs';
import { LearnlightButton } from '../design-system/LearnlightButton';

// ─── Types ────────────────────────────────────────────────────────────────────

type TagVariant = 'error' | 'warning' | 'info';
type TabId = 'all' | 'unread' | 'today';

interface Notification {
  id: string;
  tagVariant: TagVariant;
  tagLabel: string;
  timestamp: string;
  body: string;
  actionLabel: string;
  unread: boolean;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    tagVariant: 'error',
    tagLabel: '6 classes to schedule',
    timestamp: '13:51',
    body: 'You have 6 more classes to schedule! Make sure you find the best trainer by scheduling ahead!',
    actionLabel: 'Schedule class',
    unread: true,
  },
  {
    id: '2',
    tagVariant: 'warning',
    tagLabel: 'Class cancelled',
    timestamp: '2h ago',
    body: 'Your class on Tuesday, 13 January at 13:30 was cancelled by your trainer.',
    actionLabel: 'View class details',
    unread: true,
  },
  {
    id: '3',
    tagVariant: 'warning',
    tagLabel: 'Favorite trainer booking fast',
    timestamp: 'Yesterday',
    body: 'Your favorite trainer will be fully booked soon! Schedule your remaining classes now!',
    actionLabel: 'View calendar',
    unread: false,
  },
  {
    id: '4',
    tagVariant: 'warning',
    tagLabel: 'Session in 2 days',
    timestamp: 'Thu 13:20',
    body: "You have a session in 2 days. Can you make it? Make sure you avoid being marked as absent, if cancelling too late.",
    actionLabel: 'View class details',
    unread: false,
  },
  {
    id: '5',
    tagVariant: 'info',
    tagLabel: 'Share your feedback',
    timestamp: 'Sun 08/01',
    body: "Help us improve! Answer a couple of questions about the platform and you'll make our day better!",
    actionLabel: 'Access survey',
    unread: false,
  },
  {
    id: '6',
    tagVariant: 'error',
    tagLabel: 'New message from tutor',
    timestamp: '24/12/2025',
    body: 'You have a new message from your tutor. Check it now!',
    actionLabel: 'Access tutor support',
    unread: false,
  },
];

// ─── Tag styles per variant ───────────────────────────────────────────────────

const TAG_STYLES: Record<TagVariant, { bg: string; border: string; textColor: string }> = {
  error: {
    bg: '#fef5f5',
    border: '#fcdfe0',
    textColor: color['text-error'],
  },
  warning: {
    bg: '#fffbf5',
    border: '#fef1dc',
    textColor: color['text-warning'],
  },
  info: {
    bg: color['bg-info'],
    border: '#e3f4fd',
    textColor: color['text-brand'],
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M12 4L4 12M4 4l8 8" stroke={color['text-secondary']} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DotsMenuIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={color['text-secondary']} aria-hidden>
      <circle cx="6" cy="2" r="1.2" />
      <circle cx="6" cy="6" r="1.2" />
      <circle cx="6" cy="10" r="1.2" />
    </svg>
  );
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function UnreadDot() {
  return (
    <span style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: color['text-brand'],
      flexShrink: 0,
      display: 'inline-block',
    }} />
  );
}

function Tag({ variant, label }: { variant: TagVariant; label: string }) {
  const s = TAG_STYLES[variant];
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 22,
      padding: '4px 8px',
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: radius['interactive'],
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        color: s.textColor,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        lineHeight: '14px',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

function NotificationItem({
  item,
  onMarkRead,
}: {
  item: Notification;
  onMarkRead: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const bgDefault = item.unread ? '#e3f4fd' : color['bg-primary'];
  const bgHover   = item.unread ? '#d8eef9' : color['bg-secondary'];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 12,
        background: hovered ? bgHover : bgDefault,
        borderTop: '1px solid ' + color['border-primary'],
        transition: 'background 0.12s',
      }}
    >
      {/* Top row: dot + tag + timestamp */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {item.unread && <UnreadDot />}
          <Tag variant={item.tagVariant} label={item.tagLabel} />
        </div>
        <span style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          color: color['text-secondary'],
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          lineHeight: '14px',
          paddingLeft: 8,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {item.timestamp}
        </span>
      </div>

      {/* Body */}
      <p style={{
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 14,
        fontWeight: item.unread ? 600 : 400,
        color: color['text-primary'],
        lineHeight: '18px',
        margin: 0,
      }}>
        {item.body}
      </p>

      {/* Bottom: action + dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => onMarkRead(item.id)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            height: 24,
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: color['text-brand'],
            cursor: 'pointer',
            textTransform: 'capitalize',
            lineHeight: '18px',
          }}
        >
          {item.actionLabel}
        </button>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          background: 'none',
          border: 'none',
          borderRadius: radius['interactive'],
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
        }}>
          <DotsMenuIcon size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────

interface NotificationPanelProps {
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

export function NotificationPanel({ onClose, onUnreadCountChange }: NotificationPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);

  // Click-outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // Notify parent of unread count changes
  useEffect(() => {
    const count = notifications.filter(n => n.unread).length;
    onUnreadCountChange?.(count);
  }, [notifications, onUnreadCountChange]);

  function markAllRead() {
    setNotifications(ns => ns.map(n => ({ ...n, unread: false })));
  }

  function markRead(id: string) {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, unread: false } : n));
  }

  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'today') return ['13:51', '2h ago'].includes(n.timestamp);
    return true;
  });

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        width: 420,
        maxHeight: 600,
        background: color['bg-primary'],
        border: `1px solid ${color['border-primary']}`,
        borderRadius: radius['cards'],
        boxShadow: shadow['modal'],
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 200,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 8px 8px 16px',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: color['text-primary'],
          lineHeight: '22px',
        }}>
          Notifications
        </span>
        <LearnlightButton
          variant="txt_grey"
          size="m"
          content="icon_only"
          selectIconLeft={<CloseIcon size={16} />}
          onClick={onClose}
          aria-label="Close notifications"
        />
      </div>

      {/* Tabs + Mark all read */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 8,
        flexShrink: 0,
      }}>
        <UnderlineTabs
          tabs={[
            { id: 'all',    label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'today',  label: 'Today' },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
        />
        <LearnlightButton
          variant="txt"
          size="s"
          text="Mark all read"
          onClick={markAllRead}
        />
      </div>

      {/* Notification list */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: 32,
            textAlign: 'center',
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 14,
            color: color['text-secondary'],
          }}>
            No notifications
          </div>
        ) : (
          filtered.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              onMarkRead={markRead}
            />
          ))
        )}
      </div>
    </div>
  );
}
