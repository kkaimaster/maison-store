import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Heart, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 80 }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label text-[10px] text-[#C9A96E] mb-2">GET IN TOUCH</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-[#1A1A18]">Contact Us</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="py-16">
                <p className="font-display text-3xl font-light text-[#1A1A18] mb-3">Message Sent</p>
                <p className="text-[#8A8A82] font-light">Thank you for reaching out. We'll respond within 1–2 business days.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline mt-8">SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label text-[10px] text-[#8A8A82] block mb-2">NAME</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#D1CCC3] px-4 py-3 text-sm font-light text-[#1A1A18] placeholder-[#8A8A82] outline-none focus:border-[#1A1A18] transition-colors bg-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="section-label text-[10px] text-[#8A8A82] block mb-2">EMAIL</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-[#D1CCC3] px-4 py-3 text-sm font-light text-[#1A1A18] placeholder-[#8A8A82] outline-none focus:border-[#1A1A18] transition-colors bg-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="section-label text-[10px] text-[#8A8A82] block mb-2">SUBJECT</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-[#D1CCC3] px-4 py-3 text-sm font-light text-[#1A1A18] outline-none focus:border-[#1A1A18] transition-colors bg-transparent appearance-none"
                  >
                    <option value="general">General Enquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="section-label text-[10px] text-[#8A8A82] block mb-2">MESSAGE</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-[#D1CCC3] px-4 py-3 text-sm font-light text-[#1A1A18] placeholder-[#8A8A82] outline-none focus:border-[#1A1A18] transition-colors bg-transparent resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="btn-dark py-4 self-start px-12">
                  SEND MESSAGE
                </button>
              </form>
            )}
          </motion.div>

          {/* Brand info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div>
              <h2 className="font-display text-3xl font-light text-[#1A1A18] mb-6">MAISON</h2>
              <p className="text-[#8A8A82] text-sm font-light leading-relaxed max-w-xs">
                Refined essentials crafted for the discerning wardrobe. Every piece is designed to last beyond seasons.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <MapPin size={16} className="text-[#C9A96E] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="section-label text-[10px] text-[#8A8A82] mb-1">STUDIO</p>
                  <p className="text-sm text-[#1A1A18] font-light">140 West 57th Street<br />New York, NY 10019</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={16} className="text-[#C9A96E] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="section-label text-[10px] text-[#8A8A82] mb-1">EMAIL</p>
                  <p className="text-sm text-[#1A1A18] font-light">hello@maison.com</p>
                  <p className="text-sm text-[#1A1A18] font-light">press@maison.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock size={16} className="text-[#C9A96E] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="section-label text-[10px] text-[#8A8A82] mb-1">HOURS</p>
                  <p className="text-sm text-[#1A1A18] font-light">Mon–Fri: 9am – 6pm EST</p>
                  <p className="text-sm text-[#1A1A18] font-light">Sat: 10am – 4pm EST</p>
                </div>
              </div>
            </div>

            <div>
              <p className="section-label text-[10px] text-[#8A8A82] mb-3">FOLLOW US</p>
              <div className="flex gap-4">
                <a href="#" className="text-[#1A1A18] hover:text-[#C9A96E] transition-colors">
                  <Heart size={18} strokeWidth={1.5} />
                </a>
                <a href="#" className="text-[#1A1A18] hover:text-[#C9A96E] transition-colors">
                  <Send size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* FAQ quick links */}
            <div className="bg-[#F0EDE6] p-6">
              <p className="section-label text-[10px] text-[#C9A96E] mb-4">QUICK ANSWERS</p>
              {[
                'What is your return policy?',
                'How long does shipping take?',
                'Do you offer international shipping?',
                'How do I find my size?',
              ].map((q) => (
                <div key={q} className="border-b border-[#D1CCC3] py-3">
                  <p className="text-sm text-[#1A1A18] font-light hover:text-[#C9A96E] transition-colors cursor-pointer">{q}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
