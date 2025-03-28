
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-bold text-white">
          TALLAWARRA
        </div>
        <div className="hidden md:block">
          <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
