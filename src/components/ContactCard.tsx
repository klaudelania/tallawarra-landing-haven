
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactCard = () => {
  const googleMapsUrl = "https://maps.google.com/?q=Tallawarra+Subdivision";
  
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call Us",
      value: "+61 2 1234 5678",
      link: "tel:+61212345678"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "info@tallawarra.com",
      link: "mailto:info@tallawarra.com"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Website",
      value: "tallawarra.com",
      link: "https://tallawarra.com"
    }
  ];

  return (
    <div className="relative">
      {/* Lens distortion effect background */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[15px] rounded-xl transform rotate-1 scale-105"></div>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[10px] rounded-xl transform -rotate-1 scale-[1.02]"></div>
      
      <Card className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-xl rounded-xl relative z-10 border-white/40">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
          
          <div className="space-y-4 mb-6">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.link}
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full">{item.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
          
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full gap-2 bg-primary/90 backdrop-blur-sm hover:bg-primary shadow-lg">
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
