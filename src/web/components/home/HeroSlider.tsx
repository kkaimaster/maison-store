import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=85',
    label: 'CURRENT SEASON',
    headline: 'REFINED\nESSENTIALS',
    sub: 'Quiet pieces cut with intention, built for daily ritual.',
    cta: 'Shop Now',
    href: '/collections',
    align: 'left',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&q=85',
    label: 'ATELIER COTTON',
    headline: 'THE\nFOUNDATION',
    sub: 'Weight, drape, and proportion refined to the line.',
    cta: 'Shop T-Shirts',
    href: '/collections/t-shirts',
    align: 'center',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85',
    label: 'MOVEMENT, REFINED',
    headline: 'AFTER\nHOURS',
    sub: 'Relaxed tailoring for travel, city, and evening ease.',
    cta: 'Shop Bottoms',
    href: '/collections/track-pants',
    align: 'right',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    go((current + 1) % slides.length, 1);
  }, [current, go]);

  const prev = useCallback(() => {
    go((current - 1 + slides.length) % slides.length, -1);
  }, [current, go]);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[current];

  const textAlign = slide.align === 'center' ? 'items-center text-center' : slide.align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <div className="relative w-full overflow-hidden bg-[#0F0F0D]" style={{ height: '100svh', minHeight: 620 }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: () => ({ opacity: 0, scale: 1.02 }),
            center: { opacity: 1, scale: 1 },
            exit: () => ({ opacity: 0, scale: 1.01 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.32, 0, 0, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={slide.image}
            alt={slide.headline}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,13,0.72)_0%,rgba(15,15,13,0.40)_36%,rgba(15,15,13,0.12)_68%,rgba(15,15,13,0.34)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/45 to-transparent" />

          {/* Text content */}
          <div className={`absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-20 ${textAlign}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              className="max-w-[680px]"
            >
              <p className="section-label text-[10px] text-[#D7BE86] mb-3">{slide.label}</p>
              <h1
                className="font-display text-white font-light mb-4 leading-none text-[56px] md:text-[88px] lg:text-[108px]"
                style={{ whiteSpace: 'pre-line' }}
              >
                {slide.headline}
              </h1>
              <p className="text-white/86 text-base font-light mb-8 max-w-sm leading-relaxed">{slide.sub}</p>
              <Link href={slide.href}>
                <button className="btn-outline-white">{slide.cta}</button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
      >
        <ChevronLeft size={28} strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
      >
        <ChevronRight size={28} strokeWidth={1} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            className="transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 2,
              background: i === current ? '#C9A96E' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-10 z-10">
        <span className="section-label text-[10px] text-white/60">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
