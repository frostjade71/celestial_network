
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-primary-container/10 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-start px-8 md:px-12 py-16 w-full gap-12 max-w-screen-2xl mx-auto"
      >
        <motion.div variants={itemVariants} className="space-y-6 max-w-sm">
          <div className="text-2xl font-black text-primary flex items-center gap-4 uppercase font-['Pixelify_Sans'] tracking-tighter">
            <motion.img 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              src="/favicon/favicon.svg" 
              alt="Celestial Network Logo" 
              className="w-8 h-8 drop-shadow-glow-sm" 
            />
            CELESTIAL NETWORK
          </div>
          <p className="text-on-surface-variant text-sm font-light leading-relaxed">
            Building the most vibrant cosmic community on Discord. Join the journey through the stars and discover a universe of creative explorers.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-16 md:gap-24">
          <motion.div variants={itemVariants} className="space-y-5">
            <h5 className="font-bold text-on-surface text-base tracking-tight">Navigation</h5>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link to="rules" smooth={true} spy={true} className="text-on-surface-variant hover:text-primary transition-all cursor-pointer hover:pl-1 block">Rules</Link>
              </li>
              <li>
                <Link to="faq" smooth={true} spy={true} className="text-on-surface-variant hover:text-primary transition-all cursor-pointer hover:pl-1 block">FAQ</Link>
              </li>
              <li>
                <Link to="features" smooth={true} spy={true} className="text-on-surface-variant hover:text-primary transition-all cursor-pointer hover:pl-1 block">Features</Link>
              </li>
              <li>
                <Link to="join-info" smooth={true} spy={true} className="text-on-surface-variant hover:text-primary transition-all cursor-pointer hover:pl-1 block">How to Join</Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-5">
            <h5 className="font-bold text-on-surface text-base tracking-tight">Social Discovery</h5>
            <div className="flex gap-4">
              {[
                { icon: 'public', label: 'Website' },
                { icon: 'groups', label: 'Community' },
                { icon: 'chat', label: 'Discord' }
              ].map((social, idx) => (
                <motion.a 
                  key={idx}
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  href="https://discord.gg/AWdZsrjNTb" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all cursor-pointer shadow-sm border border-outline-variant/10 hover:border-primary/30"
                  aria-label={social.label}
                >
                  <span className="material-symbols-outlined text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-outline-variant/5 py-8 text-center"
      >
        <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.25em] font-medium opacity-60">
          Celestial Network © {currentYear}. All cosmic rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
