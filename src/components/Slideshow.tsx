
import { useState, useEffect, useCallback } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "../hooks/use-toast";

// Define custom image paths with explicit public URLs for production
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

// High-quality landscape fallback images from Unsplash
const fallbackImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Landscape
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e", // Forest
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739", // Lake
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", // Woods
];

// Comprehensive strategy to get image URLs
const getImageUrls = (imageIndex: number) => {
  const imagePath = defaultImages[imageIndex];
  const baseUrl = window.location.origin;
  
  // For hosted environments, try different path combinations
  return [
    imagePath, // Relative path from public directory
    `${baseUrl}${imagePath}`, // Full URL with origin
    // Try without the /slideshow part if we're in a production environment 
    // where folder structure might be different
    `/image${imageIndex + 1}.jpg`, 
    `${baseUrl}/image${imageIndex + 1}.jpg`,
    // Use GitHub raw content as last resort if applicable
    `https://raw.githubusercontent.com/username/repository-name/main/public${imagePath}`,
    // Final fallback to unsplash
    fallbackImages[imageIndex % fallbackImages.length]
  ];
};

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imageUrlMap, setImageUrlMap] = useState<Record<number, string>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { toast } = useToast();

  // Pre-load all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      console.log("Starting image preload process");
      
      const newImageMap: Record<number, string> = {};
      const loadResults: Record<string, boolean> = {};
      let fallbackCount = 0;
      
      // Try to load each image with multiple URL strategies
      await Promise.all(defaultImages.map((_, index) => {
        return new Promise<void>(resolve => {
          const tryNextUrl = (urlIndex: number) => {
            if (urlIndex >= getImageUrls(index).length - 1) {
              // We're at the last option, which is always a fallback
              console.log(`Using fallback for image ${index}`);
              newImageMap[index] = getImageUrls(index)[urlIndex];
              loadResults[`image${index}`] = false;
              fallbackCount++;
              resolve();
              return;
            }
            
            const url = getImageUrls(index)[urlIndex];
            const img = new Image();
            
            img.onload = () => {
              console.log(`Image ${index} loaded successfully from: ${url}`);
              newImageMap[index] = url;
              loadResults[`image${index}`] = true;
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
      setImagesLoaded(true);
      
      // Show toast if we had to use fallbacks
      if (fallbackCount > 0) {
        toast({
          title: "Image loading notice",
          description: `${fallbackCount} images are using fallback sources. Check console for details.`
        });
        
        console.log("Image load results:", loadResults);
        console.log("Final image URLs:", newImageMap);
      }
    };
    
    preloadImages();
  }, [toast]);

  const goToNextSlide = useCallback(() => {
    if (!imagesLoaded) return;
    
    setTransitioning(true);
    setNextImageIndex((prevNextIndex) => (prevNextIndex + 1) % defaultImages.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
    }, 1000);
  }, [nextImageIndex, imagesLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Don't render until images are loaded
  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 -z-10 flex items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Loading slideshow...</p>
      </div>
    );
  }

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
              src={imageUrlMap[index] || fallbackImages[index % fallbackImages.length]}
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
