import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import MegaMenu from './MegaMenu';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  const isHome = location === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isTransparent = isHome && !scrolled && !megaOpen;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: isTransparent ? 'transparent' : '#FAFAF8',
          boxShadow: scrolled && !isTransparent ? '0 1px 0 #E8E4DC' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Nav Left */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className="section-label text-[11px] transition-colors duration-200"
                  style={{ color: isTransparent ? '#FAFAF8' : '#1A1A18' }}
                >
                  SHOP
                </button>
                <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
              </div>
              <Link href="/lookbook">
                <span
                  className="section-label text-[11px] cursor-pointer transition-colors duration-200 hover:text-[#C9A96E]"
                  style={{ color: isTransparent ? '#FAFAF8' : '#1A1A18' }}
                >
                  LOOKBOOK
                </span>
              </Link>
              <Link href="/contact">
                <span
                  className="section-label text-[11px] cursor-pointer transition-colors duration-200 hover:text-[#C9A96E]"
                  style={{ color: isTransparent ? '#FAFAF8' : '#1A1A18' }}
                >
                  CONTACT
                </span>
              </Link>
            </nav>

            {/* Logo Center */}
            <Link href="/">
              <span
                className="font-display text-2xl md:text-3xl font-light tracking-[0.28em] cursor-pointer transition-colors duration-200"
                style={{ color: isTransparent ? '#FAFAF8' : '#1A1A18' }}
              >
                MAISON
              </span>
            </Link>

            {/* Icons Right */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1 transition-colors duration-200"
                style={{ color: isTransparent ? '#FAFAF8' : '#1A1A18' }}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                className="p-1 relative transition-colors duration-200"
                style={{ color: isTransparent ? '#FAFAF8' : '#1A1A18' }}
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C9A96E] text-[#1A1A18] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-1"
                style={{ color: isTransparent ? '#FAFAF8' : '#1A1A18' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#FAFAF8] border-t border-[#E8E4DC]">
            <nav className="flex flex-col px-6 py-6 gap-6">
              <Link href="/collections"><span className="section-label text-[12px] text-[#1A1A18]">SHOP ALL</span></Link>
              <Link href="/collections/t-shirts"><span className="section-label text-[12px] text-[#1A1A18]">T-SHIRTS</span></Link>
              <Link href="/collections/track-pants"><span className="section-label text-[12px] text-[#1A1A18]">TRACK PANTS</span></Link>
              <Link href="/lookbook"><span className="section-label text-[12px] text-[#1A1A18]">LOOKBOOK</span></Link>
              <Link href="/contact"><span className="section-label text-[12px] text-[#1A1A18]">CONTACT</span></Link>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
