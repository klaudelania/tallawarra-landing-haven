
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type PlaceholderProps = {
  title: string;
};

const Placeholder = ({ title }: PlaceholderProps) => {
  const [contentReady, setContentReady] = useState(false);

  // Ensure the page is properly initialized when loaded directly
  useEffect(() => {
    // Force scroll to top when component mounts for consistent behavior
    window.scrollTo(0, 0);
    
    // Add a class to the body to prevent any background scrolling
    document.body.classList.add('overflow-hidden');
    
    // Force content to be ready after a small delay
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 50);
    
    // Clean up when unmounting
    return () => {
      document.body.classList.remove('overflow-hidden');
      clearTimeout(timer);
    };
  }, []);
  
  // Determine base route for the "Close" button
  const getBaseRoute = () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('explore')) {
      return '/explore';
    } else if (currentPath.includes('invest')) {
      return '/invest';
    }
    return '/';
  };
  
  const baseRoute = getBaseRoute();
  
  return (
    <main className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      
      <section className="container relative min-h-screen pt-28 pb-16">
        <div className={`glass-morphism rounded-lg p-8 text-white relative ${contentReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <Link 
            to={baseRoute} 
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Close content"
            reloadDocument
          >
            <X size={24} />
          </Link>
          
          <h1 className="text-4xl font-bold mb-8">{title}</h1>
          
          <div className="glass-morphism rounded-lg p-6">
            <p className="text-xl">Content coming soon...</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Placeholder;
