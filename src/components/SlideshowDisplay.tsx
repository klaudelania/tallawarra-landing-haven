
import { useState, useEffect, useCallback } from "react";

interface SlideshowDisplayProps {
  imageUrls: string[];
  fallbackImages: string[];
}

const fallbackImages = [
  "/fallback/landscape1.jpg",
  "/fallback/landscape2.jpg",
  "/fallback/landscape3.jpg",
  "/fallback/landscape4.jpg",
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
