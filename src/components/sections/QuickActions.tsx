
import { motion } from 'framer-motion';

export default function QuickActions() {
  return (
    <motion.div 
      initial={{ y: 100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-8 left-1/2 w-auto flex gap-6 items-center z-50 bg-surface-container/90 backdrop-blur-xl rounded-2xl px-6 py-3 border border-outline-variant/20 shadow-2xl md:hidden"
    >
      <motion.div 
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl p-2.5 shadow-lg shadow-primary/20 cursor-pointer"
      >
        <span className="material-symbols-outlined text-2xl">group_add</span>
      </motion.div>
      
      {[
        { icon: 'widgets', label: 'Features' },
        { icon: 'gavel', label: 'Rules' },
        { icon: 'content_copy', label: 'Invite' },
        { icon: 'shield', label: 'Staff' }
      ].map((action, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="text-on-surface-variant p-2 hover:text-primary transition-colors cursor-pointer"
          aria-label={action.label}
        >
          <span className="material-symbols-outlined text-2xl">{action.icon}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
