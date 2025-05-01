
import React from 'react';
import Navbar from '../components/Navbar';

const Explore = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto pt-32 px-4">
        <h1 className="text-4xl font-bold text-white mb-6">Explore</h1>
        <div className="bg-background/20 backdrop-blur-md rounded-lg p-6 mb-8">
          <p className="text-white/80 mb-4">
            Welcome to the Explore section. This area provides information about different aspects
            of the Tallawarra project that you can explore.
          </p>
          <p className="text-white/80">
            This page is currently under development. More content will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
