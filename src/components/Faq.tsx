import Icon from './Icon.tsx';
import Reveal from './Reveal.tsx';

export default function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="py-8 lg:py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal><h2 className="text-4xl sm:text-5xl text-forest text-center">Common questions</h2></Reveal>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-white rounded-2xl border border-forest/10 p-6 open:shadow-[0_16px_40px_-24px_rgba(90,30,54,0.3)] transition-shadow">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-forest">
                {f.q}<span className="group-open:rotate-180 transition-transform text-champagne"><Icon name="ChevronDown" /></span>
              </summary>
              <p className="text-sm text-warm leading-relaxed mt-4">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}