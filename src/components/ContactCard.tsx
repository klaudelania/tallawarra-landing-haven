
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactCard = () => {
  const googleMapsUrl = "https://maps.google.com/?q=Tallawarra+Subdivision";
  
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      label: "Call Us",
      value: "+61 2 1234 5678",
      link: "tel:+61212345678"
    },
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      label: "Email",
      value: "info@tallawarra.com",
      link: "mailto:info@tallawarra.com"
    },
    {
      icon: <Globe className="h-5 w-5 text-white" />,
      label: "Website",
      value: "tallawarra.com",
      link: "https://tallawarra.com"
    }
  ];

  return (
    <div className="relative">
      {/* Lens distortion effect background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[10px] rounded-xl transform rotate-1 scale-105"></div>
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[5px] rounded-xl transform -rotate-1 scale-[1.02]"></div>
      
      <Card className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-xl rounded-xl relative z-10 border border-white/60">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          
          <div className="space-y-4 mb-6">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.link}
                className="flex items-center gap-3 hover:text-white/80 transition-colors text-white"
              >
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/40">{item.icon}</div>
                <div>
                  <p className="text-sm text-white/70">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
          
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full gap-2 bg-primary/80 backdrop-blur-sm hover:bg-primary shadow-lg border border-white/20 text-white">
              <MapPin className="h-4 w-4" />
              Get Directions
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ContactCard;
