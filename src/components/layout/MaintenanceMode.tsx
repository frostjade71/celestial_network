import React from 'react';
import { motion } from 'framer-motion';
import type { WebsiteStatus } from '../../context/StatusContext';

interface MaintenanceModeProps {
  status: WebsiteStatus;
}

const MaintenanceMode: React.FC<MaintenanceModeProps> = ({ status }) => {
  const isMaintenance = status === 'maintenance';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
      {/* Blurred Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-surface/30 backdrop-blur-3xl"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 text-center max-w-md bg-surface-container-high/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/20 shadow-2xl"
      >
        <div className="mb-6 inline-block">
          <span className="material-symbols-outlined text-primary text-5xl md:text-6xl drop-shadow-[0_0_20px_rgba(var(--primary),0.6)]">
            {isMaintenance ? 'engineering' : 'cloud_off'}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-headline font-black text-on-surface mb-4 tracking-tight uppercase">
          {isMaintenance ? 'Maintenance Underway' : 'Website is Offline'}
        </h1>

        <p className="text-sm md:text-base text-on-surface-variant font-light mb-8 leading-relaxed italic opacity-80">
          {isMaintenance 
            ? "We're fine-tuning the stars for a better experience. We'll be back shortly!" 
            : "The realm is closed for exploration. Check back later or join Discord."}
        </p>

        <div className="flex justify-center">
          <motion.a 
            href="https://discord.com/invite/AWdZsrjNTb"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-on-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">forum</span>
            Updates
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenanceMode;
