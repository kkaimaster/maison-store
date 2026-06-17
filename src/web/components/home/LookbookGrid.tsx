import { Link } from 'wouter';
import { motion } from 'framer-motion';

const looks = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
    label: 'LOOK 01',
    title: 'Effortless White',
    span: 'row-span-2',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80',
    label: 'LOOK 02',
    title: 'Dark Essentials',
    span: '',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80',
    label: 'LOOK 03',
    title: 'Urban Motion',
    span: '',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
    label: 'LOOK 04',
    title: 'Refined Casual',
    span: 'col-span-2',
  },
];

export default function LookbookGrid() {
  return (
    <section className="py-16 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <p className="section-label text-[10px] text-[#C9A96E] mb-2">THE EDIT</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18]">The Lookbook</h2>
        </div>
        <Link href="/lookbook">
          <span className="section-label text-[11px] text-[#1A1A18] hover:text-[#C9A96E] transition-colors cursor-pointer border-b border-[#1A1A18] hover:border-[#C9A96E] pb-0.5">
            VIEW ALL
          </span>
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[280px] md:auto-rows-[320px]">
        {looks.map((look, i) => (
          <motion.div
            key={look.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            className={`relative overflow-hidden group cursor-pointer ${look.span}`}
          >
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
              <p className="section-label text-[9px] text-[#C9A96E] mb-1">{look.label}</p>
              <h3 className="font-display text-white text-xl font-light">{look.title}</h3>
              <Link href="/lookbook">
                <span className="section-label text-[9px] text-white/70 mt-2 inline-block hover:text-[#C9A96E] transition-colors">
                  EXPLORE →
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
