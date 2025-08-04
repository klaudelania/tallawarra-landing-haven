
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Slideshow moved to App.tsx */}
      
      {/* Navbar with logout */}
      <nav className="bg-white/20 backdrop-blur-lg text-white shadow-md border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold">TALLAWARRA POINT</div>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            <Button
              variant="outline"
              className="text-white border-white/60 hover:bg-white/20 backdrop-blur-sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-white/20 backdrop-blur-lg rounded-lg border border-white/40 shadow-md p-6 text-white">
          <h1 className="text-3xl font-bold mb-6">Welcome to Tallawarra Point Residential Subdivision</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h2 className="text-xl font-bold mb-3 text-white">Project Overview</h2>
              <p className="text-white/90">
                Explore the latest developments and plans for the Tallawarra Point Residential Subdivision.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h2 className="text-xl font-bold mb-3 text-white">Available Lots</h2>
              <p className="text-white/90">
                Browse through available residential lots and their specifications.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h2 className="text-xl font-bold mb-3 text-white">Community Features</h2>
              <p className="text-white/90">
                Learn about the amenities and features planned for the community.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
