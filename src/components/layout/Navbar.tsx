import { useState, memo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const NAV_LINKS = [
  { name: 'Home', to: 'home' },
  { name: 'Join Info', to: 'join-info' },
  { name: 'Why Join', to: 'features' },
  { name: 'Voice Channels', to: 'voice' },
  { name: 'Members', to: 'explorers' },
];

const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-2xl shadow-primary-container/10">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black text-on-surface flex items-center gap-3 font-headline tracking-tight"
        >
          <img src="/favicon/favicon.svg" alt="Celestial Network Logo" className="w-8 h-8" />
          <span className="hidden md:block">CELESTIAL NETWORK</span>
        </motion.div>
        
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onSetActive={() => setActiveTab(link.to)}
              className="relative text-sm font-headline font-bold tracking-tight cursor-pointer py-1 px-2 transition-colors duration-300"
            >
              <span className={activeTab === link.to ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}>
                {link.name}
              </span>
              {activeTab === link.to && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 text-on-surface-variant flex items-center justify-center"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-xl">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </motion.button>
          
          <motion.a 
            href="https://discord.gg/AWdZsrjNTb"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#5865F2] to-[#4752C4] text-white p-2 md:px-5 md:py-1.5 rounded-full font-bold text-xs flex items-center justify-center md:gap-2 shadow-lg shadow-[#5865F2]/20 transition-all duration-300"
            title="Join the Network"
          >
            <svg className="w-4 h-4 md:w-3.5 md:h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
            </svg>
            <span className="hidden md:inline">Join the Network</span>
          </motion.a>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
