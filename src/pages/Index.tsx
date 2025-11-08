import { useEffect, useState } from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { PopupModal } from '@/shared/components/PopupModal';
import { HeroSection } from '@/features/home/HeroSection';
import { AboutSection } from '@/features/home/AboutSection';
import { ServicesSection } from '@/features/home/ServicesSection';
import { DestinationsSection } from '@/features/home/DestinationsSection';
import { TeamSection } from '@/features/home/TeamSection';
import { ContactSection } from '@/features/home/ContactSection';

const POPUP_SEEN_KEY = 'popup_seen';

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been seen in this session
    const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_KEY);
    
    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePopupClose = (open: boolean) => {
    setShowPopup(open);
    if (!open) {
      // Mark popup as seen for this session
      sessionStorage.setItem(POPUP_SEEN_KEY, 'true');
    }
  };

  // Function to trigger popup (can be called from Navbar)
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onHomeClick={handleShowPopup} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DestinationsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      
      <PopupModal open={showPopup} onOpenChange={handlePopupClose} />
    </div>
  );
};

export default Index;
