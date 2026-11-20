import Button from './Button.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import type { Consultant } from '../data.ts';

// Consulting doctor card. Same layout as the main doctor cards on the home page:
// tinted photo panel on the left, name, role, credential chips and key points on the right.
// Colours follow the page theme (blue on the home page, teal on the dental page).
export default function ConsultantCard({ c, n, onBook }: { c: Consultant; n: number; onBook: (t: string) => void }) {
  return (
    <Reveal delay={n * 140} className="h-full">
      <article className="group lift h-full flex flex-col sm:flex-row bg-white rounded-[2rem] ring-1 ring-line overflow-hidden">
        <div className="relative sm:w-[44%] shrink-0 flex items-center justify-center p-4 sm:p-5 bg-acc-soft">
          <div className="relative w-full max-w-sm sm:max-w-none aspect-[3/4] overflow-hidden rounded-[1.5rem] zoom-img">
            <Img src={c.image} alt={`${c.name}, ${c.role}`} zoom={1} pos={c.imgPos ?? '50% 8%'} className="absolute inset-0 w-full h-full" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-2 h-8 px-3 rounded-full bg-white/90 backdrop-blur text-[12px] font-medium text-ink">
              <i className="w-2 h-2 rounded-full bg-acc" />Consulting
            </span>
          </div>
        </div>
        <div className="relative flex flex-col flex-1 p-6">
          <span className="absolute inset-x-0 top-0 h-1 sm:hidden bg-acc" />
          <h3 className="text-2xl sm:text-[1.7rem] text-ink">{c.name}</h3>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] t-acc">{c.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[c.creds, c.exp].filter(Boolean).map((t) => (
              <span key={t} className="rounded-full bg-paper ring-1 ring-line px-3 py-1 text-[12px] font-medium text-text">{t}</span>
            ))}
          </div>
          <ul className="mt-5 space-y-2.5 flex-1">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-muted"><Icon name="Check" className="w-4 h-4 mt-0.5 shrink-0" stroke={2.2} />{p}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-nowrap items-center gap-2">
            <Button onClick={() => onBook('Dental Care consultation')} variant="outline" size="sm" className="px-4! shrink-0">Book Visit</Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}