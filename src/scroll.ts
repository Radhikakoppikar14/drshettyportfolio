// Shared smooth-scroll helper. Offsets for the fixed header and respects reduced motion.
export const HEADER_OFFSET = 72;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id: string) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
  if (id === 'top') return window.scrollTo({ top: 0, behavior });
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 1, behavior });
}
