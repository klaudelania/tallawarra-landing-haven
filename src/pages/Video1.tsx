
import React, { useEffect, useState } from 'react';
import { X, Video as VideoIcon, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { Button } from '@/components/ui/button';

const Video1 = () => {
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

  const handleYouTubeClick = () => {
    window.open('https://www.youtube.com/channel/UCy8az_gye0WTOszkHxEl6Nw', '_blank', 'noopener,noreferrer');
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
            aria-label="Close video page"
          >
            <X size={24} />
          </button>
          
          <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <VideoIcon size={40} />
            Video 1
          </h1>
          
          <p className="mb-6">
            Watch our latest video content on YouTube. Subscribe to our channel 
            for regular updates, project highlights, and community events.
          </p>

          <div className="glass-morphism rounded-lg p-6 border-2 border-dashed border-white/30 text-center">
            <VideoIcon size={48} className="mx-auto mb-4 text-white/70" />
            <h3 className="text-xl font-semibold mb-2">Visit Our YouTube Channel</h3>
            <p className="mb-4 text-white/80">
              Click below to visit our YouTube channel and watch our latest videos
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <Button 
                variant="secondary" 
                onClick={handleYouTubeClick}
                className="cursor-pointer flex items-center gap-2"
              >
                <ExternalLink size={20} />
                Visit YouTube Channel
              </Button>
              
              <p className="text-sm text-white/60">
                Opens in a new tab
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video1;
