import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";
import { useTheme } from './hooks/useTheme.ts';
import Navbar from './components/layout/Navbar.tsx';
import Footer from './components/layout/Footer.tsx';
import Hero from './components/sections/Hero.tsx';
import QuickActions from './components/sections/QuickActions.tsx';
import JoinInfo from './components/sections/JoinInfo.tsx';
import WhyJoin from './components/sections/WhyJoin.tsx';
import BeforeJoining from './components/sections/BeforeJoining.tsx';
import VoiceChannels from './components/sections/VoiceChannels.tsx';
import Members from './components/sections/Members.tsx';
import Rules from './components/sections/Rules.tsx';
import FAQ from './components/sections/FAQ.tsx';
import Staff from './components/sections/Staff.tsx';

function App() {
  const { theme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Toaster position="bottom-right" richColors theme={theme === 'dark' ? 'dark' : 'light'} />
      <Analytics />
      <Navbar />

      
      <Hero />
      <QuickActions />
      
      <main className="max-w-screen-2xl mx-auto px-8 space-y-32 py-32">
        <JoinInfo />
        <WhyJoin />
        <BeforeJoining />
        <VoiceChannels />
        <Members />
        <Staff />
        <Rules />
        <FAQ />
      </main>

      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-container)' }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-on-primary rounded-full shadow-2xl flex items-center justify-center z-[60] group border border-primary/20"
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
    </>
  );
}

export default App;
