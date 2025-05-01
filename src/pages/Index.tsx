
import { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import Navbar from "../components/Navbar";
import ContactCard from "../components/ContactCard";
import HeroContent from "../components/HeroContent";

const Index = () => {
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Delay showing the contact card
    const timer = setTimeout(() => {
      setShowContact(true);
    }, 1000);

    return () => clearTimeout(timer);
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
          
          <div className={`justify-self-center md:justify-self-end transition-all duration-700 ${
            showContact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <ContactCard />
          </div>
        </div>
        
        <div className="text-center w-full text-white/80 italic mt-8 text-lg">
          Coming soon...
        </div>
        
        <footer className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} Tallawarra Residential Subdivision | <a href="https://www.tallawarra.com.au" className="hover:text-white transition-colors">www.tallawarra.com.au</a> | All rights reserved.
        </footer>
      </section>
    </main>
  );
};

export default Index;
