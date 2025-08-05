import { Heart } from "lucide-react";

interface HeartToggleButtonProps {
  onToggle: () => void;
  isContentVisible: boolean;
}

export const HeartToggleButton = ({ onToggle, isContentVisible }: HeartToggleButtonProps) => {
  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center">
      <button
        onClick={onToggle}
        className="group flex flex-col items-center transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          <Heart 
            className={`w-8 h-8 transition-all duration-300 ${
              isContentVisible 
                ? "text-white/80 hover:text-red-400 fill-transparent" 
                : "text-red-400 fill-red-400 animate-pulse"
            }`} 
          />
        </div>
        <span className="text-white/80 text-xs mt-1 font-medium group-hover:text-white transition-colors duration-300">
          Press me
        </span>
      </button>
    </div>
  );
};