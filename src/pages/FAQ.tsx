
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
                <AccordionContent className="text-white/90 pb-4 px-2">
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
