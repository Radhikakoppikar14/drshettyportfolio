import Icon from './Icon.tsx';
import Img from './Img.tsx';

type S = { t: string; d: string; i: string; img: string };
type P = { s: S; n: number; color: string; dark?: boolean; href?: string; onClick?: () => void; action?: string };

// Image service card: coloured top bar, numbered, lifts and zooms on hover, soft colour glow.
export default function ServiceCard({ s, n, color, dark = false, href, onClick, action = 'Learn more' }: P) {
  const body = (
    <>
      <span className="absolute inset-x-0 top-0 h-1 z-10" style={{ background: color }} aria-hidden="true" />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Img src={s.img} alt={s.t} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <span className="absolute left-4 bottom-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center" style={{ color }}>
          <Icon name={s.i} />
        </span>
        <span className="absolute right-4 top-4 text-[12px] font-semibold tracking-[0.16em] text-white/90">{String(n + 1).padStart(2, '0')}</span>
      </div>
      <div className="relative flex flex-col flex-1 p-6">
        <h3 className={`text-[1.4rem] ${dark ? 'text-white' : 'text-ink'}`}>{s.t}</h3>
        <p className={`mt-2 text-sm leading-relaxed flex-1 ${dark ? 'text-muted-d' : 'text-muted'}`}>{s.d}</p>
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${dark ? 'text-white' : 'text-ink'}`}>
          {action}
          <Icon name="ArrowRight" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </>
  );
  const cls = `group glow lift zoom-img relative h-full flex flex-col text-left rounded-[1.75rem] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky ${
    dark ? 'bg-white/[0.05] ring-1 ring-inset ring-white/10 hover:ring-white/25' : 'bg-white ring-1 ring-line'
  }`;
  const style = { ['--c' as string]: color } as React.CSSProperties;
  return href ? (
    <a href={href} className={cls} style={style} aria-label={`${s.t} – ${action}`}>{body}</a>
  ) : (
    <button type="button" onClick={onClick} className={cls} style={style} aria-label={`${s.t} – ${action}`}>{body}</button>
  );
}
