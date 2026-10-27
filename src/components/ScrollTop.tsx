import { useEffect, useState } from 'react';
import { scrollToId } from '../scroll.ts';

// Floating "back to top" arrow. Appears after scrolling past the first screen; sits above the mobile Call/Book bar.
export default function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button
      type="button"
      onClick={() => scrollToId('top')}
      aria-label="Scroll back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed right-4 sm:right-6 bottom-24 md:bottom-6 z-40 w-12 h-12 rounded-full btn-grad text-white flex items-center justify-center shadow-[0_16px_40px_-12px_rgba(15,34,48,.55)] ring-1 ring-white/30 transition-all duration-500 hover:-translate-y-1 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}