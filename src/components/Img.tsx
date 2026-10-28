import { useState } from 'react';

// Image with lazy loading. `src` may list fallbacks separated by "|" – e.g. "/images/a.jpg|https://stock/...".
// If every link fails, a soft gradient is shown instead of a broken image.
// `zoom` crops in a little so photos fill their frame and look larger and clearer (parents clip with overflow-hidden).
// Stock (Unsplash) links get a responsive srcset, so large screens receive an HD version.
type P = { src: string; alt: string; className?: string; eager?: boolean; sizes?: string; zoom?: number; origin?: string; pos?: string };

const isStock = (u: string) => u.includes('images.unsplash.com') && /[?&]w=\d+/.test(u);
const withWidth = (u: string, w: number) => u.replace(/([?&])w=\d+/, `$1w=${w}`);

export default function Img({ src, alt, className = '', eager = false, sizes = '100vw', zoom = 1.12, origin = 'center', pos }: P) {
  const list = src.split('|');
  const [i, setI] = useState(0);
  if (i >= list.length) {
    return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-teal/40 via-sky/30 to-coral/40 ${className}`} />;
  }
  const cur = list[i];
  const srcSet = isStock(cur) ? [800, 1200, 1800, 2400].map((w) => `${withWidth(cur, w)} ${w}w`).join(', ') : undefined;
  return (
    <img
      key={cur}
      src={cur}
      srcSet={srcSet}
      alt={alt}
      sizes={srcSet ? sizes : undefined}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setI(i + 1)}
      style={{ scale: zoom, transformOrigin: origin, objectPosition: pos }}
      className={`object-cover ${className}`}
    />
  );
}