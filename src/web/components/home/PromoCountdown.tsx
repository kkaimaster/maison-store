import { Link } from 'wouter';

const services = [
  { label: 'COMPLIMENTARY WRAP', text: 'Prepared in MAISON tissue and signature restraint.', index: '01' },
  { label: 'PRIVATE STYLING', text: 'One-to-one wardrobe appointments for fit and pairing.', index: '02' },
  { label: 'CONSIDERED RETURNS', text: 'Thirty days to decide, with guided exchanges.', index: '03' },
];

export default function PromoCountdown() {
  return (
    <section className="bg-[var(--home-ivory)] px-6 md:px-10 py-14">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 items-start">
        <div>
          <p className="home-kicker mb-4">Maison services</p>
          <h2 className="font-display text-4xl md:text-6xl font-normal text-[var(--home-ink)] leading-tight">
            Detail is the standard.
          </h2>
          <Link href="/contact">
            <button className="home-cta mt-8">Book styling</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.label} className="bg-[var(--home-ivory)] p-6 min-h-[190px] shadow-[0_10px_28px_rgba(17,16,14,0.08)]">
              <span className="text-[11px] font-semibold text-[var(--home-stone)]">{service.index}</span>
              <p className="text-[12px] font-semibold uppercase text-[var(--home-ink)] mt-8 mb-4">{service.label}</p>
              <p className="text-sm text-[var(--home-stone)] font-normal leading-relaxed">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
