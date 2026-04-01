import { memo } from 'react';
import { motion } from 'framer-motion';

const Appeal = memo(function Appeal() {
  return (
    <section className="relative py-16 overflow-hidden" id="appeal">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 border border-primary/20">
            <span className="material-symbols-outlined text-[12px]">gavel</span>
            Support & Moderation
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tighter uppercase mb-3">
            Need to <span className="text-primary italic">Appeal?</span>
          </h2>
          <p className="text-on-surface-variant font-light text-base max-w-xl mx-auto italic opacity-80">
            If you believe a mistake was made or you'd like to rejoin our community, please submit an appeal through our dedicated portal.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-block"
        >
          <a
            href="https://appeal.gg/C5EscREEW9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_4px_0_0_var(--md-sys-color-primary-container)] hover:shadow-none hover:translate-y-1 transition-all border border-primary-container/20 group"
          >
            <span className="material-symbols-outlined">send</span>
            Submit Appeal
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Appeal;
