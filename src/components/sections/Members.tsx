import { useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useDiscord } from '../../context/DiscordContext';

const Members = memo(function Members() {
  const { data, loading } = useDiscord();
  const scrollRepeatTimeout = useRef<any>(null);
  const scrollRepeatInterval = useRef<any>(null);

  const onlineMembers = data?.members || [];
  
  // Create a much longer array for a truly seamless marquee (at least 3x the container width)
  const marqueeMembers = [...onlineMembers, ...onlineMembers, ...onlineMembers];

  const startContinuousScroll = (direction: 'left' | 'right') => {
    const el = document.getElementById('members-scroll-container');
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

  return (
    <section className="space-y-10 py-10 relative overflow-hidden" id="explorers">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end px-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/20">
            <span className="material-symbols-outlined text-[12px] animate-pulse">group</span>
            Live Presence
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface tracking-tighter uppercase mb-1">
            Meet the <span className="text-primary italic">Explorers</span>
          </h2>
          <p className="text-sm text-on-surface-variant font-light tracking-wide italic opacity-80">Real-time pulse of our growing cosmic network.</p>
        </div>

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
      </motion.div>

      <div className="relative group">
        <div 
          id="members-scroll-container"
          className="flex gap-6 overflow-x-auto py-10 no-scrollbar select-none pause-on-hover"
        >
          <div className="flex gap-6 animate-marquee">
            {loading ? (
              Array(10).fill(0).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-64 h-32 bg-surface-container-low rounded-[2rem] animate-pulse" />
              ))
            ) : (
              marqueeMembers.map((member, idx) => (
                <motion.div 
                  key={`${member.id}-${idx}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{ transform: 'translateZ(0)' }}
                  className="flex-shrink-0 w-72 bg-surface-container-low p-6 rounded-[2.5rem] border border-outline-variant/10 shadow-sm transition-all hover:bg-surface-container-high cursor-default group relative overflow-hidden"
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant overflow-hidden shadow-inner rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        {member.avatar_url ? (
                          <img src={member.avatar_url} alt={member.username} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-headline font-black opacity-20">{member.username.charAt(0)}</span>
                        )}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-surface-container-low ${member.status === 'online' ? 'bg-success' : member.status === 'idle' ? 'bg-warning' : 'bg-outline'} shadow-lg`} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-headline font-black text-on-surface truncate tracking-tight uppercase group-hover:text-primary transition-colors">{member.username}</h4>
                      <div className="flex items-center gap-1.5 opacity-60">
                        <span className="text-[10px] font-black uppercase tracking-widest">{member.status}</span>
                        {member.game && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-outline" />
                            <span className="text-[10px] font-medium truncate italic tracking-wide">{member.game.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative faint username background */}
                  <div className="absolute -bottom-4 -right-2 text-6xl font-headline font-black opacity-[0.02] rotate-12 select-none group-hover:opacity-[0.05] transition-opacity pointer-events-none uppercase">
                    {member.username.substring(0, 4)}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
});

export default Members;
