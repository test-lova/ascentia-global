import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { HeroSection } from '@/features/home/HeroSection';
import { AboutSection } from '@/features/home/AboutSection';
import { ServicesSection } from '@/features/home/ServicesSection';
import { DestinationsSection } from '@/features/home/DestinationsSection';
import { TeamSection } from '@/features/home/TeamSection';
import { ContactSection } from '@/features/home/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DestinationsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
