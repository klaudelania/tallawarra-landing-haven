
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useIsMobile } from "../../hooks/use-mobile";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { AuthButtons } from "./AuthButtons";
import { VideoMuteButton } from "../VideoMuteButton";
import { publicMenuItems, protectedMenuItems } from "./menuItems";

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container">
        <div className="flex flex-wrap items-center justify-between w-full">
          {/* Logo and title - always on first row, left aligned */}
          <Logo />

          {/* Center: Mute Button */}
          <div className="flex-1 flex justify-center">
            <VideoMuteButton />
          </div>

          {/* Navigation links and buttons with consistent alignment */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <NavLinks 
              publicMenuItems={publicMenuItems}
              protectedMenuItems={protectedMenuItems}
            />
            {isMobile && (
              <MobileMenu
                publicMenuItems={publicMenuItems}
                protectedMenuItems={protectedMenuItems}
              />
            )}
            <AuthButtons user={user} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
