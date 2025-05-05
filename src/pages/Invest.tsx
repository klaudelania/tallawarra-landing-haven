
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';

const Invest = () => {
  // Ensure the page is properly initialized when loaded directly
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset any body classes that might have been set by other pages
    document.body.className = '';
    
    // Force any CSS transitions to complete
    const forceReflow = document.body.offsetHeight;
  }, []);
  
  return (
    <div className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      <div className="container mx-auto pt-32 px-4 pb-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-6">Invest</h1>
        <div className="glass-morphism rounded-lg p-6 mb-8 text-white">
          <p className="mb-4">
            Welcome to the Investment section. Here you can find information about investment
            opportunities related to the Tallawarra project.
          </p>
          <p>
            Please select one of the submenu options to explore specific investment opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invest;
