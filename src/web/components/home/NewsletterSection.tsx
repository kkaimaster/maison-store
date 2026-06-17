import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="home-final-cta">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <p className="home-kicker mb-4 mx-auto">Exclusive access</p>
        <h2 className="font-display text-4xl md:text-6xl font-normal text-[var(--home-ivory)] mb-4">
          Join the Inner Circle
        </h2>
        <p className="text-[#c8c0b5] text-sm font-light leading-relaxed mb-8 max-w-xl mx-auto">
          Be the first to discover new collections, private appointments, and editorial notes curated for you.
        </p>

        {submitted ? (
          <div className="py-4">
            <p className="font-display text-2xl text-[var(--home-ivory)] font-normal">Thank you for joining.</p>
            <p className="text-[#c8c0b5] text-sm mt-2">Welcome to MAISON.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-[var(--home-ivory)] px-5 py-4 text-sm text-[var(--home-ink)] placeholder-[var(--home-stone)] outline-none shadow-[inset_0_0_0_1px_rgba(200,185,154,0.45)] focus:shadow-[inset_0_0_0_1px_rgba(200,185,154,0.95)] transition-shadow font-normal min-h-12"
            />
            <button type="submit" className="bg-[var(--home-accent)] text-[var(--home-ink)] hover:bg-[var(--home-ivory)] px-8 py-4 whitespace-nowrap text-xs font-semibold uppercase transition-colors min-h-12 shadow-[0_10px_28px_rgba(17,16,14,0.18)]">
              SUBSCRIBE
            </button>
          </form>
        )}

        <p className="text-[#9f978e] text-xs font-light mt-4">
          By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
}
