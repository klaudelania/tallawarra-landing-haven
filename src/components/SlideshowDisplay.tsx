
import { useState, useEffect, useCallback } from "react";

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

  const goToNextSlide = useCallback(() => {
    if (mediaUrls.length === 0) return;
    
    setTransitioning(true);
    setNextMediaIndex((prevNextIndex) => (prevNextIndex + 1) % mediaUrls.length);
    
    setTimeout(() => {
      setCurrentMediaIndex(nextMediaIndex);
      setTransitioning(false);
    }, 1000);
  }, [nextMediaIndex, mediaUrls.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000); // Back to 5 seconds for images

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Pre-cache media to check if it loads properly
  const handleMediaLoad = (index: number) => {
    setLoadedMedia(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {mediaUrls.map((media, index) => (
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
            <video
              src={media.src}
              className="object-cover w-full h-full"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => handleMediaLoad(index)}
              onError={(e) => {
                console.error(`Error loading video at runtime: ${media.src}`);
                // For videos, we'll hide the element on error rather than show a fallback image
                e.currentTarget.style.display = 'none';
              }}
            />
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
      ))}
      <div className="absolute inset-0 bg-black/25"></div>
    </div>
  );
};

export default SlideshowDisplay;
