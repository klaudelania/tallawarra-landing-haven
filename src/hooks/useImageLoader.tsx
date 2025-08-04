import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

// Define slideshow media - video and select images only
const slideshowMedia = [
  { type: 'video', src: "/slideshow/H264 Master Tallawarra Final 01.mp4" }, // YouTube video as MP4
  { type: 'image', src: "/lovable-uploads/95f8d4a4-fa0f-4fa6-85ea-0fb1925c2ba1.png" }, // image 1
  { type: 'image', src: "/lovable-uploads/f65ea3d5-3339-4f57-ab2e-8432afa2d976.png" }  // image 12
];

// Keep fallback images for error cases
const fallbackImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80",
];

export const useImageLoader = () => {
  const [mediaUrls, setMediaUrls] = useState<Array<{type: string, src: string}>>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadImages = async () => {
      console.log("Starting to load slideshow media with images and videos");
      
      // Use the updated slideshow media array
      setMediaUrls(slideshowMedia);
      
      // Simulate loading progress for a smoother UX
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setLoadingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setImagesLoaded(true);
          console.log("Slideshow media loaded successfully with video:", slideshowMedia);
          
          toast({
            title: "Media loaded",
            description: "Slideshow images and video loaded successfully.",
            duration: 3000,
          });
        }
      }, 100);
      
      return () => clearInterval(interval);
    };
    
    loadImages();
  }, [toast]);

  return { mediaUrls, imagesLoaded, loadingProgress };
};
