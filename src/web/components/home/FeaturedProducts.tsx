import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isNew).slice(0, 4).length >= 4
    ? products.filter((p) => p.isNew).slice(0, 4)
    : products.slice(0, 4);

  return (
    <section className="py-14 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="home-rule flex items-end justify-between gap-6 py-5 mb-10"
      >
        <div>
          <p className="home-kicker mb-3">Just in</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#131111]">New Arrivals</h2>
          <p className="hidden md:block text-sm text-[#78726d] mt-3 max-w-md">
            Core pieces selected for the first wear, then kept in rotation.
          </p>
        </div>
        <Link href="/collections">
          <span className="text-[12px] font-semibold uppercase text-[#131111] hover:bg-[#E6FF2F] transition-colors cursor-pointer border border-[#131111] px-4 py-3 inline-block">
            VIEW ALL
          </span>
        </Link>
      </motion.div>

      <ProductGrid products={featured} cols={4} />
    </section>
  );
}
