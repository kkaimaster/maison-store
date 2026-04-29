import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MegaMenu({ open, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-[#FAFAF8] border border-[#E8E4DC] shadow-xl z-50"
          style={{ width: 580 }}
        >
          <div className="grid grid-cols-2 gap-0">
            {/* Links Column */}
            <div className="p-8 border-r border-[#E8E4DC]">
              <p className="section-label text-[10px] text-[#8A8A82] mb-6">COLLECTIONS</p>
              <nav className="flex flex-col gap-4">
                {[
                  { label: 'All Products', href: '/collections' },
                  { label: 'T-Shirts', href: '/collections/t-shirts' },
                  { label: 'Track Pants', href: '/collections/track-pants' },
                  { label: 'New Arrivals', href: '/collections/new-arrivals' },
                  { label: 'Sale', href: '/collections/sale' },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      onClick={onClose}
                      className="font-display text-xl font-light text-[#1A1A18] cursor-pointer hover:text-[#C9A96E] transition-colors duration-200 block"
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-[#E8E4DC]">
                <Link href="/lookbook">
                  <span onClick={onClose} className="section-label text-[10px] text-[#C9A96E] cursor-pointer hover:underline">
                    VIEW LOOKBOOK →
                  </span>
                </Link>
              </div>
            </div>

            {/* Editorial Images Column */}
            <div className="p-6 flex flex-col gap-4">
              <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"
                  alt="T-Shirts"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <Link href="/collections/t-shirts">
                    <span onClick={onClose} className="section-label text-[9px] text-white cursor-pointer">T-SHIRTS</span>
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80"
                  alt="Track Pants"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <Link href="/collections/track-pants">
                    <span onClick={onClose} className="section-label text-[9px] text-white cursor-pointer">TRACK PANTS</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
