import { memo } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  },
};

const steps = [
  {
    num: '01',
    title: 'Invite',
    desc: 'Click any of the join buttons or use our vanity URL to enter the atmosphere of the Celestial Network.'
  },
  {
    num: '02',
    title: 'Rules',
    desc: 'Head to the #rules channel and accept our server protocol to ensure a peaceful flight for all members.'
  },
  {
    num: '03',
    title: 'Introduce',
    desc: "Say hello in #general and tell us your favorite star system. You're now part of the crew!"
  }
];

const JoinInfo = memo(function JoinInfo() {
  return (
    <section className="space-y-12 py-10" id="join-info">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">How to Join</h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-1 bg-primary-container mx-auto mt-3 rounded-full"
        ></motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative"
      >
        {steps.map((step, index) => (
          <motion.div 
            key={step.num}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`bg-surface-container-low p-5 md:p-8 rounded-2xl border-l-4 border-primary-container/30 hover:border-primary-container transition-colors shadow-lg cursor-default group ${index === 2 ? 'col-span-2 md:col-span-1 max-w-md mx-auto w-full' : ''}`}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-primary-container/20 text-primary-container rounded-xl flex items-center justify-center mb-4 md:mb-6 font-headline font-black text-xl md:text-2xl group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300"
            >
              {step.num}
            </motion.div>
            <h3 className="text-lg md:text-2xl font-headline font-bold mb-2 md:mb-4 text-on-surface">{step.title}</h3>
            <p className="text-xs md:text-base text-on-surface-variant leading-relaxed font-light">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

export default JoinInfo;
