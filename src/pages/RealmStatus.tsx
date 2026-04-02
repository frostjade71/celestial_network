import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useStatus, type RealmStatus as RealmStatusType } from '../context/StatusContext';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

const RealmStatus: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { realmStatus, updateRealmStatus, isLoading: isStatusLoading } = useStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleStatusChange = async (newStatus: RealmStatusType) => {
    if (newStatus === realmStatus) return;
    
    setIsUpdating(true);
    const statusPromise = updateRealmStatus(newStatus);

    toast.promise(statusPromise, {
      loading: 'Updating Realm status...',
      success: () => {
        setIsUpdating(false);
        return `Status updated to ${newStatus.toUpperCase()}.`;
      },
      error: (err) => {
        setIsUpdating(false);
        console.error("Update failed:", err);
        return `Update failed: ${err.message || 'Unauthorized access'}`;
      },
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0502] text-on-surface flex flex-col relative overflow-x-hidden">
      {/* Branded Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          className="w-full h-full object-cover opacity-20" 
          alt="Admin Background" 
          src="/Rose%20Red%20Crow.gif"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-surface"></div>
      </motion.div>

      <nav className="sticky top-0 w-full z-[100] bg-surface/70 backdrop-blur-xl border-b border-outline-variant/10 shadow-2xl shadow-primary-container/5">
        <div className="flex flex-row-reverse md:flex-row justify-between items-center px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-lg md:text-xl font-black flex items-center gap-2 md:gap-3 font-headline tracking-tighter hover:text-primary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="hidden xs:inline uppercase">Back to Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
             <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest leading-none mb-1">Admin</p>
              <p className="text-xs font-bold text-primary">{user.email}</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-grow max-w-4xl w-full mx-auto px-6 py-12 md:py-20 space-y-12">
        <header className="text-center md:text-left mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl md:text-6xl font-headline font-black text-on-surface tracking-tighter uppercase mb-2 md:mb-4">
              Realm <span className="text-primary italic">Status</span>
            </h1>
            <p className="text-on-surface-variant font-light text-sm md:text-lg">
              Toggle the visibility and access protocol for the Minecraft Realm.
            </p>
          </motion.div>
        </header>

        {/* Status Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusOption 
            active={realmStatus === 'open'} 
            type="open" 
            title="Realm Open"
            desc="Currently accepting new explorers"
            onClick={() => handleStatusChange('open')}
            disabled={isUpdating || isStatusLoading}
          />
          <StatusOption 
            active={realmStatus === 'closed'} 
            type="closed" 
            title="Realm Closed"
            desc="Realm access is currently restricted"
            onClick={() => handleStatusChange('closed')}
            disabled={isUpdating || isStatusLoading}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[2rem] border border-outline-variant/10 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Protocol Information</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                Changing the Realm status updates the front-page indicator for all users. This does not automatically stop the Minecraft server, but informs the community of the current access state globally.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

interface StatusOptionProps {
  active: boolean;
  type: 'open' | 'closed';
  title: string;
  desc: string;
  onClick: () => void;
  disabled: boolean;
}

const StatusOption: React.FC<StatusOptionProps> = ({ active, type, title, desc, onClick, disabled }) => {
  const icons = {
    open: '/realm-status/netheropen.gif',
    closed: '/realm-status/barrier.png'
  };

  const variants = {
    open: active ? 'bg-success/20 border-success text-success shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 'bg-surface-container-low/40 border-outline-variant/20 hover:border-success/50',
    closed: active ? 'bg-error/20 border-error text-error shadow-[0_0_30px_rgba(239,44,44,0.2)]' : 'bg-surface-container-low/40 border-outline-variant/20 hover:border-error/50'
  };

  return (
    <motion.button
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all text-center flex flex-col items-center gap-3 md:gap-4 ${variants[type]} disabled:opacity-50 group grow`}
    >
      <img src={icons[type]} alt={title} className="w-10 h-10 md:w-12 md:h-12 object-contain mb-1 md:mb-2" />
      <div>
        <h3 className="text-lg md:text-xl font-headline font-black uppercase tracking-tighter mb-1">{title}</h3>
        <p className={`text-[10px] md:text-xs font-light ${active ? 'opacity-90' : 'text-on-surface-variant'}`}>{desc}</p>
      </div>
      {active && (
        <motion.div 
          layoutId="activeRealmGlow"
          className="absolute inset-0 rounded-[1.8rem] md:rounded-[2.3rem] ring-2 ring-primary ring-offset-4 ring-offset-transparent opacity-20 pointer-events-none"
        />
      )}
    </motion.button>
  );
};

export default RealmStatus;
