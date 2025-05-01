
import React from "react";

interface LoadingIndicatorProps {
  progress: number;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 -z-10 flex flex-col items-center justify-center bg-gray-900">
      <p className="text-white text-lg mb-4">Loading slideshow images... {progress}%</p>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
