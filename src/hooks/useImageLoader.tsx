import { useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { useSlideshowContext } from "../context/SlideshowContext";

// Define slideshow media - just video in continuous loop
const videoMedia = [
  { type: 'video', src: "https://player.vimeo.com/video/1107307354?badge=0&autopause=0&player_id=0&app_id=58479" }, // Vimeo embedded video - continuous loop
];

// Define image slideshow media - images 1-12
const imageMedia = [
  { type: 'image', src: "/slideshow/image1.jpg" },
  { type: 'image', src: "/slideshow/image2.jpg" },
  { type: 'image', src: "/slideshow/image3.jpg" },
  { type: 'image', src: "/slideshow/image4.jpg" },
  { type: 'image', src: "/slideshow/image5.jpg" },
  { type: 'image', src: "/slideshow/image6.jpg" },
  { type: 'image', src: "/slideshow/image7.jpg" },
  { type: 'image', src: "/slideshow/image8.jpg" },
  { type: 'image', src: "/slideshow/image9.jpg" },
  { type: 'image', src: "/slideshow/image10.jpg" },
  { type: 'image', src: "/slideshow/image11.jpg" },
  { type: 'image', src: "/slideshow/image12.jpg" }
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
  const { isImageMode, setShouldRevertToVideo } = useSlideshowContext();

  useEffect(() => {
    const loadImages = async () => {
      const currentMedia = isImageMode ? imageMedia : videoMedia;
      console.log(`Starting to load slideshow media in ${isImageMode ? 'image' : 'video'} mode`);
      
      // Use the current mode's media array
      setMediaUrls(currentMedia);
      
      // Simulate loading progress for a smoother UX
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setLoadingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setImagesLoaded(true);
          console.log(`Slideshow media loaded successfully in ${isImageMode ? 'image' : 'video'} mode:`, currentMedia);
          
          toast({
            title: "Media loaded",
            description: `Slideshow ${isImageMode ? 'images' : 'video'} loaded successfully.`,
            duration: 3000,
          });
        }
      }, 100);
      
      return () => clearInterval(interval);
    };
    
    loadImages();
  }, [toast, isImageMode]);

  return { mediaUrls, imagesLoaded, loadingProgress };
};
