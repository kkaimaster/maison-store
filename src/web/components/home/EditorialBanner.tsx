import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function EditorialBanner() {
  return (
    <section className="home-editorial-frame my-8 bg-[var(--home-ink)] text-[var(--home-ivory)]">
      <div className="home-flowar-dark-grid grid grid-cols-1 md:grid-cols-5 min-h-[600px]">
        {/* Image — 60% */}
        <div className="md:col-span-3 relative overflow-hidden" style={{ minHeight: 400 }}>
          <motion.img
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=85"
            alt="Editorial"
            className="w-full h-full object-cover absolute inset-0"
            style={{ objectPosition: 'center 18%' }}
          />
        </div>

        {/* Copy — 40% */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="md:col-span-2 bg-[var(--home-ink)] flex flex-col justify-center px-6 md:px-16 py-16"
        >
          <p className="home-kicker mb-5">The Maison Edit</p>
          <h2 className="font-display text-4xl md:text-6xl font-normal text-[var(--home-ivory)] leading-tight mb-6">
            Luxury,<br />Cut Sharper
          </h2>
          <p className="text-[#c8c0b5] text-sm font-light leading-relaxed mb-7 max-w-xs">
            Black, white, and stone essentials styled with a precise streetwear edge.
          </p>
          <div className="home-edit-specs">
            <span>Editorial 02</span>
            <span>Monochrome dressing</span>
            <span>Private styling ready</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/collections">
              <button className="bg-[var(--home-ivory)] text-[var(--home-ink)] hover:bg-[var(--home-accent)] min-h-12 px-6 py-3 text-xs font-semibold uppercase transition-colors shadow-[0_10px_28px_rgba(17,16,14,0.18)]">SHOP THE EDIT</button>
            </Link>
            <Link href="/lookbook">
              <button className="bg-transparent text-[var(--home-ivory)] shadow-[inset_0_0_0_1px_rgba(255,250,240,0.34)] hover:bg-[var(--home-ivory)] hover:text-[var(--home-ink)] min-h-12 px-6 py-3 text-xs font-semibold uppercase transition-colors">VIEW LOOKBOOK</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
