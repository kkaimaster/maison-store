import { useState } from 'react';
import type { Product } from '../../../shared/product';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import ProductSkeleton from './ProductSkeleton';

interface ProductGridProps {
  products: Product[];
  cols?: 2 | 3 | 4;
  loading?: boolean;
  skeletonCount?: number;
}

export default function ProductGrid({
  products,
  cols = 4,
  loading = false,
  skeletonCount,
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (loading) {
    return <ProductSkeleton count={skeletonCount ?? (cols === 2 ? 4 : 8)} cols={cols} />;
  }

  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
  }[cols];

  return (
    <>
      <div className={`product-grid grid ${colClass} gap-4 md:gap-6`}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
            index={i}
          />
        ))}
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
