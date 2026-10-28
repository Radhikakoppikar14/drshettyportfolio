import { useEffect, useRef, useState } from 'react';
import Button from './Button.tsx';
import Icon from './Icon.tsx';
import { bookingEndpoint, clinic, dental, heart } from '../data.ts';

type DeptKey = '' | 'dental' | 'heart';
type Status = 'idle' | 'sending' | 'sent' | 'manual' | 'error';

const DEPTS = { dental, heart } as const;
const GENERAL = 'General consultation / not sure yet';

// Works out which department and treatment an "Ask about this" / "Book" click was about.
// `topic` is either a treatment title (e.g. "Braces & TMJ Therapy") or text like "Heart Care appointment".
function derive(topic: string): { dept: DeptKey; service: string } {
  for (const k of ['dental', 'heart'] as const) {
    if (DEPTS[k].services.some((s) => s.t === topic)) return { dept: k, service: topic };
  }
  if (/dental/i.test(topic)) return { dept: 'dental', service: '' };
  if (/heart|cardi/i.test(topic)) return { dept: 'heart', service: '' };
  return { dept: '', service: '' };
}

const today = () => new Date().toISOString().slice(0, 10);

export default function Booking({ open, onClose, topic }: { open: boolean; onClose: () => void; topic: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [dept, setDept] = useState<DeptKey>(() => derive(topic).dept);
  const [service, setService] = useState(() => derive(topic).service);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [tried, setTried] = useState(false); // show red outlines only after a submit attempt
  const first = useRef<HTMLInputElement>(null);
  const close = () => { setStatus('idle'); onClose(); };

  // every time the form opens, start from what the visitor clicked on
  useEffect(() => {
    if (!open) return;
    const d = derive(topic);
    setDept(d.dept);
    setService(d.service);
    setStatus('idle');
    setTried(false);
  }, [open, topic]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => first.current?.focus(), 60);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', k);
    return () => { window.clearTimeout(t); document.body.style.overflow = ''; window.removeEventListener('keydown', k); prev?.focus?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const deptLabel = dept ? DEPTS[dept].label : '';
  const services = dept ? [...DEPTS[dept].services.map((s) => s.t), GENERAL] : [];
  const purpose = [deptLabel, service].filter(Boolean).join(' – ');
  const payload = { department: deptLabel, treatment: service || GENERAL, name: name.trim(), phone: phone.trim(), preferredDate: date, message: message.trim() };
  const mailto = (() => {
    const subject = `Appointment request – ${purpose || 'General'}`;
    const body = [
      `Department: ${payload.department}`,
      `Treatment / reason: ${payload.treatment}`,
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Preferred date: ${payload.preferredDate || 'Not specified'}`,
      `Message: ${payload.message || '-'}`,
    ].join('\n');
    return `mailto:${clinic.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  })();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEndpoint) { setStatus('manual'); return; }
    setStatus('sending');
    try {
      const r = await fetch(bookingEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      setStatus(r.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const f = 'w-full h-12 rounded-xl ring-1 ring-inset ring-line bg-paper pl-11 pr-11 text-[15px] text-text placeholder:text-muted/70 transition-all duration-300 hover:ring-ink/25 hover:bg-white focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--acc)] focus:shadow-[0_10px_28px_-16px_rgba(15,34,48,.45)]';
  const bad = "ring-2! ring-[#E5484D]! bg-[#FDF3F2]!";
  const label = 'block text-[12px] font-medium text-muted mb-1.5';
  const done = status === 'sent' || status === 'manual';

  // live validation + progress
  const phoneDigits = phone.replace(/\D/g, '');
  const ok = { dept: !!dept, service: !!service, name: name.trim().length >= 2, phone: phoneDigits.length >= 10 };
  const filled = Object.values(ok).filter(Boolean).length;
  const pct = Math.round((filled / 4) * 100);

  const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const plus = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };
  const quick = [{ l: 'Today', v: plus(0) }, { l: 'Tomorrow', v: plus(1) }, { l: 'In 2 days', v: plus(2) }];

  const deptCards = [
    { k: 'dental' as const, t: 'Dental Care', d: 'Teeth, gums & smile', i: 'Smile', c: '#0E9384', soft: '#E3F4F1' },
    { k: 'heart' as const, t: 'Heart Care', d: 'Heart check-ups', i: 'HeartPulse', c: '#E5484D', soft: '#FCEDEC' },
  ];

  // leading icon (lights up on focus) + green tick once the field is valid
  const Lead = ({ i }: { i: string }) => (
    <Icon name={i} className="w-[18px] h-[18px] absolute left-4 top-1/2 -translate-y-1/2 text-muted/70 pointer-events-none transition-colors duration-300 group-focus-within/f:text-[var(--acc)]" />
  );
  const Tick = ({ on, right = 'right-4' }: { on: boolean; right?: string }) => (
    <span className={`absolute ${right} top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0E9384] text-white flex items-center justify-center pointer-events-none transition-all duration-300 ${on ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
      <Icon name="Check" className="w-3 h-3" stroke={3} />
    </span>
  );
  return (
    <div className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 fade-in" onClick={close} role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="pop-in relative w-full sm:max-w-xl bg-white rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden max-h-[92svh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* progress bar fills as the form is completed */}
        <div className="h-1.5 shrink-0 bg-line/60">
          <div className="h-full transition-[width] duration-700 ease-out" style={{ width: done ? '100%' : `${Math.max(pct, 4)}%`, background: 'var(--grad-btn)' }} />
        </div>
        <button onClick={close} aria-label="Close" className="absolute z-10 top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-paper transition-colors hover:bg-line/60 text-muted hover:text-ink flex items-center justify-center"><Icon name="X" /></button>
        {/* only the content scrolls, with a slim scrollbar kept inside the rounded card */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-9 [scrollbar-width:thin] [scrollbar-color:#D9D3CA_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D9D3CA]">
          {done ? (
            <div className="py-2">
              <span className="w-14 h-14 rounded-full bg-acc-soft t-acc flex items-center justify-center"><Icon name="Check" className="w-7 h-7" stroke={2.2} /></span>
              <h3 id="booking-title" className="mt-5 text-3xl text-ink">{status === 'sent' ? 'Thank you' : 'One last step'}</h3>
              <p className="text-muted mt-2 text-sm">
                {status === 'sent' ? 'We have received your request and will call you to confirm.' : 'Send your request to the clinic by email, or call us to book right away.'}
              </p>
              <dl className="mt-5 rounded-2xl bg-paper ring-1 ring-line p-4 text-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                <dt className="text-muted">Department</dt><dd className="text-ink font-medium">{payload.department}</dd>
                <dt className="text-muted">Treatment</dt><dd className="text-ink font-medium">{payload.treatment}</dd>
                <dt className="text-muted">Name</dt><dd className="text-ink">{payload.name}</dd>
                <dt className="text-muted">Phone</dt><dd className="text-ink">{payload.phone}</dd>
                <dt className="text-muted">Date</dt><dd className="text-ink">{payload.preferredDate || 'Not specified'}</dd>
              </dl>
              <div className="mt-6 flex flex-col gap-3">
                {status === 'manual' && <Button href={mailto} icon="Mail" arrow>Email this request</Button>}
                <Button href={clinic.tel} icon="Phone" variant={status === 'manual' ? 'outline' : 'primary'}>Call {clinic.phone}</Button>
                <Button onClick={close} variant="outline">Close</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { setTried(true); submit(e); }} onInvalidCapture={() => setTried(true)} className="space-y-4">
              <div className="pr-10">
                <h3 id="booking-title" className="text-[1.65rem] sm:text-3xl text-ink leading-tight">Book an Appointment</h3>
                <p className="mt-1.5 text-[13px] text-muted flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    {[0, 1, 2, 3].map((n) => (
                      <i key={n} className={`block h-1.5 rounded-full transition-all duration-500 ${n < filled ? 'w-5 bg-[var(--acc)]' : 'w-1.5 bg-line'}`} />
                    ))}
                  </span>
                  {filled === 4 ? 'All set – ready to send' : `${filled} of 4 details added`}
                </p>
              </div>
              {purpose && (
                <p className="fade-in inline-flex items-center gap-2 rounded-full bg-acc-soft t-acc px-3 py-1 text-xs font-medium"><Icon name="CalendarCheck" className="w-3.5 h-3.5" />{purpose}</p>
              )}

              <fieldset>
                <legend className={label}>Appointment for</legend>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {deptCards.map((c) => {
                    const on = dept === c.k;
                    return (
                      <label
                        key={c.k}
                        className={`relative cursor-pointer rounded-2xl p-3 sm:p-3.5 ring-1 ring-inset transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(15,34,48,.5)] active:scale-[0.98] ${on ? 'ring-2 shadow-[0_14px_30px_-18px_rgba(15,34,48,.5)]' : tried && !dept ? bad : 'ring-line bg-paper hover:bg-white'}`}
                        style={on ? { boxShadow: `inset 0 0 0 2px ${c.c}`, background: c.soft } : undefined}
                      >
                        <input type="radio" name="bk-dept" value={c.k} required checked={on} onChange={() => { setDept(c.k); setService(''); }} className="sr-only" />
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${on ? 'text-white rotate-[-6deg] scale-110' : 'bg-white'}`} style={{ background: on ? c.c : undefined, color: on ? '#fff' : c.c }}>
                          <Icon name={c.i} />
                        </span>
                        <span className="mt-2.5 block text-[14px] sm:text-[15px] font-medium text-ink">{c.t}</span>
                        <span className="block text-[12px] text-muted leading-snug">{c.d}</span>
                        <span className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white transition-all duration-300 ${on ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ background: c.c }}>
                          <Icon name="Check" className="w-3 h-3" stroke={3} />
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="bk-service" className={label}>Treatment / reason</label>
                <div className="group/f relative">
                  <Lead i="Stethoscope" />
                  <select id="bk-service" required disabled={!dept} value={service} onChange={(e) => setService(e.target.value)} className={`${f} appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-paper disabled:hover:ring-line ${tried && dept && !service ? bad : ''}`}>
                    <option value="" disabled>{dept ? 'Select a treatment' : 'Choose a department first'}</option>
                    {services.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {ok.service ? <Tick on right="right-4" /> : <Icon name="ChevronDown" className="w-4 h-4 text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-focus-within/f:rotate-180" />}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="group/f relative">
                  <Lead i="UserRound" />
                  <input ref={first} required minLength={2} value={name} onChange={(e) => setName(e.target.value)} aria-label="Full name" placeholder="Full name" autoComplete="name" className={`${f} ${tried && !ok.name ? bad : ''}`} />
                  <Tick on={ok.name} />
                </div>
                <div className="group/f relative">
                  <Lead i="Phone" />
                  <input required type="tel" inputMode="tel" pattern="[+0-9 ()-]{10,}" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^+0-9 ()-]/g, '').slice(0, 16))} aria-label="Phone" placeholder="Phone number" autoComplete="tel" className={`${f} ${tried && !ok.phone ? bad : ''}`} />
                  <Tick on={ok.phone} />
                </div>
              </div>
              {tried && (!ok.name || !ok.phone) && (
                <p className="fade-in -mt-1 text-[12px] text-coral-ink">Please add your name and a 10-digit phone number so we can confirm.</p>
              )}

              <div>
                <span className={label}>Preferred date <span className="text-muted/60">(optional)</span></span>
                <div className="flex flex-wrap gap-2 mb-2">
                  {quick.map((q) => {
                    const on = date === q.v;
                    return (
                      <button key={q.l} type="button" onClick={() => setDate(on ? '' : q.v)} className={`h-9 px-4 rounded-full text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${on ? 'bg-[var(--acc)] text-white shadow-[0_10px_22px_-12px_rgba(15,34,48,.6)]' : 'bg-paper ring-1 ring-inset ring-line text-text hover:ring-[var(--acc)] hover:bg-white'}`}>
                        {q.l}
                      </button>
                    );
                  })}
                </div>
                <div className="group/f relative">
                  <Lead i="Calendar" />
                  <input type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} aria-label="Preferred date" className={`${f} pr-4 cursor-pointer`} />
                </div>
              </div>

              <div className="group/f relative">
                <Icon name="MessageCircle" className="w-[18px] h-[18px] absolute left-4 top-3.5 text-muted/70 pointer-events-none transition-colors duration-300 group-focus-within/f:text-[var(--acc)]" />
                <textarea value={message} maxLength={300} onChange={(e) => setMessage(e.target.value)} aria-label="Message" placeholder="How can we help? (optional)" rows={3} className={`${f} h-auto py-3 resize-none`} />
                <span className="absolute right-3 bottom-2.5 text-[11px] text-muted/70 tabular-nums">{message.length}/300</span>
              </div>

              {status === 'error' && (
                <p role="alert" className="fade-in text-sm text-coral-ink">We could not send that just now. Please try again, or <a className="underline" href={mailto}>email us</a> or call {clinic.phone}.</p>
              )}
              <div className={`transition-all duration-500 ${filled === 4 ? 'opacity-100' : 'opacity-90'}`}>
                <Button type="submit" arrow={status !== 'sending'} className="w-full">
                  {status === 'sending' ? (
                    <span className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Sending…</span>
                  ) : 'Request Appointment'}
                </Button>
              </div>
              <p className="text-center text-[12px] text-muted flex items-center justify-center gap-1.5"><Icon name="ShieldCheck" className="w-3.5 h-3.5" />We only use your details to confirm your visit.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}