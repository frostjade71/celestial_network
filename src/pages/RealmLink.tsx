import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useStatus } from '../context/StatusContext';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

const RealmLink: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { realmLink, updateRealmLink, isLoading: isStatusLoading } = useStatus();
  const [linkInput, setLinkInput] = useState("");
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

  useEffect(() => {
    if (realmLink) {
      setLinkInput(realmLink);
    }
  }, [realmLink]);

  const handleUpdateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkInput.trim()) {
      toast.error("Realm link cannot be empty.");
      return;
    }
    if (linkInput === realmLink) return;
    
    setIsUpdating(true);
    const statusPromise = updateRealmLink(linkInput.trim());

    toast.promise(statusPromise, {
      loading: 'Updating Realm link...',
      success: () => {
        setIsUpdating(false);
        return 'Realm link updated successfully.';
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
              Realm <span className="text-primary italic">Link</span>
            </h1>
            <p className="text-on-surface-variant font-light text-sm md:text-lg">
              Manage the invite link for the Realm visible on the homepage.
            </p>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[2rem] border border-outline-variant/10 p-6 md:p-8"
        >
          <form onSubmit={handleUpdateLink} className="flex flex-col gap-6">
            <div>
              <label htmlFor="realm-link" className="block text-sm font-bold text-on-surface mb-2">
                Join the Realm Link
              </label>
              <input
                id="realm-link"
                type="url"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="https://verify.realmbot.dev/i/..."
                disabled={isStatusLoading || isUpdating}
                className="w-full bg-black/40 border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isStatusLoading || isUpdating || linkInput === realmLink}
              className="bg-primary text-on-primary font-bold py-3 px-6 rounded-xl self-end disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors uppercase tracking-widest text-xs"
            >
              {isUpdating ? 'Saving...' : 'Save Link'}
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[2rem] border border-outline-variant/10 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Link Information</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                Changing the Realm link updates the destination for the "Join the Realm" button on the homepage for all users in real-time. Ensure the link provided is valid and accessible.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RealmLink;
