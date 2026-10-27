import Button from './Button.tsx';
import Eyebrow from './Eyebrow.tsx';
import Reveal from './Reveal.tsx';
import ServiceCard from './ServiceCard.tsx';
import type { Dept } from '../data.ts';

const COLORS = {
  dental: ['#0E9384', '#3BA7E5', '#14B8A6', '#2563A8'],
  heart: ['#E5484D', '#F5A25B', '#E73D87', '#F5B53D'],
};

// Department services. Heart = dark panel, Dental = light teal panel (distinct identities).
export default function TreatmentsSection({ d, onLearn }: { d: Dept; onLearn: (t: string) => void }) {
  const dark = d.key === 'heart';
  return (
    <section id="services" className={`relative isolate overflow-hidden py-16 sm:py-20 lg:py-28 ${dark ? 'bg-ink text-white' : 'bg-teal-soft'}`}>
      <div className={`aura -z-10 w-[30rem] h-[30rem] ${dark ? 'bg-coral/25' : 'bg-teal/20'} -right-32 -top-20`} />
      <div className={`aura -z-10 w-[24rem] h-[24rem] ${dark ? 'bg-plum/35' : 'bg-sky/20'} -left-24 bottom-0`} style={{ animationDelay: '-7s' }} />
      {dark && <div className="absolute inset-0 -z-10 grid-lines opacity-60" />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal><Eyebrow light={dark}>{d.key === 'dental' ? 'Treatments' : 'Services'}</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className={`mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] ${dark ? 'text-white' : 'text-ink'}`}>{d.servicesTitle}</h2></Reveal>
            <Reveal delay={160}><p className={`mt-5 text-base sm:text-[17px] ${dark ? 'text-muted-d' : 'text-muted'}`}>{d.servicesSub}</p></Reveal>
          </div>
          <Reveal delay={200}><Button onClick={() => onLearn(`${d.label} appointment`)} variant={dark ? 'light' : 'dark'} arrow>Book a Consultation</Button></Reveal>
        </div>
        <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {d.services.map((s, n) => (
            <Reveal key={s.t} delay={n * 110} className="h-full">
              <ServiceCard s={s} n={n} color={COLORS[d.key][n % 4]} dark={dark} onClick={() => onLearn(s.t)} action="Ask about this" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
