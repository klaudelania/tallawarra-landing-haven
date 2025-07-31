import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-white/70 text-sm px-4 py-8 mt-8">
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="rounded-full p-2 border-2 border-white inline-flex items-center justify-center" style={{ width: "90px", height: "90px" }}>
          <img 
            src="/logo/logowhite.png" 
            alt="Tallawarra Point Logo" 
            className="object-contain"
            style={{ maxWidth: "80%", maxHeight: "80%" }} 
          />
        </div>
        <div className="text-white/80 italic text-lg mt-2">
          Coming soon...
        </div>
      </div>
      <div className="text-xs sm:text-sm mt-2">
        © {new Date().getFullYear()} Tallawarra Point Residential Subdivision | <a href="https://www.tallawarra.com.au" className="hover:text-white transition-colors">www.tallawarra.com.au</a> | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;