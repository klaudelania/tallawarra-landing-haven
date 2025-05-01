
import { useState, useEffect, useCallback } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "../hooks/use-toast";

// Updated image paths to use URL-friendly format (no spaces)
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

// Create absolute URLs that include domain for preview environments
const getAbsoluteImageUrls = () => {
  // Get the base URL of the current environment
  const baseUrl = window.location.origin;
  
  // Map each relative path to an absolute URL
  return defaultImages.map(path => `${baseUrl}${path}`);
};

// Get GitHub raw content URLs for images (useful when deployed from GitHub)
const getGitHubImageUrls = (username, repo, branch = 'main') => {
  return defaultImages.map(path => 
    `https://raw.githubusercontent.com/${username}/${repo}/${branch}/public${path}`
  );
};

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [imageLoadStrategy, setImageLoadStrategy] = useState("relative"); // relative, absolute, or github
  const { toast } = useToast();

  // Define all image loading strategies
  const imageStrategies = {
    relative: defaultImages,
    absolute: getAbsoluteImageUrls(),
    // You'll need to update these values with your actual GitHub username and repository name
    github: getGitHubImageUrls('your-github-username', 'your-repo-name')
  };
  
  // Get the appropriate image URLs based on our loading strategy
  const finalImages = imageStrategies[imageLoadStrategy];

  useEffect(() => {
    // Check if the images are accessible with relative paths first
    const checkImagesExist = async () => {
      try {
        console.log("Attempting to load with relative paths first");
        const response = await fetch(defaultImages[0], { method: 'HEAD' });
        
        if (response.ok) {
          console.log("✅ Images loaded successfully with relative paths");
          setImageLoadStrategy("relative");
        } else {
          console.log("❌ Failed with relative paths, trying absolute paths");
          // Try with absolute URLs
          try {
            const absoluteUrl = getAbsoluteImageUrls()[0];
            const absResponse = await fetch(absoluteUrl, { method: 'HEAD' });
            
            if (absResponse.ok) {
              console.log("✅ Images loaded successfully with absolute paths");
              setImageLoadStrategy("absolute");
              toast({
                title: "Image loading adjusted",
                description: "Using absolute image paths for this environment"
              });
            } else {
              console.log("❌ Failed with absolute paths, will use fallback images");
              setImageLoadStrategy("github");
              toast({
                title: "Image loading issue",
                description: "Using GitHub fallback images"
              });
            }
          } catch (error) {
            console.log("❌ Error with absolute paths:", error);
            setImageLoadStrategy("github");
          }
        }
      } catch (error) {
        console.log('❌ Error during image path testing:', error);
        setImageLoadStrategy("absolute");
        toast({
          title: "Image loading issue",
          description: "Using alternative image loading method"
        });
      }
    };
    
    checkImagesExist();
  }, [toast]);

  const goToNextSlide = useCallback(() => {
    setTransitioning(true);
    
    setNextImageIndex((currentImageIndex + 1) % finalImages.length);
    
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setTransitioning(false);
      setNextImageIndex((nextImageIndex + 1) % finalImages.length);
    }, 1000);
  }, [currentImageIndex, nextImageIndex, finalImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

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
              onError={(e) => {
                console.error("Image failed to load:", image);
                // Use a reliable placeholder from Unsplash
                e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475";
                
                // Log detailed information for debugging
                if (imageLoadStrategy === "relative") {
                  console.log("Trying to switch to absolute URLs after image load failure");
                  setImageLoadStrategy("absolute");
                } else if (imageLoadStrategy === "absolute") {
                  console.log("Trying to switch to GitHub URLs after image load failure");
                  setImageLoadStrategy("github");
                }
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
