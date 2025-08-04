
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const Explore = () => {
  const [isPageReady, setIsPageReady] = useState(false);
  const navigate = useNavigate();

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
  
  const handleClose = () => {
    // Navigate to home page with replace to ensure a full refresh
    navigate('/', { replace: true });
  };
  
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Slideshow moved to App.tsx */}
      <Navbar />
      <div className={`container mx-auto pt-32 px-4 pb-8 flex-1 ${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="glass-morphism rounded-lg p-6 mb-8 text-white relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Close explore"
          >
            <X size={24} />
          </button>
          
          <h1 className="text-4xl font-bold text-white mb-6">Explore</h1>
          <p className="mb-4">
            Welcome to the Explore section. This area provides information about different aspects
            of the Tallawarra Point project that you can explore.
          </p>
          <p>
            Please select one of the submenu options to explore specific content.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Explore;
