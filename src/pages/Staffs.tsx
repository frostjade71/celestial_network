import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged, type User, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, firebaseConfig } from '../lib/firebase';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

interface StaffRegistryEntry {
  id: string;
  email: string;
  uid: string;
  role: string;
  createdAt: any;
}

const Staffs: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [staffList, setStaffList] = useState<StaffRegistryEntry[]>([]);
  const [editingStaff, setEditingStaff] = useState<StaffRegistryEntry | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  // Authentication Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch Staff List
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'staff_registry'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: StaffRegistryEntry[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as StaffRegistryEntry));
      setStaffList(list);
    });
    return () => unsubscribe();
  }, [user]);

  // Handle Staff Creation
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setIsCreating(true);
    try {
      // Initialize a secondary app to avoid logging out the current admin
      const secondaryAppName = 'SecondaryAuth';
      let secondaryApp;
      if (getApps().some(app => app.name === secondaryAppName)) {
        secondaryApp = getApp(secondaryAppName);
      } else {
        secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
      }
      const secondaryAuth = getAuth(secondaryApp);

      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const newUser = userCredential.user;

      // Register in Firestore Registry
      await setDoc(doc(db, 'staff_registry', newUser.uid), {
        uid: newUser.uid,
        email: email,
        role: 'Admin',
        createdAt: serverTimestamp()
      });
      
      toast.success(`Admin access granted for ${email}.`);
      setEmail('');
      setPassword('');
      
      await secondaryAuth.signOut();
    } catch (error: any) {
      console.error('Staff Creation Error:', error);
      toast.error(error.message || 'Failed to add admin.');
    } finally {
      setIsCreating(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (window.confirm('Executing Deauthorization Protocol: Are you sure you want to revoke this personnel access?')) {
      try {
        await deleteDoc(doc(db, 'staff_registry', id));
        toast.success('Personnel record removed.');
      } catch (error: any) {
        toast.error('Failed to remove personnel.');
      }
    }
  };

  // Handle Edit Update
  const handleUpdate = async () => {
    if (!editingStaff) return;
    try {
      await updateDoc(doc(db, 'staff_registry', editingStaff.id), {
        email: editEmail
      });
      toast.success('Personnel credentials updated.');
      setEditingStaff(null);
    } catch (error: any) {
      toast.error('Failed to update personnel.');
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async () => {
    if (!editingStaff) return;
    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, editingStaff.email);
      toast.success('Recovery email sent.');
    } catch (error: any) {
      toast.error('Failed to dispatch recovery link.');
    } finally {
      setIsResetting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0502] text-on-surface flex flex-col relative overflow-hidden">
      {/* Branded Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          className="w-full h-full object-cover opacity-10" 
          alt="Staff Background" 
          src="/Rose%20Red%20Crow.gif"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-surface"></div>
      </motion.div>

      {/* Global Navbar */}
      <nav className="sticky top-0 w-full z-[100] bg-surface/70 backdrop-blur-xl border-b border-outline-variant/10 shadow-2xl">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-lg md:text-xl font-black flex items-center gap-2 md:gap-3 font-headline tracking-tighter hover:opacity-80 transition-opacity">
              <img src="/favicon/favicon.svg" alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
              <span className="hidden xs:inline uppercase">Staff Management</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
             <Link 
              to="/admin"
              className="px-2.5 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded-full text-[9px] md:text-[10px] font-bold transition-all border border-primary/20 uppercase tracking-widest flex items-center gap-1.5 md:gap-2"
            >
              <span className="material-symbols-outlined text-[12px] md:text-[14px]">arrow_back</span>
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-grow max-w-5xl w-full mx-auto px-6 py-8 md:py-24 space-y-16 md:space-y-24">
        {/* Hero Section: Add Staff */}
        <section>
          <header className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl md:text-5xl font-headline font-black text-on-surface tracking-tighter uppercase mb-4">
                Add New <span className="text-primary italic">Admin</span>
              </h1>
              <p className="text-on-surface-variant font-light text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Expand the network oversight team. New admins will have full access after registry confirmation.
              </p>
            </motion.div>
          </header>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-surface-container-high/40 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] border border-outline-variant/10 p-6 md:p-12 shadow-2xl relative overflow-hidden max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <form onSubmit={handleAddStaff} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-on-surface-variant mb-2 ml-4 uppercase tracking-widest">Administrative Email</label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40 group-focus-within:text-primary transition-colors text-[20px]">alternate_email</span>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-highest/20 border border-outline-variant/20 rounded-3xl pl-14 pr-6 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-light"
                      placeholder="personnel@celestial.net"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-on-surface-variant mb-2 ml-4 uppercase tracking-widest">Access Key (Password)</label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40 group-focus-within:text-primary transition-colors text-[20px]">key</span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface-container-highest/20 border border-outline-variant/20 rounded-2xl md:rounded-3xl pl-14 pr-14 py-3 md:py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-light text-sm"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  <p className="text-[9px] text-on-surface-variant/60 mt-3 ml-4">Min. 6 encrypted characters required for system safety.</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isCreating}
                className="w-full bg-primary text-on-primary py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-headline font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 transition-all text-[11px] md:text-xs"
              >
                {isCreating ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">person_add</span>
                    Add Account
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </section>

        {/* Authorized Personnel Table Section */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-xl md:text-3xl font-headline font-black text-on-surface tracking-tighter uppercase">
                Staff <span className="text-primary italic">Registry</span>
              </h2>
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1.5 opacity-50">Total Personnel</span>
              <span className="text-xl md:text-3xl font-headline font-black text-primary tabular-nums">{staffList.length}</span>
            </div>
          </div>

          <div className="bg-surface-container-high/20 backdrop-blur-3xl rounded-[1.5rem] md:rounded-[3rem] border border-outline-variant/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30 border-b border-outline-variant/10">
                    <th className="px-4 md:px-8 py-4 md:py-6 text-left text-[9px] md:text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Personnel</th>
                    <th className="px-4 md:px-8 py-4 md:py-6 text-left text-[9px] md:text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Rank</th>
                    <th className="px-4 md:px-8 py-4 md:py-6 text-left text-[9px] md:text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hidden sm:table-cell">Authorization Date</th>
                    <th className="px-4 md:px-8 py-4 md:py-6 text-right text-[9px] md:text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <AnimatePresence>
                    {staffList.map((staff, index) => (
                      <motion.tr 
                        key={staff.uid}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-4 md:px-8 py-4 md:py-6">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-headline font-black group-hover:bg-primary group-hover:text-on-primary transition-all text-xs md:text-sm">
                              {staff.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-[13px] md:text-sm font-bold text-on-surface whitespace-nowrap">{staff.email}</p>
                              <p className="text-[9px] md:text-[10px] text-on-surface-variant/60 font-mono tracking-tighter uppercase tabular-nums">UID: {staff.uid.substring(0, 8)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6">
                          <span className="inline-block px-2 md:px-3 py-1 rounded-full bg-surface-container-highest/50 border border-outline-variant/10 text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest">
                            {staff.role}
                          </span>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 hidden sm:table-cell">
                          <span className="text-[11px] md:text-xs text-on-surface-variant/80 font-light">
                            {staff.createdAt?.toDate ? staff.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Initializing...'}
                          </span>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6">
                          <div className="flex items-center justify-end gap-3">
                            <button 
                              onClick={() => {
                                setEditingStaff(staff);
                                setEditEmail(staff.email);
                              }}
                              className="p-2 hover:bg-primary/10 text-on-surface-variant hover:text-primary rounded-xl transition-all"
                              title="Modify Credentials"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit_note</span>
                            </button>
                            <button 
                              onClick={() => handleDelete(staff.id)}
                              className="p-2 hover:bg-error/10 text-on-surface-variant hover:text-error rounded-xl transition-all"
                              title="Revoke Access"
                            >
                              <span className="material-symbols-outlined text-[18px]">person_remove</span>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {staffList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant/20 mb-4 block">security_update_warning</span>
                        <p className="text-on-surface-variant text-sm font-light italic">No personnel found in the active registry.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Informational Footer */}
        <p className="text-center text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center justify-center gap-2 pb-12">
          <span className="material-symbols-outlined text-[12px]">verified_user</span>
          Global System Authorization Registry
        </p>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingStaff && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingStaff(null)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-surface-container-high/60 backdrop-blur-3xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="text-center mb-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">admin_panel_settings</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black font-headline text-on-surface tracking-tighter uppercase">Edit <span className="text-primary italic">Credentials</span></h3>
                <p className="text-on-surface-variant text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-2">Personal Personnel Modification</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-on-surface-variant mb-3 ml-2 uppercase tracking-widest">Update Email</label>
                  <input 
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-surface-container-highest/20 border border-outline-variant/30 rounded-2xl px-6 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light text-sm"
                    placeholder="New Email"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] font-black text-on-surface-variant mb-3 ml-2 uppercase tracking-widest">Security Action</label>
                  <button 
                    onClick={handlePasswordReset}
                    disabled={isResetting}
                    className="w-full px-6 py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isResetting ? (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="material-symbols-outlined text-[14px]">lock_reset</span>
                    )}
                    Dispatch Recovery Email
                  </button>
                  <p className="text-[9px] text-on-surface-variant/40 mt-3 text-center uppercase tracking-widest">Secured by Firebase Protocol</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setEditingStaff(null)}
                    className="flex-1 px-6 py-4 bg-surface-container-highest/20 text-on-surface-variant rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpdate}
                    className="flex-1 px-6 py-4 bg-primary text-on-primary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Staffs;

