import { memo } from 'react';
import { motion } from 'framer-motion';
import { useDiscord } from '../../context/DiscordContext';

const OnlineStats = memo(function OnlineStats() {
  const { data, loading } = useDiscord();
  
  const totalSync = data?.presence_count || 0;
  
  // Dynamic categories based on Discord status/activities
  const categories: { label: string; count: string | number; icon: string; color: string }[] = [
    { 
      label: 'Members', 
      count: '300+', 
      icon: 'groups',
      color: 'text-primary'
    },
    { 
      label: 'Online', 
      count: totalSync, 
      icon: 'sensors',
      color: 'text-secondary'
    },
    { 
      label: 'Voice Channels', 
      count: data?.channels?.length || 8, 
      icon: 'graphic_eq',
      color: 'text-tertiary'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 border border-success/20">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
            Live Community Pulse
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tighter uppercase mb-3">
            {loading ? '---' : totalSync.toLocaleString()} <span className="text-primary italic">Online Now</span>
          </h2>
          <p className="text-on-surface-variant font-light text-base max-w-xl mx-auto italic opacity-80">
            The celestial network is humming with activity. Connect with our community currently traversing the cosmos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 group"
            >
              <div className={`w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform ${cat.color} rotate-2 group-hover:rotate-0 shadow-inner`}>
                <span className="material-symbols-outlined text-xl">{cat.icon}</span>
              </div>
              <div className="text-2xl font-headline font-black mb-1 tracking-tight">
                {loading ? '--' : cat.count}
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                {cat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-12">
          <motion.a
            href="https://verify.realmbot.dev/i/celestial_smp_join"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95, translateY: 2 }}
            className="inline-flex items-center gap-3 bg-[#4a8024] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_4px_0_0_#2d4d16] hover:bg-[#5ba32b] active:shadow-none transition-all border-t border-white/20"
          >
            <img src="/minecraft-logo.webp" alt="Minecraft" className="w-7 h-7 object-contain" />
            Join the Realm
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default OnlineStats;
