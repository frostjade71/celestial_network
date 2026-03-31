
import { motion } from 'framer-motion';

const MEMBERS = [
  {
    name: 'StarGazer_23',
    role: 'OG MEMBER',
    roleColor: 'text-secondary',
    status: 'bg-green-500',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbaQD4YXDYhyQFoDiIsu4w2v8aOBh9PM0A8g2rKSJ-saJQyZ6Khyky0O2oKsM7280wDAEHuubhG9nm2EbDxCREuyr9aRgLyoyesQlRCS-uNXedJXIAWTpEEtluTdQBT7zwyWmCimfBfPynneGoqtAkaHcSyhbBb27AjAnWljRl8aKV3AkmbuSrwRS8QQYVxffy9giucLjq5bj9-rfGqesTGi10ju5Pbxv25_Ne_rhZBTzNXSzM6JSnq3ZkDwgGBpAS-LpuWrKVXj31'
  },
  {
    name: 'NovaPulse',
    role: 'BOOSTER',
    roleColor: 'text-primary-container',
    status: 'bg-green-500',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSfGf1EI_e5Gg8CgzIWar2Eq3XzZOcDVlG0Vi4Akceh__zekebwXMk_XmijD3k_nfDgkmNDMNpUhtI0psQ8FqD_UJpVw9C9Xx7J8f42hkTVsEBI9rAn-WceGWgxIQi2wNi-EZo-Lwm03xEszGWofLvOqwtfAZxONyTCEdIZ5HweHu7hwolEnQ6yN_bgDz2DMwIfeqZjvpTJ0UcalIdB3P6-6ImWrXMqE5ahcu0ghP6elGGk3XMFmpty1Kd4DpkSROpBENNQh8evwzw'
  },
  {
    name: 'NebulaQueen',
    role: 'VIP',
    roleColor: 'text-tertiary-container',
    status: 'bg-orange-500',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDppE0E8-h_Eghg-x38VgNMQ60dlKPwlTdTtsyKTl0Qp3PtByXAoROUvqCuSMAR5eELITjSmZHGkURKe0iLGIHzi7odfWqHTJRgqoroNrzTBSCo--kYZCLfaGXy6a22SCWyMI74MW1mrfyMG8oZqvoOnp9_V-J3xNX-HUcGdT7Kp2PLZtSRSjX7OHufFO8YzJ4cbmF4YBMor1XWYQ_AGHOzWOOM4Zx-g0NGZxHUku-dueCD-5sbeOUYOsPECvbTcL81rFCnXZfooULO'
  },
  {
    name: 'CosmicKid',
    role: 'MEMBER',
    roleColor: 'text-on-surface-variant',
    status: 'bg-green-500',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA70BnG-7BmOEK2rrcBKcEaSqnPZ8xYciXNSJOnqdsfpgAnapsopi3g35izFbe45C-eiJVV4dy5nv482mS1zCSdI18YF73oGqFwzoQ8BlUolJfxqlN02PIMgDGd4UWwgRFB9sjIhZbUMHs7EXRbsFJKDJ2RjK6hBVGch1QyQsDuaj6jVjRbQHdVODwGVZxThDVdHd8kP8qgG9djjOEMJdWb8WpOyVyCRACLPYYYOJOemwRPeWYIzDd83R5b7X9j35BFpgylOpPQGKUf'
  },
  {
    name: 'VoidWalker',
    role: 'MEMBER',
    roleColor: 'text-on-surface-variant',
    status: 'bg-gray-500',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo6OEQz5-RjZysu3r3Jn8_3UHPTCX5JCUIXzwjbNjsxxjcuMIEzoox8gGjpcceUwD54NbMWAYOfA2U4smQJA-n0dI4rhzfTJKcW4LiQrSbMVTCvJKnwsHtFUj-uB-wnVw2FK9IFML1WdUWT8APhb71Tb8SPruxF4T6-HN7kifib3H0xr1Hlk1R-tH2tZbD2VQ3d-1lS2Ael95qjJIIouJxMAyG4C08V31bg4WWz1wrYldaxz-J4l92jRQMiRTfCC1Raf2LnKE9lpGM'
  },
  {
    name: 'SolarFlare',
    role: 'OG MEMBER',
    roleColor: 'text-secondary',
    status: 'bg-green-500',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi5e0YasvtpzT5beYRN5WhzfTswTd4mTPlfSv5pWOsA1_eK92_wQZtZhJkAuxezZhTzJNOVYS8zlJtlRwcrFOn3qSmflA-av7Iai9El6I2jYkFuGg7EqcyC6q8AyIwaCTyjGDiq3UbcswFNFM3zsUpGyJBr0_agapKu3KEmz0bora71nPZCjFJvjbWMzuXv2nI4_cKHsmR1wMw5T1dfAcmYl_-JxHOseX3LV-wgHMAp0_n5cMhRNNaRwKVu-gtQW3BQPIKlqkY-G_l'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 150, damping: 15 }
  },
};

export default function Members() {
  return (
    <section className="space-y-10 py-10" id="members">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet the Explorers</h2>
        <p className="text-sm text-on-surface-variant mt-2 font-light">The vibrant souls that keep the network alive and glowing.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {MEMBERS.map((member) => (
          <motion.div 
            key={member.name}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-surface-container-low p-6 rounded-2xl text-center group border border-transparent hover:border-primary-container/20 transition-all cursor-default shadow-sm hover:shadow-md"
          >
            <div className="relative w-20 h-20 mx-auto mb-4">
              <motion.img 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                alt={member.name} 
                className="w-full h-full rounded-full bg-surface-container-high object-cover ring-2 ring-primary-container/10 group-hover:ring-primary-container/30 transition-all shadow-inner" 
                src={member.avatar} 
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute bottom-1 right-1 w-5 h-5 ${member.status} border-[3px] border-surface-container-low rounded-full shadow-sm`}
              ></motion.div>
            </div>
            <h5 className="font-bold text-on-surface text-sm mb-1 group-hover:text-primary transition-colors">{member.name}</h5>
            <span className={`text-[9px] uppercase font-black ${member.roleColor} tracking-widest`}>{member.role}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
