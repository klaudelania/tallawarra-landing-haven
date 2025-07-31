
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
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
    name: "Sarah Johnson",
    role: "Chief Executive Officer",
    description: "Sarah brings over 20 years of leadership experience in sustainable development. She oversees all strategic initiatives and ensures Tallawarra's vision becomes reality.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Michael Chang",
    role: "Chief Operations Officer",
    description: "Michael manages day-to-day operations across all development projects. His background in urban planning helps create balanced, livable communities.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Jennifer Walker",
    role: "Head of Sustainability",
    description: "Jennifer leads our sustainability initiatives, ensuring all developments meet or exceed environmental standards while preserving natural resources.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Community Relations Director",
    description: "David fosters relationships with local communities and stakeholders. He ensures our projects reflect community needs and values.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Design Director",
    description: "Emma oversees architectural and landscape design elements. Her innovative approach creates distinctive spaces that harmonize with natural surroundings.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Robert Chen",
    role: "Financial Director",
    description: "Robert manages financial strategy and investment relationships. His expertise ensures sustainable growth and strong returns for our stakeholders.",
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
    <main className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      <section className="container relative flex-1 pt-28 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-white rounded-xl p-8 w-full shadow-md">
            <Link to="/" className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <X size={24} />
                <span className="sr-only">Close</span>
              </Button>
            </Link>
            
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Our Team</h1>
            
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Meet the dedicated professionals behind Tallawarra. Our diverse team combines expertise 
              in urban planning, sustainability, community engagement, and design to create 
              exceptional living environments.
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isPageReady ? 'animate-fade-in' : 'opacity-0'}`}>
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center">{member.name}</h3>
                  <p className="text-blue-600 mb-3 text-center">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.description}</p>
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
