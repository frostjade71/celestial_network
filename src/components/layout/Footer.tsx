
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
          <div className="text-2xl font-black text-on-surface flex items-center gap-4 uppercase font-headline tracking-tight">
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
            Building the ultimate Minecraft Realm and Discord community. Join our growing network of dedicated players and discover a universe of competitive survival and creative exploration.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-16 md:gap-24">
          <motion.div variants={itemVariants} className="space-y-5">
            <h5 className="font-bold text-on-surface text-base tracking-tight">Latest Updates</h5>
            <ul className="space-y-3 text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
              <li className="flex items-center gap-2 text-primary">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                v0.5.0 Beta Live
              </li>
              <li className="opacity-60">News System & Management</li>
              <li className="opacity-60">Realm Status Tracking</li>
              <li className="opacity-60">Admin Panel Refinement</li>
            </ul>
          </motion.div>

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
                  href="https://discord.com/invite/AWdZsrjNTb" 
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
        className="border-t border-outline-variant/5 pt-8 pb-24 md:pb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative px-8 max-w-screen-2xl mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-[9px] md:text-[10px] text-on-surface-variant uppercase tracking-[0.2em] md:trackng-[0.25em] font-medium opacity-70 text-center">
            Celestial Network ©frostjade71 {currentYear}. All cosmic rights reserved.
          </p>
          <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black text-primary uppercase tracking-widest">
            v0.5.0-beta
          </div>
        </div>
        
        <motion.a 
          href="https://github.com/frostjade71"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, color: 'var(--color-primary)' }}
          whileTap={{ scale: 0.9 }}
          className="text-on-surface-variant opacity-70 md:opacity-40 hover:opacity-100 transition-all cursor-pointer"
          aria-label="GitHub Profile"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </motion.a>
      </motion.div>
    </footer>
  );
}
