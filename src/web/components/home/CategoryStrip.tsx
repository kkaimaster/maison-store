import { Link } from 'wouter';
import { motion } from 'framer-motion';

const categories = [
  {
    label: 'NEW ARRIVALS',
    sub: 'Current Season',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80',
    href: '/collections/new-arrivals',
  },
  {
    label: 'T-SHIRTS',
    sub: '5 Styles',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    href: '/collections/t-shirts',
  },
  {
    label: 'TRACK PANTS',
    sub: '1 Style',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    href: '/collections/track-pants',
  },
];

export default function CategoryStrip() {
  return (
    <section className="px-6 md:px-10 max-w-[1400px] mx-auto py-14 md:py-16">
      <div className="home-rule mb-8 py-4 flex items-center justify-between gap-4">
        <p className="text-[12px] font-semibold uppercase text-[#131111]">Shop by edit</p>
        <p className="hidden sm:block text-[12px] uppercase text-[#78726d]">Structured entry points</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <Link href={cat.href}>
              <div className="relative overflow-hidden cursor-pointer group border border-[#131111] bg-[#131111]" style={{ aspectRatio: '3/4' }}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 border-t border-white/25 bg-[#131111]/88 p-5">
                  <p className="text-[11px] font-semibold uppercase text-[#E6FF2F] mb-1">{cat.sub}</p>
                  <h3 className="font-display text-[#FFF8EA] text-3xl font-light">{cat.label}</h3>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase text-[#FFF8EA] group-hover:text-[#E6FF2F] transition-colors">Explore</span>
                    <div className="h-px bg-white/40 group-hover:bg-[#E6FF2F] transition-colors" style={{ width: 28 }} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
