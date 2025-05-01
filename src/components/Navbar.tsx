
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "../hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();

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

  const menuItems = [
    { title: "About", path: "/about" },
    { title: "News", path: "/news" },
    { title: "Events", path: "/events" },
  ];

  const NavLinks = () => (
    <div className="flex items-center gap-6">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-white hover:text-white/80 transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="pt-12">
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-4 py-2 text-lg hover:bg-accent rounded-md transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-white">
          TALLAWARRA
        </Link>

        <div className="flex items-center gap-4">
          {user && !isMobile && <NavLinks />}
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {isMobile && <MobileMenu />}
                <span className="text-white hidden md:inline">Welcome, {user.name}</span>
                <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <Button 
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/60 font-medium px-6 py-2 rounded-md shadow-lg flex items-center gap-2" 
                asChild
              >
                <Link to="/signin"><LogIn size={18} /> Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
