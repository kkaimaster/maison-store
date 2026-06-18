import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import type { Product } from '../../../shared/product';
import { productService } from '../../services/productService';
import ProductGrid from '../product/ProductGrid';
import ProductSkeleton from '../product/ProductSkeleton';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    productService
      .listProducts()
      .then((list) => {
        if (cancelled) return;
        const newArrivals = list.filter((p) => p.isNew);
        const featured = newArrivals.length >= 4 ? newArrivals.slice(0, 4) : list.slice(0, 4);
        setProducts(featured);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-14 px-6 md:px-10 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="home-rule flex items-end justify-between gap-6 py-5 mb-10"
      >
        <div>
          <p className="home-kicker mb-3">Just in</p>
          <h2 className="font-display text-4xl md:text-6xl font-normal text-[var(--home-ink)]">New Arrivals</h2>
          <p className="hidden md:block text-sm text-[var(--home-stone)] mt-3 max-w-md">
            Core pieces selected for the first wear, then kept in rotation.
          </p>
        </div>
        <Link href="/collections">
          <span className="text-[12px] font-semibold uppercase text-[var(--home-ink)] hover:bg-[var(--home-accent)] transition-colors cursor-pointer shadow-[inset_0_0_0_1px_rgba(200,185,154,0.55)] px-4 py-3 inline-block">
            VIEW ALL
          </span>
        </Link>
      </motion.div>

      {loading ? <ProductSkeleton count={4} cols={4} /> : <ProductGrid products={products} cols={4} />}
    </section>
  );
}
