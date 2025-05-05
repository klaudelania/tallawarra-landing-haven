
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";

type PlaceholderProps = {
  title: string;
};

const Placeholder = ({ title }: PlaceholderProps) => {
  const [showContent, setShowContent] = useState(true);
  const navigate = useNavigate();
  
  const handleClose = () => {
    setShowContent(false);
    
    // Get the base route to navigate back to
    const currentPath = window.location.pathname;
    const baseRoute = currentPath.includes('explore') ? '/explore' : 
                      currentPath.includes('invest') ? '/invest' : '/';
    
    // Instead of conditional navigation, let's always force a full page reload
    // This ensures consistent behavior across all browsers, including Safari on iOS
    setTimeout(() => {
      window.location.href = baseRoute;
    }, 200);
  };
  
  // Ensure content is visible when component mounts
  useEffect(() => {
    setShowContent(true);
    
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      
      <section className="container relative min-h-screen pt-28 pb-16">
        {showContent && (
          <div className="glass-morphism rounded-lg p-8 text-white relative animate-fade-in">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Close content"
            >
              <X size={24} />
            </button>
            
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            
            <div className="glass-morphism rounded-lg p-6">
              <p className="text-xl">Content coming soon...</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Placeholder;
