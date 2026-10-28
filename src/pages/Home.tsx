import { useState } from 'react';
import AboutSection from '../components/Aboutsection.tsx';
import AppointmentCTA from '../components/Appointmentcta.tsx';
import Booking from '../components/Booking.tsx';
import Button from '../components/Button.tsx';
import CareSection from '../components/CareSection.tsx';
import ContactSection from '../components/Contactsection.tsx';
import Eyebrow from '../components/Eyebrow.tsx';
import Footer from '../components/Footer.tsx';
import Header from '../components/Header.tsx';
import HeroSection, { HeroMeta } from '../components/Herosection.tsx';
import Icon from '../components/Icon.tsx';
import Img from '../components/Img.tsx';
import MobileBar from '../components/MobileBar.tsx';
import PatientExperience from '../components/Patientexperience.tsx';
import Statement from '../components/Statement.tsx';
import Reveal from '../components/Reveal.tsx';
import TrustHighlights from '../components/Trusthighlights.tsx';
import { clinic, clinicProfile, dental, doctors, heart, homeExp, img, type Dept } from '../data.ts';
import { hrefFor } from '../router.ts';
import { scrollToId } from '../scroll.ts';

// Hero side: two tall photo cards that lead to the two websites.
const CareCards = () => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:pl-4">
    {([[dental, img.smile, '#0E9384', 'Smile'], [heart, img.heart, '#E5484D', 'HeartPulse']] as const).map(([d, src, c, i], n) => (
      <a
        key={d.key}
        href={hrefFor(d.key)}
        className={`group relative block overflow-hidden rounded-[1.75rem] aspect-[3/4] ring-1 ring-white/15 shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] ${n === 1 ? 'lg:translate-y-14' : ''}`}
      >
        <div className={n === 0 ? 'bob h-full' : 'bob-slow h-full'}>
          <Img src={src} alt={`${d.label} at Svasti clinic`} className="w-full h-full transition-transform duration-[1400ms] group-hover:scale-[1.07]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: c }} />
        <div className="absolute left-4 right-4 bottom-4 sm:left-5 sm:right-5 sm:bottom-5">
          <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3" style={{ background: c }}><Icon name={i} /></span>
          <p className="font-display text-xl sm:text-2xl font-semibold leading-tight">{d.label}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-white/75 group-hover:text-white transition-colors">Explore <Icon name="ArrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" /></p>
        </div>
      </a>
    ))}
  </div>
);

// Two-colour button pairs per department (white text keeps strong contrast on both ends of each gradient).
const BTN = {
  heart: {
    main: 'bg-[linear-gradient(100deg,#E5484D_0%,#B4265B_55%,#E5484D_100%)]! shadow-[0_12px_26px_-12px_rgba(180,38,91,.7)]',
    soft: 'text-[#B4265B]! ring-[#E5484D]/45! bg-[#FDF1F1]! hover:ring-[#B4265B]! hover:bg-[#FBE3E5]!',
  },
  dental: {
    main: 'bg-[linear-gradient(100deg,#0E9384_0%,#1F5FA8_55%,#0E9384_100%)]! shadow-[0_12px_26px_-12px_rgba(31,95,168,.6)]',
    soft: 'text-[#0A7468]! ring-[#0E9384]/45! bg-[#EEF8F6]! hover:ring-[#0A7468]! hover:bg-[#DDF1ED]!',
  },
} as const;

// One doctor card (heart or dental) linking to that department's website.
const DoctorCard = ({ d, n, onBook }: { d: Dept; n: number; onBook: (t: string) => void }) => {
  const c = d.key === 'heart' ? '#E5484D' : '#0E9384';
  return (
    <Reveal delay={n * 140} className="h-full">
      <article className="group lift h-full flex flex-col sm:flex-row bg-white rounded-[2rem] ring-1 ring-line overflow-hidden">
        <div className="relative sm:w-[40%] shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-white zoom-img">
          <Img src={d.doctor.image} alt={`${d.doctor.name}, ${d.doctor.role}`} zoom={1} pos={d.doctor.imgPos} className="absolute inset-0 w-full h-full object-[50%_18%]" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 h-8 px-3 rounded-full bg-white/90 backdrop-blur text-[12px] font-medium text-ink">
            <i className="w-2 h-2 rounded-full" style={{ background: c }} />{d.label}
          </span>
        </div>
        <div className="relative flex flex-col flex-1 p-6">
          <span className="absolute inset-x-0 top-0 h-1 sm:hidden" style={{ background: c }} />
          <h3 className="text-2xl sm:text-[1.7rem] text-ink">{d.doctor.name}</h3>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ color: d.key === 'heart' ? '#BE3038' : '#0A7468' }}>{d.doctor.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[d.doctor.creds, d.doctor.exp].filter(Boolean).map((t) => (
              <span key={t} className="rounded-full bg-paper ring-1 ring-line px-3 py-1 text-[12px] font-medium text-text">{t}</span>
            ))}
          </div>
          <ul className="mt-5 space-y-2.5 flex-1">
            {d.doctor.points.slice(0, 3).map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-muted"><Icon name="Check" className="w-4 h-4 mt-0.5 shrink-0" stroke={2.2} />{p}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button href={hrefFor(d.key)} variant="accent" size="sm" arrow className={`${BTN[d.key].main} bg-size-[180%_100%]! bg-left! hover:bg-right! hover:brightness-100! transition-[background-position,transform,box-shadow]! duration-500!`}>View {d.label}</Button>
            <Button onClick={() => onBook(`${d.label} consultation`)} variant="outline" size="sm" className={BTN[d.key].soft}>Book Visit</Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

// Home page = common site for the clinic: both doctors, heart care and dental care.
export default function Home() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('General appointment');
  const book = (t = 'General appointment') => { setTopic(t); setOpen(true); };

  const marquee = [...heart.services, ...dental.services].map((s) => ({ t: s.t, i: s.i }));

  return (
    <div className="theme-home min-h-screen bg-paper">
      <Header view="home" onBook={() => book()} />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection
          tags={[{ t: 'Heart Care', c: '#E5484D' }, { t: 'Dental Care', c: '#14B8A6' }, { t: 'HSR Layout, Bengaluru', c: '#F5B53D' }]}
          headline={['Caring for your heart.', 'Creating healthy smiles.']}
          sub={clinicProfile.tagline}
          image={img.building}
          imageAlt="Svasti Heart and Dental Care clinic building in HSR Layout"
          cta1={['Book Appointment', () => book()]}
          cta2={['Explore Our Services', () => scrollToId('services')]}
          side={<CareCards />}
          meta={<HeroMeta items={[{ i: 'Clock', t: clinic.hours }, { i: 'Phone', t: clinic.phone }]} />}
        />

        <TrustHighlights items={marquee} />

        <AboutSection
          eyebrow="About the clinic"
          title={['Heart care and dental', 'care,|under one roof.']}
          text={clinicProfile.bio}
          benefits={clinicProfile.points}
          image={img.clinic}
          image2={img.consult}
          alt="Svasti Heart and Dental Care clinic"
          alt2="Consultation at Svasti Heart and Dental Care"
          stat={{ v: '2', l: 'specialities, heart and dental, in one clinic' }}
          onApproach={() => scrollToId('approach')}
          ctaLabel="Why Choose Us"
        />

        {/* Services: the two areas of care */}
        <div id="services">
          <CareSection d={dental} onBook={book} />
          <CareSection d={heart} onBook={book} flip />
        </div>

        {/* Our doctors */}
        <section id="doctors" className="py-10 sm:py-12 lg:py-16 bg-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="min-w-0">
                <Reveal><Eyebrow>Meet our doctors</Eyebrow></Reveal>
                <Reveal delay={80}><h2 className="mt-5 text-4xl sm:text-5xl lg:text-[clamp(2.4rem,3.6vw,3.6rem)] lg:whitespace-nowrap text-ink">Two specialists. <span className="gt-light">One caring team.</span></h2></Reveal>
              </div>
              <Reveal delay={160}><Button onClick={() => book()} variant="outline" arrow>Book a Consultation</Button></Reveal>
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              {doctors.map((d, n) => <DoctorCard key={d.key} d={d} n={n} onBook={book} />)}
            </div>
          </div>
        </section>

        <PatientExperience d={homeExp} eyebrow="Why choose us" />
        <Statement lines={['Caring for your heart.', 'And your smile.']} />
        <AppointmentCTA title="Ready to take the next step in your care?" text="Book a consultation for heart care or dental care, and let's plan your visit together." onBook={() => book()} />
        <ContactSection />
      </main>
      <Footer view="home" />
      <MobileBar onBook={() => book()} />
      <Booking open={open} onClose={() => setOpen(false)} topic={topic} />
    </div>
  );
}