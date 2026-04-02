import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  addNews, 
  updateNews, 
  deleteNews, 
  getAllNews 
} from '../lib/news';
import type { NewsItem } from '../types';

const NewsManagement: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', isPublished: true });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) navigate('/');
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const allNews = await getAllNews();
      setNews(allNews);
    } catch (error) {
      toast.error('Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchNews();
  }, [user]);

  const handleOpenModal = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item);
      setFormData({ title: item.title, content: item.content, isPublished: item.isPublished });
    } else {
      setEditingNews(null);
      setFormData({ title: '', content: '', isPublished: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.warning('Please fill in all mission details.');
      return;
    }

    try {
      if (editingNews) {
        await updateNews(editingNews.id, formData);
        toast.success('News Updated.');
      } else {
        await addNews(formData);
        toast.success('News Published.');
      }
      fetchNews();
      handleCloseModal();
    } catch (error) {
      toast.error('Protocol failure: Critical update error.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Terminate this transmission? Action cannot be undone.')) {
      try {
        await deleteNews(id);
        toast.success('News Removed.');
        fetchNews();
      } catch (error) {
        toast.error('Delete Failed.');
      }
    }
  };

  const togglePublished = async (item: NewsItem) => {
    try {
      await updateNews(item.id, { isPublished: !item.isPublished });
      toast.success(item.isPublished ? 'News Taken Offline.' : 'News Published.');
      fetchNews();
    } catch (error) {
      toast.error('Update Failed.');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0502] text-on-surface flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          className="w-full h-full object-cover" 
          alt="Staff Admin Background" 
          src="/Rose%20Red%20Crow.gif"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-surface"></div>
      </div>

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
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-8 md:mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl md:text-6xl font-headline font-black text-on-surface tracking-tighter uppercase mb-2 md:mb-4">
              News <span className="text-primary italic">Terminal</span>
            </h1>
            <p className="text-on-surface-variant font-light text-sm md:text-lg">
              Manage news broadcasts across the website network.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-primary text-on-primary rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-primary/20 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-sm md:text-base">add_comment</span>
            Add News
          </motion.button>
        </header>

        {/* News Table/Grid */}
        <div className="bg-surface-container-high/20 backdrop-blur-2xl rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em]">Decoding News Feed...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="py-24 text-center opacity-30">
              <span className="material-symbols-outlined text-7xl mb-4">wifi_off</span>
              <p className="text-lg font-headline font-black uppercase tracking-tighter">No transmissions detected.</p>
            </div>
          ) : (
            <div className="overflow-x-auto md:no-scrollbar">
              <table className="w-full text-left border-collapse">
                 <thead>
                  <tr className="bg-surface/50 border-b border-outline-variant/10">
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant">Status</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant">News Title</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant">Timestamp</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-on-surface-variant text-right">Directives</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => togglePublished(item)}
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                            item.isPublished 
                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/10' 
                            : 'bg-outline-variant/10 text-on-surface-variant border border-outline-variant/20 grayscale'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl italic">{item.isPublished ? 'online_prediction' : 'do_not_disturb_on'}</span>
                        </button>
                      </td>
                      <td className="px-8 py-6">
                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                            <p className="text-[13px] md:text-sm font-bold text-on-surface whitespace-nowrap">{item.title}</p>
                            <span className="hidden md:inline text-on-surface-variant/20">|</span>
                            <p className="text-[10px] md:text-xs font-light text-on-surface-variant/60 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] md:max-w-[180px]">
                              {item.content}
                            </p>
                          </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-semibold text-on-surface-variant bg-surface-container/50 px-2.5 py-1 rounded-full">{item.createdAt?.toDate().toLocaleDateString()}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenModal(item)}
                            className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all border border-primary/20"
                          >
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="w-10 h-10 rounded-2xl bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-on-error transition-all border border-error/20"
                          >
                            <span className="material-symbols-outlined text-xl">delete_forever</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal */}
       <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-high border border-outline-variant/30 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-headline font-black uppercase tracking-tighter shadow-primary-container/20">
                  {editingNews ? 'Edit News' : 'Add News'}
                </h2>
                <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">News Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-surface-container-dark/50 border border-outline-variant/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 text-sm font-bold placeholder:opacity-20"
                    placeholder="Enter news title..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary">Edit Content</label>
                  <textarea
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-surface-container-dark/50 border border-outline-variant/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 text-sm font-light placeholder:opacity-20 leading-relaxed custom-scrollbar"
                    placeholder="Enter news content..."
                  />
                </div>

                <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <input 
                    id="published" 
                    type="checkbox" 
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="w-5 h-5 rounded-lg border-primary/20 accent-primary"
                  />
                  <label htmlFor="published" className="text-xs font-bold uppercase tracking-widest text-on-surface select-none">Broadcast</label>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-primary text-on-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  {editingNews ? 'Update News' : 'Publish News'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsManagement;
