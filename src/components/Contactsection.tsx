import Button from './Button.tsx';
import Eyebrow from './Eyebrow.tsx';
import Icon from './Icon.tsx';
import Reveal from './Reveal.tsx';
import { clinic } from '../data.ts';
import { primary, embedUrl } from '../locations.ts';

const COLORS = ['#0E9384', '#3BA7E5', '#E5484D', '#F5B53D'];

export default function ContactSection() {
  const rows: [string, string, string, string?][] = [
    ['MapPin', 'Address', clinic.address, clinic.directions],
    ['Phone', 'Phone', clinic.phone, clinic.tel],
    ['Mail', 'Email', clinic.email, `mailto:${clinic.email}`],
    ['Clock', 'Opening hours', clinic.hours],
  ];
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal><Eyebrow>Contact &amp; location</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] text-ink">Visit us in <span className="gt-light">HSR Layout.</span></h2></Reveal>
        </div>
        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          <Reveal v="left" className="lg:col-span-5">
            <div className="relative isolate overflow-hidden h-full rounded-[2rem] bg-ink text-white p-6 sm:p-9">
              <div className="aura -z-10 w-72 h-72 bg-teal/35 -right-20 -top-20" />
              <h3 className="text-2xl">{clinic.full}</h3>
              <ul className="mt-7 space-y-5">
                {rows.map(([i, l, v, href], n) => (
                  <li key={l} className="flex gap-4 min-w-0">
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: COLORS[n] }}><Icon name={i} /></span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-d">{l}</span>
                      {href ? (
                        <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="link-u text-[15px] text-white break-words">{v}</a>
                      ) : (
                        <span className="text-[15px] text-white break-words">{v}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <Button href={clinic.directions} external arrow variant="light">Get Directions</Button>
                <Button href={clinic.tel} variant="ghost" icon="Phone">Call the Clinic</Button>
              </div>
            </div>
          </Reveal>
          <Reveal v="right" delay={120} className="lg:col-span-7">
            {/* The iframe is taller than its frame and shifted up, so Google's place card (name, rating) is cropped out. */}
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-line bg-white h-80 sm:h-[26rem] lg:h-full lg:min-h-[30rem]">
              <iframe
                title={`Map: ${clinic.full}`}
                src={embedUrl(primary)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute left-0 w-full border-0"
                style={{ top: -190, height: 'calc(100% + 190px)' }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}