import Button from './Button.tsx';
import Eyebrow from './Eyebrow.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import ServiceCard from './ServiceCard.tsx';
import useParallax from './useParallax.ts';
import type { Dept } from '../data.ts';
import { hrefFor } from '../router.ts';

// Home page: one large, image-led panel per speciality. Dental = light & teal, Heart = dark & coral.
const LOOK = {
  dental: {
    id: 'dental-care', icon: 'Smile', dark: false,
    section: 'bg-teal-soft', title: 'text-ink', text: 'text-muted', acc: 'text-teal-ink',
    colors: ['#0E9384', '#3BA7E5', '#14B8A6', '#2563A8'],
    aura: ['bg-teal/25', 'bg-sky/25'],
    blurb: 'Gentle, modern dentistry for every age, from routine check-ups to restoring a confident smile.',
  },
  heart: {
    id: 'heart-care', icon: 'HeartPulse', dark: true,
    section: 'bg-ink', title: 'text-white', text: 'text-muted-d', acc: 'text-coral',
    colors: ['#E5484D', '#F5A25B', '#E73D87', '#F5B53D'],
    aura: ['bg-coral/30', 'bg-plum/40'],
    blurb: 'Careful cardiac evaluation and interventional care, with every report and option explained clearly.',
  },
} as const;

export default function CareSection({ d, onBook, flip = false }: { d: Dept; onBook: (t: string) => void; flip?: boolean }) {
  const L = LOOK[d.key];
  const par = useParallax<HTMLDivElement>(0.09);
  return (
    <section id={L.id} className={`relative isolate overflow-hidden py-16 sm:py-20 lg:py-28 ${L.section}`}>
      <div className={`aura -z-10 w-[32rem] h-[32rem] ${L.aura[0]} ${flip ? '-left-40' : '-right-40'} top-0`} />
      <div className={`aura -z-10 w-[26rem] h-[26rem] ${L.aura[1]} ${flip ? 'right-0' : 'left-1/3'} bottom-0`} style={{ animationDelay: '-8s' }} />
      {L.dark && <div className="absolute inset-0 -z-10 grid-lines opacity-60" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* big image */}
          <div className={`lg:col-span-6 relative ${flip ? 'lg:order-2' : ''}`}>
            <Reveal v="mask">
              <a href={hrefFor(d.key)} aria-label={`Open the ${d.label} website`} className="group block relative overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] aspect-[4/3] sm:aspect-[5/4] lg:aspect-[5/6]">
                <div ref={par} className="absolute inset-x-0 -top-[8%] h-[116%]">
                  <Img src={d.heroImg} alt={`${d.label} at Svasti Heart and Dental Care`} className="w-full h-full transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                <span className="absolute left-5 top-5 sm:left-7 sm:top-7 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/90 backdrop-blur text-ink text-[13px] font-medium">
                  <Icon name={L.icon} className={`w-4 h-4 ${L.acc}`} />{d.label}
                </span>
              </a>
            </Reveal>
            {/* doctor chip */}
            <Reveal v="up" delay={300} className={`absolute -bottom-6 ${flip ? 'right-4 sm:-right-4' : 'left-4 sm:-left-4'}`}>
              <a href={hrefFor(d.key)} className="bob-slow flex items-center gap-3 rounded-2xl bg-white pl-2 pr-5 py-2 shadow-[0_24px_50px_-20px_rgba(15,34,48,.5)] hover:-translate-y-1 transition-transform">
                <span className="w-12 h-12 rounded-xl overflow-hidden bg-cream shrink-0"><Img src={d.doctor.image} alt="" zoom={1} className="w-full h-full object-[50%_20%]" /></span>
                <span>
                  <span className="block font-display text-[15px] font-semibold text-ink leading-tight">{d.doctor.name}</span>
                  <span className="block text-[12px] text-muted">{d.doctor.role}</span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* text */}
          <div className={`lg:col-span-6 pt-6 lg:pt-0 ${flip ? 'lg:order-1' : ''}`}>
            <Reveal><Eyebrow light={L.dark}>{d.label}</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className={`mt-5 text-4xl sm:text-5xl lg:text-[3.75rem] ${L.title}`}>
                {d.headline[0]}<br /><span className={L.dark ? 'gt' : 'gt-light'}>{d.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={160}><p className={`mt-6 text-base sm:text-[17px] leading-relaxed max-w-lg ${L.text}`}>{L.blurb}</p></Reveal>
            <Reveal delay={220}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {d.highlights.map((h) => (
                  <li key={h.t} className={`inline-flex items-center gap-2 h-9 px-3.5 rounded-full text-[13px] ${L.dark ? 'bg-white/[0.06] ring-1 ring-inset ring-white/12 text-white/85' : 'bg-white ring-1 ring-inset ring-line text-text'}`}>
                    <Icon name={h.i} className={`w-4 h-4 ${L.acc}`} />{h.t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300} className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button href={hrefFor(d.key)} variant={L.dark ? 'light' : 'dark'} arrow>Explore {d.label}</Button>
              <Button onClick={() => onBook(`${d.label} consultation`)} variant={L.dark ? 'ghost' : 'outline'} icon="CalendarCheck">Book a Visit</Button>
            </Reveal>
          </div>
        </div>

        {/* service cards */}
        <div className="mt-20 lg:mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {d.services.map((s, n) => (
            <Reveal key={s.t} delay={n * 110} className="h-full">
              <ServiceCard s={s} n={n} color={L.colors[n % 4]} dark={L.dark} href={hrefFor(d.key)} action={`Explore ${d.label}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}