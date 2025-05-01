
import { useState, useEffect, useCallback } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "../hooks/use-toast";

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

// Create absolute URLs that include domain for preview environments
const getAbsoluteImageUrls = () => {
  // Get the base URL of the current environment
  const baseUrl = window.location.origin;
  
  // Map each relative path to an absolute URL
  return defaultImages.map(path => `${baseUrl}${path}`);
};

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [useAbsoluteUrls, setUseAbsoluteUrls] = useState(false);
  const { toast } = useToast();
  
  // Get the appropriate image URLs based on our loading state
  const finalImages = useAbsoluteUrls ? getAbsoluteImageUrls() : defaultImages;

  useEffect(() => {
    // Check if the images are accessible with relative paths
    const checkImagesExist = async () => {
      try {
        console.log("Checking image at path:", defaultImages[0]);
        const response = await fetch(defaultImages[0], { method: 'HEAD' });
        
        if (response.ok) {
          console.log("Image loaded successfully with relative path");
          setImagesLoaded(true);
        } else {
          console.log("Failed to load image with relative path, status:", response.status);
          // Try with absolute URLs
          setUseAbsoluteUrls(true);
          toast({
            title: "Image loading",
            description: "Using absolute image paths for preview environment"
          });
        }
      } catch (error) {
        console.log('Error loading images:', error);
        // Try with absolute URLs
        setUseAbsoluteUrls(true);
        toast({
          title: "Image loading issue",
          description: "Using alternative image loading method"
        });
      }
    };
    
    checkImagesExist();
  }, [toast]);

  const goToNextSlide = useCallback(() => {
    setTransitioning(true);
    
    setNextImageIndex((currentImageIndex + 1) % finalImages.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
      setNextImageIndex((nextImageIndex + 1) % finalImages.length);
    }, 1000);
  }, [currentImageIndex, nextImageIndex, finalImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

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
              onError={(e) => {
                console.log("Image failed to load:", image);
                // Add a fallback if needed
                e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475";
              }}
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
