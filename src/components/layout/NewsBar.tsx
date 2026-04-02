import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getLatestNews } from '../../lib/news';
import type { NewsItem } from '../../types';

interface NewsBarProps {
  onSeeMore: () => void;
}

const NewsBar: React.FC<NewsBarProps> = ({ onSeeMore }) => {
  const [latestNews, setLatestNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await getLatestNews();
        setLatestNews(news);
      } catch (error) {
        console.error('Failed to fetch latest news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !latestNews) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full bg-primary/5 backdrop-blur-md border-b border-primary/10 py-2 overflow-hidden relative z-[150]"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 flex items-center gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <span className="material-symbols-outlined text-[14px] text-primary animate-pulse">campaign</span>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest hidden xs:inline">Latest Intel</span>
        </div>

        {/* Marquee Container */}
        <div className="flex-grow overflow-hidden flex items-center relative h-6">
          <div className="marquee-container flex items-center gap-4 whitespace-nowrap">
            <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex items-center whitespace-nowrap"
            >
              <div className="flex items-center gap-3 pr-12">
                <span className="text-xs font-bold text-on-surface uppercase tracking-tight">{latestNews.title}:</span>
                <span className="text-xs font-light text-on-surface-variant italic">{latestNews.content}</span>
              </div>
              {/* Duplicated for seamless loop */}
              <div className="flex items-center gap-3 pr-12">
                <span className="text-xs font-bold text-on-surface uppercase tracking-tight">{latestNews.title}:</span>
                <span className="text-xs font-light text-on-surface-variant italic">{latestNews.content}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onSeeMore}
          className="flex-shrink-0 flex items-center gap-1 px-2.5 py-0.5 bg-primary text-on-primary rounded-full text-[8.5px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          See More
          <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
        </button>
      </div>

      <style>{`
        .marquee-container {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </motion.div>
  );
};

export default NewsBar;
