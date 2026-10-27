import { useEffect, useRef, useState } from 'react';
import Button from './Button.tsx';
import Icon from './Icon.tsx';
import { clinic } from '../data.ts';

export default function Booking({ open, onClose, topic }: { open: boolean; onClose: () => void; topic: string }) {
  const [sent, setSent] = useState(false);
  const first = useRef<HTMLInputElement>(null);
  const close = () => { setSent(false); onClose(); };

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => first.current?.focus(), 60);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', k);
    return () => { window.clearTimeout(t); document.body.style.overflow = ''; window.removeEventListener('keydown', k); prev?.focus?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;
  const f = 'w-full h-12 rounded-xl ring-1 ring-inset ring-line bg-paper px-4 text-[15px] text-text placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-[var(--acc)] transition';
  return (
    <div className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 fade-in" onClick={close} role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="pop-in relative w-full sm:max-w-md bg-white rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden max-h-[92svh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="h-1.5" style={{ background: 'var(--grad-btn)' }} />
        <button onClick={close} aria-label="Close" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-paper text-muted hover:text-ink flex items-center justify-center"><Icon name="X" /></button>
        <div className="p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-8">
              <span className="mx-auto w-14 h-14 rounded-full bg-teal-soft text-teal-ink flex items-center justify-center"><Icon name="Check" className="w-7 h-7" stroke={2.2} /></span>
              <h3 id="booking-title" className="mt-5 text-3xl text-ink">Thank you</h3>
              <p className="text-muted mt-3 text-sm">This is a preview form – requests are not sent yet. Please call the clinic to book.</p>
              <div className="mt-7 flex flex-col gap-3">
                <Button href={clinic.tel} icon="Phone">Call {clinic.phone}</Button>
                <Button onClick={close} variant="outline">Close</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
              <h3 id="booking-title" className="text-3xl text-ink pr-10">Book an Appointment</h3>
              <p className="inline-flex items-center gap-2 rounded-full bg-acc-soft t-acc px-3 py-1 text-xs font-medium"><Icon name="CalendarCheck" className="w-3.5 h-3.5" />{topic}</p>
              <input ref={first} required aria-label="Full name" placeholder="Full name" autoComplete="name" className={f} />
              <input required type="tel" aria-label="Phone" placeholder="Phone number" autoComplete="tel" className={f} />
              <input type="date" aria-label="Preferred date" className={f} />
              <textarea aria-label="Message" placeholder="How can we help? (optional)" rows={3} className={`${f} h-auto py-3`} />
              <Button type="submit" arrow className="w-full">Request Appointment</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}