
import { useEffect, useState } from "react";
import HeroContent from "../components/HeroContent";
import Navbar from "../components/Navbar";
import ContactCard from "../components/ContactCard";
import Footer from "../components/Footer";
import { HeartToggleButton } from "../components/HeartToggleButton";
const Index = () => {
  const [showContact, setShowContact] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);

  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset any body classes that might have been set by other pages
    document.body.className = '';
    
    // Delay showing the contact card
    const contactTimer = setTimeout(() => {
      setShowContact(true);
    }, 1000);

    return () => {
      clearTimeout(contactTimer);
    };
  }, []);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Slideshow moved to App.tsx */}
      
      {/* Navbar */}
      <Navbar />
      
      {/* Heart Toggle Button */}
      <HeartToggleButton 
        onToggle={toggleContentVisibility}
        isContentVisible={isContentVisible}
      />
      
      {/* Conditionally rendered content */}
      {isContentVisible && (
        <>
          {/* Hero Section - Added more top padding to create space between navbar and content */}
          <section className="container relative flex-1 pt-32 sm:pt-36 md:pt-40 pb-8 flex flex-col justify-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left column with hero content */}
              <div className="mb-8 md:mb-0">
                <HeroContent />
              </div>
              
              {/* Right column with contact card */}
              <div className="flex flex-col items-end gap-6">
                <div className={`w-full max-w-xs ml-auto transition-all duration-700 ${
                  showContact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <ContactCard />
                </div>
              </div>
            </div>
            
            {/* Acknowledgement of Country */}
            <div className="mt-16 max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Acknowledgement of Country</h2>
              <p className="text-white text-justify leading-relaxed">
                Bridgehill Group would like to pay our respect and acknowledge the Traditional Custodians 
                of Dharawal Country. We pay our respect to Elders past, present and those emerging. 
                Bridgehill Group would also like to extend our respect to Aboriginal and Torres Strait 
                Islander people.
              </p>
            </div>
          </section>
          
          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  );
};

export default Index;
