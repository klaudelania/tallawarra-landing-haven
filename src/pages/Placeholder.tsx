
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


interface PlaceholderProps {
  title: string;
}

const Placeholder = ({ title }: PlaceholderProps) => {
  const [isPageReady, setIsPageReady] = useState(false);
  const navigate = useNavigate();

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
    <div className="relative min-h-screen">
      {/* Background Slideshow moved to App.tsx */}
      <Navbar />
      <div className={`container mx-auto pt-32 px-4 pb-16 ${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="glass-morphism rounded-lg p-6 mb-8 text-white relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Close page"
          >
            <X size={24} />
          </button>
          
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="mb-4">
            This is a placeholder page for {title}. Content for this section is coming soon.
          </p>
          <p>
            Please check back later for updates or explore other sections of the website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
