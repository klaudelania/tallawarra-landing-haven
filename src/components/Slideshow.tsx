
import { useState, useEffect, useCallback } from "react";

// Replace these with your own image imports or paths
const images = [
  "/slideshow/image1.jpg", // Replace with your image paths
  "/slideshow/image2.jpg", 
  "/slideshow/image3.jpg",
  "/slideshow/image4.jpg",
  "/slideshow/image5.jpg"
];

// You can add a message to guide users when images aren't available yet
const placeholderImages = [
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000&auto=format&fit=crop"
];

// Use placeholder images if custom images fail to load
const imagesToUse = images;

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Check if the custom images are accessible
    const checkImagesExist = async () => {
      try {
        // This will just verify one image to avoid too many requests
        const response = await fetch(images[0], { method: 'HEAD' });
        setImagesLoaded(response.ok);
      } catch (error) {
        console.log('Using placeholder images instead');
        setImagesLoaded(false);
      }
    };
    
    checkImagesExist();
  }, []);

  const goToNextSlide = useCallback(() => {
    setTransitioning(true);
    const finalImages = imagesLoaded ? images : placeholderImages;
    setNextImageIndex((currentImageIndex + 1) % finalImages.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
      setNextImageIndex((nextImageIndex + 1) % finalImages.length);
    }, 1000);
  }, [currentImageIndex, nextImageIndex, imagesLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  const finalImages = imagesLoaded ? images : placeholderImages;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {finalImages.map((image, index) => (
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
