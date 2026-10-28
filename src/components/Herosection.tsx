import Button from './Button.tsx';
import Icon from './Icon.tsx';
import Img from './Img.tsx';
import useParallax from './useParallax.ts';

type P = {
  eyebrow?: string;
  tags?: { t: string; c: string }[]; // small pills above the headline, c = dot colour
  headline: [string, string];
  sub: string;
  image: string;
  imageAlt?: string;
  card?: string;
  cta1: [string, () => void];
  cta2: [string, () => void];
  side?: React.ReactNode; // right-hand column (image collage / doctor card)
  meta?: React.ReactNode; // small row under the buttons
  next?: string; // (unused) kept so existing callers still compile
};

// Full-bleed photographic hero: image + dark veil + drifting colour aura, staggered text entrance.
export default function HeroSection({ eyebrow, tags, headline, sub, image, imageAlt = 'Svasti Heart and Dental Care clinic', cta1, cta2, side, meta }: P) {
  const bg = useParallax<HTMLDivElement>(0.12);
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white min-h-[80svh] lg:min-h-[78vh] flex">
      {/* background photo with parallax */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="false">
        <div ref={bg} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
          <Img src={image} alt={imageAlt} eager className="w-full h-full hero-zoom" sizes="100vw" />
        </div>
      </div>
      {/* veils for legibility: vertical on mobile, horizontal on desktop */}
      <div className="absolute inset-0 -z-10 bg-ink/80 lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden lg:block" style={{ background: 'linear-gradient(90deg, #0F2230 0%, rgba(15,34,48,.9) 36%, rgba(15,34,48,.45) 70%, rgba(15,34,48,.55) 100%)' }} />
      <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(0deg, #0F2230 0%, transparent 38%)' }} />
      {/* colour aura + grid */}
      <div className="aura -z-10 w-[34rem] h-[34rem] bg-teal/35 top-[8%] right-[18%]" />
      <div className="aura -z-10 w-[28rem] h-[28rem] bg-coral/30 bottom-[4%] right-[-6%]" style={{ animationDelay: '-6s' }} />
      <div className="aura -z-10 w-[24rem] h-[24rem] bg-plum/40 bottom-[10%] left-[-8%]" style={{ animationDelay: '-11s' }} />
      <div className="absolute inset-0 -z-10 grid-lines" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 lg:pt-28 lg:pb-20 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-7">
          {(tags || eyebrow) && (
            <div className="hin d1 flex flex-wrap gap-2.5">
              {eyebrow && !tags && <span className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/15 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.16em]">{eyebrow}</span>}
              {tags?.map((t) => (
                <span key={t.t} className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/15 backdrop-blur-sm text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.16em]">
                  <i className="w-2 h-2 rounded-full" style={{ background: t.c }} aria-hidden="true" />{t.t}
                </span>
              ))}
            </div>
          )}
          <h1 className="mt-7 text-[2.75rem] leading-[1] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem] lg:leading-[.98] tracking-[-0.04em]">
            <span className="hin d2 block">{headline[0]}</span>
            <span className="hin d3 block gt">{headline[1]}</span>
          </h1>
          <p className="hin d4 mt-6 sm:mt-7 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed">{sub}</p>
          <div className="hin d5 mt-9 flex flex-col sm:flex-row gap-3.5">
            <Button onClick={cta1[1]} arrow icon="CalendarCheck">{cta1[0]}</Button>
            <Button onClick={cta2[1]} variant="ghost">{cta2[0]}</Button>
          </div>
          {meta && <div className="hin d6 mt-10">{meta}</div>}
        </div>
        {side && <div className="lg:col-span-5 hin d4">{side}</div>}
      </div>

      {/* soft rounded transition into the next section */}
      <div className="absolute inset-x-0 -bottom-px h-8 sm:h-10 bg-paper rounded-t-[2rem] sm:rounded-t-[2.75rem]" aria-hidden="true" />
    </section>
  );
}

// Small trust row used under the hero buttons.
export function HeroMeta({ items }: { items: { i: string; t: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-white/70">
      {items.map((m) => (
        <li key={m.t} className="flex items-center gap-2"><Icon name={m.i} className="w-4 h-4 text-white" />{m.t}</li>
      ))}
    </ul>
  );
}