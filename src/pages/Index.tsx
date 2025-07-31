
import { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import Navbar from "../components/Navbar";
import ContactCard from "../components/ContactCard";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
const Index = () => {
  const [showContact, setShowContact] = useState(false);

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

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Slideshow */}
      <Slideshow />
      
      {/* Navbar */}
      <Navbar />
      
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
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
