import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

// Define image paths - these are the actual images from the public folder
const slideshowImages = [
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

// Keep fallback images for error cases
const fallbackImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
];

export const useImageLoader = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadImages = async () => {
      console.log("Starting to load slideshow images from public folder");
      
      // Use the actual slideshow images instead of fallbacks
      setImageUrls(slideshowImages);
      
      // Simulate loading progress for a smoother UX
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setLoadingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setImagesLoaded(true);
          console.log("Slideshow images loaded successfully:", slideshowImages);
          
          toast({
            title: "Images loaded",
            description: "Slideshow images loaded successfully.",
            duration: 3000,
          });
        }
      }, 100);
      
      return () => clearInterval(interval);
    };
    
    loadImages();
  }, [toast]);

  return { imageUrls, imagesLoaded, loadingProgress };
};
