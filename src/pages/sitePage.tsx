import { useState } from 'react';
import AboutSection from '../components/Aboutsection.tsx';
import AppointmentCTA from '../components/Appointmentcta.tsx';
import Booking from '../components/Booking.tsx';
import ContactSection from '../components/Contactsection.tsx';
import DoctorProfile from '../components/Doctorprofile.tsx';
import Footer from '../components/Footer.tsx';
import Header from '../components/Header.tsx';
import HeroSection, { HeroMeta } from '../components/Herosection.tsx';
import Img from '../components/Img.tsx';
import MobileBar from '../components/MobileBar.tsx';
import PatientExperience from '../components/Patientexperience.tsx';
import TreatmentsSection from '../components/Treatmentssection.tsx';
import TrustHighlights from '../components/Trusthighlights.tsx';
import { clinic, img, type Dept } from '../data.ts';
import { scrollToId } from '../scroll.ts';

// Hero side for a department: the doctor's portrait with a floating credential card.
const DoctorHeroCard = ({ d }: { d: Dept }) => {
  const c = d.key === 'heart' ? '#E5484D' : '#0E9384';
  return (
    <div className="relative max-w-sm mx-auto lg:max-w-none lg:ml-8">
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] aspect-[4/5] ring-1 ring-white/15 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]">
        <Img src={d.doctor.image} alt={`${d.doctor.name}, ${d.doctor.role}`} eager className="w-full h-full object-[50%_18%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: c }} />
        <div className="absolute left-5 right-5 bottom-5">
          <p className="font-display text-2xl font-semibold">{d.doctor.name}</p>
          <p className="text-sm text-white/75">{d.doctor.role} · {d.doctor.creds}</p>
        </div>
      </div>
      <div className="bob absolute left-3 sm:-left-10 top-6 sm:top-10 rounded-2xl bg-white text-ink px-4 py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,.6)]">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Experience</p>
        <p className="font-display text-base font-semibold">{d.doctor.exp}</p>
      </div>
    </div>
  );
};

// One department website (heart or dental). Same design system, its own colour identity and content.
export default function SitePage({ d }: { d: Dept }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('General appointment');
  const book = (t = `${d.label} appointment`) => {
    setTopic(t);
    setOpen(true);
  };
  const isHeart = d.key === 'heart';
  return (
    <div className={`${isHeart ? 'theme-heart' : 'theme-dental'} min-h-screen bg-paper`}>
      <Header view={d.key} onBook={() => book()} />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection
          tags={[{ t: d.label, c: isHeart ? '#E5484D' : '#14B8A6' }, { t: 'Svasti, HSR Layout', c: '#F5B53D' }]}
          headline={d.headline}
          sub={d.sub}
          image={d.heroImg}
          imageAlt={`${d.label} at Svasti Heart and Dental Care`}
          cta1={['Book Appointment', () => book()]}
          cta2={[isHeart ? 'Explore Our Services' : 'Explore Our Treatments', () => scrollToId('services')]}
          side={<DoctorHeroCard d={d} />}
          meta={<HeroMeta items={[{ i: 'Clock', t: clinic.hours }, { i: 'Phone', t: clinic.phone }]} />}
        />
        <TrustHighlights items={[...d.highlights, ...d.services.map((s) => ({ t: s.t, i: s.i }))]} />
        <AboutSection
          eyebrow={`About ${d.label}`}
          title={d.aboutTitle}
          text={d.aboutText}
          benefits={d.benefits}
          image={d.aboutImg}
          image2={isHeart ? img.heartRoom : img.dentalRoom}
          alt="A bright, modern clinic space"
          alt2={isHeart ? 'Cardiac care room at the clinic' : 'Dental treatment room at the clinic'}
          stat={{ v: d.doctor.exp.replace(/ years? of experience/i, '').replace(/^About /i, '~'), l: `years of experience · ${d.doctor.name}` }}
          onApproach={() => scrollToId('approach')}
        />
        <TreatmentsSection d={d} onLearn={(t) => book(t)} />
        <DoctorProfile doctor={d.doctor} onBook={() => book()} />
        <PatientExperience d={d} />
        <AppointmentCTA title={d.ctaTitle} text={d.ctaText} onBook={() => book()} image={isHeart ? img.consult : img.reception} />
        <ContactSection />
      </main>
      <Footer onBook={() => book()} />
      <MobileBar onBook={() => book()} />
      <Booking open={open} onClose={() => setOpen(false)} topic={topic} />
    </div>
  );
}
