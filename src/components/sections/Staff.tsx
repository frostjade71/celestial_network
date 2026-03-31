import { motion } from 'framer-motion';
import type { StaffMember } from '../../types';

const STAFF: StaffMember[] = [
  { id: '1', name: 'Jupiter', role: 'Admin', initials: 'J', isOnline: true },
  { id: '2', name: 'Cassini', role: 'Moderator', initials: 'C', isOnline: false },
  { id: '3', name: 'Apollo', role: 'Moderator', initials: 'A', isOnline: true },
  { id: '4', name: 'Hubble', role: 'Helper', initials: 'H', isOnline: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  },
};

export default function Staff() {
  return (
    <section id="staff" className="py-24 px-6 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">Our Staff Team</h2>
          <p className="text-on-surface-variant font-light max-w-2xl mx-auto text-lg leading-relaxed">Dedicated to keeping the server safe and fun, our crew is always here to help you navigate the stars.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STAFF.map(staff => (
            <motion.div 
              key={staff.id} 
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-3xl bg-surface-container border border-outline-variant/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden cursor-default"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-8">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className="w-full h-full rounded-full bg-surface-container-low flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-all duration-300 shadow-inner"
                >
                  <span className="font-headline font-black text-3xl text-on-surface-variant group-hover:text-primary transition-colors tracking-tighter">{staff.initials}</span>
                </motion.div>
                
                {/* Online Status Dot */}
                <motion.div 
                  initial={staff.isOnline ? { scale: 1 } : { scale: 0.8 }}
                  animate={staff.isOnline ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute bottom-1 right-1 w-5 h-5 md:w-6 md:h-6 rounded-full border-[3px] border-surface-container shadow-sm ${
                    staff.isOnline ? 'bg-success' : 'bg-outline-variant/50' 
                  }`} 
                />
              </div>
              
              <div className="text-center">
                <h4 className="font-headline font-black text-on-surface text-xl mb-2 group-hover:text-primary transition-colors">{staff.name}</h4>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-bold text-primary px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 inline-block shadow-sm"
                >
                  {staff.role}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
