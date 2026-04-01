import { memo } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  },
};

const WhyJoin = memo(function WhyJoin() {
  return (
    <section className="space-y-12 py-20" id="features">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">Why Join Celestial?</h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 bg-primary-container mx-auto mt-3 rounded-full"
        ></motion.div>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 min-h-[500px]"
      >
        {/* Large Highlight Card */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.01 }}
          className="md:col-span-4 md:row-span-2 bg-surface-container group overflow-hidden rounded-2xl relative p-10 flex flex-col justify-end solar-flare-shadow transition-all border border-outline-variant/10 cursor-default"
        >
          <motion.img 
            initial={{ scale: 1.2 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
            alt="Active Channels" 
            src="/hyper.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          <div className="relative z-10 space-y-4">
            <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">Active 24/7</span>
            <h3 className="text-3xl md:text-4xl font-headline font-black tracking-tight uppercase">Active Community</h3>
            <p className="text-on-surface-variant max-w-lg text-base md:text-lg leading-relaxed font-light">We're active all day and night. Whether you're gaming or just chilling, there's always someone online to talk to.</p>
          </div>
        </motion.div>

        {/* Small Card 1 */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="md:col-span-2 bg-surface-container-high group overflow-hidden rounded-2xl relative p-8 flex flex-col justify-between border border-outline-variant/10 cursor-default"
        >
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
            alt="Safe Environment Background" 
            src="/Midnight%20New%20moon%20shield%20pattern.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent z-0"></div>
          <span 
            className="material-symbols-outlined text-4xl text-primary-container relative z-10" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            security
          </span>
          <div className="relative z-10">
            <h4 className="text-xl font-headline font-bold mb-2 uppercase">Safe Environment</h4>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">A safer realm setup designed to keep the experience fun and protected.</p>
          </div>
        </motion.div>

        {/* Small Card 2 */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="md:col-span-2 bg-surface-container-highest group overflow-hidden rounded-2xl relative p-8 flex flex-col justify-between border border-outline-variant/10 cursor-default"
        >
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
            alt="Weekly Events Background" 
            src="/event.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent z-0"></div>
          <span 
            className="material-symbols-outlined text-4xl text-secondary relative z-10" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            event_available
          </span>
          <div className="relative z-10">
            <h4 className="text-xl font-headline font-bold mb-2 uppercase">Chill Community</h4>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">A laid-back place to play, talk, and build with others at your own pace.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default WhyJoin;
