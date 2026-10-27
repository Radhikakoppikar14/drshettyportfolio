import { useEffect, useRef, useState } from 'react';

// Animated step line: the line draws from step 1 to the last step and each circle lights up as it is reached.
export default function Process({ steps, dark, accent }: { steps: string[]; dark: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const D = 900; // ms between steps
  const total = D * (steps.length - 1);
  const edge = `${100 / (steps.length * 2)}%`;

  return (
    <section className="text-white" style={{ background: dark }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="font-serif text-4xl md:text-5xl text-center">Your visit, step by step</h2>
        <div ref={ref} className="relative mt-10">
          {/* desktop: horizontal line */}
          <div className="hidden lg:block absolute top-8 h-0.5 bg-white/20" style={{ left: edge, right: edge }}>
            <div className="h-full" style={{ background: accent, width: on ? '100%' : '0%', transition: `width ${total}ms linear` }} />
          </div>
          {/* mobile: vertical line */}
          <div className="lg:hidden absolute left-8 top-8 bottom-8 w-0.5 bg-white/20 -translate-x-1/2">
            <div className="w-full" style={{ background: accent, height: on ? '100%' : '0%', transition: `height ${total}ms linear` }} />
          </div>

          <ol className="relative grid lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s} className="flex lg:flex-col items-center lg:text-center gap-5">
                <span
                  className="w-16 h-16 shrink-0 rounded-full border-2 flex items-center justify-center font-serif text-2xl transition-all duration-500"
                  style={{
                    borderColor: on ? accent : 'rgba(255,255,255,.3)',
                    background: on ? accent : dark,
                    boxShadow: on ? `0 0 0 8px ${accent}33` : 'none',
                    transitionDelay: `${i * D}ms`,
                  }}
                >
                  {i + 1}
                </span>
                <p className="font-semibold text-lg transition-all duration-700" style={{ opacity: on ? 1 : 0.3, transform: on ? 'none' : 'translateY(8px)', transitionDelay: `${i * D}ms` }}>
                  {s}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}