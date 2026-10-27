import { useEffect, useRef, useState } from 'react';
import Button from './Button.tsx';
import Icon from './Icon.tsx';
import Logo from './Logo.tsx';
import { clinic } from '../data.ts';
import { hrefFor, type Route } from '../router.ts';
import { scrollToId } from '../scroll.ts';

export type View = Route;

type Item = { label: string; route?: Route; section?: string };

// Same navigation on every page: routes for the three websites, sections for the current page.
const ITEMS: Item[] = [
  { label: 'Home', route: 'home' },
  { label: 'Dental Care', route: 'dental' },
  { label: 'Heart Care', route: 'heart' },
  { label: 'About Us', section: 'about' },
  { label: 'Services', section: 'services' },
  { label: 'Contact', section: 'contact' },
];
const SECTIONS = ITEMS.filter((i) => i.section).map((i) => i.section!) as string[];

export default function Header({ view, onBook }: { view: View; onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const prog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  // solid header + progress bar (one rAF per frame)
  useEffect(() => {
    let raf = 0;
    const paint = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 30);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (prog.current) prog.current.style.transform = `scaleX(${Math.min(1, y / max).toFixed(4)})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // active section highlight
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const top = () => { if (window.scrollY < 200) setActive(''); };
    window.addEventListener('scroll', top, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', top); };
  }, [view]);

  // mobile menu: lock scroll, Escape closes, focus management
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); burger.current?.focus(); } };
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); };
  }, [open]);

  const go = (it: Item) => {
    setOpen(false);
    if (it.section) scrollToId(it.section);
    else if (it.route === view) scrollToId('top');
  };

  const sub = view === 'heart' ? 'Heart Care' : view === 'dental' ? 'Dental Care' : undefined;
  const solid = scrolled;
  const isOn = (it: Item) => (it.route ? it.route === view && !active : it.section === active);

  const linkCls = (on: boolean) =>
    `relative px-3.5 py-2 rounded-full text-[14px] font-medium transition-colors duration-300 ${
      solid
        ? on ? 'text-ink bg-ink/[0.06]' : 'text-muted hover:text-ink hover:bg-ink/[0.04]'
        : on ? 'text-white bg-white/12' : 'text-white/75 hover:text-white hover:bg-white/[0.08]'
    }`;

  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); scrollToId('main'); }} className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-white focus:text-ink focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_-18px_rgba(15,34,48,.35)]' : 'bg-transparent'}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-500 ${solid ? 'h-[68px]' : 'h-[84px]'}`}>
          <a href={hrefFor(view)} onClick={(e) => { e.preventDefault(); scrollToId('top'); }} aria-label="Svasti – back to top" className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky">
            <Logo sub={sub} light={!solid} compact={solid} />
          </a>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5">
            {ITEMS.map((it) =>
              it.route ? (
                <a key={it.label} href={hrefFor(it.route)} onClick={() => go(it)} aria-current={it.route === view ? 'page' : undefined} className={linkCls(isOn(it))}>{it.label}</a>
              ) : (
                <button key={it.label} onClick={() => go(it)} className={linkCls(isOn(it))}>{it.label}</button>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a href={clinic.tel} aria-label={`Call ${clinic.phone}`} className={`hidden xl:inline-flex items-center gap-2 px-3 py-2 rounded-full text-[14px] font-medium transition-colors ${solid ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10'}`}>
              <Icon name="Phone" className="w-4 h-4" />{clinic.phone}
            </a>
            <span className="hidden sm:block"><Button onClick={onBook} size="sm" arrow>Book Appointment</Button></span>
            <button
              ref={burger}
              onClick={() => setOpen(true)}
              className={`lg:hidden w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors ${solid ? 'text-ink bg-ink/5 hover:bg-ink/10' : 'text-white bg-white/10 hover:bg-white/20'}`}
              aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu"
            >
              <Icon name="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <div className="absolute left-0 right-0 bottom-0 h-[2px] overflow-hidden" aria-hidden="true">
          <div ref={prog} className="h-full origin-left" style={{ background: 'var(--grad-btn)', transform: 'scaleX(0)' }} />
        </div>
      </header>

      {/* full-screen mobile menu */}
      <div
        id="mobile-menu"
        role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}
        className={`lg:hidden fixed inset-0 z-[60] bg-ink text-white overflow-y-auto transition-[opacity,visibility] duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="aura w-[22rem] h-[22rem] bg-teal/40 -top-20 -right-24" />
        <div className="aura w-[20rem] h-[20rem] bg-coral/35 bottom-10 -left-24" />
        <div className="relative min-h-full flex flex-col px-4 sm:px-6 pb-8">
          <div className="h-[84px] flex items-center justify-between">
            <Logo sub={sub} light />
            <button ref={closeBtn} onClick={() => { setOpen(false); burger.current?.focus(); }} aria-label="Close menu" className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Icon name="X" className="w-6 h-6" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 flex flex-col">
            {ITEMS.map((it, n) => {
              const cls = `group flex items-center justify-between py-4 border-b border-white/10 font-display text-[1.9rem] font-semibold tracking-tight transition-all duration-500 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isOn(it) ? 'text-white' : 'text-white/75'}`;
              const style = { transitionDelay: open ? `${120 + n * 60}ms` : '0ms' };
              const inner = <>{it.label}<Icon name="ArrowUpRight" className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" /></>;
              return it.route ? (
                <a key={it.label} href={hrefFor(it.route)} onClick={() => go(it)} tabIndex={open ? 0 : -1} className={cls} style={style}>{inner}</a>
              ) : (
                <button key={it.label} onClick={() => go(it)} tabIndex={open ? 0 : -1} className={`${cls} text-left`} style={style}>{inner}</button>
              );
            })}
          </nav>
          <div className={`mt-auto pt-10 space-y-3 transition-all duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: open ? '520ms' : '0ms' }}>
            <Button onClick={() => { setOpen(false); onBook(); }} arrow className="w-full">Book Appointment</Button>
            <Button href={clinic.tel} variant="ghost" icon="Phone" className="w-full">{clinic.phone}</Button>
            <p className="text-center text-xs text-muted-d pt-2">{clinic.hours}</p>
          </div>
        </div>
      </div>
    </>
  );
}
