import { Link } from 'wouter';
import { motion } from 'framer-motion';

const notes = [
  { label: 'Palette', value: 'Black / Ivory / Stone' },
  { label: 'Fit', value: 'Relaxed precision' },
  { label: 'Fabric', value: 'Dense cotton jersey' },
];

export default function DropIndex() {
  return (
    <section className="home-drop-index">
      <div className="home-drop-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="home-drop-copy"
        >
          <p className="home-kicker">Drop index</p>
          <h2 className="font-display home-drop-title">The uniform, sharpened.</h2>
          <p className="home-drop-text">
            Essential shapes edited for a quiet but graphic wardrobe: clean tees, structured bottoms, and evening-weight layers.
          </p>
          <div className="home-drop-notes">
            {notes.map((note) => (
              <div key={note.label}>
                <span>{note.label}</span>
                <strong>{note.value}</strong>
              </div>
            ))}
          </div>
          <Link href="/collections">
            <button className="home-cta">Shop the drop</button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0, 0, 1] }}
          className="home-drop-image"
        >
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85"
            alt="MAISON editorial styling"
          />
          <div className="home-drop-badge">
            <span>MAISON</span>
            <strong>LOOK 01</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
