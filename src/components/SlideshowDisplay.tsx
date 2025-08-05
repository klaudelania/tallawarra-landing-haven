
import { useState, useEffect, useCallback } from "react";
import { useSlideshowContext } from "../context/SlideshowContext";

interface SlideshowDisplayProps {
  mediaUrls: Array<{type: string, src: string}>;
  fallbackImages: string[];
}

// Fallback images are now hardcoded URLs that should work in any environment
const fallbackImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
];

const SlideshowDisplay: React.FC<SlideshowDisplayProps> = ({ mediaUrls }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [nextMediaIndex, setNextMediaIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [loadedMedia, setLoadedMedia] = useState<Record<number, boolean>>({});
  const { isImageMode, setIsImageMode } = useSlideshowContext();

  const goToNextSlide = useCallback(() => {
    if (mediaUrls.length === 0) return;
    
    console.log(`Transitioning from slide ${currentMediaIndex} to ${nextMediaIndex}`);
    setTransitioning(true);
    const nextIndex = (currentMediaIndex + 1) % mediaUrls.length;
    
    // Check if we're at the end of image slideshow
    if (isImageMode && nextIndex === 0) {
      console.log("Image slideshow completed, reverting to video");
      setIsImageMode(false);
      return;
    }
    
    setNextMediaIndex(nextIndex);
    
    setTimeout(() => {
      setCurrentMediaIndex(nextIndex);
      setTransitioning(false);
      console.log(`Now showing slide ${nextIndex}`);
    }, 1000);
  }, [currentMediaIndex, mediaUrls.length, isImageMode, setIsImageMode]);

  useEffect(() => {
    const currentMedia = mediaUrls[currentMediaIndex];
    
    // Only use timer for images, videos will loop continuously
    if (currentMedia?.type === 'image') {
      const timer = setInterval(() => {
        goToNextSlide();
      }, 5000); // 5 seconds for images

      return () => clearInterval(timer);
    }
  }, [goToNextSlide, currentMediaIndex, mediaUrls]);

  // Reset to first slide when mode changes
  useEffect(() => {
    setCurrentMediaIndex(0);
    setNextMediaIndex(1);
  }, [isImageMode]);

  // Pre-cache media to check if it loads properly
  const handleMediaLoad = (index: number) => {
    setLoadedMedia(prev => ({
      ...prev,
      [index]: true
    }));
  };

  console.log("SlideshowDisplay - mediaUrls received:", mediaUrls);
  console.log("SlideshowDisplay - currentMediaIndex:", currentMediaIndex);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {mediaUrls.map((media, index) => {
        console.log(`Rendering media ${index}: type=${media.type}, src=${media.src}, currentIndex=${currentMediaIndex}`);
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentMediaIndex 
                ? "opacity-100" 
                : index === nextMediaIndex && transitioning 
                  ? "opacity-30" 
                  : "opacity-0"
            }`}
          >
            {media.type === 'video' ? (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <iframe
                  src={media.src}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', border: 'none', transform: 'scale(1.2)', transformOrigin: 'center'}}
                  title="H264_Master_Tallawarra_Final_01"
                  id="vimeo-player"
                  onLoad={() => {
                    console.log(`Video iframe loaded: ${media.src}`);
                    handleMediaLoad(index);
                    // Load Vimeo Player API script if not already loaded
                    if (!(window as any).Vimeo && !document.querySelector('script[src*="player.vimeo.com"]')) {
                      const script = document.createElement('script');
                      script.src = 'https://player.vimeo.com/api/player.js';
                      document.head.appendChild(script);
                    }
                  }}
                />
              </div>
            ) : (
              <img
                src={media.src}
                alt={`Tallawarra project media ${index + 1}`}
                className="object-cover w-full h-full"
                onLoad={() => handleMediaLoad(index)}
                onError={(e) => {
                  console.error(`Error loading image at runtime: ${media.src}`);
                  e.currentTarget.src = fallbackImages[index % fallbackImages.length];
                }}
              />
            )}
          </div>
        );
      })}
      <div className="absolute inset-0 bg-black/25"></div>
    </div>
  );
};

export default SlideshowDisplay;
