import { useState } from 'react';

// Clinic logo, transparent background, no badge: /public/images/logo.png (dark ink, for light areas)
// and /public/images/logo-white.png (white, for the dark hero, footer and mobile menu).
// If logo-white.png is missing, logo.png is turned white automatically so the logo never shows as a broken image.
// `sub` is the department label shown next to the logo on the heart / dental websites.
export default function Logo({ light = false, sub, compact = false }: { light?: boolean; sub?: string; compact?: boolean }) {
  const dept = sub && sub !== 'Heart & Dental Care' ? sub : '';
  const [noWhite, setNoWhite] = useState(false);
  const useWhiteFile = light && !noWhite;
  return (
    <span className="flex items-center gap-2.5 select-none">
      <img
        src={useWhiteFile ? '/images/logo-white.png' : '/images/logo.png'}
        onError={() => { if (useWhiteFile) setNoWhite(true); }}
        alt="Svasti Heart and Dental Care"
        className={`w-auto transition-all duration-300 ${compact ? 'h-16' : 'h-20 sm:h-24'} ${light && noWhite ? 'brightness-0 invert' : ''}`}
      />
      {dept && (
        <span className={`hidden sm:block pl-3 border-l text-[11px] font-semibold uppercase tracking-[0.2em] ${light ? 'border-white/30 text-white/85' : 'border-ink/15 text-muted'}`}>{dept}</span>
      )}
    </span>
  );
}