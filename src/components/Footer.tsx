import Icon from './Icon.tsx';
import Logo from './Logo.tsx';
import { clinic } from '../data.ts';
import { hrefFor } from '../router.ts';
import { scrollToId } from '../scroll.ts';

export default function Footer({ onBook }: { onBook?: () => void }) {
  const h = 'text-[11px] uppercase tracking-[0.2em] text-muted-d mb-4';
  const a = 'link-u inline-block py-1 text-left text-white/80 hover:text-white transition-colors';
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div className="aura -z-10 w-[30rem] h-[30rem] bg-teal/20 -left-40 -top-40" />
      <div className="aura -z-10 w-[26rem] h-[26rem] bg-coral/20 -right-32 top-10" style={{ animationDelay: '-9s' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.04] max-w-2xl">
            Caring for your heart.<br /><span className="gt">And your smile.</span>
          </p>
          {onBook && (
            <button onClick={onBook} className="group inline-flex items-center gap-3 text-lg font-medium">
              <span className="link-u">Book an appointment</span>
              <span className="w-12 h-12 rounded-full btn-grad flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"><Icon name="ArrowUpRight" /></span>
            </button>
          )}
        </div>
        <div className="py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 text-sm">
          <div className="lg:col-span-4 space-y-5">
            <Logo />
            <p className="text-white/65 max-w-sm leading-relaxed">Thoughtful, personalised care for your heart and your smile, in the heart of HSR Layout.</p>
            <div className="flex gap-3">
              {['Instagram', 'Facebook'].map((s) => (
                <span key={s} title={`${s} – link to be added`} className="w-10 h-10 rounded-full ring-1 ring-white/20 flex items-center justify-center text-white/70"><Icon name={s} /></span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className={h}>Explore</p>
            <ul className="space-y-1">
              <li><a href={hrefFor('home')} className={a}>Home</a></li>
              <li><a href={hrefFor('dental')} className={a}>Dental Care</a></li>
              <li><a href={hrefFor('heart')} className={a}>Heart Care</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className={h}>On this page</p>
            <ul className="space-y-1">
              <li><button onClick={() => scrollToId('about')} className={a}>About Us</button></li>
              <li><button onClick={() => scrollToId('services')} className={a}>Services</button></li>
              <li><button onClick={() => scrollToId('contact')} className={a}>Contact</button></li>
              <li><button onClick={() => scrollToId('top')} className={a}>Back to top</button></li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className={h}>Contact</p>
            <ul className="space-y-3 text-white/80">
              <li className="flex gap-3"><Icon name="MapPin" className="w-4 h-4 mt-1 shrink-0 text-teal" /><a href={clinic.directions} target="_blank" rel="noopener noreferrer" className="link-u">{clinic.address}</a></li>
              <li className="flex gap-3"><Icon name="Phone" className="w-4 h-4 mt-1 shrink-0 text-sky" /><a href={clinic.tel} className="link-u">{clinic.phone}</a></li>
              <li className="flex gap-3"><Icon name="Mail" className="w-4 h-4 mt-1 shrink-0 text-coral" /><span className="break-words">{clinic.email}</span></li>
              <li className="flex gap-3"><Icon name="Clock" className="w-4 h-4 mt-1 shrink-0 text-sun" /><span>{clinic.hours}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/50 py-6 px-4">© {new Date().getFullYear()} {clinic.full}. All rights reserved.</div>
    </footer>
  );
}
