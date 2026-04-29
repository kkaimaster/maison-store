import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function EditorialBanner() {
  return (
    <section className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-5 min-h-[600px]">
        {/* Image — 60% */}
        <div className="md:col-span-3 relative overflow-hidden" style={{ minHeight: 400 }}>
          <motion.img
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85"
            alt="Editorial"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Copy — 40% */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="md:col-span-2 bg-[#F0EDE6] flex flex-col justify-center px-10 md:px-16 py-16"
        >
          <p className="section-label text-[10px] text-[#C9A96E] mb-4">THE MAISON EDIT</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] leading-tight mb-6">
            Dressed For<br />Every Moment
          </h2>
          <p className="text-[#8A8A82] text-sm font-light leading-relaxed mb-8 max-w-xs">
            From the morning commute to after-dark elegance — our refined essentials adapt effortlessly to your world.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/collections">
              <button className="btn-dark">SHOP THE EDIT</button>
            </Link>
            <Link href="/lookbook">
              <button className="btn-outline">VIEW LOOKBOOK</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
