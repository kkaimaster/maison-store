import { Link } from 'wouter';
import { motion } from 'framer-motion';

const looks = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
    label: 'LOOK 01',
    title: 'Effortless White',
    products: ['Classic Oversized Tee'],
    handles: ['classic-oversized-tee'],
    desc: 'Pure simplicity. The oversized tee in white against minimal city backdrops.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80',
    label: 'LOOK 02',
    title: 'Dark Essentials',
    products: ['Essential Slim Tee'],
    handles: ['essential-slim-tee'],
    desc: 'Precision in black. The slim tee engineered for those who live in contrast.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80',
    label: 'LOOK 03',
    title: 'Urban Motion',
    products: ['Tapered Track Pants'],
    handles: ['tapered-track-pants'],
    desc: 'The elevated trackpant. Polished for the city, free for everywhere else.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80',
    label: 'LOOK 04',
    title: 'Refined Casual',
    products: ['Ribbed Cropped Tee'],
    handles: ['ribbed-cropped-tee'],
    desc: 'The crop that commands attention. Ribbed, structured, effortlessly chic.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=80',
    label: 'LOOK 05',
    title: 'Washed Heritage',
    products: ['Washed Vintage Tee'],
    handles: ['washed-vintage-tee'],
    desc: 'Garment-washed character. Worn-in from the moment you put it on.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=900&q=80',
    label: 'LOOK 06',
    title: 'Graphic Statement',
    products: ['Graphic Heritage Tee'],
    handles: ['graphic-heritage-tee'],
    desc: 'Archival artwork on heavyweight cotton. A piece to collect.',
  },
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: 80 }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '70vh', minHeight: 400 }}>
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85"
          alt="Lookbook Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label text-[10px] text-[#C9A96E] mb-3">MAISON</p>
            <h1 className="font-display text-white font-light leading-none" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
              SS 2025 Collection
            </h1>
            <p className="text-white/70 text-sm font-light mt-4 max-w-md">
              Six looks. Six stories. One vision of refined contemporary dressing.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pull quote */}
      <div className="py-16 px-6 text-center bg-[#F0EDE6]">
        <p className="font-display text-2xl md:text-3xl font-light italic text-[#1A1A18] max-w-2xl mx-auto leading-relaxed">
          "Refinement is not about what you add — it is about what you have the confidence to remove."
        </p>
      </div>

      {/* Lookbook grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {looks.map((look, i) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="group"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <Link href={`/products/${look.handles[0]}`}>
                    <button className="btn-outline-white text-[10px] py-2.5 px-6">SHOP THE LOOK</button>
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="section-label text-[10px] text-[#C9A96E]">{look.label}</p>
                  <div className="flex gap-2">
                    {look.handles.map((handle, j) => (
                      <Link key={handle} href={`/products/${handle}`}>
                        <span className="section-label text-[10px] text-[#8A8A82] hover:text-[#1A1A18] transition-colors cursor-pointer">
                          {look.products[j]}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-light text-[#1A1A18] mt-1">{look.title}</h3>
                <p className="text-sm text-[#8A8A82] font-light mt-1 leading-relaxed">{look.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1A1A18] py-16 px-6 text-center">
        <p className="section-label text-[10px] text-[#C9A96E] mb-4">THE COLLECTION</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">Shop the Full Edit</h2>
        <Link href="/collections">
          <button className="btn-gold">SHOP ALL PRODUCTS</button>
        </Link>
      </div>
    </div>
  );
}
