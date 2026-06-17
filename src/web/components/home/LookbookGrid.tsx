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
    <section className="py-14 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="home-rule flex items-end justify-between gap-6 py-5 mb-10"
      >
        <div>
          <p className="home-kicker mb-3">The edit</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#131111]">The Lookbook</h2>
        </div>
        <Link href="/lookbook">
          <span className="text-[12px] font-semibold uppercase text-[#131111] hover:bg-[#E6FF2F] transition-colors cursor-pointer border border-[#131111] px-4 py-3 inline-block">
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
            className={`relative overflow-hidden group cursor-pointer border border-[#131111] bg-[#131111] ${look.span}`}
          >
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-400">
              <p className="text-[11px] font-semibold uppercase text-[#E6FF2F] mb-1">{look.label}</p>
              <h3 className="font-display text-[#FFF8EA] text-xl font-light">{look.title}</h3>
              <Link href="/lookbook">
                <span className="text-[11px] font-semibold uppercase text-white/80 mt-2 inline-block hover:text-[#E6FF2F] transition-colors">
                  EXPLORE
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
