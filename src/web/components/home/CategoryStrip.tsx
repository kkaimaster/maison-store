import { Link } from 'wouter';
import { motion } from 'framer-motion';

const categories = [
  {
    label: 'NEW ARRIVALS',
    sub: 'SS 2025',
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
    <section className="py-16 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <Link href={cat.href}>
              <div className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: '3/4' }}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="section-label text-[10px] text-[#C9A96E] mb-1">{cat.sub}</p>
                  <h3 className="font-display text-white text-2xl font-light tracking-wide">{cat.label}</h3>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="section-label text-[10px] text-white/70 group-hover:text-[#C9A96E] transition-colors">EXPLORE</span>
                    <div className="h-px bg-white/40 group-hover:bg-[#C9A96E] transition-colors" style={{ width: 24 }} />
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
