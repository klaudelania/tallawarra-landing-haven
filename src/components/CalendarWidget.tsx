
import React from 'react';
import { Calendar } from "@/components/ui/calendar";

const CalendarWidget = () => {
  const date = new Date();
  
  return (
    <div className="rounded-lg p-4 bg-background/50 backdrop-blur-md border border-white/20 shadow-lg w-full max-w-xs">
      <h2 className="text-xl font-semibold text-white mb-4">Calendar</h2>
      <Calendar
        mode="single"
        selected={date}
        className="bg-transparent border-none text-white mx-auto"
        classNames={{
          day_today: "bg-white/30 text-white font-bold hover:bg-white/40",
          day: "hover:bg-white/20 text-white focus:bg-white/30 focus:text-white h-9 w-9 p-0 rounded-full",
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
        }}
        disabled={(date) => false} // Calendar is for display, disable interactions
      />
    </div>
  );
};

export default CalendarWidget;
