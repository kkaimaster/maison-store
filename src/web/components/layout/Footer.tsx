import { Link } from 'wouter';
import { Heart, Send, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0D] text-[#F0EDE6]">
      {/* Top section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl font-light tracking-[0.28em] mb-4">MAISON</h3>
            <p className="text-[#8A8A82] text-sm font-light leading-relaxed mb-6">
              Refined essentials for the discerning wardrobe. Quality without compromise.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#8A8A82] hover:text-[#C9A96E] transition-colors">
                <Heart size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-[#8A8A82] hover:text-[#C9A96E] transition-colors">
                <Send size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-[#8A8A82] hover:text-[#C9A96E] transition-colors">
                <Play size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="section-label text-[10px] text-[#C9A96E] mb-5">SHOP</p>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'All Products', href: '/collections' },
                { label: 'T-Shirts', href: '/collections/t-shirts' },
                { label: 'Track Pants', href: '/collections/track-pants' },
                { label: 'New Arrivals', href: '/collections/new-arrivals' },
                { label: 'Archive', href: '/collections/sale' },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-sm text-[#8A8A82] hover:text-[#F0EDE6] transition-colors cursor-pointer font-light">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <p className="section-label text-[10px] text-[#C9A96E] mb-5">INFORMATION</p>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Lookbook', href: '/lookbook' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping & Returns', href: '/contact' },
                { label: 'Size Guide', href: '/contact' },
                { label: 'Privacy Policy', href: '/contact' },
              ].map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="text-sm text-[#8A8A82] hover:text-[#F0EDE6] transition-colors cursor-pointer font-light">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p className="section-label text-[10px] text-[#C9A96E] mb-5">NEWSLETTER</p>
            <p className="text-sm text-[#8A8A82] font-light leading-relaxed mb-4">
              Join the inner circle for first access, atelier notes, and private appointments.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border border-white/10 text-[#F0EDE6] placeholder-[#8A8A82] px-4 py-3 text-sm font-light outline-none focus:border-[#C9A96E] transition-colors"
              />
              <button className="btn-gold text-[10px] py-3">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#8A8A82] text-xs font-light">© 2026 MAISON. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {['visa', 'mc', 'amex', 'paypal'].map((method) => (
              <div key={method} className="bg-white/10 px-2 py-1 rounded-sm">
                <span className="text-[#8A8A82] text-[9px] uppercase font-medium">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
