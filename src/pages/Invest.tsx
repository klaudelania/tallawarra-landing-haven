
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';

const Invest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Force proper navigation to main page when coming from submenu
  useEffect(() => {
    // If we're coming from a submenu page, ensure we're on the main page with a hard reload if needed
    const comingFromSubmenu = location.state?.fromSubmenu;
    if (comingFromSubmenu === false) {
      // Force a clean reload of the page on Safari
      navigate('/invest', { replace: true, state: { reloaded: true } });
      // Refresh the page after a short delay to ensure proper rendering on Safari
      if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        window.location.reload();
      }
    }
  }, [location, navigate]);

  return (
    <div className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      <div className="container mx-auto pt-32 px-4 pb-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-6">Invest</h1>
        <div className="glass-morphism rounded-lg p-6 mb-8 text-white">
          <p className="mb-4">
            Welcome to the Investment section. Here you can find information about investment
            opportunities related to the Tallawarra project.
          </p>
          <p>
            Please select one of the submenu options to explore specific investment opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invest;
