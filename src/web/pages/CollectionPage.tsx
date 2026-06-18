import { useEffect, useMemo, useState } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X, RefreshCw } from 'lucide-react';
import type { Product } from '../../shared/product';
import ProductGrid from '../components/product/ProductGrid';
import { filterAndSortProducts, productService, type SortOption } from '../services/productService';
import { shopifyConfig } from '../services/shopify';

const HANDLE_MAP: Record<string, string> = {
  't-shirts': 'T-Shirts',
  'track-pants': 'Track Pants',
  'new-arrivals': 'New Arrivals',
  sale: 'Archive',
};

const COLLECTION_COPY: Record<string, string> = {
  't-shirts': 'Weight, softness, and proportion refined into the daily foundation.',
  'track-pants': 'Relaxed structure and technical comfort for city movement.',
  'new-arrivals': 'Fresh silhouettes selected for the current wardrobe.',
  sale: 'Archive pieces available in limited quantities.',
  all: 'A considered wardrobe of essentials, edited for texture, fit, and restraint.',
};

export default function CollectionPage() {
  const [, params] = useRoute('/collections/:handle');
  const handle = params?.handle;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    productService
      .listProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load products');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const collectionTitle = handle ? HANDLE_MAP[handle] || 'All Products' : 'All Products';
  const collectionCopy = handle ? COLLECTION_COPY[handle] || COLLECTION_COPY.all : COLLECTION_COPY.all;

  const filtered = useMemo(
    () => filterAndSortProducts(products, handle, selectedSizes, selectedColors, sortBy),
    [products, handle, selectedSizes, selectedColors, sortBy],
  );

  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
  const allColors = Array.from(
    new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values(),
  );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  const toggleColor = (color: string) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  const hasFilters = selectedSizes.length > 0 || selectedColors.length > 0;
  const retry = () => {
    setError(null);
    setLoading(true);
    productService
      .listProducts(true)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load products');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 80 }}>
      <div className="border-b border-[#E8E4DC] px-6 md:px-10 py-12 md:py-16 max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="section-label text-[10px] text-[#C9A96E] mb-2">MAISON</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-[#1A1A18]">{collectionTitle}</h1>
          <p className="text-[#8A8A82] text-sm font-light mt-3 max-w-md leading-relaxed">{collectionCopy}</p>
          {!loading && !error && (
            <p className="text-[#8A8A82] text-xs font-light mt-5">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
          )}
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        {!error && (
          <div className="flex items-center justify-between mb-8 gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[#1A1A18] hover:text-[#C9A96E] transition-colors"
            >
              <SlidersHorizontal size={15} strokeWidth={1.5} />
              <span className="section-label text-[11px]">FILTER</span>
              {hasFilters && (
                <span className="bg-[#C9A96E] text-[#1A1A18] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {selectedSizes.length + selectedColors.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="section-label text-[11px] text-[#8A8A82]">SORT:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-transparent border border-[#E8E4DC] px-4 py-2 text-xs font-medium text-[#1A1A18] pr-8 outline-none cursor-pointer hover:border-[#1A1A18] transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A82]" />
              </div>
            </div>
          </div>
        )}

        {showFilters && !error && !loading && allSizes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="border border-[#E8E4DC] p-6 mb-8 bg-[#FAFAF8]"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="section-label text-[10px] text-[#8A8A82] mb-3">SIZE</p>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className="w-10 h-10 border text-xs font-medium transition-all"
                      style={{
                        borderColor: selectedSizes.includes(size) ? '#1A1A18' : '#D1CCC3',
                        background: selectedSizes.includes(size) ? '#1A1A18' : 'transparent',
                        color: selectedSizes.includes(size) ? '#FAFAF8' : '#1A1A18',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {allColors.length > 0 && (
                <div>
                  <p className="section-label text-[10px] text-[#8A8A82] mb-3">COLOUR</p>
                  <div className="flex flex-wrap gap-3">
                    {allColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        title={color.name}
                        className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                        style={{
                          background: color.hex,
                          borderColor: selectedColors.includes(color.name) ? '#1A1A18' : '#D1CCC3',
                          transform: selectedColors.includes(color.name) ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {hasFilters && (
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedSizes([]);
                      setSelectedColors([]);
                    }}
                    className="flex items-center gap-2 text-[#8A8A82] hover:text-[#1A1A18] transition-colors"
                  >
                    <X size={14} />
                    <span className="section-label text-[10px]">CLEAR ALL</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {error ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <p className="font-display text-3xl font-light text-[#1A1A18] mb-3">Store temporarily unavailable</p>
            <p className="text-[#8A8A82] text-sm font-light leading-relaxed mb-6">{error}</p>
            {!shopifyConfig.isConfigured && (
              <p className="text-[#8A8A82] text-xs font-light mb-6">
                Shopify is not configured. Set <code className="font-mono">VITE_SHOPIFY_DOMAIN</code> and{' '}
                <code className="font-mono">VITE_SHOPIFY_STOREFRONT_TOKEN</code> in your environment.
              </p>
            )}
            <button onClick={retry} className="btn-dark inline-flex items-center gap-2">
              <RefreshCw size={14} strokeWidth={1.5} />
              TRY AGAIN
            </button>
          </div>
        ) : filtered.length === 0 && !loading ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl font-light text-[#1A1A18] mb-3">No products found</p>
            <p className="text-[#8A8A82] text-sm font-light">Try adjusting your filters.</p>
          </div>
        ) : (
          <ProductGrid products={filtered} cols={3} loading={loading} skeletonCount={6} />
        )}
      </div>
    </div>
  );
}
