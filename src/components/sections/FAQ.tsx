import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Is there an application for Staff?",
    answer: "Staff applications open seasonally. Keep an eye on the #announcements channel for the cosmic application link."
  },
  {
    question: "How can I support the server?",
    answer: "You can support us by boosting our Discord server, being active in chats, and participating in our weekly interstellar events!"
  },
  {
    question: "What makes Celestial Network unique?",
    answer: "We offer a premium, space-themed experience with a mature community, custom curated events, dedicated active voice hubs, and stellar aesthetics."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-2xl mx-auto space-y-10 py-10" id="faq">
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-headline font-black text-center uppercase tracking-tighter text-on-surface"
      >
        Frequently Asked
      </motion.h2>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/5 hover:border-primary/20 transition-colors shadow-sm"
          >
            <button 
              className="w-full text-left p-5 md:p-6 flex justify-between items-center group transition-all"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <h4 className={`font-bold text-base transition-colors duration-300 ${openIndex === idx ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                {faq.question}
              </h4>
              <motion.span 
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                className="material-symbols-outlined text-primary-container"
              >
                expand_more
              </motion.span>
            </button>
            
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 text-on-surface-variant text-sm md:text-base font-light leading-relaxed border-t border-outline-variant/10 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
