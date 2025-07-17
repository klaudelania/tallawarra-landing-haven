
import React from "react";
import Navbar from "../components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const faqItems = [
    {
      question: "What is the Tallawarra Masterplan development?",
      answer: "The proposed development is part of the 'Northern Precinct' within the larger Tallawarra Lands project. This initiative aims to foster a new circular economy in the Illawarra/Shoalhaven region, emphasising community building, job creation, and an appreciation for the natural environment and surrounding landscape. The project seeks to enhance the waterfront area, transforming it into a lifestyle destination across several precincts. The goal is to establish a highly livable community that maintains a strong connection to Lake Illawarra.\n\nThis major development project, \"Tallawarra Point\", encompasses a mix of residential, retail, and industrial spaces spread across 320 hectares of land, which is strategically situated between the Princes Highway and Lake Illawarra. This initiative aims to create interconnected precincts that enhance the Tallawarra area, providing a comprehensive open space network that links the lake foreshore to the foothills of Mount Brown and beyond. The project includes environmental rehabilitation efforts in natural areas to improve wildlife connectivity, as well as the establishment of destination parks, playgrounds, and recreational spaces for community use.\n\nThe Northern Precinct is a residential area situated along the foreshore of Lake Illawarra. Its urban design prioritises maximising views and enhancing connectivity, while being mindful of the natural topography of the site. A primary collector road curves around the lakefront, providing optimal visibility and easy access for residents and visitors.\n\nThe objective is to create a mixed-use land development that is finely integrated into its location, aimed at fostering a sustainable community and strengthening the local economy. The project will offer a variety of housing types to accommodate residents of all ages, promoting a diverse community. To support sustainability, a combination of housing typologies and affordability initiatives will be implemented.\n\nAdditionally, the ridgeline adjacent to the housing precinct will be preserved and enhanced through the establishment of a wildlife and environmental corridor along the ridge and biodiversity conservation area. A designated area along the southern boundary will also be allocated for future open space and recreational purposes, complete with an environmental corridor."
    },
    {
      question: "Where is the Tallawarra Masterplan located?",
      answer: "Nestled within the Illawarra-Shoalhaven region, Tallawarra Lands have potential to be one of the destinations as it sits on a scenic landscape setting including lake, beaches, and Illawarra Escarpment.\n\nTallawarra will cover 110 hectares of land on the Lakeside Precinct and 210 hectares of land on the Central Precinct. The Lakeside Precinct stretches along 1.5km of waterfront area which has potential to address raising demand of housing that accommodates recreational and tourism purpose of the region."
    },
    {
      question: "What types of properties will be available in the development?",
      answer: "The development will consist of 1257 lots across the whole site, designed to cater to different landforms. This will include more compact housing options on the flatter lower slopes, while conventional and larger lots will be situated on the sloping areas.\n\nThe development will offer a variety of property types, including:\n• Residential homes (single-family, townhouses, and apartments)\n• Village centre and retail outlets\n• Green spaces, parks, and recreational facilities"
    },
    {
      question: "What is Tallawarra Residential Subdivision?",
      answer: "Tallawarra is a premium residential subdivision offering exclusive land lots in a beautiful setting with modern amenities and stunning natural surroundings."
    },
    {
      question: "Where is Tallawarra located?",
      answer: "Tallawarra is located in a prime position with easy access to amenities while being surrounded by natural beauty. Please contact us for specific location details."
    },
    {
      question: "What size lots are available?",
      answer: "We offer a variety of lot sizes to suit different needs and preferences. Contact our sales team for current availability and specific dimensions."
    },
    {
      question: "What amenities will be available?",
      answer: "Tallawarra is planned to include parks, walking trails, community spaces, and easy access to local amenities. The development is designed with modern living and community in mind."
    },
    {
      question: "How can I register my interest?",
      answer: "You can register your interest by contacting us directly at 1800 899 928 or via email at info@bridgehill.com.au. Our team will provide you with all the information you need."
    }
  ];

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-800 to-indigo-900">
      <Navbar />
      
      <div className="container max-w-4xl mx-auto pt-32 pb-20 px-4 relative">
        <Button 
          onClick={handleClose}
          variant="ghost" 
          size="icon" 
          className="absolute top-20 right-4 text-white hover:bg-white/30 transition-colors rounded-full"
          aria-label="Close FAQ"
        >
          <X size={24} />
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/40 p-4 md:p-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-white/30 px-4 rounded-lg bg-white/10">
                <AccordionTrigger className="text-white hover:text-white/90 text-lg font-medium py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/90 pb-4 px-2 whitespace-pre-line">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center text-white/80">
          <p className="mb-2">Still have questions?</p>
          <p className="font-medium">
            Contact us at{" "}
            <a href="tel:1800899928" className="text-white hover:underline">
              1800 899 928
            </a>{" "}
            or{" "}
            <a href="mailto:info@bridgehill.com.au" className="text-white hover:underline">
              info@bridgehill.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
