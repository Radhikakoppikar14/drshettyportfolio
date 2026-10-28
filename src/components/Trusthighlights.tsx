import Icon from './Icon.tsx';

const COLORS = ['#0E9384', '#3BA7E5', '#E5484D', '#F5B53D', '#7A2950'];

// Gently scrolling strip of highlights / specialities (pauses on hover, static for reduced motion).
export default function TrustHighlights({ items }: { items: { t: string; i: string }[] }) {
  const row = (dup: boolean) =>
    items.map((h, n) => (
      <li key={`${h.t}-${dup ? 'b' : 'a'}`} className={`flex items-center gap-3 px-6 sm:px-8 shrink-0 ${dup ? 'marquee-dup' : ''}`} aria-hidden={dup || undefined}>
        <span className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: COLORS[n % COLORS.length] }}>
          <Icon name={h.i} className="w-[18px] h-[18px]" />
        </span>
        <span className="font-display text-lg sm:text-xl font-medium text-ink whitespace-nowrap">{h.t}</span>
        <span className="ml-6 sm:ml-8 text-2xl" style={{ color: COLORS[(n + 1) % COLORS.length] }} aria-hidden="true">✦</span>
      </li>
    ));
  return (
    <section aria-label="Highlights" className="bg-paper pt-4 pb-6 sm:pb-8">
      <div className="marquee overflow-hidden">
        <ul className="marquee-track py-2">{row(false)}{row(true)}</ul>
      </div>
    </section>
  );
}