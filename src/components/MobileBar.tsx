import { useEffect, useState } from 'react';
import { clinic } from '../data.ts';
import Icon from './Icon.tsx';

// Mobile-only Call / Book bar. Slides up once the visitor scrolls past the hero.
export default function MobileBar({ onBook }: { accent?: string; onBook: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className={`md:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ${show ? 'translate-y-0' : 'translate-y-full'}`} aria-hidden={!show}>
      <div className="grid grid-cols-2 gap-2 rounded-full bg-white/95 backdrop-blur p-1.5 shadow-[0_16px_40px_-12px_rgba(15,34,48,.45)] ring-1 ring-line">
        <a href={clinic.tel} tabIndex={show ? 0 : -1} className="flex items-center justify-center gap-2 h-12 rounded-full font-medium text-ink"><Icon name="Phone" className="w-4 h-4" />Call</a>
        <button onClick={onBook} tabIndex={show ? 0 : -1} className="flex items-center justify-center gap-2 h-12 rounded-full font-medium text-white btn-grad"><Icon name="CalendarCheck" className="w-4 h-4" />Book</button>
      </div>
    </div>
  );
}
