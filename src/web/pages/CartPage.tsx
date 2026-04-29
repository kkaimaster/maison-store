import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const sub = subtotal();
  const discount = promoApplied ? sub * 0.1 : 0;
  const shipping = sub >= 150 ? 0 : 12;
  const total = sub - discount + shipping;

  const recommendations = products.filter((p) => !items.some((i) => i.product.id === p.id)).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ paddingTop: 80 }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="section-label text-[10px] text-[#C9A96E] mb-2">MAISON</p>
          <h1 className="font-display text-5xl font-light text-[#1A1A18] mb-10">Your Bag</h1>
        </motion.div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl font-light text-[#1A1A18] mb-3">Your bag is empty</p>
            <p className="text-[#8A8A82] text-sm font-light mb-8">Add something beautiful to begin.</p>
            <Link href="/collections"><button className="btn-dark">SHOP NOW</button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="border-t border-[#E8E4DC]">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-5 py-6 border-b border-[#E8E4DC]"
                  >
                    <Link href={`/products/${item.product.handle}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-24 h-32 object-cover flex-shrink-0 cursor-pointer"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="font-display text-xl font-light text-[#1A1A18]">{item.product.title}</h3>
                          <p className="section-label text-[10px] text-[#8A8A82] mt-1">{item.color} · Size {item.size}</p>
                          {item.product.isSale && (
                            <span className="section-label text-[9px] text-[#C0392B] mt-1 inline-block">SALE</span>
                          )}
                        </div>
                        <span className="font-display text-xl font-light text-[#1A1A18] flex-shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#D1CCC3]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-[#8A8A82] hover:text-[#1A1A18] transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-4 py-2 text-sm font-light text-[#1A1A18] tabular-nums border-x border-[#D1CCC3]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-[#8A8A82] hover:text-[#1A1A18] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 text-[#8A8A82] hover:text-[#C0392B] transition-colors"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                          <span className="section-label text-[10px]">REMOVE</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4">
                <Link href="/collections">
                  <span className="section-label text-[11px] text-[#8A8A82] hover:text-[#1A1A18] transition-colors cursor-pointer">
                    ← CONTINUE SHOPPING
                  </span>
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#F0EDE6] p-7">
                <h2 className="font-display text-2xl font-light text-[#1A1A18] mb-6">Order Summary</h2>

                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8A8A82] font-light">Subtotal</span>
                    <span className="text-sm font-light">${sub.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-[#C0392B] font-light">Discount (10%)</span>
                      <span className="text-sm text-[#C0392B] font-light">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8A8A82] font-light">Shipping</span>
                    <span className="text-sm font-light">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="border-t border-[#D1CCC3] pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-display text-xl font-light text-[#1A1A18]">Total</span>
                    <span className="font-display text-xl font-light text-[#1A1A18]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo */}
                <div className="flex gap-0 mb-6">
                  <div className="flex items-center flex-1 border border-[#D1CCC3] bg-white">
                    <Tag size={13} className="ml-3 text-[#8A8A82]" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="PROMO CODE"
                      className="flex-1 px-3 py-3 text-xs font-light bg-transparent outline-none placeholder-[#8A8A82]"
                    />
                  </div>
                  <button
                    onClick={() => { if (promoCode) setPromoApplied(true); }}
                    className="btn-dark px-5 py-3 text-[10px]"
                  >
                    APPLY
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[#C9A96E] section-label text-[10px] -mt-4 mb-4">✓ Code applied — 10% off</p>
                )}

                <button className="btn-dark w-full py-4">PROCEED TO CHECKOUT</button>
                <p className="text-[#8A8A82] text-xs font-light text-center mt-3">
                  Secure checkout · SSL encrypted
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#E8E4DC]">
            <div className="mb-10">
              <p className="section-label text-[10px] text-[#C9A96E] mb-2">CURATED FOR YOU</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1A18]">You May Also Like</h2>
            </div>
            <ProductGrid products={recommendations} cols={3} />
          </section>
        )}
      </div>
    </div>
  );
}
