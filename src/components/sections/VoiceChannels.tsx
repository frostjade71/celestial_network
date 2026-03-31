
import { motion } from 'framer-motion';

const VC_DATA = [
  {
    id: 1,
    icon: 'campaign',
    name: 'The Solar Flare',
    tag: 'Main Lobby',
    tagColor: 'bg-secondary-container text-on-secondary-container',
    connected: 12,
    limit: 25,
    users: ['JD', 'AS', 'MK'],
    extra: 9
  },
  {
    id: 2,
    icon: 'videogame_asset',
    name: 'Interstellar Ops',
    tag: 'Gaming',
    tagColor: 'bg-error-container text-on-error-container',
    connected: 4,
    limit: 5,
    users: ['G1', 'G2', 'G3'],
    extra: 0
  },
  {
    id: 3,
    icon: 'music_note',
    name: 'Space Lo-Fi',
    tag: 'Chill',
    tagColor: 'bg-primary-container text-on-primary',
    connected: 28,
    users: ['L1'],
    extra: 27
  },
  {
    id: 4,
    icon: 'movie',
    name: 'Nebula Night',
    tag: 'Cinema',
    tagColor: 'bg-tertiary-container text-on-tertiary-container',
    connected: 15,
    limit: 50,
    users: ['C1', 'C2', 'C3'],
    extra: 12
  }
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
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  },
};

export default function VoiceChannels() {
  return (
    <section className="space-y-10 py-10" id="voice">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Active Voice Hubs</h2>
          <p className="text-sm text-on-surface-variant mt-1">Where the community comes alive.</p>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex gap-5 overflow-x-auto pb-8 snap-x no-scrollbar"
      >
        {VC_DATA.map((vc) => (
          <motion.div 
            key={vc.id}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex-shrink-0 w-72 bg-surface-container p-6 rounded-2xl border border-outline-variant/10 snap-start solar-flare-shadow transition-all cursor-default group"
          >
            <div className="flex justify-between items-start mb-6">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-primary text-2xl">{vc.icon}</span>
              </motion.div>
              <span className={`px-2 py-1 ${vc.tagColor} text-[10px] font-bold rounded-lg uppercase tracking-wide shadow-sm`}>
                {vc.tag}
              </span>
            </div>
            
            <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{vc.name}</h4>
            
            <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-5">
              <span className="material-symbols-outlined text-sm animate-pulse text-primary">sensors</span>
              <span className="font-medium">{vc.connected} {vc.limit ? `/ ${vc.limit}` : ''} connected</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {vc.users.map((user, idx) => (
                  <motion.div 
                    key={user}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                    className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center text-[10px] font-bold shadow-sm"
                  >
                    {user}
                  </motion.div>
                ))}
                {vc.extra > 0 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant shadow-sm"
                  >
                    +{vc.extra}
                  </motion.div>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }}
                whileTap={{ scale: 0.9 }}
                className="text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20 hover:border-primary/50 transition-all"
              >
                Join VC
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
