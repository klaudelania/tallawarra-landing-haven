
import { useState, useEffect, useCallback } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "../hooks/use-toast";

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

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

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

  // Preload fallback images to ensure they're available when needed
  useEffect(() => {
    fallbackImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const goToNextSlide = useCallback(() => {
    if (!imagesLoaded) return;
    
    setTransitioning(true);
    setNextImageIndex((prevNextIndex) => (prevNextIndex + 1) % imageUrls.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
    }, 1000);
  }, [nextImageIndex, imagesLoaded, imageUrls.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Loading state with progress indicator
  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 -z-10 flex flex-col items-center justify-center bg-gray-900">
        <p className="text-white text-lg mb-4">Loading slideshow images... {loadingProgress}%</p>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {imageUrls.map((imageUrl, index) => (
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
              src={imageUrl}
              alt={`Tallawarra project image ${index + 1}`}
              className="object-cover w-full h-full"
              onError={(e) => {
                console.error(`Error loading image at runtime: ${imageUrl}`);
                e.currentTarget.src = fallbackImages[index % fallbackImages.length];
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
