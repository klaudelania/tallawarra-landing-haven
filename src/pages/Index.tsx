
import { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import Navbar from "../components/Navbar";
import ContactCard from "../components/ContactCard";
import HeroContent from "../components/HeroContent";
import CalendarWidget from "../components/CalendarWidget";

const Index = () => {
  const [showContact, setShowContact] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Delay showing the contact card and calendar widget
    const contactTimer = setTimeout(() => {
      setShowContact(true);
    }, 1000);
    
    const calendarTimer = setTimeout(() => {
      setShowCalendar(true);
    }, 1500);

    return () => {
      clearTimeout(contactTimer);
      clearTimeout(calendarTimer);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Background Slideshow */}
      <Slideshow />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section - Added more top padding to create space between navbar and content */}
      <section className="container relative min-h-screen pt-32 sm:pt-36 md:pt-40 pb-20 flex flex-col justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left column with hero content */}
          <div className="mb-8 md:mb-0">
            <HeroContent />
          </div>
          
          {/* Right column with contact card and calendar */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className={`w-full max-w-md transition-all duration-700 ${
              showContact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <ContactCard />
            </div>
            
            <div className={`w-full max-w-md transition-all duration-700 ${
              showCalendar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <CalendarWidget />
            </div>
          </div>
        </div>
        
        <footer className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm px-4">
          <div className="flex flex-col items-center justify-center mb-2">
            <div className="rounded-full p-2 border-2 border-white inline-flex items-center justify-center" style={{ width: "90px", height: "90px" }}>
              <img 
                src="/logo/logowhite.png" 
                alt="Tallawarra Logo" 
                className="object-contain"
                style={{ maxWidth: "80%", maxHeight: "80%" }} 
              />
            </div>
            <div className="text-white/80 italic text-lg mt-2">
              Coming soon...
            </div>
          </div>
          <div className="text-xs sm:text-sm mt-2">
            © {new Date().getFullYear()} Tallawarra Residential Subdivision | <a href="https://www.tallawarra.com.au" className="hover:text-white transition-colors">www.tallawarra.com.au</a> | All rights reserved.
          </div>
        </footer>
      </section>
    </main>
  );
};

export default Index;
