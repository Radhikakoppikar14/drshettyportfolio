import Reveal from './Reveal.tsx';

export default function StatsBand({ stats }: { stats: { v: string; l: string }[] }) {
  return (
    <section aria-label="At a glance" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 -mt-2 lg:-mt-6">
      <Reveal>
        <div className="bg-white rounded-3xl border border-forest/10 shadow-[0_24px_50px_-28px_rgba(90,30,54,0.3)] grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-forest/10">
          {stats.map((s) => (
            <div key={s.l} className="p-6 md:p-8 text-center">
              <p className="font-serif text-3xl md:text-4xl text-forest">{s.v}</p>
              <p className="text-xs md:text-sm text-warm mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}