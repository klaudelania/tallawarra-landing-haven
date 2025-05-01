
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Menu, X, ExternalLink, ChevronDown } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

  // Separate menu items into public and protected
  const publicMenuItems = [
    { title: "About", path: "/about" },
  ];
  
  const protectedMenuItems = [
    { 
      title: "News & Events", 
      path: "/news-events",
      submenu: [
        { title: "News", path: "/news" },
        { title: "Events", path: "/events" },
        { title: "News & Events 3", path: "#" }
      ]
    },
    { 
      title: "Explore", 
      path: "/explore",
      submenu: [
        { title: "Explore 1", path: "#" },
        { title: "Explore 2", path: "#" },
        { title: "Explore 3", path: "#" }
      ]
    },
    { 
      title: "Invest", 
      path: "/invest",
      submenu: [
        { title: "Invest 1", path: "#" },
        { title: "Invest 2", path: "#" },
        { title: "Invest 3", path: "#" }
      ]
    },
  ];

  const NavLinks = () => (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex gap-4">
        {/* Public menu items - no auth required */}
        {publicMenuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link
              to={item.path}
              className="text-white hover:text-white/80 transition-colors px-2 py-1"
            >
              {item.title}
            </Link>
          </NavigationMenuItem>
        ))}
        
        {/* Previously protected menu items - now accessible to all */}
        {protectedMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <DropdownMenu>
              <DropdownMenuTrigger 
                className="text-white hover:text-white/80 transition-colors px-2 py-1 flex items-center gap-1"
              >
                {item.title} <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/60 shadow-lg">
                {item.submenu.map((subitem) => (
                  <DropdownMenuItem key={subitem.path} className="text-white hover:bg-white/20 hover:text-white rounded-lg transition-colors">
                    <Link to={subitem.path} className="w-full px-4 py-2">
                      {subitem.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        ))}
        
        {/* External link - always public */}
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
      <SheetContent side="top" className="pt-12 bg-white/20 backdrop-blur-lg border border-white/60">
        <div className="flex flex-col gap-4">
          {/* Public menu items - no auth required */}
          {publicMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-4 py-2 text-lg hover:bg-white/20 text-white rounded-md transition-colors"
            >
              {item.title}
            </Link>
          ))}
          
          {/* Previously protected menu items - now accessible to all */}
          {protectedMenuItems.map((item) => (
            <div key={item.title} className="flex flex-col">
              <Collapsible>
                <CollapsibleTrigger
                  className="px-4 py-2 text-lg hover:bg-white/20 text-white rounded-md transition-colors flex items-center justify-between w-full"
                >
                  {item.title}
                  <ChevronDown size={18} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-8 flex flex-col gap-2 mt-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        className="px-4 py-1 text-md hover:bg-white/20 text-white rounded-md transition-colors"
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
          
          <a
            href="https://www.bridgehill.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-lg hover:bg-white/20 text-white rounded-md transition-colors flex items-center gap-2"
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
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo/logowhite.png" 
            alt="Tallawarra Logo" 
            className="h-[115%]" // Make it 15% taller than the text
            style={{ maxHeight: "36px" }} // Base height reference for smaller screens
          />
          <span className="text-2xl md:text-3xl font-bold text-white">
            TALLAWARRA
          </span>
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
