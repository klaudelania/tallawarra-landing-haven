
import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

// Define image paths
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

// More appropriate fallback images - simplified URLs
const fallbackImages = [
  "/fallback/landscape1.jpg",
  "/fallback/landscape2.jpg",
  "/fallback/landscape3.jpg",
  "/fallback/landscape4.jpg",
];

export const useImageLoader = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

  // Preload fallback images to ensure they're available when needed
  useEffect(() => {
    fallbackImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Multi-approach image loading strategy
  useEffect(() => {
    const loadImages = async () => {
      console.log("Starting to load slideshow images");
      const loadedImages: string[] = [];
      let failedCount = 0;
      
      // Create an array of promises for loading all images
      const imagePromises = defaultImages.map(async (imagePath, i) => {
        // Try loading the images with different path formats
        const standardPath = imagePath;
        const originPath = `${window.location.origin}${imagePath}`;
        const basePath = `/public${imagePath}`;
        const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        
        // Log the path variations we're trying for debugging
        console.log(`Trying paths for image ${i + 1}:`, [standardPath, originPath, basePath, relativePath]);
        
        // Try each path sequentially
        for (const path of [standardPath, originPath, basePath, relativePath]) {
          try {
            const response = await fetch(path, { method: 'HEAD' });
            if (response.ok) {
              console.log(`Successfully verified image ${i + 1} at: ${path}`);
              loadedImages[i] = path;
              return true;
            }
          } catch (error) {
            console.log(`Error checking path ${path}:`, error);
          }
        }
        
        // If all paths fail, use fallback
        console.log(`All paths failed for image ${i + 1}, using fallback`);
        loadedImages[i] = fallbackImages[i % fallbackImages.length];
        failedCount++;
        return false;
      });
      
      // Wait for all image loading attempts to complete
      await Promise.all(imagePromises);
      
      console.log("Final image paths:", loadedImages);
      setImageUrls(loadedImages);
      setImagesLoaded(true);
      
      if (failedCount > 0) {
        toast({
          title: "Image loading notice",
          description: `${failedCount} ${failedCount === 1 ? 'image' : 'images'} using fallback sources.`,
          duration: 10000,
        });
        
        console.error(`Failed to load ${failedCount} images.`);
        console.info("Environment info for debugging:");
        console.log("Current URL:", window.location.href);
        console.log("Protocol:", window.location.protocol);
        console.log("Host:", window.location.host);
        console.log("Origin:", window.location.origin);
      }
    };
    
    loadImages();
  }, [toast]);

  return { imageUrls, imagesLoaded, loadingProgress, setLoadingProgress };
};
