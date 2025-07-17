
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

const CalendarWidget = () => {
  const navigate = useNavigate();
  const date = new Date();
  
  // Define event dates - August 15, 2025 for the stakeholder meeting
  const eventDates = [
    new Date(2025, 7, 15) // August 15, 2025 (month is 0-indexed)
  ];

  const handleDateClick = (selectedDate: Date | undefined) => {
    if (selectedDate && isEventDate(selectedDate)) {
      // Navigate to events page when clicking on an event date
      navigate('/events');
    }
  };

  const isEventDate = (checkDate: Date) => {
    return eventDates.some(eventDate => 
      eventDate.getDate() === checkDate.getDate() &&
      eventDate.getMonth() === checkDate.getMonth() &&
      eventDate.getFullYear() === checkDate.getFullYear()
    );
  };

  const getDayClassName = (day: Date) => {
    const baseClasses = "hover:bg-white/20 text-white focus:bg-white/30 focus:text-white h-9 w-9 p-0 rounded-full relative";
    
    if (isEventDate(day)) {
      return `${baseClasses} ring-4 ring-blue-800 font-bold cursor-pointer hover:ring-blue-700 transition-all`;
    }
    
    return baseClasses;
  };
  
  return (
    <div className="w-full max-w-xs bg-white/20 backdrop-blur-lg rounded-xl border border-white/60 p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Calendar</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateClick}
        className="bg-transparent border-none text-white mx-auto"
        classNames={{
          day_today: "bg-white/30 text-white font-bold hover:bg-white/40",
          day: getDayClassName(new Date()), // This will be overridden by the modifiers
          day_selected: "bg-white text-primary-foreground hover:bg-white hover:text-primary-foreground",
          caption_label: "text-white font-medium",
          head_cell: "text-white/80",
          cell: "text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          nav_button: "border border-white/20 hover:bg-white/20 text-white",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1 mt-2",
          months: "mx-auto space-y-4",
          month: "space-y-4 mx-auto",
          row: "flex w-full justify-center mt-2",
          head_row: "flex justify-center",
        }}
        modifiers={{
          eventDate: eventDates
        }}
        modifiersClassNames={{
          eventDate: "ring-4 ring-blue-800 font-bold cursor-pointer hover:ring-blue-700 transition-all hover:bg-white/30"
        }}
        disabled={(date) => false}
      />
      <div className="mt-2 text-xs text-white/70 text-center">
        Events marked with ring
      </div>
    </div>
  );
};

export default CalendarWidget;
