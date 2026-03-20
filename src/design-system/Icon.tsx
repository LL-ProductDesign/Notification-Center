const svgModules = import.meta.glob('./icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export const icons: Record<string, string> = Object.fromEntries(
  Object.entries(svgModules).map(([path, raw]) => {
    const name = path.split('/').pop()!.replace('.svg', '');
    const normalized = raw
      .replace(/\s+width="[^"]*"/, '')
      .replace(/\s+height="[^"]*"/, '')
      .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
    return [name, normalized];
  })
);

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 16, color }: IconProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        flexShrink: 0,
        color,
      }}
      dangerouslySetInnerHTML={{
        __html: (icons[name] ?? '').replace('<svg', '<svg style="width:100%;height:100%"'),
      }}
    />
  );
}
