
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar with logout */}
      <nav className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold">TALLAWARRA POINT</div>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white/20"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">Welcome to Tallawarra Point Residential Subdivision</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-bold mb-3">Project Overview</h2>
              <p className="text-gray-700">
                Explore the latest developments and plans for the Tallawarra Point Residential Subdivision.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-bold mb-3">Available Lots</h2>
              <p className="text-gray-700">
                Browse through available residential lots and their specifications.
              </p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <h2 className="text-xl font-bold mb-3">Community Features</h2>
              <p className="text-gray-700">
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
