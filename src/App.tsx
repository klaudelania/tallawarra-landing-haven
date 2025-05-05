
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import People from "./pages/People";
import News from "./pages/News";
import Events from "./pages/Events";
import Explore from "./pages/Explore";
import Invest from "./pages/Invest";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/people" element={<People />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/invest" element={<Invest />} />
            
            {/* Placeholder pages for submenu items */}
            <Route path="/community-center" element={<Placeholder title="Community Center" />} />
            <Route path="/parks-recreation" element={<Placeholder title="Parks & Recreation" />} />
            <Route path="/conservation" element={<Placeholder title="Conservation" />} />
            <Route path="/masterplan" element={<Placeholder title="Masterplan" />} />
            <Route path="/design-guidelines" element={<Placeholder title="Design Guidelines" />} />
            <Route path="/sustainability" element={<Placeholder title="Sustainability" />} />
            <Route path="/land-releases" element={<Placeholder title="Land Releases" />} />
            <Route path="/property" element={<Placeholder title="Property" />} />
            <Route path="/commercial" element={<Placeholder title="Commercial" />} />
            <Route path="/news-events-3" element={<Placeholder title="News & Events 3" />} />
            
            {/* Explore submenu placeholders */}
            <Route path="/explore-1" element={<Placeholder title="Explore 1" />} />
            <Route path="/explore-2" element={<Placeholder title="Explore 2" />} />
            <Route path="/explore-3" element={<Placeholder title="Explore 3" />} />
            
            {/* Invest submenu placeholders */}
            <Route path="/invest-1" element={<Placeholder title="Invest 1" />} />
            <Route path="/invest-2" element={<Placeholder title="Invest 2" />} />
            <Route path="/invest-3" element={<Placeholder title="Invest 3" />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
