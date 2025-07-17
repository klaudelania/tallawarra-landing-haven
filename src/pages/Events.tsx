
import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [showEvents, setShowEvents] = useState(true);
  const navigate = useNavigate();
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Our First Stakeholder Engagement Meeting This Year",
      date: "August 15, 2025",
      time: "5:00 PM",
      location: "Stantect Office - 16 Burelli St, Wollongong NSW 2500",
      description: "We are excited to announce our Our First Stakeholder Engagement Meeting This Year. The meeting will be held on Friday 15 August 2025 at Stantect office address: 16 Burelli St, Wollongong NSW 2500 at 17:00. Stay tuned for future dates and meetings."
    },
    {
      id: 2,
      title: "Next Stakeholder Engagement Meeting",
      date: "TBA",
      time: "TBA",
      location: "TBA",
      description: "Stay tuned for the next meeting date."
    }
  ];

  const handleClose = () => {
    // Navigate to home page instead of just hiding the events
    navigate('/', { replace: true });
  };

  return (
    <main className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      
      <section className="container relative min-h-screen pt-28 pb-16">
        {showEvents && (
          <div className="glass-morphism rounded-lg p-8 text-white relative">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Close events"
            >
              <X size={24} />
            </button>
            
            <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="glass-morphism rounded-lg p-6 hover:bg-white/30 transition-colors">
                  <h2 className="text-2xl font-semibold">{event.title}</h2>
                  <div className="mt-3 space-y-1 text-white/80">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Date:</span> {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Time:</span> {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Location:</span> {event.location}
                    </p>
                  </div>
                  <p className="mt-4">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Events;
