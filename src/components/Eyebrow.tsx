// Small section label with coloured dots (adapted from the reference's eyebrow style).
export default function Eyebrow({ children, light = false, className = '' }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-muted-d' : 'text-muted'} ${className}`}>
      <span className="inline-flex gap-1" aria-hidden="true">
        <i className="w-1.5 h-1.5 rounded-full bg-teal" />
        <i className="w-1.5 h-1.5 rounded-full bg-sky" />
        <i className="w-1.5 h-1.5 rounded-full bg-coral" />
      </span>
      {children}
    </p>
  );
}
