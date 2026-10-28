import Button from './Button.tsx';
import Icon from './Icon.tsx';
import Logo from './Logo.tsx';
import { clinic, dental, heart } from '../data.ts';
import { hrefFor, type Route } from '../router.ts';
import { scrollToId } from '../scroll.ts';

// One footer per website: home (both departments), dental, heart. Each has its own tone and content.
const LOOK: Record<Route, { bg: string; blurb: string; listTitle: string; list: { label: string; go: () => void }[]; doctor?: string }> = {
  home: {
    bg: '#0F2230',
    blurb: 'Heart care and dental care under one roof, in the heart of HSR Layout.',
    listTitle: 'Quick links',
    list: [
      { label: 'About Us', go: () => scrollToId('about') },
      { label: 'Services', go: () => scrollToId('services') },
      { label: 'Contact', go: () => scrollToId('contact') },
      { label: 'Back to top', go: () => scrollToId('top') },
    ],
  },
  dental: {
    bg: '#0B2F33',
    blurb: 'Gentle, modern dental care built around your comfort and long-term oral health.',
    listTitle: 'Dental treatments',
    list: dental.services.map((s) => ({ label: s.t, go: () => scrollToId('services') })),
    doctor: `${dental.doctor.name}, ${dental.doctor.role}`,
  },
  heart: {
    bg: '#2A1520',
    blurb: 'Careful cardiac evaluation and interventional care, with every option explained clearly.',
    listTitle: 'Heart services',
    list: heart.services.map((s) => ({ label: s.t, go: () => scrollToId('services') })),
    doctor: `${heart.doctor.name}, ${heart.doctor.role}`,
  },
};

export default function Footer({ view = 'home', onBook }: { view?: Route; onBook?: () => void }) {
  const L = LOOK[view];
  const h = 'text-[11px] uppercase tracking-[0.2em] text-muted-d mb-4';
  const a = 'link-u inline-block py-1 text-left text-white/80 hover:text-white transition-colors';
  return (
    <footer className="relative isolate overflow-hidden text-white" style={{ background: L.bg }}>
      <div className="aura -z-10 w-[30rem] h-[30rem] bg-teal/20 -left-40 -top-40" />
      <div className="aura -z-10 w-[26rem] h-[26rem] bg-coral/20 -right-32 top-10" style={{ animationDelay: '-9s' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="pb-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 text-sm">
          <div className="lg:col-span-4 space-y-5">
            <Logo light />
            <p className="text-white/70 max-w-sm leading-relaxed">{L.blurb}</p>
            {L.doctor && <p className="text-white/80 text-[13px]">{L.doctor}</p>}
            <div className="flex flex-wrap items-center gap-3">
              {onBook && <Button onClick={onBook} variant="light" size="sm" arrow>Book an appointment</Button>}
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
          <div className="lg:col-span-3">
            <p className={h}>{L.listTitle}</p>
            <ul className="space-y-1">
              {L.list.map((i) => (
                <li key={i.label}><button onClick={i.go} className={a}>{i.label}</button></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className={h}>Contact</p>
            <ul className="space-y-3 text-white/80">
              <li className="flex gap-3"><Icon name="MapPin" className="w-4 h-4 mt-1 shrink-0 text-teal" /><a href={clinic.directions} target="_blank" rel="noopener noreferrer" className="link-u">{clinic.address}</a></li>
              <li className="flex gap-3"><Icon name="Phone" className="w-4 h-4 mt-1 shrink-0 text-sky" /><a href={clinic.tel} className="link-u">{clinic.phone}</a></li>
              <li className="flex gap-3"><Icon name="Mail" className="w-4 h-4 mt-1 shrink-0 text-coral" /><a href={`mailto:${clinic.email}`} className="link-u break-words">{clinic.email}</a></li>
              <li className="flex gap-3"><Icon name="Clock" className="w-4 h-4 mt-1 shrink-0 text-sun" /><span>{clinic.hours}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/50 py-6 px-4">© {new Date().getFullYear()} {clinic.full}. All rights reserved.</div>
    </footer>
  );
}