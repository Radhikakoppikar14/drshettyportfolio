import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../scroll.ts';

// Subtle parallax: moves the element vertically as it passes through the viewport.
// `speed` ~0.08–0.15 keeps it restrained. Only transforms are written (no layout shift),
// it is batched with requestAnimationFrame, and it switches off for reduced motion.
export default function useParallax<T extends HTMLElement>(speed = 0.1) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    let visible = true;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(1)}px, 0)`;
    };
    const on = () => { if (visible && !raf) raf = requestAnimationFrame(paint); };
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) on(); }, { rootMargin: '20% 0px' })
      : null;
    io?.observe(el);
    paint();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}
