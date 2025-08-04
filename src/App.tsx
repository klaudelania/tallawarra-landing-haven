
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
import Video1 from "./pages/Video1";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import TallawarraHome from "./pages/TallawarraHome";
import Slideshow from "./components/Slideshow";
import { SlideshowProvider } from "./context/SlideshowContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SlideshowProvider>
        <TooltipProvider>
          <Slideshow />
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
            
            {/* Explore submenu - Only Video 1 remains */}
            <Route path="/video-1" element={<Video1 />} />
            
            {/* Invest submenu - Only one item remains */}
            <Route path="/invest-1" element={<TallawarraHome />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SlideshowProvider>
  </AuthProvider>
</QueryClientProvider>
);

export default App;
