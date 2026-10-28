import Icon from './Icon.tsx';

// Small section label with a sparkle icon in the page's accent colour.
export default function Eyebrow({ children, light = false, className = '' }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-muted-d' : 'text-muted'} ${className}`}>
      <span className="shrink-0" style={{ color: light ? '#5FD3C4' : 'var(--acc)' }}>
        <Icon name="Sparkles" className="w-4 h-4" stroke={2} />
      </span>
      {children}
    </p>
  );
}