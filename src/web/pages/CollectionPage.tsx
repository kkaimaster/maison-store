import { useState, useMemo } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const HANDLE_MAP: Record<string, string> = {
  't-shirts': 'T-Shirts',
  'track-pants': 'Track Pants',
  'new-arrivals': 'New Arrivals',
  'sale': 'Sale',
};

export default function CollectionPage() {
  const [, params] = useRoute('/collections/:handle');
  const handle = params?.handle;

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const collectionTitle = handle ? (HANDLE_MAP[handle] || 'All Products') : 'All Products';

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter from URL
    if (handle === 't-shirts') list = list.filter((p) => p.category === 'T-Shirts');
    else if (handle === 'track-pants') list = list.filter((p) => p.category === 'Track Pants');
    else if (handle === 'new-arrivals') list = list.filter((p) => p.isNew);
    else if (handle === 'sale') list = list.filter((p) => p.isSale);

    // Size filter
    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Color filter
    if (selectedColors.length > 0) {
      list = list.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    }

    // Sort
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [handle, selectedSizes, selectedColors, sortBy]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const allColors = Array.from(
    new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()
  );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const toggleColor = (color: string) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

  const hasFilters = selectedSizes.length > 0 || selectedColors.length > 0;

  return (
    <div className="min-h-screen" style={{ paddingTop: 80 }}>
      {/* Page header */}
      <div className="border-b border-[#E8E4DC] px-6 md:px-10 py-10 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label text-[10px] text-[#C9A96E] mb-2">MAISON</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-[#1A1A18]">{collectionTitle}</h1>
          <p className="text-[#8A8A82] text-sm font-light mt-2">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        {/* Toolbar */}
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

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E8E4DC] p-6 mb-8 bg-[#FAFAF8]"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Size */}
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

              {/* Color */}
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

              {/* Clear */}
              {hasFilters && (
                <div className="flex items-end">
                  <button
                    onClick={() => { setSelectedSizes([]); setSelectedColors([]); }}
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

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl font-light text-[#1A1A18] mb-3">No products found</p>
            <p className="text-[#8A8A82] text-sm font-light">Try adjusting your filters.</p>
          </div>
        ) : (
          <ProductGrid products={filtered} cols={3} />
        )}
      </div>
    </div>
  );
}
