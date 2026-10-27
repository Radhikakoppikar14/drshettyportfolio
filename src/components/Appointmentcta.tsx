import Button from './Button.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import useParallax from './useParallax.ts';
import { clinic, img } from '../data.ts';

// Photo-backed appointment banner with colour aura.
export default function AppointmentCTA({ title, text, onBook, image = img.reception }: { title: string; text: string; onBook: () => void; image?: string }) {
  const par = useParallax<HTMLDivElement>(0.1);
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-paper">
      <Reveal v="zoom">
        <div className="relative isolate overflow-hidden max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.75rem] bg-ink text-white px-6 py-16 sm:px-12 md:px-16 md:py-24">
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <div ref={par} className="absolute inset-x-0 -top-[12%] h-[124%]"><Img src={image} alt="" className="w-full h-full" /></div>
          </div>
          <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(100deg, rgba(15,34,48,.95) 0%, rgba(15,34,48,.82) 50%, rgba(15,34,48,.55) 100%)' }} />
          <div className="aura -z-10 w-[26rem] h-[26rem] bg-teal/35 -left-20 -top-24" />
          <div className="aura -z-10 w-[24rem] h-[24rem] bg-coral/35 right-0 -bottom-28" style={{ animationDelay: '-9s' }} />
          <div className="relative max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">{title}</h2>
            <p className="mt-6 text-white/75 text-base sm:text-lg max-w-xl">{text}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
              <Button onClick={onBook} arrow icon="CalendarCheck">Book an Appointment</Button>
              <Button href={clinic.tel} variant="ghost" icon="Phone">Call {clinic.phone}</Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}