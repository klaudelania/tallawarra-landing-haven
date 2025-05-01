
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
      
      {/* Hero Section */}
      <section className="container relative min-h-screen pt-24 pb-16 flex flex-col justify-center items-start md:items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <HeroContent />
          
          <div className="flex flex-col gap-6">
            <div className={`justify-self-center md:justify-self-end transition-all duration-700 ${
              showContact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <ContactCard />
            </div>
            
            <div className={`justify-self-center md:justify-self-end transition-all duration-700 ${
              showCalendar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <CalendarWidget />
            </div>
          </div>
        </div>
        
        <footer className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
          <div className="text-white/80 italic mb-2 text-lg">
            Coming soon...
          </div>
          © {new Date().getFullYear()} Tallawarra Residential Subdivision | <a href="https://www.tallawarra.com.au" className="hover:text-white transition-colors">www.tallawarra.com.au</a> | All rights reserved.
        </footer>
      </section>
    </main>
  );
};

export default Index;
