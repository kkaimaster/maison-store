import { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { products } from '../../data/products';

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 1
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const popularSearches = ['Oversized Tee', 'Track Pants', 'Black', 'New Arrivals', 'Sale'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: 'rgba(15, 15, 13, 0.96)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="flex justify-end p-6">
          <button onClick={onClose} className="text-[#F0EDE6] hover:text-[#C9A96E] transition-colors">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center px-6 pt-12 max-w-2xl mx-auto w-full">
          {/* Search input */}
          <div className="w-full flex items-center gap-4 border-b-2 border-[#C9A96E] pb-4 mb-10">
            <Search size={20} strokeWidth={1.5} className="text-[#8A8A82]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent font-display text-3xl text-[#F0EDE6] placeholder-[#8A8A82] outline-none font-light"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-[#8A8A82] hover:text-[#F0EDE6]">
                <X size={18} />
              </button>
            )}
          </div>

          {/* Results */}
          {query.length > 1 ? (
            <div className="w-full">
              {filtered.length > 0 ? (
                <>
                  <p className="section-label text-[10px] text-[#8A8A82] mb-4">{filtered.length} RESULT{filtered.length !== 1 ? 'S' : ''}</p>
                  <div className="flex flex-col gap-3">
                    {filtered.map((p) => (
                      <Link key={p.id} href={`/products/${p.handle}`}>
                        <div
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <img src={p.images[0]} alt={p.title} className="w-16 h-20 object-cover" />
                          <div>
                            <p className="font-display text-xl text-[#F0EDE6] font-light">{p.title}</p>
                            <p className="section-label text-[10px] text-[#8A8A82] mt-1">{p.category}</p>
                            <p className="text-[#C9A96E] font-light text-sm mt-1">${p.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="font-display text-2xl text-[#8A8A82] font-light text-center">No results for "{query}"</p>
              )}
            </div>
          ) : (
            <div className="w-full">
              <p className="section-label text-[10px] text-[#8A8A82] mb-4">POPULAR SEARCHES</p>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="btn-outline-white text-[11px] py-2.5 px-5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
