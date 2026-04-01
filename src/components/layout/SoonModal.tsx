import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

export default function SoonModal() {
  const { isSoonModalOpen, closeSoonModal } = useTheme();

  return (
    <AnimatePresence>
      {isSoonModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSoonModal}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-surface-container-high border border-outline-variant/30 rounded-[2rem] p-6 max-w-[280px] w-full shadow-2xl pointer-events-auto relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">light_mode</span>
                </div>
                
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">
                  Coming Soon!
                </h3>
                
                <p className="text-xs text-on-surface-variant mb-6 leading-relaxed px-2">
                  Celestial Light mode is in the works! For now, enjoy the stars in dark mode.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeSoonModal}
                  className="w-full py-2.5 bg-primary text-on-primary rounded-full font-bold text-xs shadow-lg shadow-primary/20 transition-shadow hover:shadow-primary/40"
                >
                  Stay Dark
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
