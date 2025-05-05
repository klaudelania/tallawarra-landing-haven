
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactCard = () => {
  const googleMapsUrl = "https://maps.google.com/?q=Tallawarra+Subdivision";
  
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      label: "Call Us",
      value: "1800 899 928",
      link: "tel:1800899928"
    },
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      label: "International",
      value: "+61 2 8732 8600",
      link: "tel:+61287328600"
    },
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      label: "Email",
      value: "info@bridgehill.com.au",
      link: "mailto:info@bridgehill.com.au"
    },
    {
      icon: <Globe className="h-5 w-5 text-white" />,
      label: "Website",
      value: "bridgehill.com.au",
      link: "https://www.bridgehill.com.au"
    }
  ];

  return (
    <Card className="w-full max-w-xs bg-white/20 backdrop-blur-lg rounded-xl border border-white/60 mt-6 sm:mt-8">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contact Us</h2>
        
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {contactInfo.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className="flex items-center gap-2 sm:gap-3 hover:text-white/80 transition-colors text-white"
            >
              <div className="flex items-center justify-center min-w-10 w-10 h-10 rounded-full bg-black/30 border border-white/40 shrink-0">
                {item.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs sm:text-sm text-white/70">{item.label}</p>
                <p className="font-medium text-sm sm:text-base truncate">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
        
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full gap-2 bg-primary/80 backdrop-blur-sm hover:bg-primary border border-white/20 text-white text-sm py-2 h-auto">
            <MapPin className="h-4 w-4" />
            Get Directions
          </Button>
        </a>
      </div>
    </Card>
  );
};

export default ContactCard;
