
import { motion } from 'framer-motion';

const RULES = [
  {
    num: '01',
    title: 'Be Respectful',
    desc: 'Treat everyone with cosmic kindness. No harassment or hate speech.'
  },
  {
    num: '02',
    title: 'No Spamming',
    desc: 'Avoid excessive pings, emoji walls, or repeating messages.'
  },
  {
    num: '03',
    title: 'Keep it Safe',
    desc: 'No NSFW content or illegal links in any of the channels.'
  },
  {
    num: '04',
    title: 'Stay On-Topic',
    desc: 'Use the designated channels for their intended purposes.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  },
};

export default function Rules() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-surface-container-low p-10 rounded-3xl border border-primary-container/10 shadow-xl" 
      id="rules"
    >
      <h2 className="text-3xl md:text-4xl font-headline font-black mb-12 text-center uppercase tracking-tighter text-on-surface">Server Protocols</h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
      >
        {RULES.map((rule) => (
          <motion.div 
            key={rule.num}
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="flex gap-6 items-start group"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500 text-on-primary flex items-center justify-center font-black text-sm shadow-lg shadow-orange-500/20"
            >
              {rule.num}
            </motion.div>
            <div>
              <h4 className="text-xl font-headline font-bold mb-1 text-on-surface group-hover:text-primary transition-colors">{rule.title}</h4>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">{rule.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
