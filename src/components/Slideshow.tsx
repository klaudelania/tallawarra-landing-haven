
import { useState, useEffect, useCallback } from "react";

const images = [
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000&auto=format&fit=crop"
];

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  const goToNextSlide = useCallback(() => {
    setTransitioning(true);
    setNextImageIndex((currentImageIndex + 1) % images.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
      setNextImageIndex((nextImageIndex + 1) % images.length);
    }, 1000);
  }, [currentImageIndex, nextImageIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {images.map((image, index) => (
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
            src={image}
            alt={`Tallawarra project image ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
};

export default Slideshow;
