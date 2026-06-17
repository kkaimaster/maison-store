import { Link } from 'wouter';
import { motion } from 'framer-motion';

const categories = [
  {
    label: 'NEW ARRIVALS',
    sub: 'Current Season',
    index: '01',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80',
    href: '/collections/new-arrivals',
    focus: 'center 38%',
  },
  {
    label: 'T-SHIRTS',
    sub: '5 Styles',
    index: '02',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    href: '/collections/t-shirts',
    focus: 'center 8%',
  },
  {
    label: 'TRACK PANTS',
    sub: '1 Style',
    index: '03',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    href: '/collections/track-pants',
    focus: 'center 34%',
  },
];

export default function CategoryStrip() {
  return (
    <section className="px-6 md:px-10 max-w-[1400px] mx-auto py-14 md:py-16">
      <div className="home-rule mb-8 py-4 flex items-center justify-between gap-4">
        <p className="text-[12px] font-semibold uppercase text-[var(--home-ink)]">Shop by edit</p>
        <p className="hidden sm:block text-[12px] uppercase text-[var(--home-stone)]">Three exact entry points</p>
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
              <div className="relative overflow-hidden cursor-pointer group bg-[var(--home-ink)] shadow-[0_18px_48px_rgba(17,16,14,0.11)]" style={{ aspectRatio: '3/4' }}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: cat.focus }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 bg-[#11100e]/88 p-5 shadow-[0_-18px_45px_rgba(17,16,14,0.24)]">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <p className="text-[11px] font-semibold uppercase text-[var(--home-accent)]">{cat.sub}</p>
                    <span className="text-[11px] font-semibold text-[#fffaf0]/70">{cat.index}</span>
                  </div>
                  <h3 className="font-display text-[var(--home-ivory)] text-3xl font-normal">{cat.label}</h3>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase text-[var(--home-ivory)] group-hover:text-[var(--home-accent)] transition-colors">Explore</span>
                    <div className="h-px bg-white/40 group-hover:bg-[var(--home-accent)] transition-colors" style={{ width: 28 }} />
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
