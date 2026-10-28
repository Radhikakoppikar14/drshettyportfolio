import Button from './Button.tsx';
import Eyebrow from './Eyebrow.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import useParallax from './useParallax.ts';
import { clinic, img } from '../data.ts';

// Soft medical-cross pattern (very faint) for a calm clinic feel.
const CROSS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='76' height='76'%3E%3Cpath d='M35 29h6v6h6v6h-6v6h-6v-6h-6v-6h6z' fill='%230E9384' fill-opacity='.05'/%3E%3C/svg%3E")`;

// Appointment banner in a light, calm clinic style: bright clinic photo behind a soft white wash,
// centred text. Hours / address live in the Contact section just below, so they are not repeated here.
export default function AppointmentCTA({ title, text, onBook, image = img.reception, dept }: { title: string; text: string; onBook: () => void; image?: string; dept?: 'heart' | 'dental' }) {
  const par = useParallax<HTMLDivElement>(0.08);
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-paper">
      <Reveal v="zoom">
        <div className="relative isolate overflow-hidden max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.75rem] bg-[#EEF7F5] ring-1 ring-[#D5EAE6] px-5 py-12 sm:px-12 sm:py-16 md:px-16 md:py-24 text-center">
          {/* bright clinic photo */}
          <div className="absolute inset-0 -z-30 overflow-hidden">
            <div ref={par} className="absolute inset-x-0 -top-[10%] h-[120%]"><Img src={image} alt="" zoom={1.04} className="w-full h-full" /></div>
          </div>
          {/* soft white / mint wash: clean in the middle for the text, photo visible at the sides */}
          <div className="absolute inset-0 -z-20" style={{ background: 'radial-gradient(ellipse 62% 80% at 50% 50%, rgba(255,255,255,.95) 0%, rgba(246,251,250,.9) 55%, rgba(238,247,245,.62) 100%)' }} />
          <div className="absolute inset-0 -z-10" style={{ backgroundImage: CROSS }} />
          <div className="absolute inset-x-0 top-0 h-1.5 -z-10" style={{ background: 'linear-gradient(90deg,#0E9384,#3BA7E5,#E5484D)' }} />

          <div className="relative mx-auto max-w-5xl">
            <div className="flex justify-center items-center gap-3 mb-5 sm:mb-6">
              {dept !== 'heart' && <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#0E9384] ring-1 ring-[#D5EAE6] shadow-sm flex items-center justify-center"><Icon name="Smile" /></span>}
              {dept !== 'dental' && <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#E5484D] ring-1 ring-[#F3D6D4] shadow-sm flex items-center justify-center"><Icon name="HeartPulse" /></span>}
            </div>
            <Eyebrow>Book your visit</Eyebrow>
            <h2 className="mt-4 sm:mt-5 text-[2rem] sm:text-5xl lg:text-[3.1rem] xl:text-[3.4rem] leading-[1.08] text-ink lg:whitespace-nowrap">{title}</h2>
            <p className="mt-4 sm:mt-5 mx-auto text-muted text-[15px] sm:text-lg max-w-3xl leading-relaxed">{text}</p>


            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-3.5 max-w-sm sm:max-w-none mx-auto">
              <Button onClick={onBook} arrow icon="CalendarCheck" className="w-full sm:w-auto">Book an Appointment</Button>
              <Button href={clinic.tel} variant="outline" icon="Phone" className="bg-white w-full sm:w-auto">Call {clinic.phone}</Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}