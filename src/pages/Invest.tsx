
import React from 'react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';

const Invest = () => {
  return (
    <div className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      <div className="container mx-auto pt-32 px-4 pb-16">
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
