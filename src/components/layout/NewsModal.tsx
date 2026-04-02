import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllNews } from '../../lib/news';
import type { NewsItem } from '../../types';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchNews = async () => {
        try {
          const allNews = await getAllNews(true); // Fetch published news only
          setNews(allNews);
        } catch (error) {
          console.error('Failed to fetch news history:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNews();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-surface-container-high/90 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 md:p-8 pb-4 flex justify-between items-center bg-gradient-to-b from-surface to-transparent">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="material-symbols-outlined text-2xl md:text-4xl text-primary font-light">newspaper</span>
              <h2 className="text-xl md:text-3xl font-headline font-black text-on-surface uppercase tracking-tight">Celestial News</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-all"
            >
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">close</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto px-8 pt-4 pb-12 custom-scrollbar">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Retrieving logs...</p>
              </div>
            ) : news.length === 0 ? (
              <div className="py-20 text-center opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">cloud_off</span>
                <p className="text-sm font-bold uppercase tracking-widest">No archives found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {news.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex gap-4 pt-1.5">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/50 group-hover:scale-150 transition-all duration-300" />
                        <div className="flex-grow w-[1px] bg-gradient-to-b from-primary/50 via-outline-variant/10 to-transparent mt-2" />
                      </div>
                      
                      {/* News Card */}
                      <div className="flex-grow pb-8">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                           <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest">
                            {item.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                           </span>
                           <div className="h-[1px] w-6 md:w-8 bg-primary/20" />
                        </div>
                        <h3 className="text-lg md:text-xl font-headline font-black text-on-surface uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="bg-surface-container-low/40 p-4 md:p-5 rounded-2xl border border-outline-variant/5 text-xs md:text-sm text-on-surface-variant font-light leading-relaxed group-hover:border-primary/20 transition-all whitespace-pre-wrap">
                          {item.content.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
                            if (part.match(/(https?:\/\/[^\s]+)/g)) {
                              return (
                                <a 
                                  key={i} 
                                  href={part} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-primary hover:underline underline-offset-4 decoration-primary/30 font-bold transition-all break-all"
                                >
                                  {part}
                                </a>
                              );
                            }
                            return part;
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary-rgb), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary-rgb), 0.2);
        }
      `}</style>
    </AnimatePresence>
  );
};

export default NewsModal;
