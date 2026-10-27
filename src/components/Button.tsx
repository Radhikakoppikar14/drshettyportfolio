import Icon from './Icon.tsx';

type Variant = 'primary' | 'dark' | 'light' | 'ghost' | 'outline' | 'accent';
type P = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  icon?: string; // optional leading icon
  className?: string;
  size?: 'md' | 'sm';
  external?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
};

// Pill buttons in the style of the reference: lift on hover, arrow nudges, gradient slides.
export default function Button({ children, onClick, href, variant = 'primary', arrow, icon, className = '', size = 'md', external, type, ariaLabel }: P) {
  const v: Record<Variant, string> = {
    primary: 'btn-grad text-white shadow-[0_14px_34px_-14px_rgba(126,51,115,.7)] hover:shadow-[0_20px_44px_-14px_rgba(126,51,115,.8)]',
    dark: 'bg-ink text-white hover:bg-ink-3',
    light: 'bg-white text-ink hover:shadow-[0_16px_34px_-16px_rgba(0,0,0,.45)]',
    ghost: 'text-white ring-[1.5px] ring-inset ring-white/35 hover:ring-white hover:bg-white/5',
    outline: 'text-ink ring-[1.5px] ring-inset ring-ink/20 hover:ring-ink/60 bg-white/40',
    accent: 'bg-acc text-white hover:brightness-110',
  };
  const s = size === 'sm' ? 'h-11 px-5 text-[13px]' : 'h-12 sm:h-14 px-6 sm:px-7 text-sm sm:text-[15px]';
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky ${s} ${v[variant]} ${className}`;
  const inner = (
    <>
      {icon && <Icon name={icon} className="w-[18px] h-[18px]" />}
      {children}
      {arrow && <Icon name="ArrowRight" className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return <button type={type ?? 'button'} onClick={onClick} className={cls} aria-label={ariaLabel}>{inner}</button>;
}
