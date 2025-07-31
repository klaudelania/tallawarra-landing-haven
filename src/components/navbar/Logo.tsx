
import { Link } from "react-router-dom";

export const Logo = () => (
  <div className="flex items-center mb-2 sm:mb-0">
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/logo/logowhite.png" 
        alt="Tallawarra Logo" 
        className="h-7 sm:h-8 md:h-9 w-auto object-contain" 
      />
      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        <span className="whitespace-nowrap">TALLAWARRA POINT</span>
      </span>
    </Link>
  </div>
);
