import Button from './Button.tsx';
import Eyebrow from './Eyebrow.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import Reveal from './Reveal.tsx';
import useParallax from './useParallax.ts';

type P = {
  eyebrow?: string;
  title: [string, string];
  text: string;
  benefits: string[];
  image: string;
  image2?: string;
  alt: string;
  alt2?: string;
  stat?: { v: string; l: string };
  onApproach: () => void;
  ctaLabel?: string;
};

const BENEFIT_ICONS = ['UserRound', 'MessageCircle', 'ShieldCheck'];

// Image-led "about" block: large masked photo with parallax, overlapping second photo, floating stat.
export default function AboutSection({ eyebrow = 'About us', title, text, benefits, image, image2, alt, alt2 = '', stat, onApproach, ctaLabel = 'Our Approach' }: P) {
  const par = useParallax<HTMLDivElement>(0.08);
  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-28 bg-paper overflow-hidden">
      <div className="aura w-[30rem] h-[30rem] bg-[var(--acc-soft)] -left-40 top-10 opacity-90" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 relative pb-10 sm:pb-14 pr-6 sm:pr-14">
          <Reveal repeat v="mask">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] aspect-[4/5] sm:aspect-[5/5] bg-cream">
              <div ref={par} className="absolute inset-x-0 -top-[8%] h-[116%]">
                <Img src={image} alt={alt} className="w-full h-full" />
              </div>
            </div>
          </Reveal>
          {image2 && (
            <Reveal repeat v="zoom" delay={250} className="absolute right-0 bottom-0 w-[46%] sm:w-[42%]">
              <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] ring-[6px] sm:ring-8 ring-paper aspect-[4/5] shadow-[0_30px_60px_-30px_rgba(15,34,48,.5)] zoom-img">
                <Img src={image2} alt={alt2} className="w-full h-full" />
              </div>
            </Reveal>
          )}
          {stat && (
            <Reveal repeat v="up" delay={400} className="absolute left-4 sm:left-6 bottom-4 sm:bottom-8">
              <div className="bob rounded-2xl bg-white/95 backdrop-blur px-5 py-4 shadow-[0_24px_50px_-24px_rgba(15,34,48,.45)]">
                <p className="font-display text-3xl sm:text-4xl font-semibold gt-light leading-none">{stat.v}</p>
                <p className="mt-1.5 text-xs text-muted max-w-[11rem]">{stat.l}</p>
              </div>
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-6">
          <Reveal repeat><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal repeat delay={80}>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] text-ink">{title[0]}<br />{title[1].includes('|') ? <>{title[1].split('|')[0]} <span className="t-acc">{title[1].split('|')[1]}</span></> : <span className="t-acc">{title[1]}</span>}</h2>
          </Reveal>
          <Reveal repeat delay={160}><p className="mt-6 text-muted text-base sm:text-[17px] leading-relaxed max-w-xl">{text}</p></Reveal>
          <ul className="mt-8 grid gap-3">
            {benefits.map((b, n) => (
              <Reveal repeat as="li" key={b} delay={220 + n * 90} v="left">
                <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3.5 ring-1 ring-line hover:ring-[var(--acc)] transition-colors">
                  <span className="w-10 h-10 rounded-xl bg-acc-soft t-acc flex items-center justify-center shrink-0"><Icon name={BENEFIT_ICONS[n % 3]} /></span>
                  <span className="text-[15px] text-text">{b}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal repeat delay={480} className="mt-9"><Button onClick={onApproach} variant="outline" arrow>{ctaLabel}</Button></Reveal>
        </div>
      </div>
    </section>
  );
}