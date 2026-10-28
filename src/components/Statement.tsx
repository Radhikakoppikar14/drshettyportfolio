import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.tsx';

// Short brand statement on ONE line: "Caring for your smile (icon) at every step."
// The icon bubble gently beats, and a hand-drawn underline draws itself under the second half when scrolled into view.
export default function Statement({ lines }: { lines: [string, string]; onBook?: () => void }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const all = lines.join(' ');
  const icons = [
    /heart/i.test(all) && { i: 'HeartPulse', c: '#E5484D' },
    /smile|dental|teeth/i.test(all) && { i: 'Smile', c: '#0E9384' },
  ].filter(Boolean) as { i: string; c: string }[];

  const first = lines[0].replace(/[.!]\s*$/, '');
  const second = lines[1].charAt(0).toLowerCase() + lines[1].slice(1);

  return (
    <section aria-label="Our promise" className="bg-paper py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          ref={ref}
          className={`font-display font-semibold tracking-tight leading-[1.15] text-ink text-center text-[1.9rem] sm:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem] md:whitespace-nowrap transition-all duration-700 ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span>{first}</span>
          {/* beating icon bubble(s) between the two halves */}
          <span className="inline-flex align-middle mx-2 sm:mx-4 -space-x-2 sm:-space-x-3" aria-hidden="true">
            {icons.map((x, n) => (
              <span
                key={x.i}
                className="statement-beat w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white ring-4 ring-paper shadow-[0_12px_28px_-14px_rgba(15,34,48,.45)] inline-flex items-center justify-center"
                style={{ color: x.c, animationDelay: `${n * 0.35}s` }}
              >
                <Icon name={x.i} className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" stroke={2} />
              </span>
            ))}
          </span>
          <span className="relative inline-block">
            <span className="gt-light">{second}</span>
            {/* hand-drawn underline */}
            <svg className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-3 sm:h-4 overflow-visible" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="st-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="#0E9384" />
                  <stop offset=".5" stopColor="#3BA7E5" />
                  <stop offset="1" stopColor="#E5484D" />
                </linearGradient>
              </defs>
              <path
                d="M3 11 C 60 3, 120 3, 170 8 S 260 14, 297 5"
                fill="none"
                stroke="url(#st-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: 'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1) .45s' }}
              />
            </svg>
          </span>
        </p>
      </div>
      <style>{`
        .statement-beat { animation: stBeat 2.4s ease-in-out infinite; }
        @keyframes stBeat { 0%, 60%, 100% { transform: scale(1); } 10% { transform: scale(1.12); } 20% { transform: scale(.98); } 30% { transform: scale(1.08); } }
        @media (prefers-reduced-motion: reduce) { .statement-beat { animation: none; } }
      `}</style>
    </section>
  );
}