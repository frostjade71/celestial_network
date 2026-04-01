import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

interface TabItem {
  name: string;
  icon: string;
  to?: string;
  href?: string;
}

const TABS: TabItem[] = [
  { name: 'Home', to: 'home', icon: 'home' },
  { name: 'Why Join', to: 'features', icon: 'featured_play_list' },
  { name: 'Members', to: 'explorers', icon: 'group' },
  { name: 'Discord', href: 'https://discord.gg/AWdZsrjNTb', icon: 'forum' },
];

const BottomTabs = memo(function BottomTabs() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden px-4 pb-6 pointer-events-none">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-surface/80 backdrop-blur-2xl border border-primary-container/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between p-1.5 h-14 max-w-sm mx-auto pointer-events-auto"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.to;
          const isDiscord = tab.name === 'Discord';

          if (tab.href) {
            return (
              <motion.a
                key={tab.name}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors ${isDiscord ? 'text-[#5865F2]' : 'text-on-surface-variant'}`}
              >
                <span className="material-symbols-outlined text-[20px] leading-none">{tab.icon}</span>
                <span className="text-[8px] font-bold uppercase tracking-tight">{tab.name}</span>
              </motion.a>
            );
          }
          return (
            <Link
              key={tab.name}
              to={tab.to || ''}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onSetActive={() => setActiveTab(tab.to || '')}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 cursor-pointer transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
            >
              <div className="flex flex-col items-center justify-center relative pb-1">
                <span className="material-symbols-outlined text-[20px] leading-none transition-colors">
                  {tab.icon}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-tight transition-colors">
                  {tab.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="active-dot"
                    className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
});

export default BottomTabs;
