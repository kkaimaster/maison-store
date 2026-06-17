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
    <section className="bg-[#131111] py-16 px-6 md:px-10 text-[#FFF8EA]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="home-kicker mb-4 mx-auto">Exclusive access</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-[#FFF8EA] mb-4">
          Join the Inner Circle
        </h2>
        <p className="text-[#c8c0b5] text-sm font-light leading-relaxed mb-8 max-w-xl mx-auto">
          Be the first to discover new collections, private appointments, and editorial notes curated for you.
        </p>

        {submitted ? (
          <div className="py-4">
            <p className="font-display text-2xl text-[#FFF8EA] font-light">Thank you for joining.</p>
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
              className="flex-1 bg-[#FFF8EA] border border-[#FFF8EA] sm:border-r-0 px-5 py-4 text-sm text-[#131111] placeholder-[#78726d] outline-none focus:border-[#E6FF2F] transition-colors font-light min-h-12"
            />
            <button type="submit" className="bg-[#E6FF2F] text-[#131111] border border-[#E6FF2F] hover:bg-[#FFF8EA] hover:border-[#FFF8EA] px-8 py-4 whitespace-nowrap text-xs font-semibold uppercase transition-colors min-h-12">
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
