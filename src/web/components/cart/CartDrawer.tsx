import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { useCartStore } from '../../store/cartStore';

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
  const sub = subtotal();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
  const progress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="drawer-overlay"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.32, 0, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 bg-white flex flex-col"
            style={{ width: 'min(420px, 100vw)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} strokeWidth={1.5} />
                <h2 className="font-display text-xl font-light text-[#1A1A18]">
                  YOUR BAG
                  {totalItems() > 0 && (
                    <span className="ml-2 text-[#8A8A82] text-base">({totalItems()})</span>
                  )}
                </h2>
              </div>
              <button onClick={closeCart} className="text-[#8A8A82] hover:text-[#1A1A18] transition-colors">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Shipping progress */}
            {sub < FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-3 bg-[#FAFAF8] border-b border-[#E8E4DC]">
                <p className="text-xs text-[#8A8A82] font-light mb-2">
                  {remaining > 0
                    ? `Add $${remaining.toFixed(0)} more for FREE SHIPPING`
                    : 'You qualify for free shipping.'}
                </p>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
            {sub >= FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-3 bg-[#FAFAF8] border-b border-[#E8E4DC]">
                <p className="text-xs text-[#C9A96E] font-medium section-label text-[10px]">FREE SHIPPING UNLOCKED</p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-[#D1CCC3]" />
                  <p className="font-display text-2xl font-light text-[#1A1A18]">Your bag is empty</p>
                  <p className="text-sm text-[#8A8A82] font-light">Add something beautiful.</p>
                  <Link href="/collections">
                    <button onClick={closeCart} className="btn-dark mt-2">SHOP NOW</button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <Link href={`/products/${item.product.handle}`}>
                        <img
                          onClick={closeCart}
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-20 h-24 object-cover flex-shrink-0 cursor-pointer"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div>
                            <h4 className="font-display text-base font-light text-[#1A1A18] leading-tight">{item.product.title}</h4>
                            <p className="section-label text-[9px] text-[#8A8A82] mt-0.5">
                              {item.color} · {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#8A8A82] hover:text-[#C0392B] transition-colors flex-shrink-0"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty stepper */}
                          <div className="flex items-center border border-[#E8E4DC]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1.5 text-[#8A8A82] hover:text-[#1A1A18] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-sm font-light text-[#1A1A18] tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1.5 text-[#8A8A82] hover:text-[#1A1A18] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-light text-[#1A1A18]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="border-t border-[#E8E4DC] px-6 py-5 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-light text-[#8A8A82]">Subtotal</span>
                  <span className="font-display text-xl font-light text-[#1A1A18]">${sub.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[#8A8A82] font-light mb-4">
                  {sub >= FREE_SHIPPING_THRESHOLD ? 'Free shipping' : 'Shipping calculated at checkout'}
                </p>
                <Link href="/cart">
                  <button onClick={closeCart} className="btn-outline w-full mb-2 py-3.5">VIEW BAG</button>
                </Link>
                <button className="btn-dark w-full py-3.5">CHECKOUT</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
