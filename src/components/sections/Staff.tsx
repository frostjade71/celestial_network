import { memo } from 'react';
import { motion } from 'framer-motion';
import { useDiscord } from '../../context/DiscordContext';
import type { StaffMember } from '../../types';

const INITIAL_STAFF: StaffMember[] = [
  { 
    id: '1', 
    name: 'Nfugoware', 
    role: 'Owner', 
    roleIcon: 'crown',
    roleColor: '#FFD700', // Gold
    initials: 'N', 
    isOnline: false, 
    discordId: '1335884171599417344',
    avatarUrl: '/founders/4cad8ae3de9e42195519a409c37efe9e.png'
  },
  { 
    id: '2', 
    name: 'Lostsignal', 
    role: '2nd Owner', 
    roleIcon: 'verified',
    roleColor: '#7CB9E8', // Light Blue
    initials: 'L', 
    isOnline: false, 
    discordId: '1462461904600699148',
    avatarUrl: '/founders/6ed42e0559a92f2d9aba97f60e053421.png'
  },
  { 
    id: '3', 
    name: 'Bulldog', 
    role: 'Realm Owner', 
    roleIcon: 'castle',
    roleColor: '#4a8024', // Minecraft Green
    initials: 'B', 
    isOnline: false, 
    discordId: '722871208965701653',
    avatarUrl: '/founders/909b960573db1b9119ff7c6cddf2b291.png'
  },
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

const Staff = memo(function Staff() {
  const { data } = useDiscord();
  const onlineMembers = data?.members || [];

  const staff = INITIAL_STAFF.map(member => {
    const discordMatch = onlineMembers.find((m: any) => m.id === member.discordId);
    return {
      ...member,
      isOnline: !!discordMatch,
      avatarUrl: discordMatch?.avatar_url || member.avatarUrl
    };
  });

  return (
    <section id="staff" className="py-16 px-6 bg-surface-container-lowest overflow-hidden rounded-[3rem] border border-outline-variant/10 shadow-sm transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/20">
            <span className="material-symbols-outlined text-[12px]">security</span>
            Server Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface mb-3 tracking-tighter uppercase">Our Staff <span className="text-primary italic">Team</span></h2>
          <p className="text-on-surface-variant font-light max-w-2xl mx-auto text-base leading-relaxed">Dedicated to keeping the server safe and fun, our crew is always here to help you navigate the network.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {staff.map(member => (
            <motion.div 
              key={member.id} 
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-8 rounded-[2.5rem] bg-surface-container border border-outline-variant/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden cursor-default text-center"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div 
                  className="w-full h-full rounded-full bg-surface-container-low flex items-center justify-center border border-primary/20 group-hover:border-primary transition-all duration-300 shadow-inner overflow-hidden"
                >
                  {member.avatarUrl ? (
                    <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-headline font-black text-3xl text-on-surface-variant group-hover:text-primary transition-colors tracking-tighter tabular-nums">{member.initials}</span>
                  )}
                </div>
                
                {/* Online Status Dot */}
                <motion.div 
                  initial={member.isOnline ? { scale: 1 } : { scale: 0.8 }}
                  animate={member.isOnline ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-[4px] border-surface-container shadow-sm ${
                    member.isOnline ? 'bg-success shadow-[0_0_10px_rgba(22,163,74,0.5)]' : 'bg-outline-variant/50' 
                  }`} 
                />
              </div>
              
              <div>
                <h4 className="font-headline font-black text-on-surface text-xl mb-1.5 group-hover:text-primary transition-colors tracking-tight uppercase tabular-nums">{member.name}</h4>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 text-[10px] font-black text-primary px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-sm uppercase tracking-widest"
                >
                  {member.roleIcon && (
                    <span 
                      className="material-symbols-outlined text-[12px] leading-none" 
                      style={{ color: member.roleColor }}
                    >
                      {member.roleIcon}
                    </span>
                  )}
                  {member.role}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default Staff;
