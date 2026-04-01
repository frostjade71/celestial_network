import { useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useDiscord } from '../../context/DiscordContext';

interface VoiceHub {
  id: string;
  name: string;
  connected: number;
  users: { name: string; avatar?: string }[];
}

const VoiceChannels = memo(function VoiceChannels() {
  const { data, loading } = useDiscord();
  const scrollRepeatTimeout = useRef<any>(null);
  const scrollRepeatInterval = useRef<any>(null);

  const voiceChannels = data?.channels || [];
  const members = data?.members || [];
  
  const activeHubs: VoiceHub[] = voiceChannels.map((vc: any) => {
    const membersInChannel = members.filter((m: any) => m.channel_id === vc.id);
    return {
      id: vc.id,
      name: vc.name,
      connected: membersInChannel.length,
      users: membersInChannel.map((m: any) => ({
        name: m.username,
        avatar: m.avatar_url
      }))
    };
  }).filter((h: VoiceHub) => h.connected > 0);

  const startContinuousScroll = (direction: 'left' | 'right') => {
    const el = document.getElementById('voice-scroll-container');
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    scrollRepeatTimeout.current = setTimeout(() => {
      scrollRepeatInterval.current = setInterval(() => {
        el.scrollBy({ left: direction === 'left' ? -15 : 15, behavior: 'auto' });
      }, 16);
    }, 400);
  };

  const stopContinuousScroll = () => {
    if (scrollRepeatTimeout.current) clearTimeout(scrollRepeatTimeout.current);
    if (scrollRepeatInterval.current) clearInterval(scrollRepeatInterval.current);
  };

  useEffect(() => {
    return () => stopContinuousScroll();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
  };

  return (
    <section className="space-y-10 py-10" id="voice">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/20">
            <span className="material-symbols-outlined text-[12px] animate-pulse">record_voice_over</span>
            Live Presence
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface tracking-tighter uppercase mb-1">
            Active Voice <span className="text-primary italic">Hubs</span>
          </h2>
          <p className="text-sm text-on-surface-variant font-light tracking-wide italic opacity-80">Where the cosmos truly comes alive.</p>
        </div>
        
        {activeHubs.length > 0 && (
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'var(--color-surface-container-high)' }}
              whileTap={{ scale: 0.9 }}
              onMouseDown={() => startContinuousScroll('left')}
              onMouseUp={stopContinuousScroll}
              onMouseLeave={stopContinuousScroll}
              onTouchStart={() => startContinuousScroll('left')}
              onTouchEnd={stopContinuousScroll}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'var(--color-surface-container-high)' }}
              whileTap={{ scale: 0.9 }}
              onMouseDown={() => startContinuousScroll('right')}
              onMouseUp={stopContinuousScroll}
              onMouseLeave={stopContinuousScroll}
              onTouchStart={() => startContinuousScroll('right')}
              onTouchEnd={stopContinuousScroll}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </motion.button>
          </div>
        )}
      </motion.div>

      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full" />
        </div>
      ) : activeHubs.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="voice-scroll-container"
          className="flex gap-6 overflow-x-auto py-8 snap-x no-scrollbar"
        >
          {activeHubs.map((hub) => (
            <motion.div 
              key={hub.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="flex-shrink-0 w-80 bg-surface-container p-8 rounded-[2.5rem] border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-default group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-inner">
                  <span className="material-symbols-outlined text-primary text-3xl">mic_external_on</span>
                </div>
                <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-success/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                  Active
                </div>
              </div>
              
              <h4 className="text-2xl font-headline font-black mb-1 group-hover:text-primary transition-colors tracking-tight uppercase truncate">{hub.name}</h4>
              
              <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-8 opacity-70">
                <span className="font-mono tabular-nums">{hub.connected} Members Connected</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-3">
                  {hub.users.slice(0, 3).map((user, idx) => (
                    <motion.div 
                      key={`${hub.id}-${user.name}-${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center shadow-lg overflow-hidden"
                      title={user.name}
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] font-black">{user.name.charAt(0)}</span>
                      )}
                    </motion.div>
                  ))}
                  {hub.connected > 3 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center text-[10px] font-black text-on-surface-variant shadow-lg"
                    >
                      +{hub.connected - 3}
                    </motion.div>
                  )}
                </div>
                
                <motion.a
                  href={`https://discord.com/invite/AWdZsrjNTb`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-on-primary text-[10px] font-black px-6 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all uppercase tracking-widest"
                >
                  Join Room
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-low/50 border border-outline-variant/10 rounded-[2.5rem] p-10 text-center max-w-xl mx-auto shadow-sm"
        >
          <div className="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-5 opacity-40">
            <span className="material-symbols-outlined text-2xl">volume_off</span>
          </div>
          <h3 className="text-xl font-headline font-black text-on-surface mb-2 tracking-tight uppercase">Silence in the Cosmos</h3>
          <p className="text-sm text-on-surface-variant font-light mb-6 max-w-sm mx-auto">No voice hubs are currently active. Be the one to start the conversation and spark life.</p>
          <motion.a
            href={`https://discord.com/invite/AWdZsrjNTb`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-surface-container-highest border border-outline-variant/20 text-on-surface px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-primary/50 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined text-base">rocket_launch</span>
            Join the Discord
          </motion.a>
        </motion.div>
      )}
    </section>
  );
});

export default VoiceChannels;
