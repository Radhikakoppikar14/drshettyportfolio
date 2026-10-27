import { useState } from 'react';

// Image with lazy loading. `src` may list fallbacks separated by "|" – e.g. "/images/a.jpg|https://stock/...".
// If every link fails, a soft gradient is shown instead of a broken image.
type P = { src: string; alt: string; className?: string; eager?: boolean; sizes?: string };

export default function Img({ src, alt, className = '', eager = false, sizes }: P) {
  const list = src.split('|');
  const [i, setI] = useState(0);
  if (i >= list.length) {
    return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-teal/40 via-sky/30 to-coral/40 ${className}`} />;
  }
  return (
    <img
      key={list[i]}
      src={list[i]}
      alt={alt}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setI(i + 1)}
      className={`object-cover ${className}`}
    />
  );
}
