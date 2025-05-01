
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <main className="relative min-h-screen">
      {/* Background Slideshow */}
      <Slideshow />
      
      {/* Navbar */}
      <Navbar />
      
      <section className="container relative min-h-screen pt-28 pb-16 flex justify-center">
        <div className="relative">
          {/* Lens distortion effect background - matching ContactCard */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[10px] rounded-xl transform rotate-1 scale-105"></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[5px] rounded-xl transform -rotate-1 scale-[1.02]"></div>
          
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-xl p-8 text-white relative z-10 w-full max-w-2xl border border-white/60">
            <Link to="/" className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <X size={24} />
                <span className="sr-only">Close</span>
              </Button>
            </Link>
            
            <h1 className="text-4xl font-bold mb-6 text-center">About Tallawarra</h1>
            
            <div className="space-y-6 px-4 md:px-8 text-justify">
              <p>
                Tallawarra is a premium residential subdivision located in the heart of natural beauty, 
                offering a perfect balance between modern living and serene environment.
              </p>
              
              <p>
                Our vision is to create a sustainable community where residents can enjoy the best 
                of both worlds - the convenience of urban living with the tranquility of nature.
              </p>
              
              <p>
                Tallawarra is poised to become one of the most sought-after residential 
                areas with its thoughtfully designed spaces and community-focused amenities.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Our Mission</h2>
              <p>
                To develop sustainable, well-connected communities that enhance the quality of life 
                for our residents while preserving the natural environment.
              </p>

              <div className="mt-10 pt-6 border-t border-white/20">
                <h2 className="text-2xl font-semibold mb-4 text-center">Bridgehill's Vision for Tallawarra</h2>
                
                <p>
                  Bridgehill is proud to introduce Tallawarra — a thoughtfully planned, lakeside community 
                  shaped by the land, its history, and the aspirations of future residents.
                </p>
                
                <p>
                  Located between the slopes of Mount Brown and Lake Illawarra, this unique site offers 
                  more than just a new neighbourhood. It's an opportunity to build a place of enduring 
                  value — a place where people of all ages can live well, feel connected, and be proud 
                  to call home.
                </p>
                
                <p>
                  At Tallawarra, we are working to deliver diverse, well-designed housing, supported 
                  by local shops, walkable streets, and welcoming public spaces. Our vision is grounded 
                  in the belief that great communities grow from liveability, access to nature and 
                  facilities, but most importantly opportunities for everyone to thrive — whether 
                  through work, recreation, or connection with neighbours.
                </p>
                
                <p>
                  Tallawarra isn't about short-term gains. It's about creating a resilient and vibrant 
                  city — one that balances growth with care for the environment and respect for the 
                  landscape. We are committed to protecting and enhancing this extraordinary part of 
                  the Illawarra for future generations.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 text-center">Our Urban Principles</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creating beautiful, high-quality places that reflect the identity of the area</li>
                  <li>Encouraging housing diversity and flexible density to meet real community needs</li>
                  <li>Designing safe, active streetscapes with local businesses at their heart</li>
                  <li>Offering welcoming and inclusive public spaces that invite interaction</li>
                  <li>Supporting local food systems and economic opportunity</li>
                  <li>And most importantly, laying the foundations for a strong, proud community grounded in belonging and stewardship</li>
                </ul>
                
                <p className="mt-6">
                  Tallawarra isn't just a development. It's a promise — to do things thoughtfully, 
                  with care, and in partnership with the community.
                </p>
                
                <p>
                  We invite you to help shape this place. Because together, we're building more than homes.
                </p>
                
                <p className="font-semibold mt-2">
                  We're building a future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
