import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";
import { useTheme } from './hooks/useTheme.ts';
import { useStatus } from './context/StatusContext.tsx';
import Navbar from './components/layout/Navbar.tsx';
import Footer from './components/layout/Footer.tsx';
import BottomTabs from './components/layout/BottomTabs.tsx';
import BackToTop from './components/layout/BackToTop.tsx';
import Hero from './components/sections/Hero.tsx';
import WhyJoin from './components/sections/WhyJoin.tsx';
import BeforeJoining from './components/sections/BeforeJoining.tsx';
import VoiceChannels from './components/sections/VoiceChannels.tsx';
import Members from './components/sections/Members.tsx';
import Rules from './components/sections/Rules.tsx';
import FAQ from './components/sections/FAQ.tsx';
import Staff from './components/sections/Staff.tsx';
import OnlineStats from './components/sections/OnlineStats.tsx';
import Appeal from './components/sections/Appeal.tsx';
import SoonModal from './components/layout/SoonModal.tsx';
import AdminLoginModal from './components/layout/AdminLoginModal.tsx';
import MaintenanceMode from './components/layout/MaintenanceMode.tsx';
import ScrollToTop from './components/layout/ScrollToTop.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import Staffs from './pages/Staffs.tsx';
import { DiscordProvider } from './context/DiscordContext.tsx';

interface MainSiteProps {
  onStaffClick: () => void;
}

function MainSite({ onStaffClick }: MainSiteProps) {
  const { status } = useStatus();
  const isOnline = status === 'online';

  return (
    <>
      <Navbar onStaffClick={onStaffClick} />
      <BottomTabs onStaffClick={onStaffClick} />
      
      {/* Maintenance Overlay */}
      {!isOnline && <MaintenanceMode status={status} />}

      <motion.div
        animate={{ filter: isOnline ? 'blur(0px)' : 'blur(10px)' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen w-full overflow-x-hidden relative"
      >
        <Hero />
        <main className="max-w-screen-2xl mx-auto px-6 md:px-8 space-y-32 py-32 w-full">
          <WhyJoin />
          <BeforeJoining />
          <VoiceChannels />
          <Members />
          <Staff />
          <OnlineStats />
          <Appeal />
          <Rules />
          <FAQ />
        </main>
        <Footer />
        <BackToTop />
      </motion.div>
    </>
  );
}

function App() {
  const { theme } = useTheme();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <DiscordProvider>
      <Toaster position="bottom-right" richColors theme={theme === 'dark' ? 'dark' : 'light'} />
      <Analytics />
      <ScrollToTop />
      
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/staffs" element={<Staffs />} />
        <Route path="*" element={<MainSite onStaffClick={() => setIsAdminModalOpen(true)} />} />
      </Routes>

      <AdminLoginModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
      <SoonModal />
    </DiscordProvider>
  );
}

export default App;
