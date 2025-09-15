
import React, { useEffect, useState } from 'react';
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';


const TallawarraHome = () => {
  const [isPageReady, setIsPageReady] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/', { replace: true });
  };

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
    <div className="relative min-h-screen">
      {/* Background Slideshow moved to App.tsx */}
      <Navbar />
      <div className={`container mx-auto pt-32 px-4 pb-16 ${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="relative">
          <button 
            onClick={handleClose}
            className="absolute top-0 right-0 p-2 rounded-full hover:bg-white/30 transition-colors text-white z-10"
            aria-label="Close page"
          >
            <X size={24} />
          </button>
          <h1 className="text-4xl font-bold text-white mb-6">How to make Tallawarra home?</h1>
        </div>
        <div className="glass-morphism rounded-lg p-6 mb-8 text-white">
          <p className="mb-4">
            Tallawarra is one of many new exciting projects delivered by Bridgehill. If you are interested in exploring our offer visit Bridgehill company website or contact us directly via email or phone.
          </p>
          <p className="mb-4">
            We are excited about Tallawarra project and you may be able to purchase property as part of the pre-sale phase, depending on availability. Information on how to register interest or secure a property will be made available on the Bridgehill project's website.
          </p>
          <div className="mt-6 space-y-2">
            <p><strong>Contact Information:</strong></p>
            <p>Phone: 1800 899 928</p>
            <p>Email: info@bridgehill.com.au</p>
            <p>Website: <a href="https://www.bridgehill.com.au/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 underline">www.bridgehill.com.au</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TallawarraHome;
