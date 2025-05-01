
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Menu, X, ExternalLink } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "../hooks/use-mobile";
import { useToast } from "../hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();

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

  const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      toast({
        title: "Sign in required",
        description: "Please sign in to access this section",
        variant: "default",
      });
    }
  };

  const NavLinks = () => (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex gap-4">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link
              to={item.path}
              onClick={(e) => handleProtectedNavigation(e, item.path)}
              className="text-white hover:text-white/80 transition-colors px-2 py-1"
            >
              {item.title}
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <a
            href="https://www.bridgehill.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors px-2 py-1 flex items-center gap-1"
          >
            Bridgehill Group <ExternalLink size={14} />
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white md:hidden">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="pt-12">
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleProtectedNavigation(e, item.path)}
              className="px-4 py-2 text-lg hover:bg-accent rounded-md transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <a
            href="https://www.bridgehill.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-lg hover:bg-accent rounded-md transition-colors flex items-center gap-2"
          >
            Bridgehill Group <ExternalLink size={18} />
          </a>
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
          <NavLinks />
          
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
              <>
                {isMobile && <MobileMenu />}
                <Button 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/60 font-medium px-6 py-2 rounded-md shadow-lg flex items-center gap-2" 
                  asChild
                >
                  <Link to="/signin"><LogIn size={18} /> Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
