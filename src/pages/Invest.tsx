
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import Footer from '../components/Footer';

const Invest = () => {
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
    const timer = setTimeout(() => setIsPageReady(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <Slideshow />
      <Navbar />
      <div className={`container mx-auto pt-32 px-4 pb-8 flex-1 ${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-4xl font-bold text-white mb-6">Invest</h1>
        <div className="glass-morphism rounded-lg p-6 mb-8 text-white">
          <p className="mb-4">
            Welcome to the Investment section. Here you can find information about investment
            opportunities related to the Tallawarra Point project.
          </p>
          <p>
            Please select one of the submenu options to explore specific investment opportunities.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Invest;
