// Clinic logo (real artwork): /public/images/logo.png (transparent background).
// It always sits on a light badge so it stays readable over photos and dark sections.
// `sub` is the department label shown next to the logo on the heart / dental websites.
export default function Logo({ light = false, sub, compact = false }: { light?: boolean; sub?: string; compact?: boolean }) {
  const dept = sub && sub !== 'Heart & Dental Care' ? sub : '';
  return (
    <span className="flex items-center gap-3 select-none">
      <span className={`inline-flex rounded-2xl bg-white ${compact ? 'px-2.5 py-1' : 'px-3 py-1.5'} shadow-[0_6px_20px_-10px_rgba(15,34,48,.35)] transition-all duration-300`}>
        <img src="/images/logo.png" alt="Svasti Heart and Dental Care" className={`w-auto transition-all duration-300 ${compact ? 'h-9' : 'h-11'}`} />
      </span>
      {dept && (
        <span className={`hidden sm:block pl-3 border-l text-[11px] font-semibold uppercase tracking-[0.2em] ${light ? 'border-white/30 text-white/85' : 'border-ink/15 text-muted'}`}>{dept}</span>
      )}
    </span>
  );
}
