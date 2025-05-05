
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';

const Explore = () => {
  const [isPageReady, setIsPageReady] = useState(false);

  // Ensure the page is properly initialized when loaded directly
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset any body classes that might have been set by other pages
    document.body.className = '';
    
    // Force any CSS transitions to complete
    const forceReflow = document.body.offsetHeight;
    
    // Set page as ready after a brief delay to ensure everything is rendered
    const timer = setTimeout(() => setIsPageReady(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      <div className={`container mx-auto pt-32 px-4 pb-16 ${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-4xl font-bold text-white mb-6">Explore</h1>
        <div className="glass-morphism rounded-lg p-6 mb-8 text-white">
          <p className="mb-4">
            Welcome to the Explore section. This area provides information about different aspects
            of the Tallawarra project that you can explore.
          </p>
          <p>
            Please select one of the submenu options to explore specific content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
