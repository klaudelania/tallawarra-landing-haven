
import { useState, useEffect, useCallback } from "react";
import ImageUploader from "./ImageUploader";
import { Toaster } from "./ui/toaster";

// Your custom uploaded images
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

// Fallback placeholder images in case custom images fail
const placeholderImages = [
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop"
];

const STORAGE_KEY = "tallawarra-slideshow-images";

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [userImages, setUserImages] = useState<string[]>([]);

  useEffect(() => {
    // Load user uploaded images from localStorage
    const savedImages = localStorage.getItem(STORAGE_KEY);
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        if (Array.isArray(parsedImages)) {
          setUserImages(parsedImages);
        }
      } catch (error) {
        console.error("Error loading saved images:", error);
      }
    }

    // Check if the custom images are accessible
    const checkImagesExist = async () => {
      try {
        // This will just verify one image to avoid too many requests
        const response = await fetch(defaultImages[0], { method: 'HEAD' });
        setImagesLoaded(response.ok);
      } catch (error) {
        console.log('Using placeholder images instead');
        setImagesLoaded(false);
      }
    };
    
    checkImagesExist();
  }, []);

  const handleImageUploaded = (imageUrl: string) => {
    setUserImages(prev => {
      const newImages = [...prev, imageUrl];
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
      return newImages;
    });
  };

  const goToNextSlide = useCallback(() => {
    setTransitioning(true);
    const allImages = userImages.length > 0 
      ? userImages 
      : (imagesLoaded ? defaultImages : placeholderImages);
    
    setNextImageIndex((currentImageIndex + 1) % allImages.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
      setNextImageIndex((nextImageIndex + 1) % allImages.length);
    }, 1000);
  }, [currentImageIndex, nextImageIndex, imagesLoaded, userImages]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Determine which set of images to use
  const finalImages = userImages.length > 0 
    ? userImages 
    : (imagesLoaded ? defaultImages : placeholderImages);

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {finalImages.map((image, index) => (
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
              src={image}
              alt={`Tallawarra project image ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-10">
        <ImageUploader onImageUploaded={handleImageUploaded} />
      </div>
      
      <Toaster />
    </>
  );
};

export default Slideshow;
