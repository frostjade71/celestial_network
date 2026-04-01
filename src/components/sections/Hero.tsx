import { memo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useTheme } from '../../hooks/useTheme';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 }
  },
};

const Hero = memo(function Hero() {
  const { theme } = useTheme();

  const copyInvite = () => {
    navigator.clipboard.writeText('https://discord.gg/AWdZsrjNTb');
    toast.success('Invite link copied to clipboard!');
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-6" id="home">
      {/* Background with Ambient Motion */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0 bg-[#0a0502]"
      >
        <img 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${theme === 'light' ? 'opacity-40' : 'opacity-30'}`} 
          alt="Rose Red Crow Background" 
          src="/Rose%20Red%20Crow.gif"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface"></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl -mt-12 md:mt-0"
      >
        <motion.div 
          variants={badgeVariants}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="inline-flex items-center gap-2 bg-surface-container-high/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary-container/20 mb-4 cursor-default"
        >
          <span className="text-secondary text-xs">🌟</span>
          <span className="text-[10px] font-bold tracking-wide text-on-surface">300+ EXPLORERS CONNECTED</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="mb-4">
          <img 
            src="/hero-title.webp" 
            alt="Celestial Network" 
            className="w-full max-w-3xl mx-auto h-auto drop-shadow-2xl" 
          />
        </motion.h1>

        <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-8">
          <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed">
            Welcome to Celestial Network — a growing Minecraft community with custom features, chill players, active staff, realm updates, and a Discord-powered hub for everything.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:flex md:flex-row gap-4 justify-center items-center w-full max-w-md md:max-w-none mx-auto">
          <motion.a 
            href="https://discord.gg/AWdZsrjNTb"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4, boxShadow: '0 20px 40px -10px rgba(var(--primary), 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 md:px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-xs md:text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
            </svg>
            <span className="truncate">Join our Discord</span>
          </motion.a>
          <motion.a 
            href="https://escalmc.com/realms/S7wxR61oZ7SqD1KiuDfp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4, boxShadow: '0 20px 40px -10px rgba(var(--secondary), 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 md:px-8 py-3 bg-gradient-to-r from-secondary to-secondary-container text-on-secondary rounded-full font-bold text-xs md:text-sm shadow-xl shadow-secondary/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">how_to_vote</span>
            <span className="truncate">Vote Celestial</span>
          </motion.a>
          <motion.button 
            onClick={copyInvite}
            whileHover={{ scale: 1.05, backgroundColor: 'var(--surface-container-highest)' }}
            whileTap={{ scale: 0.95 }}
            className="col-span-2 md:col-span-1 px-8 py-3 bg-surface-container-high text-on-surface rounded-full font-bold text-xs md:text-sm border border-outline-variant/30 flex items-center justify-center transition-all md:w-auto"
          >
            Copy Invite
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <span className="material-symbols-outlined text-primary-container text-3xl">expand_more</span>
      </motion.div>
    </header>
  );
});

export default Hero;
