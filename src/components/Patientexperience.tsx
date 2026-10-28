import Eyebrow from './Eyebrow.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import useParallax from './useParallax.ts';
import type { Dept } from '../data.ts';

const COLORS = ['#0E9384', '#3BA7E5', '#E5484D'];

// "Why choose us / Our approach": tall photo with parallax + numbered cards.
export default function PatientExperience({ d, eyebrow = 'Our approach' }: { d: Dept; eyebrow?: string }) {
  const par = useParallax<HTMLDivElement>(0.08);
  return (
    <section id="approach" className="relative py-10 sm:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 lg:order-2">
          <Reveal v="mask">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] aspect-[4/3] lg:aspect-[4/5] bg-cream">
              <div ref={par} className="absolute inset-x-0 -top-[8%] h-[116%]">
                <Img src={d.expImg} alt="A consultation at Svasti Heart and Dental Care" className="w-full h-full" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <p className="absolute left-6 right-6 bottom-6 font-display text-white text-xl sm:text-2xl font-medium leading-snug">“{d.expText}”</p>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:order-1">
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] text-ink">{d.expTitle}</h2></Reveal>
          <div className="mt-10 grid sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
            {d.exp.map((e, n) => (
              <Reveal key={e.t} delay={150 + n * 110} className="h-full">
                <div className="group lift h-full rounded-[1.5rem] bg-paper ring-1 ring-line p-6 relative overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-1" style={{ background: COLORS[n % 3] }} aria-hidden="true" />
                  <div className="flex items-center">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110" style={{ background: COLORS[n % 3] }}><Icon name={e.i} /></span>
                  </div>
                  <h3 className="mt-6 text-xl text-ink">{e.t}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}