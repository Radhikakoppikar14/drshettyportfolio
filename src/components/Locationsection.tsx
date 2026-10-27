import { locations, embedUrl, directionsUrl } from '../locations.ts';

export default function LocationSection({ dark, accent }: { dark: string; accent: string }) {
  return (
    <section id="location" className="max-w-6xl mx-auto px-5 py-16">
      <h2 className="font-serif text-3xl md:text-4xl" style={{ color: dark }}>Find us</h2>
      <div className="mt-8 space-y-8">
        {locations.map((l) => (
          <div key={l.id} className="grid md:grid-cols-5 gap-6 items-stretch">
            <div className="md:col-span-2 rounded-2xl border p-6 flex flex-col gap-2">
              <h3 className="font-semibold text-lg" style={{ color: dark }}>{l.name}</h3>
              <p>{l.address}</p>
              <p className="text-slate-600 text-sm">{l.hours}</p>
              <a href={l.tel} className="font-semibold">{l.phone}</a>
              <a href={directionsUrl(l)} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-fit px-5 py-2.5 rounded-lg text-white text-sm font-semibold" style={{ background: accent }}>
                Get directions
              </a>
            </div>
            <iframe
              title={l.name}
              src={embedUrl(l)}
              loading="lazy"
              className="md:col-span-3 w-full h-72 md:h-full min-h-[18rem] rounded-2xl border"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ))}
      </div>
    </section>
  );
}