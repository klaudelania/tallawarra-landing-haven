
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

// Create a more comprehensive set of possible image URLs
const getImageUrls = (index: number) => {
  const imageName = defaultImages[index];
  const baseUrl = window.location.origin;
  
  // Return an array of possible URLs to try in sequence
  return [
    imageName, // 1. Try relative path first (works in development)
    `${baseUrl}${imageName}`, // 2. Try absolute URL with origin
    `${baseUrl}/public${imageName}`, // 3. Some deployments might need /public prefix
    `https://raw.githubusercontent.com/username/repository-name/main/public${imageName}`, // 4. GitHub raw content as last resort
  ];
};

// Fixed set of reliable fallback images
const fallbackImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
];

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imageUrlMap, setImageUrlMap] = useState<Record<number, string>>({});
  const [loadAttemptCount, setLoadAttemptCount] = useState<Record<number, number>>({});
  const { toast } = useToast();

  // Pre-load all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      console.log("Starting image preload process");
      
      const newImageMap: Record<number, string> = {};
      const loadAttempts: Record<number, number> = {};
      
      // Try to load each image
      await Promise.all(defaultImages.map((_, index) => {
        return new Promise<void>(resolve => {
          const tryNextUrl = (urlIndex: number) => {
            if (urlIndex >= getImageUrls(index).length) {
              console.log(`All URLs failed for image ${index}, using fallback`);
              newImageMap[index] = fallbackImages[index % fallbackImages.length];
              loadAttempts[index] = urlIndex;
              resolve();
              return;
            }
            
            const url = getImageUrls(index)[urlIndex];
            const img = new Image();
            
            img.onload = () => {
              console.log(`Image ${index} loaded successfully from: ${url}`);
              newImageMap[index] = url;
              loadAttempts[index] = urlIndex;
              resolve();
            };
            
            img.onerror = () => {
              console.log(`Failed to load image ${index} from: ${url}`);
              tryNextUrl(urlIndex + 1);
            };
            
            img.src = url;
          };
          
          tryNextUrl(0);
        });
      }));
      
      setImageUrlMap(newImageMap);
      setLoadAttemptCount(loadAttempts);
      
      // Show toast if we had to use fallbacks for many images
      const fallbackCount = Object.values(loadAttempts).filter(attempt => 
        attempt >= getImageUrls(0).length - 1
      ).length;
      
      if (fallbackCount > 0) {
        toast({
          title: "Image loading notice",
          description: `${fallbackCount} images using fallback sources`
        });
      }
    };
    
    preloadImages();
  }, [toast]);

  const goToNextSlide = useCallback(() => {
    setTransitioning(true);
    setNextImageIndex((prevNextIndex) => (prevNextIndex + 1) % defaultImages.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
    }, 1000);
  }, [nextImageIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  const getDisplayImageUrl = (index: number) => {
    return imageUrlMap[index] || fallbackImages[index % fallbackImages.length];
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {defaultImages.map((_, index) => (
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
              src={getDisplayImageUrl(index)}
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
