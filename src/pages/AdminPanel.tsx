import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useStatus, type WebsiteStatus } from '../context/StatusContext';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { status, updateStatus, isLoading: isStatusLoading } = useStatus();
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('System Deauthorized.');
      navigate('/');
    } catch (error: any) {
      toast.error('Log-out procedure failed.');
    }
  };

  const handleStatusChange = async (newStatus: WebsiteStatus) => {
    if (newStatus === status) return; // Ignore if already active
    
    setIsUpdating(true);
    const statusPromise = updateStatus(newStatus);

    toast.promise(statusPromise, {
      loading: `Broadcasting ${newStatus.toUpperCase()} protocol...`,
      success: () => {
        setIsUpdating(false);
        return `System transition to ${newStatus.toUpperCase()} complete.`;
      },
      error: (err) => {
        setIsUpdating(false);
        console.error("Broadcast failed:", err);
        return `Protocol broadcast failed: ${err.message || 'Unauthorized access'}`;
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

      {/* Global Navbar (Top Navigation) */}
      <nav className="sticky top-0 w-full z-[100] bg-surface/70 backdrop-blur-xl border-b border-outline-variant/10 shadow-2xl shadow-primary-container/5">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-lg md:text-xl font-black flex items-center gap-2 md:gap-3 font-headline tracking-tighter cursor-default">
              <img src="/favicon/favicon.svg" alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
              <span className="hidden xs:inline uppercase">Dashboard</span>
            </Link>
            <div className="h-6 w-[1px] bg-outline-variant/20 hidden md:block" />
            <Link 
              to="/admin/staffs" 
              className="text-[10px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.2em] hidden md:flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">group</span>
              Manage Staff
            </Link>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
             <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest leading-none mb-1">COMMANDER</p>
              <p className="text-xs font-bold text-primary">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-3 md:px-5 py-1.5 md:py-2 bg-error/10 text-error hover:bg-error/20 rounded-full text-[9px] md:text-[10px] font-bold transition-all border border-error/20 uppercase tracking-widest"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="relative z-10 flex-grow max-w-4xl w-full mx-auto px-6 py-12 md:py-20 space-y-12">
        <header className="text-center md:text-left mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-primary/20">
              <span className="material-symbols-outlined text-[12px] animate-pulse">radar</span>
              Live Network Control
            </div>
            <h1 className="text-2xl md:text-6xl font-headline font-black text-on-surface tracking-tighter uppercase mb-2 md:mb-4">
              Welcome, <span className="text-primary italic">{user.email?.split('@')[0] || 'Commander'}</span>
            </h1>
            <p className="text-on-surface-variant font-light text-sm md:text-lg">
              Manage the portal's visibility across the network.
            </p>
          </motion.div>
        </header>

        {/* Global Status Controller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatusCard 
            active={status === 'online'} 
            type="online" 
            title="Operational"
            desc="Visible to all explorers"
            onClick={() => handleStatusChange('online')}
            disabled={isUpdating || isStatusLoading}
          />
          <StatusCard 
            active={status === 'maintenance'} 
            type="maintenance" 
            title="Maintenance"
            desc="Locked for fine-tuning"
            onClick={() => handleStatusChange('maintenance')}
            disabled={isUpdating || isStatusLoading}
          />
          <StatusCard 
            active={status === 'offline'} 
            type="offline" 
            title="Offline"
            desc="Realm visibility disabled"
            onClick={() => handleStatusChange('offline')}
            disabled={isUpdating || isStatusLoading}
          />
        </div>

        {/* System Logs / Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[2rem] border border-outline-variant/10 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Network Summary</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                Your portal is currently connected to <span className="font-bold text-primary italic">Firebase Firestore</span>. Changes to the status are broadcasted globally in approximately 200ms.
              </p>
            </div>
            <div className="flex gap-3 md:gap-4">
              <div className="px-4 md:px-6 py-3 md:py-4 bg-surface-container-highest/40 rounded-2xl border border-outline-variant/10 text-center">
                <span className="block text-[9px] md:text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Latency</span>
                <span className="text-lg md:text-xl font-headline font-black text-success">32ms</span>
              </div>
              <div className="px-4 md:px-6 py-3 md:py-4 bg-surface-container-highest/40 rounded-2xl border border-outline-variant/10 text-center">
                <span className="block text-[9px] md:text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Uptime</span>
                <span className="text-lg md:text-xl font-headline font-black text-primary">99.9%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Oversight */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2">System Oversight</h3>
          <div className="max-w-2xl">
            <Link to="/admin/staffs" className="block group">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] border border-outline-variant/10 p-6 md:p-8 flex items-center justify-between group-hover:border-primary/30 transition-all shadow-xl"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all font-headline font-black">
                    <span className="material-symbols-outlined text-xl md:text-2xl">person_add</span>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-headline font-black uppercase tracking-tighter mb-1">Staff Management</h4>
                    <p className="text-[10px] md:text-xs text-on-surface-variant font-light uppercase tracking-widest">Authorize new administrative personnel</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-all group-hover:translate-x-1">arrow_forward</span>
              </motion.div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

/* --- Helpers --- */

interface StatusCardProps {
  active: boolean;
  type: WebsiteStatus;
  title: string;
  desc: string;
  onClick: () => void;
  disabled: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ active, type, title, desc, onClick, disabled }) => {
  const icons = {
    online: 'check_circle',
    maintenance: 'engineering',
    offline: 'cloud_off'
  };

  const variants = {
    online: active ? 'bg-success/20 border-success text-success shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 'bg-surface-container-low/40 border-outline-variant/20 hover:border-success/50',
    maintenance: active ? 'bg-warning/20 border-warning text-warning shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'bg-surface-container-low/40 border-outline-variant/20 hover:border-warning/50',
    offline: active ? 'bg-error/20 border-error text-error shadow-[0_0_30px_rgba(239,44,44,0.2)]' : 'bg-surface-container-low/40 border-outline-variant/20 hover:border-error/50'
  };

  return (
    <motion.button
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all text-center flex flex-col items-center gap-3 md:gap-4 ${variants[type]} disabled:opacity-50 group`}
    >
      <span className={`material-symbols-outlined text-2xl md:text-4xl mb-1 md:mb-2 ${active ? 'animate-pulse' : ''}`}>{icons[type]}</span>
      <div>
        <h3 className="text-lg md:text-xl font-headline font-black uppercase tracking-tighter mb-1">{title}</h3>
        <p className={`text-[10px] md:text-xs font-light ${active ? 'opacity-90' : 'text-on-surface-variant'}`}>{desc}</p>
      </div>
      {active && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute inset-0 rounded-[1.8rem] md:rounded-[2.3rem] ring-2 ring-primary ring-offset-4 ring-offset-transparent opacity-20 pointer-events-none"
        />
      )}
    </motion.button>
  );
};

export default AdminPanel;
