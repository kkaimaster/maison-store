import { Link } from 'wouter';

const services = [
  { label: 'COMPLIMENTARY WRAP', text: 'Prepared in MAISON tissue and signature restraint.', index: '01' },
  { label: 'PRIVATE STYLING', text: 'One-to-one wardrobe appointments for fit and pairing.', index: '02' },
  { label: 'CONSIDERED RETURNS', text: 'Thirty days to decide, with guided exchanges.', index: '03' },
];

export default function PromoCountdown() {
  return (
    <section className="bg-[#FFF8EA] px-6 md:px-10 py-14 border-y border-[#131111]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 items-start">
        <div>
          <p className="home-kicker mb-4">Maison services</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#131111] leading-tight">
            Detail is the standard.
          </h2>
          <Link href="/contact">
            <button className="home-cta mt-8">Book styling</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#131111] border border-[#131111]">
          {services.map((service) => (
            <div key={service.label} className="bg-[#FFF8EA] p-6 min-h-[190px]">
              <span className="text-[11px] font-semibold text-[#78726d]">{service.index}</span>
              <p className="text-[12px] font-semibold uppercase text-[#131111] mt-8 mb-4">{service.label}</p>
              <p className="text-sm text-[#78726d] font-light leading-relaxed">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
