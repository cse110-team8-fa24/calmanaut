import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/CalendarPage.css";

const CalendarPage: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    const storedDates = localStorage.getItem("meditationDates");
    if (storedDates) {
      setSelectedDates(JSON.parse(storedDates));
    }
  }, []);

  const handleDateClick = (info: { dateStr: string }) => {
    const clickedDate = new Date(info.dateStr); 
    const today = new Date(); 
    today.setHours(0, 0, 0, 0);
  
    if (clickedDate > today) {
      alert("You cannot select a future date.");
      return;
    }
    if (selectedDates.includes(info.dateStr)) {
      const updatedDates = selectedDates.filter((date) => date !== info.dateStr);
      setSelectedDates(updatedDates);
      localStorage.setItem("meditationDates", JSON.stringify(updatedDates));
    } 
    else {
      const updatedDates = [...selectedDates, info.dateStr];
      setSelectedDates(updatedDates);
      localStorage.setItem("meditationDates", JSON.stringify(updatedDates));
    }
  };
  
  const clearDates = () => {
    setSelectedDates([]);
    localStorage.removeItem("meditationDates");
    alert("All dates have been cleared.");
  };

  return (
    <div className="calendar-page">
      <h1>Meditation Calendar</h1>
      <p>Track your meditation progress by selecting dates:</p>
      <button className="clear-dates-button" onClick={clearDates}>
        Clear Dates
      </button>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={selectedDates.map((date) => ({
            title: "Meditation",
            start: date,
            allDay: true,
          }))}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
