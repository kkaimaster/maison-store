import { Link } from 'wouter';

const services = [
  { label: 'COMPLIMENTARY WRAP', text: 'Prepared in MAISON tissue and signature restraint.' },
  { label: 'PRIVATE STYLING', text: 'One-to-one wardrobe appointments for fit and pairing.' },
  { label: 'CONSIDERED RETURNS', text: 'Thirty days to decide, with guided exchanges.' },
];

export default function PromoCountdown() {
  return (
    <section className="bg-[#11110F] px-6 md:px-10 py-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 items-start">
        <div>
          <p className="section-label text-[10px] text-[#C9A96E] mb-3">MAISON SERVICES</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
            Luxury in the details.
          </h2>
          <Link href="/contact">
            <button className="btn-outline-white mt-8">BOOK STYLING</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.label} className="border-t border-white/18 pt-5">
              <p className="section-label text-[10px] text-[#C9A96E] mb-3">{service.label}</p>
              <p className="text-sm text-[#B9B5AA] font-light leading-relaxed">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
