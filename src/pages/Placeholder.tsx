
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";

type PlaceholderProps = {
  title: string;
};

const Placeholder = ({ title }: PlaceholderProps) => {
  // Don't use animation states that might interfere with navigation
  useEffect(() => {
    // Force scroll to top when component mounts for consistent behavior
    window.scrollTo(0, 0);
    
    // Add a class to the body to prevent any background scrolling
    document.body.classList.add('overflow-hidden');
    
    // Clean up when unmounting
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  
  const handleClose = () => {
    // Get the base route to navigate back to
    const currentPath = window.location.pathname;
    const baseRoute = currentPath.includes('explore') ? '/explore' : 
                      currentPath.includes('invest') ? '/invest' : '/';
    
    // Use direct navigation without any animations or state changes
    window.location.href = baseRoute;
  };
  
  return (
    <main className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      
      <section className="container relative min-h-screen pt-28 pb-16">
        <div className="glass-morphism rounded-lg p-8 text-white relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Close content"
          >
            <X size={24} />
          </button>
          
          <h1 className="text-4xl font-bold mb-8">{title}</h1>
          
          <div className="glass-morphism rounded-lg p-6">
            <p className="text-xl">Content coming soon...</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Placeholder;
