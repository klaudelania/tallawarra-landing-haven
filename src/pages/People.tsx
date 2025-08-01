
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import Footer from '../components/Footer';
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Yibin Xu",
    role: "Managing Director Bridgehill Tallawarra",
    description: "Yibin leads the strategic direction and overall management of the Tallawarra Point development project.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Klaude Lania",
    role: "Project Development Director Bridgehill Tallawarra",
    description: "Klaude oversees the development process and ensures project milestones are met effectively.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Andrzej Pieńkowski",
    role: "Construction Manager Bridgehill Tallawarra",
    description: "Andrzej manages all construction activities and ensures quality delivery of the development.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Craig Hood",
    role: "Practice Leader – Civil Engineering Stantec",
    description: "Craig leads the civil engineering aspects of the project with expertise in infrastructure development.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Jen Southan",
    role: "Principal Planner & Project Technical Lead (Planning) Stantec",
    description: "Jen provides planning expertise and technical leadership for the project's planning requirements.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Ellen Rowles",
    role: "Town Planner Stantec",
    description: "Ellen manages town planning processes and regulatory compliance for the development.",
    image: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Lee Morton",
    role: "National Practice Leader Stantec Senior Principal Communications & Engagement",
    description: "Lee leads communications and community engagement strategies for the project.",
    image: "/placeholder.svg"
  }
];

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
      {/* Background Slideshow */}
      <Slideshow />
      
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
            
            <h1 className="text-4xl font-bold mb-6 text-center text-white">Tallawarra Point Team</h1>
            
            <p className="text-center text-white/90 mb-10 max-w-3xl mx-auto">
              Meet the dedicated professionals behind Tallawarra Point. Our diverse team combines expertise 
              in urban planning, sustainability, community engagement, and design to create 
              exceptional living environments.
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white/20 border-2 border-white/30">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center">{member.name}</h3>
                  <p className="text-blue-200 mb-3 text-center font-medium">{member.role}</p>
                  <p className="text-white/90 text-center">{member.description}</p>
                </div>
              ))}
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
