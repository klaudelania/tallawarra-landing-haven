import { useState } from "react";
import { X, Calendar, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const [showEvents, setShowEvents] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    navigate('/', { replace: true });
  };

  const generateCalendarInvite = () => {
    if (!emailAddress) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the calendar invite.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Create calendar event details
    const eventDate = new Date('2025-08-15T17:00:00');
    const endDate = new Date('2025-08-15T18:00:00');
    
    // Format dates for calendar
    const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    // Create calendar URL (Google Calendar)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Our First Stakeholder Engagement Meeting This Year')}&dates=${startTime}/${endTime}&details=${encodeURIComponent('We are excited to announce our Our First Stakeholder Engagement Meeting This Year. The meeting will be held on Friday 15 August 2025 at Stantect office address: 16 Burelli St, Wollongong NSW 2500 at 17:00.')}&location=${encodeURIComponent('Stantect Office - 16 Burelli St, Wollongong NSW 2500')}`;
    
    // Create mailto link with calendar invite
    const subject = encodeURIComponent('Calendar Invite: Our First Stakeholder Engagement Meeting This Year');
    const body = encodeURIComponent(`Hello,

You have requested a calendar invite for our upcoming stakeholder engagement meeting.

Event Details:
- Date: August 15, 2025
- Time: 5:00 PM
- Location: Stantect Office - 16 Burelli St, Wollongong NSW 2500

Please add this event to your calendar using the following link:
${calendarUrl}

We look forward to seeing you there!

Best regards,
The Team`);
    
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    // Open calendar and email
    window.open(calendarUrl, '_blank');
    window.open(mailtoUrl, '_blank');
    
    toast({
      title: "Calendar Invite Generated",
      description: "Calendar invite has been created and email draft opened. Please send the email to complete the process.",
    });
    
    setEmailAddress("");
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
                  
                  {event.id === 1 && (
                    <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={20} />
                        <h3 className="text-lg font-medium">Get Calendar Invite</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="email" className="text-white/90">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/60"
                          />
                        </div>
                        <Button
                          onClick={generateCalendarInvite}
                          className="w-full bg-primary/80 backdrop-blur-sm hover:bg-primary border border-white/20 text-white"
                          size="sm"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Generate Calendar Invite
                        </Button>
                      </div>
                    </div>
                  )}
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
