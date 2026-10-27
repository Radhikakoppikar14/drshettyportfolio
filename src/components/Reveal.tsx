import { useEffect, useRef, useState } from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'fade' | 'mask';

type P = {
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
  v?: RevealVariant;
  as?: 'div' | 'li' | 'article' | 'figure';
  repeat?: boolean; // replay the animation every time it scrolls back into view
};

// Reveals its children every time they scroll into view (pass repeat={false} to play only once). Uses transform/opacity only,
// so nothing shifts the layout. Reduced-motion users see everything immediately (see index.css).
export default function Reveal({ children, delay = 0, className = '', v = 'up', as = 'div', repeat = true }: P) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setOn(true); if (!repeat) io.disconnect(); }
        else if (repeat) setOn(false);
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [repeat]);
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      data-v={v}
      className={`rv ${on ? 'in' : ''} ${className}`}
      style={{ transitionDelay: on || !repeat ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}