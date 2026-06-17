import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import type { Product } from '../../../shared/product';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, getCompareAtPrice } from '../../lib/pricing';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(null);
      setActiveImage(0);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = product ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, product]);

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize) return;
    addItem(product, selectedColor.name, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const compareAt = product ? getCompareAtPrice(product) : undefined;

  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,15,13,0.6)', backdropFilter: 'blur(4px)' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }} transition={{ duration: 0.3, ease: [0.32, 0, 0, 1] }} className="bg-[#FAFAF8] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button onClick={onClose} className="absolute top-4 right-4 z-10 text-[#8A8A82] hover:text-[#1A1A18] transition-colors"><X size={20} strokeWidth={1.5} /></button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative" style={{ aspectRatio: '3/4' }}>
                <img src={product.images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                  {product.images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ background: i === activeImage ? '#C9A96E' : 'rgba(255,255,255,0.6)' }} />
                  ))}
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <p className="section-label text-[10px] text-[#C9A96E] mb-2">{product.category}</p>
                <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-2">{product.title}</h2>
                <div className="flex items-center gap-3 mb-4">
                  {product.isSale && compareAt ? (
                    <>
                      <span className="text-[#1A1A18] text-lg">{formatPrice(product.price)}</span>
                      <span className="text-[#8A8A82] text-sm line-through">{formatPrice(compareAt)}</span>
                    </>
                  ) : (
                    <span className="text-[#1A1A18] text-lg">{formatPrice(product.price)}</span>
                  )}
                </div>
                <p className="text-sm text-[#8A8A82] font-light leading-relaxed mb-6">{product.description.slice(0, 120)}...</p>

                <div className="mb-5">
                  <p className="section-label text-[10px] text-[#8A8A82] mb-2">COLOUR — <span className="text-[#1A1A18]">{selectedColor?.name}</span></p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button key={color.name} onClick={() => setSelectedColor(color)} title={color.name} className="w-6 h-6 border-2 transition-all duration-150" style={{ background: color.hex, borderColor: selectedColor?.name === color.name ? '#1A1A18' : '#D1CCC3', transform: selectedColor?.name === color.name ? 'scale(1.15)' : 'scale(1)' }} />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="section-label text-[10px] text-[#8A8A82] mb-2">SIZE</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)} className="w-10 h-10 border text-xs font-medium transition-all duration-150" style={{ borderColor: selectedSize === size ? '#1A1A18' : '#D1CCC3', background: selectedSize === size ? '#1A1A18' : 'transparent', color: selectedSize === size ? '#FAFAF8' : '#1A1A18' }}>{size}</button>
                    ))}
                  </div>
                </div>

                <button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor} className="btn-dark w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed">{added ? 'ADDED TO BAG' : !selectedSize ? 'SELECT A SIZE' : 'ADD TO BAG'}</button>
                <Link href={`/products/${product.handle}`}><button onClick={onClose} className="mt-3 text-center w-full section-label text-[10px] text-[#8A8A82] hover:text-[#1A1A18] transition-colors">VIEW FULL DETAILS</button></Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
