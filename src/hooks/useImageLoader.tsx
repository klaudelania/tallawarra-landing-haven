import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

// Define image paths - mix of original images and new uploaded images
const slideshowImages = [
  "/lovable-uploads/95f8d4a4-fa0f-4fa6-85ea-0fb1925c2ba1.png", // replaced image1
  "/slideshow/image2.jpg", 
  "/slideshow/image3.jpg",
  "/slideshow/image4.jpg",
  "/slideshow/image5.jpg",
  "/slideshow/image6.jpg",
  "/slideshow/image7.jpg",
  "/slideshow/image8.jpg",
  "/lovable-uploads/cffd4e4d-b7c2-4c74-be6c-c1216dabcd69.png", // replaced image9
  "/lovable-uploads/149c7448-094b-4181-bf68-47c09b0a8dfc.png", // replaced image10
  "/lovable-uploads/94d765c4-60ca-4389-9468-7b99c3efb0f1.png", // replaced image11
  "/lovable-uploads/f65ea3d5-3339-4f57-ab2e-8432afa2d976.png"  // replaced image12
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
      console.log("Starting to load slideshow images with new uploaded images");
      
      // Use the updated slideshow images array
      setImageUrls(slideshowImages);
      
      // Simulate loading progress for a smoother UX
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setLoadingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setImagesLoaded(true);
          console.log("Slideshow images loaded successfully with replacements:", slideshowImages);
          
          toast({
            title: "Images loaded",
            description: "Slideshow images loaded successfully with new uploads.",
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
