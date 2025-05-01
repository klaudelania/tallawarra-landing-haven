
import { useState, useEffect, useCallback } from "react";

interface SlideshowDisplayProps {
  imageUrls: string[];
  fallbackImages: string[];
}

// Fallback images are now hardcoded URLs that should work in any environment
const fallbackImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
];

const SlideshowDisplay: React.FC<SlideshowDisplayProps> = ({ imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  const goToNextSlide = useCallback(() => {
    if (imageUrls.length === 0) return;
    
    setTransitioning(true);
    setNextImageIndex((prevNextIndex) => (prevNextIndex + 1) % imageUrls.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
    }, 1000);
  }, [nextImageIndex, imageUrls.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {imageUrls.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex 
              ? "opacity-100" 
              : index === nextImageIndex && transitioning 
                ? "opacity-30" 
                : "opacity-0"
          }`}
        >
          <img
            src={imageUrl}
            alt={`Tallawarra project image ${index + 1}`}
            className="object-cover w-full h-full"
            onError={(e) => {
              console.error(`Error loading image at runtime: ${imageUrl}`);
              e.currentTarget.src = fallbackImages[index % fallbackImages.length];
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
};

export default SlideshowDisplay;
