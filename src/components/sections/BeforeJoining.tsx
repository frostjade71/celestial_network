import { memo } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  },
};

const BeforeJoining = memo(function BeforeJoining() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10" id="before-joining">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-surface-container p-10 rounded-3xl border-l-[12px] border-primary-container shadow-2xl relative overflow-hidden group"
      >
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 right-0 p-6"
        >
          <span className="material-symbols-outlined text-9xl">priority_high</span>
        </motion.div>
        
        <h3 className="text-2xl md:text-3xl font-headline font-black mb-6 text-on-surface tracking-tight">Please Read Carefully</h3>
        <p className="text-on-surface-variant leading-relaxed text-base md:text-lg mb-8 font-light">
          Celestial Network is built on mutual respect and creative growth. We operate with zero tolerance for harassment, discrimination, or harmful behavior. By joining, you agree to become a guardian of our culture.
        </p>
        
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-primary-container font-black text-sm uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-xl animate-pulse">verified_user</span>
          Verified Member Guidelines Apply
        </motion.div>
      </motion.div>

      <div className="space-y-8">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-headline font-black tracking-tight"
        >
          Important Notes
        </motion.h3>
        
        <motion.ul 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          {[
            { title: 'Age Requirement', desc: 'All members must be 13+ as per Discord TOS.' },
            { title: 'Profile Identity', desc: 'Consistent nicknames and clear profile pictures encouraged.' },
            { title: 'Notification Policy', desc: 'We keep @everyone pings to a minimum for your peace.' },
          ].map((note, idx) => (
            <motion.li 
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className="flex gap-5 items-center group cursor-default"
            >
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300"
              >
                <span className="material-symbols-outlined text-sm font-black">check</span>
              </motion.div>
              <div>
                <span className="block font-bold text-on-surface text-base group-hover:text-primary transition-colors">{note.title}</span>
                <span className="text-on-surface-variant text-sm font-light">{note.desc}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
});

export default BeforeJoining;
