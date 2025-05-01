import { useState, useEffect, useCallback } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "../hooks/use-toast";

// Define image paths with correct structure
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

// Higher quality landscape fallback images
const fallbackImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80", // Mountain landscape
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80", // Forest
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80", // Sunlight forest
  "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1600&q=80", // Water landscape
];

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

  // Completely revised image loading approach
  useEffect(() => {
    const loadImages = async () => {
      console.log("Starting to load slideshow images");
      const loadedImages: string[] = [];
      let failedCount = 0;
      
      for (let i = 0; i < defaultImages.length; i++) {
        // First, try with import.meta.env.BASE_URL which is the correct Vite approach
        const imagePath = defaultImages[i];
        const pathToTry = `${import.meta.env.BASE_URL}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
        
        try {
          const img = new Image();
          
          const loaded = await new Promise<boolean>((resolve) => {
            img.onload = () => {
              console.log(`Successfully loaded image ${i + 1} from: ${pathToTry}`);
              resolve(true);
            };
            img.onerror = () => {
              console.log(`Failed to load image ${i + 1} from: ${pathToTry}`);
              resolve(false);
            };
            img.src = pathToTry;
          });
          
          if (loaded) {
            loadedImages.push(pathToTry);
          } else {
            console.log(`Using fallback for image ${i + 1}`);
            loadedImages.push(fallbackImages[i % fallbackImages.length]);
            failedCount++;
          }
        } catch (error) {
          console.error(`Error loading image ${i + 1}:`, error);
          loadedImages.push(fallbackImages[i % fallbackImages.length]);
          failedCount++;
        }
        
        // Update loading progress
        setLoadingProgress(Math.round(((i + 1) / defaultImages.length) * 100));
      }
      
      setImageUrls(loadedImages);
      setImagesLoaded(true);
      
      if (failedCount > 0) {
        toast({
          title: "Image loading notice",
          description: `${failedCount} ${failedCount === 1 ? 'image' : 'images'} using fallback sources. Images may not match expected content.`,
          duration: 8000,
        });
        
        console.error(`Failed to load ${failedCount} images. Please check that your images are in the public/slideshow/ directory.`);
        console.log("Current base URL:", import.meta.env.BASE_URL);
        console.log("Window location:", window.location.href);
      }
    };
    
    loadImages();
  }, [toast]);

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
