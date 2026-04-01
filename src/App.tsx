import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";
import { useTheme } from './hooks/useTheme.ts';
import Navbar from './components/layout/Navbar.tsx';
import Footer from './components/layout/Footer.tsx';
import BottomTabs from './components/layout/BottomTabs.tsx';
import BackToTop from './components/layout/BackToTop.tsx';
import Hero from './components/sections/Hero.tsx';
import JoinInfo from './components/sections/JoinInfo.tsx';
import WhyJoin from './components/sections/WhyJoin.tsx';
import BeforeJoining from './components/sections/BeforeJoining.tsx';
import VoiceChannels from './components/sections/VoiceChannels.tsx';
import Members from './components/sections/Members.tsx';
import Rules from './components/sections/Rules.tsx';
import FAQ from './components/sections/FAQ.tsx';
import Staff from './components/sections/Staff.tsx';
import OnlineStats from './components/sections/OnlineStats.tsx';
import SoonModal from './components/layout/SoonModal.tsx';
import { DiscordProvider } from './context/DiscordContext.tsx';

function App() {
  const { theme } = useTheme();

  return (
    <DiscordProvider>
      <Toaster position="bottom-right" richColors theme={theme === 'dark' ? 'dark' : 'light'} />
      <Analytics />
      <Navbar />
      <BottomTabs />

      <Hero />
      
      <main className="max-w-screen-2xl mx-auto px-8 space-y-32 py-32">
        <JoinInfo />
        <WhyJoin />
        <BeforeJoining />
        <VoiceChannels />
        <Members />
        <Staff />
        <OnlineStats />
        <Rules />
        <FAQ />
      </main>

      <Footer />
      <BackToTop />
      <SoonModal />
    </DiscordProvider>
  );
}

export default App;
