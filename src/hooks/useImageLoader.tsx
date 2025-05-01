import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

// Define image paths - keep the same but they will be used differently
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

// Use placeholder images that are available in most environments
const fallbackImages = [
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&h=900&q=80",
];

export const useImageLoader = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadImages = async () => {
      console.log("Starting to load slideshow images");
      
      // Since we know the images don't exist in the paths we're trying,
      // let's just use the fallback images directly
      const loadedImages = defaultImages.map((_, index) => {
        return fallbackImages[index % fallbackImages.length];
      });
      
      console.log("Using fallback images:", loadedImages);
      setImageUrls(loadedImages);
      setImagesLoaded(true);
      
      toast({
        title: "Image loading notice",
        description: "Using placeholder images for slideshow.",
        duration: 5000,
      });
      
      // Simulate loading progress for a smoother UX
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      
      return () => clearInterval(interval);
    };
    
    loadImages();
  }, [toast]);

  return { imageUrls, imagesLoaded, loadingProgress };
};
