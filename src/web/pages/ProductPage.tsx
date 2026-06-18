import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, ChevronUp, ZoomIn, RefreshCw } from 'lucide-react';
import type { Product } from '../../shared/product';
import { productService } from '../services/productService';
import { useCartStore } from '../store/cartStore';
import ProductGrid from '../components/product/ProductGrid';
import { formatPrice, getCompareAtPrice } from '../lib/pricing';
import { categorySlug } from '../services/shopify';

export default function ProductPage() {
  const [, params] = useRoute('/products/:handle');
  const handle = params?.handle || '';
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<Product['colors'][number] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [added, setAdded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setProduct(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setActiveImage(0);

    productService
      .getProductByHandle(handle)
      .then((value) => {
        if (cancelled) return;
        if (!value) {
          setError('not_found');
        } else {
          setProduct(value);
          setSelectedColor(value.colors[0] ?? null);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'not_found');
        setLoading(false);
      });

    productService
      .getRelatedProducts(handle)
      .then((value) => !cancelled && setRelated(value))
      .catch(() => !cancelled && setRelated([]));

    return () => {
      cancelled = true;
    };
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ paddingTop: 80 }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-16 flex-shrink-0">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border border-[#E8E4DC] bg-[#EEEAE1] animate-pulse" style={{ aspectRatio: '3/4' }} />
                ))}
              </div>
              <div className="flex-1 bg-[#EEEAE1] animate-pulse" style={{ aspectRatio: '3/4' }} />
            </div>
            <div className="space-y-4">
              <div className="h-3 w-20 bg-[#E8E4DC] animate-pulse" />
              <div className="h-10 w-3/4 bg-[#E8E4DC] animate-pulse" />
              <div className="h-6 w-32 bg-[#E8E4DC] animate-pulse" />
              <div className="h-12 w-full bg-[#E8E4DC] animate-pulse mt-8" />
              <div className="h-12 w-full bg-[#E8E4DC] animate-pulse" />
              <div className="h-12 w-full bg-[#E8E4DC] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: 80 }}>
        <div className="text-center max-w-md px-6">
          <p className="font-display text-3xl font-light text-[#1A1A18] mb-3">Product not found</p>
          <p className="text-[#8A8A82] text-sm font-light leading-relaxed mb-6">
            The piece you're looking for is no longer available. Return to the shop to keep browsing.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/collections">
              <button className="btn-dark">SHOP ALL</button>
            </Link>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                productService
                  .getProductByHandle(handle)
                  .then((p) => {
                    if (p) {
                      setProduct(p);
                      setSelectedColor(p.colors[0] ?? null);
                    }
                    setLoading(false);
                  })
                  .catch(() => {
                    setError('not_found');
                    setLoading(false);
                  });
              }}
              className="btn-outline inline-flex items-center gap-2"
            >
              <RefreshCw size={14} strokeWidth={1.5} />
              RETRY
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    for (let i = 0; i < quantity; i += 1) {
      addItem(product, selectedColor.name, selectedSize);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const accordions = [
    { id: 'description', label: 'Description', content: product.description },
    { id: 'materials', label: 'Materials & Care', content: product.materials },
    { id: 'shipping', label: 'Shipping & Returns', content: product.shipping },
  ];

  const compareAt = getCompareAtPrice(product);
  const categoryHandle = categorySlug(product.category);

  return (
    <div className="min-h-screen" style={{ paddingTop: 80 }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/">
            <span className="section-label text-[10px] text-[#8A8A82] hover:text-[#1A1A18] cursor-pointer transition-colors">
              HOME
            </span>
          </Link>
          <span className="text-[#D1CCC3] text-xs">/</span>
          <Link href={`/collections/${categoryHandle}`}>
            <span className="section-label text-[10px] text-[#8A8A82] hover:text-[#1A1A18] cursor-pointer transition-colors">
              {product.category.toUpperCase()}
            </span>
          </Link>
          <span className="text-[#D1CCC3] text-xs">/</span>
          <span className="section-label text-[10px] text-[#1A1A18]">{product.title.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-16 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="border transition-all overflow-hidden"
                  style={{ borderColor: activeImage === i ? '#1A1A18' : '#E8E4DC', aspectRatio: '3/4' }}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div
              className="flex-1 relative overflow-hidden cursor-zoom-in group"
              style={{ aspectRatio: '3/4' }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{ transform: isZoomed ? 'scale(1.4)' : 'scale(1)', transformOrigin: 'center' }}
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} className="text-white drop-shadow" />
              </div>
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.isNew && (
                  <span className="bg-[#1A1A18] text-[#FAFAF8] section-label text-[9px] px-2 py-1">NEW SEASON</span>
                )}
                {product.isSale && (
                  <span className="bg-[#F0EDE6] text-[#1A1A18] section-label text-[9px] px-2 py-1">ARCHIVE</span>
                )}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="section-label text-[10px] text-[#C9A96E] mb-2">{product.category}</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] leading-tight mb-3">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              {product.isSale && compareAt ? (
                <>
                  <span className="text-[#1A1A18] text-2xl font-light">{formatPrice(product.price)}</span>
                  <span className="text-[#8A8A82] text-lg line-through">{formatPrice(compareAt)}</span>
                  <span className="bg-[#F0EDE6] text-[#1A1A18] section-label text-[9px] px-2 py-1">ARCHIVE</span>
                </>
              ) : (
                <span className="text-[#1A1A18] text-2xl font-light">{formatPrice(product.price)}</span>
              )}
            </div>

            {product.colors.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="section-label text-[11px] text-[#8A8A82]">
                    COLOUR — <span className="text-[#1A1A18]">{selectedColor?.name}</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className="w-8 h-8 border-2 transition-all duration-150 hover:scale-110"
                      style={{
                        background: color.hex,
                        borderColor: selectedColor?.name === color.name ? '#1A1A18' : '#D1CCC3',
                        transform: selectedColor?.name === color.name ? 'scale(1.15)' : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="section-label text-[11px] text-[#8A8A82]">SIZE</p>
                  <button className="section-label text-[10px] text-[#C9A96E] hover:underline">
                    SIZE GUIDE
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[44px] h-11 border px-3 text-xs font-medium transition-all duration-150"
                      style={{
                        borderColor: selectedSize === size ? '#1A1A18' : '#D1CCC3',
                        background: selectedSize === size ? '#1A1A18' : 'transparent',
                        color: selectedSize === size ? '#FAFAF8' : '#1A1A18',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="section-label text-[11px] text-[#8A8A82] mb-2">QUANTITY</p>
              <div className="flex items-center border border-[#D1CCC3] w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[#8A8A82] hover:text-[#1A1A18] transition-colors text-lg"
                >
                  −
                </button>
                <span className="px-5 py-3 text-sm font-light text-[#1A1A18] tabular-nums min-w-[48px] text-center border-x border-[#D1CCC3]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[#8A8A82] hover:text-[#1A1A18] transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || product.sizes.length === 0}
                className="btn-dark flex-1 py-4 text-[11px] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {added
                  ? 'ADDED TO BAG'
                  : product.sizes.length === 0
                  ? 'OUT OF STOCK'
                  : !selectedSize
                  ? 'SELECT A SIZE'
                  : 'ADD TO BAG'}
              </button>
              <button className="border border-[#D1CCC3] px-4 py-4 text-[#8A8A82] hover:text-[#1A1A18] hover:border-[#1A1A18] transition-colors">
                <Heart size={18} strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-xs text-[#8A8A82] font-light mb-6">
              Complimentary gift wrapping and considered returns included.
            </p>

            <div className="border-t border-[#E8E4DC]">
              {accordions.map((acc) => (
                <div key={acc.id} className="border-b border-[#E8E4DC]">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                    className="flex items-center justify-between w-full py-4 text-left"
                  >
                    <span className="section-label text-[11px] text-[#1A1A18]">{acc.label.toUpperCase()}</span>
                    {openAccordion === acc.id ? (
                      <ChevronUp size={14} className="text-[#8A8A82]" />
                    ) : (
                      <ChevronDown size={14} className="text-[#8A8A82]" />
                    )}
                  </button>
                  {openAccordion === acc.id && (
                    <div className="pb-4">
                      {acc.id === 'description' && acc.content ? (
                        <div
                          className="text-sm text-[#8A8A82] font-light leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-[#1A1A18]"
                          dangerouslySetInnerHTML={{ __html: acc.content }}
                        />
                      ) : (
                        <p className="text-sm text-[#8A8A82] font-light leading-relaxed">{acc.content}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#E8E4DC]">
            <div className="mb-10">
              <p className="section-label text-[10px] text-[#C9A96E] mb-2">COMPLETE THE LOOK</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18]">You May Also Like</h2>
            </div>
            <ProductGrid products={related} cols={3} />
          </section>
        )}
      </div>
    </div>
  );
}
