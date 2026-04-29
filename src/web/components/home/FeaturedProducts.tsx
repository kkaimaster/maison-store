import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isNew).slice(0, 4).length >= 4
    ? products.filter((p) => p.isNew).slice(0, 4)
    : products.slice(0, 4);

  return (
    <section className="py-16 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <p className="section-label text-[10px] text-[#C9A96E] mb-2">JUST IN</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18]">New Arrivals</h2>
        </div>
        <Link href="/collections">
          <span className="section-label text-[11px] text-[#1A1A18] hover:text-[#C9A96E] transition-colors cursor-pointer border-b border-[#1A1A18] hover:border-[#C9A96E] pb-0.5">
            VIEW ALL
          </span>
        </Link>
      </motion.div>

      <ProductGrid products={featured} cols={4} />
    </section>
  );
}
