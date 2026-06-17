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
    <section className="bg-[#F0EDE6] py-20 px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto text-center"
      >
        <p className="section-label text-[10px] text-[#C9A96E] mb-4">EXCLUSIVE ACCESS</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-[#1A1A18] mb-4">
          Join the Inner Circle
        </h2>
        <p className="text-[#8A8A82] text-sm font-light leading-relaxed mb-8">
          Be the first to discover new collections, private appointments, and editorial notes curated for you.
        </p>

        {submitted ? (
          <div className="py-4">
            <p className="font-display text-2xl text-[#1A1A18] font-light">Thank you for joining.</p>
            <p className="text-[#8A8A82] text-sm mt-2">Welcome to MAISON.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-white border border-[#D1CCC3] border-r-0 px-5 py-4 text-sm text-[#1A1A18] placeholder-[#8A8A82] outline-none focus:border-[#C9A96E] transition-colors font-light"
            />
            <button type="submit" className="btn-dark px-8 py-4 whitespace-nowrap border-0">
              SUBSCRIBE
            </button>
          </form>
        )}

        <p className="text-[#8A8A82] text-xs font-light mt-4">
          By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
}
