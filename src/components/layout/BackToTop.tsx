import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      // Simple throttling to prevent excessive state updates
      if (timeoutId) return;
      
      timeoutId = window.setTimeout(() => {
        setShowScrollTop(window.scrollY > 300);
        timeoutId = 0;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-container)' }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 w-14 h-14 bg-primary-container text-on-primary rounded-full shadow-2xl flex items-center justify-center z-[60] group border border-primary/20"
          aria-label="Back to top"
        >
          <motion.span 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="material-symbols-outlined"
          >
            arrow_upward
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
