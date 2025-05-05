
import { Link } from "react-router-dom";
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

  // Return null when there's no user - removing the Sign In button
  return null;
};
