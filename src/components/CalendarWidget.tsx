
import React from 'react';
import { Calendar } from "@/components/ui/calendar";

const CalendarWidget = () => {
  const date = new Date();
  
  return (
    <div className="relative">
      {/* Lens distortion effect background - matching ContactCard */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[10px] rounded-xl transform rotate-1 scale-105"></div>
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[5px] rounded-xl transform -rotate-1 scale-[1.02]"></div>
      
      <div className="w-full max-w-xs bg-white/20 backdrop-blur-lg shadow-xl rounded-xl relative z-10 border border-white/60 p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Calendar</h2>
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
            row: "flex w-full justify-center mt-2",
            head_row: "flex justify-center",
          }}
          disabled={(date) => false} // Calendar is for display, disable interactions
        />
      </div>
    </div>
  );
};

export default CalendarWidget;
