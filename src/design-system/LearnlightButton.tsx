import React from 'react';
import { buttonTokens, typeScale, typeTokens } from './tokens';

// Resolve button-text token → primitive → fontWeight
const buttonTextPrimitive = typeScale.find(
  t => t.name === typeTokens.find(tt => tt.token === 'button-text')?.primitive
);
const BUTTON_FONT_WEIGHT = buttonTextPrimitive?.fontWeight ?? 600;

export interface LearnlightButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * Visual style variant.
   * - 'primary': filled blue — main call-to-action
   * - 'secondary': outlined blue
   * - 'txt': text-only with blue label
   * - 'txt_grey': text-only with grey label
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'txt' | 'txt_grey';

  /**
   * Size of the button.
   * - 'l': 40px height (large)
   * - 'm': 32px height (medium)
   * - 's': 24px height (small)
   * @default 'm'
   */
  size?: 'l' | 'm' | 's';

  /**
   * Layout mode.
   * - 'default': label with optional icons
   * - 'icon_only': icon only, no label
   * @default 'default'
   */
  content?: 'default' | 'icon_only';

  /**
   * Whether the button is disabled.
   * Disables interaction and renders muted colours.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether to show an icon on the left of the label.
   * @default false
   */
  leftIcon?: boolean;

  /**
   * Whether to show an icon on the right of the label.
   * @default false
   */
  rightIcon?: boolean;

  /**
   * Custom React node rendered as the left icon.
   * Only rendered when leftIcon is true.
   */
  selectIconLeft?: React.ReactNode;

  /**
   * Custom React node rendered as the right icon.
   * Only rendered when rightIcon is true.
   */
  selectIconRight?: React.ReactNode;

  /**
   * Button label text.
   * @default 'Button'
   */
  text?: string;
}

// Derive flat color map from the shared design token map
const COLORS = Object.fromEntries(
  Object.entries(buttonTokens).map(([variant, slots]) => [
    variant,
    Object.fromEntries(Object.entries(slots).map(([slot, t]) => [slot, t.value])),
  ])
) as {
  [V in keyof typeof buttonTokens]: {
    [S in keyof (typeof buttonTokens)[V]]: string;
  };
};

const SIZES = {
  l: { height: 40, paddingX: 8, fontSize: 14, iconSize: 16, gap: 6 },
  m: { height: 32, paddingX: 8, fontSize: 13, iconSize: 14, gap: 5 },
  s: { height: 24, paddingX: 8, fontSize: 12, iconSize: 12, gap: 4 },
};

const DEFAULT_ICON = (size: number) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <rect x="2" y="4" width="12" height="1.5" rx="0.75" />
    <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" />
    <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" />
  </svg>
);

/** Learnlight Design System — Button */
export function LearnlightButton({
  variant = 'primary',
  size = 'm',
  content = 'default',
  isDisabled = false,
  leftIcon = false,
  rightIcon = false,
  selectIconLeft,
  selectIconRight,
  text = 'Button',
  onClick,
  ...rest
}: LearnlightButtonProps) {
  const [hovered, setHovered] = React.useState(false);
  const palette = COLORS[variant];
  const dim = SIZES[size];

  const bg = isDisabled
    ? 'bgDisabled' in palette ? palette.bgDisabled : palette.bg
    : hovered
      ? palette.bgHover
      : palette.bg;

  const color = isDisabled
    ? 'textDisabled' in palette ? palette.textDisabled : palette.text
    : palette.text;

  const border =
    variant === 'secondary'
      ? `1.5px solid ${isDisabled ? (palette as typeof COLORS.secondary).borderDisabled : palette.border}`
      : '1.5px solid transparent';

  const iconOnly = content === 'icon_only';
  const width = iconOnly ? dim.height : undefined;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: dim.gap,
        height: dim.height,
        width,
        paddingLeft: iconOnly ? 0 : dim.paddingX,
        paddingRight: iconOnly ? 0 : dim.paddingX,
        background: bg,
        color,
        border,
        borderRadius: 6,
        fontSize: dim.fontSize,
        fontFamily: "'Fira Sans', sans-serif",
        fontWeight: BUTTON_FONT_WEIGHT,
        lineHeight: 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s, color 0.15s',
        whiteSpace: 'nowrap',
        outline: 'none',
        userSelect: 'none',
      }}
      {...rest}
    >
      {!iconOnly && leftIcon && (
        <span style={{ display: 'flex', alignItems: 'center', color }}>
          {selectIconLeft ?? DEFAULT_ICON(dim.iconSize)}
        </span>
      )}

      {iconOnly
        ? (selectIconLeft ?? DEFAULT_ICON(dim.iconSize))
        : <span>{text}</span>
      }

      {!iconOnly && rightIcon && (
        <span style={{ display: 'flex', alignItems: 'center', color }}>
          {selectIconRight ?? DEFAULT_ICON(dim.iconSize)}
        </span>
      )}
    </button>
  );
}
