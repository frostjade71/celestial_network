import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const AdminPanel: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/');
      }
    });

    // Metrics Heartbeat
    const checkConnection = async () => {
      // Don't ping if the tab is hidden to save Firebase reads
      if (document.hidden) return;

      const start = performance.now();
      try {
        const q = query(collection(db, 'news'), limit(1));
        await getDocs(q);
        const end = performance.now();
        setLatency(Math.round(end - start));
        setIsOnline(true);
      } catch (error) {
        setIsOnline(false);
        setLatency(null);
      }
    };

    const interval = setInterval(checkConnection, 20000);
    checkConnection();

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out.');
      navigate('/');
    } catch (error: any) {
      toast.error('Sign out failed.');
    }
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
            <Link 
              to="/admin/website-status" 
              className="text-[10px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.2em] hidden md:flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">public</span>
              Website Status
            </Link>
            <Link 
              to="/admin/realm-status" 
              className="text-[10px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.2em] hidden md:flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">dns</span>
              Realm Status
            </Link>
            <Link 
              to="/admin/news" 
              className="text-[10px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.2em] hidden md:flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">newspaper</span>
              News Feed
            </Link>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
             <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest leading-none mb-1">Admin</p>
              <p className="text-xs font-bold text-primary">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-3 md:px-5 py-1.5 md:py-2 bg-error/10 text-error hover:bg-error/20 rounded-full text-[9px] md:text-[10px] font-bold transition-all border border-error/20 uppercase tracking-widest flex items-center gap-1.5 md:gap-2"
            >
              <span className="material-symbols-outlined text-[14px] md:text-[16px]">logout</span>
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
            <h1 className="text-2xl md:text-6xl font-headline font-black text-on-surface tracking-tighter uppercase mb-2 md:mb-4">
              Welcome, <span className="text-primary italic">{user.email?.split('@')[0] || 'Commander'}</span>
            </h1>
            <p className="text-on-surface-variant font-light text-sm md:text-lg">
              Authorized access to the Celestial Network portal.
            </p>
          </motion.div>
        </header>

        {/* Navigation Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <NavTile 
            to="/admin/website-status" 
            title="Website Status"
            desc="Global visibility protocol"
            icon="public"
          />
          <NavTile 
            to="/admin/realm-status" 
            title="Realm Status"
            desc="Control access to the realm"
            icon="dns"
          />
          <NavTile 
            to="/admin/news" 
            title="News"
            desc="System broadcasts"
            icon="newspaper"
          />
        </div>

        {/* System Logs / Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[2rem] border border-outline-variant/10 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-on-surface mb-2">Network Summary</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                Management protocols are synchronized with <span className="font-bold text-primary italic">Firebase Firestore</span>. Data integrity is maintained across the global network.
              </p>
            </div>
            
            <div className="flex items-center gap-4 md:gap-8 bg-black/20 p-4 rounded-3xl border border-white/5 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-primary' : 'bg-error'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-primary' : 'bg-error'}`}></span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant leading-none mb-1">Firebase Status</p>
                  <p className={`text-xs font-bold ${isOnline ? 'text-primary' : 'text-error'}`}>{isOnline ? 'ONLINE' : 'OFFLINE'}</p>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-xl ${
                  !latency ? 'text-on-surface-variant opacity-20' : 
                  latency < 200 ? 'text-primary' : 
                  latency < 500 ? 'text-warning' : 'text-error'
                }`}>signal_cellular_alt</span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant leading-none mb-1">Latency</p>
                  <p className="text-xs font-bold text-on-surface">{latency ? `${latency}ms` : '---'}</p>
                </div>
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
                className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2.5rem] border border-outline-variant/10 p-4 md:p-8 flex items-center justify-between group-hover:border-primary/30 transition-all shadow-xl"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all font-headline font-black">
                    <span className="material-symbols-outlined text-lg md:text-2xl">person_add</span>
                  </div>
                  <div>
                    <h4 className="text-sm md:text-xl font-headline font-black uppercase tracking-tighter mb-0.5 md:mb-1">Staff Management</h4>
                    <p className="text-[9px] md:text-xs text-on-surface-variant font-light uppercase tracking-[0.15em] md:tracking-widest">Add new administrative personnel</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] md:text-[24px] text-on-surface-variant group-hover:text-primary transition-all group-hover:translate-x-1">arrow_forward</span>
              </motion.div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

/* --- Helpers --- */

interface NavTileProps {
  to: string;
  title: string;
  desc: string;
  icon: string;
  soon?: boolean;
}

const NavTile: React.FC<NavTileProps> = ({ to, title, desc, icon, soon }) => {
  return (
    <Link to={soon ? '#' : to} className={soon ? 'cursor-not-allowed pointer-events-none opacity-60' : ''}>
      <motion.div
        whileHover={soon ? {} : { y: -5 }}
        className="relative bg-surface-container-low/40 border-2 border-outline-variant/20 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-center flex flex-col items-center gap-3 md:gap-4 hover:border-primary/50 transition-all group"
      >
        <span className="material-symbols-outlined text-2xl md:text-4xl text-on-surface-variant group-hover:text-primary transition-colors">{icon}</span>
        <div>
          <h3 className="text-lg md:text-xl font-headline font-black uppercase tracking-tighter mb-1">{title}</h3>
          <p className="text-[10px] md:text-xs font-light text-on-surface-variant">{soon ? 'Coming Soon' : desc}</p>
        </div>
        {soon && (
          <div className="absolute top-4 right-4 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border border-primary/20">
            Soon
          </div>
        )}
      </motion.div>
    </Link>
  );
};
export default AdminPanel;
