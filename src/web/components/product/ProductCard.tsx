import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import type { Product } from '../../../shared/product';
import { formatPrice, getCompareAtPrice } from '../../lib/pricing';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const [hoveredColor, setHoveredColor] = useState(product.colors[0]);
  const compareAt = getCompareAtPrice(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
      className="group"
    >
      <Link href={`/products/${product.handle}`}>
        <div className="product-img-wrapper cursor-pointer bg-[#EEEAE1]" style={{ aspectRatio: '3/4' }}>
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product.isNew && <span className="bg-[#1A1A18] text-[#FAFAF8] section-label text-[9px] px-2 py-1">NEW SEASON</span>}
            {product.isSale && <span className="bg-[#F0EDE6] text-[#1A1A18] section-label text-[9px] px-2 py-1">ARCHIVE</span>}
          </div>
          <img className="img-front w-full h-full object-cover" src={product.images[0]} alt={product.title} />
          <img className="img-back w-full h-full object-cover" src={product.images[1]} alt={`${product.title} — detail`} />
          {onQuickView && (
            <button
              className="quick-view-btn btn-dark text-[10px] py-2.5 px-6 z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              QUICK VIEW
            </button>
          )}
        </div>
      </Link>

        <div className="mt-4 px-1">
        <div className="product-card-meta flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/products/${product.handle}`}>
              <h3 className="product-card-title font-display text-xl font-light text-[#1A1A18] hover:text-[#9D7C44] transition-colors cursor-pointer truncate">{product.title}</h3>
            </Link>
            <p className="section-label text-[9px] text-[#8A8A82] mt-0.5">{product.category}</p>
          </div>
          <div className="product-card-price text-right flex-shrink-0">
            {product.isSale && compareAt ? (
              <>
                <span className="text-[#1A1A18] text-sm font-light">{formatPrice(product.price)}</span>
                <span className="text-[#8A8A82] text-xs line-through ml-1">{formatPrice(compareAt)}</span>
              </>
            ) : (
              <span className="text-[#1A1A18] text-sm font-light">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          {product.colors.slice(0, 4).map((color) => (
            <button
              key={color.name}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(product.colors[0])}
              title={color.name}
              className="w-4 h-4 border transition-transform duration-200 hover:scale-110"
              style={{
                background: color.hex,
                borderColor: hoveredColor.name === color.name ? '#1A1A18' : '#D1CCC3'
              }}
            />
          ))}
          {product.colors.length > 4 && <span className="text-[#8A8A82] text-xs">+{product.colors.length - 4}</span>}
        </div>
      </div>
    </motion.div>
  );
}
