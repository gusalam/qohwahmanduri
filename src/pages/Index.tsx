import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductsSection from '@/components/sections/ProductsSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ServingSection from '@/components/sections/ServingSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/sections/Footer';
import Preloader from '@/components/Preloader';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session
    const visited = sessionStorage.getItem('qohwah-visited');
    if (visited) {
      setShowPreloader(false);
      setHasVisited(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    sessionStorage.setItem('qohwah-visited', 'true');
  };

  return (
    <>
      {showPreloader && !hasVisited && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <main className="overflow-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <BenefitsSection />
        <ServingSection />
        <TestimonialsSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
