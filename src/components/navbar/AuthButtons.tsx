
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

type User = {
  name: string;
  [key: string]: any;
};

type AuthButtonsProps = {
  user: User | null;
  isMobile: boolean;
};

export const AuthButtons = ({ user, isMobile }: AuthButtonsProps) => {
  if (user) {
    return (
      <>
        <span className="text-white hidden md:inline whitespace-nowrap">Welcome, {user.name}</span>
        <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white whitespace-nowrap ml-auto sm:ml-0" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      </>
    );
  }

  return (
    <Button 
      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/60 font-medium px-3 sm:px-6 py-1 sm:py-2 rounded-md shadow-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap ml-auto sm:ml-0" 
      asChild
    >
      <Link to="/signin"><LogIn size={16} className="hidden sm:inline" /> Sign In</Link>
    </Button>
  );
};
