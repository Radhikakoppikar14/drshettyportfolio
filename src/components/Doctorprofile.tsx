import Button from './Button.tsx';
import Eyebrow from './Eyebrow.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import type { Doctor } from '../data.ts';

// Department doctor profile: large portrait on a colour backdrop, credentials as chips.
export default function DoctorProfile({ doctor, onBook, tag }: { doctor: Doctor; onBook: () => void; tag?: string }) {
  return (
    <section id="doctor" className="relative py-16 sm:py-20 lg:py-28 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full">
          <Reveal v="zoom">
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 rounded-[2.5rem] bg-acc opacity-90" aria-hidden="true" />
              <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full border-2 border-dashed border-[var(--acc)] opacity-40" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-cream zoom-img">
                <Img src={doctor.image} alt={`${doctor.name}, ${doctor.role}`} className="w-full h-full object-[50%_18%]" />
              </div>
              <div className="bob absolute -bottom-5 left-5 sm:left-8 rounded-2xl bg-white px-5 py-3.5 shadow-[0_24px_50px_-24px_rgba(15,34,48,.5)]">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Experience</p>
                <p className="font-display text-lg font-semibold text-ink">{doctor.exp}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal><Eyebrow>Meet your doctor</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] text-ink">{doctor.name}</h2></Reveal>
          <Reveal delay={140}><p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] t-acc">{tag ?? doctor.role}</p></Reveal>
          <Reveal delay={180}>
            <div className="mt-5 flex flex-wrap gap-2">
              {[doctor.creds, doctor.exp].filter(Boolean).map((t) => (
                <span key={t} className="rounded-full bg-acc-soft t-acc px-4 py-1.5 text-[13px] font-medium">{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={220}><p className="mt-6 text-muted leading-relaxed text-base sm:text-[17px]">{doctor.bio}</p></Reveal>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {doctor.points.map((p, n) => (
              <Reveal as="li" key={p} delay={260 + n * 80}>
                <div className="h-full flex items-start gap-3 rounded-2xl bg-white ring-1 ring-line p-4 text-sm text-text">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-acc text-white flex items-center justify-center shrink-0"><Icon name="Check" className="w-3.5 h-3.5" stroke={2.4} /></span>{p}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={500} className="mt-9"><Button onClick={onBook} arrow icon="CalendarCheck">Consult {doctor.name}</Button></Reveal>
        </div>
      </div>
    </section>
  );
}
