
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Partner = {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
};

const partners: Partner[] = [
  {
    id: 1,
    name: "Stantec",
    role: "Engineering & Planning Partner",
    description: "Leading engineering and planning consultancy providing comprehensive technical expertise for the Tallawarra Point development.",
    image: "/lovable-uploads/8e050b5b-9ebf-4a9f-9f4d-39212bce3762.png"
  },
  {
    id: 2,
    name: "3EM Architects",
    role: "Architectural Design Partner",
    description: "Innovative architectural firm specializing in sustainable and contemporary design solutions for residential developments.",
    image: "/lovable-uploads/2e472cd2-7509-487b-ba37-cdeb0dcf2be4.png"
  },
  {
    id: 3,
    name: "Biosis",
    role: "Environmental Consulting Partner",
    description: "Environmental consulting specialists providing ecological assessment and biodiversity management for sustainable development.",
    image: "/lovable-uploads/d2906550-9373-45a3-b271-5550074b05c3.png"
  },
  {
    id: 4,
    name: "Ausconnex",
    role: "Infrastructure & Connectivity Partner",
    description: "Infrastructure and connectivity solutions provider ensuring seamless integration of modern utilities and communications.",
    image: "/lovable-uploads/308cc9ef-5dcb-4a8a-86d5-da0380116bab.png"
  },
  {
    id: 5,
    name: "Ecoplanning",
    role: "Ecological Planning Partner",
    description: "Specialized ecological planning consultancy focused on environmental impact assessment and sustainable development practices.",
    image: "/lovable-uploads/25accd8c-adf0-4431-8cc7-6759b407a80e.png"
  }
];

// Partners page component
const People = () => {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.className = '';
    
    const timer = setTimeout(() => setIsPageReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Slideshow moved to App.tsx */}
      
      {/* Navbar */}
      <Navbar />
      
      <section className="container relative flex-1 pt-28 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-white/20 backdrop-blur-lg rounded-xl p-8 w-full border border-white/60 text-white">
            <Link to="/" className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <X size={24} />
                <span className="sr-only">Close</span>
              </Button>
            </Link>
            
            <h1 className="text-4xl font-bold mb-6 text-center text-white">Our Partners</h1>
            
            <p className="text-center text-white/90 mb-10 max-w-3xl mx-auto">
              Meet our trusted partners who bring specialized expertise to the Tallawarra Point development. 
              Together, we combine excellence in engineering, architecture, environmental consulting, 
              and sustainable planning to create exceptional communities.
            </p>
            
            <div className={`${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
              {/* First row - Stantec centered */}
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-sm">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden bg-white/90 border-2 border-white/30 flex items-center justify-center p-2">
                      <img 
                        src={partners[0].image} 
                        alt={partners[0].name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center">{partners[0].name}</h3>
                    <p className="text-blue-200 mb-3 text-center font-medium">{partners[0].role}</p>
                    <p className="text-white/90 text-center">{partners[0].description}</p>
                  </div>
                </div>
              </div>
              
              {/* Remaining rows - 2 cards per row for better layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {partners.slice(1).map((partner) => (
                  <div key={partner.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden bg-white/90 border-2 border-white/30 flex items-center justify-center p-2">
                      <img 
                        src={partner.image} 
                        alt={partner.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center">{partner.name}</h3>
                    <p className="text-blue-200 mb-3 text-center font-medium">{partner.role}</p>
                    <p className="text-white/90 text-center">{partner.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default People;
