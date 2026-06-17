import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function EditorialBanner() {
  return (
    <section className="my-8 bg-[#131111] text-[#FFF8EA]">
      <div className="grid grid-cols-1 md:grid-cols-5 min-h-[600px] border-y border-[#131111]">
        {/* Image — 60% */}
        <div className="md:col-span-3 relative overflow-hidden border-r border-[#131111]" style={{ minHeight: 400 }}>
          <motion.img
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=85"
            alt="Editorial"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Copy — 40% */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="md:col-span-2 bg-[#131111] flex flex-col justify-center px-6 md:px-16 py-16"
        >
          <p className="home-kicker mb-5">The Maison Edit</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#FFF8EA] leading-tight mb-6">
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
              <button className="bg-[#FFF8EA] text-[#131111] border border-[#FFF8EA] hover:bg-[#E6FF2F] hover:border-[#E6FF2F] min-h-12 px-6 py-3 text-xs font-semibold uppercase transition-colors">SHOP THE EDIT</button>
            </Link>
            <Link href="/lookbook">
              <button className="bg-transparent text-[#FFF8EA] border border-[#FFF8EA] hover:bg-[#FFF8EA] hover:text-[#131111] min-h-12 px-6 py-3 text-xs font-semibold uppercase transition-colors">VIEW LOOKBOOK</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
