import Eyebrow from './Eyebrow.tsx';
import Reveal from './Reveal.tsx';
import ServiceCard from './ServiceCard.tsx';
import type { Dept } from '../data.ts';

const COLORS = {
  dental: ['#0E9384', '#3BA7E5', '#14B8A6', '#2563A8'],
  heart: ['#E5484D', '#F5A25B', '#E73D87', '#F5B53D'],
} as const;

// Department page: grid of treatment / service cards. Clicking a card opens the booking form for that treatment.
export default function TreatmentsSection({ d, onLearn }: { d: Dept; onLearn: (t: string) => void }) {
  const colors = COLORS[d.key];
  return (
    <section id="services" className="relative py-10 sm:py-12 lg:py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <Reveal><Eyebrow>{d.key === 'heart' ? 'Our services' : 'Our treatments'}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] text-ink">{d.servicesTitle}</h2></Reveal>
          <Reveal delay={140}><p className="mt-4 text-muted leading-relaxed text-base sm:text-[17px]">{d.servicesSub}</p></Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {d.services.map((s, n) => (
            <Reveal key={s.t} delay={120 + n * 90} className="h-full">
              <ServiceCard s={s} n={n} color={colors[n % colors.length]} onClick={() => onLearn(s.t)} action="Book this treatment" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}