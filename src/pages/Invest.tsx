
import React from 'react';
import Navbar from '../components/Navbar';

const Invest = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto pt-32 px-4">
        <h1 className="text-4xl font-bold text-white mb-6">Invest</h1>
        <div className="bg-background/20 backdrop-blur-md rounded-lg p-6 mb-8">
          <p className="text-white/80 mb-4">
            Welcome to the Investment section. Here you can find information about investment
            opportunities related to the Tallawarra project.
          </p>
          <p className="text-white/80">
            This page is currently under development. Investment details and options will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invest;
