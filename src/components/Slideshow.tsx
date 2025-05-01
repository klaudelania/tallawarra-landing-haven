
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
  const [failedImages, setFailedImages] = useState<number[]>([]);
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
          description: "Using absolute paths"
        });
      }
    };
    
    checkImagesExist();
  }, [toast]);

  const goToNextSlide = useCallback(() => {
    setTransitioning(true);
    
    // Make sure we skip failed images
    let nextIndex = (nextImageIndex + 1) % finalImages.length;
    while (failedImages.includes(nextIndex)) {
      nextIndex = (nextIndex + 1) % finalImages.length;
    }
    
    setNextImageIndex(nextIndex);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
    }, 1000);
  }, [currentImageIndex, nextImageIndex, finalImages.length, failedImages]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  const handleImageError = (index: number) => {
    console.log("Image failed to load:", finalImages[index]);
    setFailedImages(prev => [...prev, index]);
    
    // If too many images fail, show a toast
    if (failedImages.length > finalImages.length / 2) {
      toast({
        title: "Image loading issues",
        description: "Some slideshow images failed to load"
      });
    }
  };

  const getImageUrl = (index: number) => {
    if (failedImages.includes(index)) {
      // Use a reliable placeholder when the actual image fails
      const placeholders = [
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      ];
      return placeholders[index % placeholders.length];
    }
    return finalImages[index];
  };

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
              src={getImageUrl(index)}
              alt={`Tallawarra project image ${index + 1}`}
              className="object-cover w-full h-full"
              onError={() => handleImageError(index)}
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
