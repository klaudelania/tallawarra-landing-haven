import { useState, useEffect, useCallback } from "react";
import { Toaster } from "./ui/toaster";

// Updated image paths to use URL-friendly format (no spaces)
const defaultImages = [
  "/slideshow/image1.jpg",
  "/slideshow/image2.jpg", 
  "/slideshow/image3.jpg",
  "/slideshow/image4.jpg",
  "/slideshow/image5.jpg",
  "/slideshow/image6.jpg",
  "/slideshow/image7.jpg",
  "/slideshow/image8.jpg",
  "/slideshow/image9.jpg",
  "/slideshow/image10.jpg",
  "/slideshow/image11.jpg",
  "/slideshow/image12.jpg"
];

// Update fallback images to use the same URL-friendly format
const placeholderImages = [
  "/slideshow/image1.jpg",
  "/slideshow/image2.jpg", 
  "/slideshow/image3.jpg",
  "/slideshow/image4.jpg",
  "/slideshow/image5.jpg",
  "/slideshow/image6.jpg",
  "/slideshow/image7.jpg",
  "/slideshow/image8.jpg",
  "/slideshow/image9.jpg",
  "/slideshow/image10.jpg",
  "/slideshow/image11.jpg",
  "/slideshow/image12.jpg"
];

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
        const response = await fetch(defaultImages[0], { method: 'HEAD' });
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
    const allImages = imagesLoaded ? defaultImages : placeholderImages;
    
    setNextImageIndex((currentImageIndex + 1) % allImages.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
      setNextImageIndex((nextImageIndex + 1) % allImages.length);
    }, 1000);
  }, [currentImageIndex, nextImageIndex, imagesLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Determine which set of images to use
  const finalImages = imagesLoaded ? defaultImages : placeholderImages;

  return (
    <>
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
      
      <Toaster />
    </>
  );
};

export default Slideshow;
