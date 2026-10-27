import Button from './Button.tsx';
import Icon from './Icon.tsx';
import Reveal from './Reveal.tsx';

type P = { eyebrow?: string; title: string; text?: string; items: { i: string; t: string; d: string }[]; onBook: () => void; dark?: boolean };

export default function WhyChoose({ eyebrow = 'Why choose us', title, text, items, onBook, dark }: P) {
  return (
    <section id="approach" className={`py-8 lg:py-10 border-b border-forest/10 ${dark ? 'bg-forest text-ivory' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-center">
        <Reveal className="lg:col-span-2 space-y-6">
          <p className={`text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-3 ${dark ? 'text-champagne' : 'text-forest'}`}><span className="w-8 h-px bg-current opacity-50" />{eyebrow}</p>
          <h2 className={`text-4xl sm:text-5xl leading-[1.08] ${dark ? 'text-ivory' : 'text-forest'}`}>{title}</h2>
          {text && <p className={dark ? 'text-ivory/75' : 'text-warm'}>{text}</p>}
          <Button onClick={onBook} variant={dark ? 'light' : 'primary'} arrow>Book a Visit</Button>
        </Reveal>
        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
          {items.map((w, n) => (
            <Reveal key={w.t} delay={n * 90} className="h-full">
              <div className={`h-full rounded-2xl p-7 border ${dark ? 'bg-white/5 border-white/10' : 'bg-ivory border-forest/10'}`}>
                <span className={`w-11 h-11 rounded-xl border flex items-center justify-center ${dark ? 'border-champagne/60 text-champagne' : 'border-champagne bg-white text-forest'}`}><Icon name={w.i} /></span>
                <h3 className="text-xl mt-5">{w.t}</h3>
                <p className={`text-sm mt-2 leading-relaxed ${dark ? 'text-ivory/70' : 'text-warm'}`}>{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}