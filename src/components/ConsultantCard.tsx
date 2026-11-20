import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import type { Consultant } from '../data.ts';

// Pop-up with the doctor's full profile: photo, credentials, bio and the lists (education, memberships, courses...).
// It is rendered in <body> so card animations cannot clip it, and it gets the page's colour theme class.
function ProfileModal({ c, theme, onClose, onBook }: { c: Consultant; theme: string; onClose: () => void; onBook: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); prev?.focus?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return createPortal(
    <div className={theme}>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        <div role="dialog" aria-modal="true" aria-label={`${c.name}, full profile`} className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-[0_40px_90px_-30px_rgba(0,0,0,.6)] overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-acc" />
          <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-5 z-10 w-10 h-10 rounded-full bg-paper ring-1 ring-line flex items-center justify-center text-ink hover:bg-acc-soft transition-colors">
            <Icon name="X" className="w-5 h-5" />
          </button>
          <div className="overflow-y-auto overscroll-contain px-6 sm:px-9 pt-9 pb-4">
            <div className="flex items-center gap-5 pr-12">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-full ring-4 ring-[var(--acc-soft)] bg-acc-soft">
                <Img src={c.image} alt={`${c.name}, ${c.role}`} zoom={1} pos={c.imgPos ?? '50% 8%'} className="w-full h-full" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl sm:text-3xl text-ink">{c.name}</h3>
                <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] t-acc">{c.role}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[c.creds, c.exp].filter(Boolean).map((t) => (
                <span key={t} className="rounded-full bg-paper ring-1 ring-line px-3 py-1 text-[12px] font-medium text-text">{t}</span>
              ))}
            </div>
            {c.bio && c.bio.length > 0 && (
              <div className="mt-6 space-y-4 text-[15px] sm:text-base text-muted leading-relaxed">
                {c.bio.map((p) => <p key={p}>{p}</p>)}
              </div>
            )}
            {c.details?.map((s) => (
              <div key={s.title} className="mt-7">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] t-acc">{s.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-text"><span className="mt-0.5 w-5 h-5 rounded-full bg-acc text-white flex items-center justify-center shrink-0"><Icon name="Check" className="w-3 h-3" stroke={2.6} /></span>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="px-6 sm:px-9 py-4 border-t border-line bg-white flex flex-wrap items-center justify-between gap-3">
            <Button onClick={onBook} arrow icon="CalendarCheck">Book a visit</Button>
            <button type="button" onClick={onClose} className="h-11 px-4 text-sm font-semibold text-muted hover:text-ink">Close</button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// Consulting doctor card. Same layout as the main doctor cards on the home page:
// tinted photo panel on the left, name, role, credential chips and key points on the right.
// "Full Profile" opens a pop-up with all the details. Colours follow the page theme.
export default function ConsultantCard({ c, n, onBook }: { c: Consultant; n: number; onBook: (t: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const hasMore = !!(c.bio?.length || c.details?.length);
  const theme = ref.current?.closest('[class*="theme-"]')?.className.match(/theme-[\w-]+/)?.[0] ?? '';
  return (
    <Reveal delay={n * 140} className="h-full">
      <article ref={ref} className="group lift h-full flex flex-col sm:flex-row bg-white rounded-[2rem] ring-1 ring-line overflow-hidden">
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
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {hasMore && <Button onClick={() => setOpen(true)} variant="accent" size="sm" arrow className="px-4! shrink-0">Full Profile</Button>}
            <Button onClick={() => onBook('Dental Care consultation')} variant="outline" size="sm" className="px-4! shrink-0">Book Visit</Button>
          </div>
        </div>
      </article>
      {open && <ProfileModal c={c} theme={theme} onClose={() => setOpen(false)} onBook={() => { setOpen(false); onBook('Dental Care consultation'); }} />}
    </Reveal>
  );
}