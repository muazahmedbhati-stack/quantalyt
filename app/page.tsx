'use client';

import Preloader from '@/components/ui/Preloader';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import MarqueeTicker from '@/components/ui/MarqueeTicker';
import TextScrubSection from '@/components/sections/TextScrubSection';
import ServicesStack from '@/components/sections/ServicesStack';
import VoiceAgentDemo from '@/components/sections/VoiceAgentDemo';
import RoiCalculator from '@/components/sections/RoiCalculator';
import UsClientsProof from '@/components/sections/UsClientsProof';
import HowItWorks from '@/components/sections/HowItWorks';
import Portfolio from '@/components/sections/Portfolio';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import QuickActionBar from '@/components/ui/QuickActionBar';
import ChatWidget from '@/components/chatbot/ChatWidget';

export default function HomePage() {
  const triggerChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-quantalyt-chat'));
    }
  };

  return (
    <main className="bg-[#06070B] min-h-screen text-[#E8EDF5] overflow-x-hidden selection:bg-primary/40 selection:text-white relative">
      {/* Top Fixed Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* High-Tech Initialization Preloader */}
      <Preloader />

      {/* Global Navigation */}
      <Navbar />

      {/* Hero with Scroll-Linked 3D Rotation & Parallax */}
      <Hero />

      {/* Double Infinite Marquee */}
      <MarqueeTicker />

      {/* Scroll-Driven Text Scrub / Word Illuminator */}
      <TextScrubSection />

      {/* Scroll-Stacked Sticky Services Cards */}
      <ServicesStack />

      {/* Interactive AI Voice Telephony Simulator */}
      <VoiceAgentDemo />

      {/* Executive ROI & Dollar Savings Estimator */}
      <RoiCalculator />

      {/* US Enterprise Standards & Timezone Overlap */}
      <UsClientsProof />

      {/* Scroll-Linked Laser Roadmap */}
      <HowItWorks />

      {/* US Enterprise Case Studies */}
      <Portfolio />

      {/* Transparent Fixed-Scope Pricing */}
      <Pricing />

      {/* Direct Call Hotline (03397444694) & Scope Intake */}
      <Contact />

      {/* Global Footer */}
      <Footer />

      {/* Floating Quick Action Dock */}
      <QuickActionBar onOpenChat={triggerChat} />

      {/* NVIDIA DeepSeek-R1 AI Assistant */}
      <ChatWidget />
    </main>
  );
}
