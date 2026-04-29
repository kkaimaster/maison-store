import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import type { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const [hoveredColor, setHoveredColor] = useState(product.colors[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
      className="group"
    >
      {/* Image */}
      <Link href={`/products/${product.handle}`}>
        <div className="product-img-wrapper cursor-pointer" style={{ aspectRatio: '3/4' }}>
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-[#1A1A18] text-[#FAFAF8] section-label text-[9px] px-2 py-1">NEW</span>
            )}
            {product.isSale && (
              <span className="bg-[#C0392B] text-white section-label text-[9px] px-2 py-1">SALE</span>
            )}
          </div>

          {/* Front image */}
          <img
            className="img-front w-full h-full object-cover"
            src={product.images[0]}
            alt={product.title}
          />
          {/* Back/hover image */}
          <img
            className="img-back w-full h-full object-cover"
            src={product.images[1]}
            alt={`${product.title} — detail`}
          />

          {/* Quick View button */}
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

      {/* Info */}
      <div className="mt-3 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/products/${product.handle}`}>
              <h3 className="font-display text-[17px] font-light text-[#1A1A18] hover:text-[#C9A96E] transition-colors cursor-pointer truncate">
                {product.title}
              </h3>
            </Link>
            <p className="section-label text-[9px] text-[#8A8A82] mt-0.5">{product.category}</p>
          </div>
          <div className="text-right flex-shrink-0">
            {product.isSale && product.compareAtPrice ? (
              <>
                <span className="text-[#C0392B] text-sm font-light">${product.compareAtPrice}</span>
                <span className="text-[#8A8A82] text-xs line-through ml-1">${product.price}</span>
              </>
            ) : (
              <span className="text-[#1A1A18] text-sm font-light">${product.price}</span>
            )}
          </div>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-2">
          {product.colors.slice(0, 4).map((color) => (
            <button
              key={color.name}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(product.colors[0])}
              title={color.name}
              className="w-4 h-4 rounded-full border transition-transform duration-200 hover:scale-110"
              style={{
                background: color.hex,
                borderColor: hoveredColor.name === color.name ? '#1A1A18' : '#D1CCC3',
              }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[#8A8A82] text-xs">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
