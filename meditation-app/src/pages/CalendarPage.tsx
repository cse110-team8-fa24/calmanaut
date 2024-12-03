import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/CalendarPage.css";
import * as Util from "../lib/Util"; // Adjust the path based on your project structure

const CalendarPage: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  // Fetch meditation dates from the backend
  const fetchDates = async () => {
    try {
      const response = await Util.get("/calendar/");
      setSelectedDates(response.meditationDates || []);
    } catch (error) {
      console.error("Failed to fetch meditation dates:", error);
      alert("Error fetching meditation dates. Please try again.");
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const handleDateClick = async (info: { dateStr: string }) => {
    const date = new Date(info.dateStr);

    // ensure date string is in correct format
    const dateStr = date.toISOString().split("T")[0];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date > today) {
      alert("You cannot select a future date.");
      return;
    }

    try {
      if (selectedDates.includes(dateStr)) {
        // Remove date
        await Util.del(`/calendar/${dateStr}`, {});
        setSelectedDates((prevDates) =>
          prevDates.filter((date) => date !== dateStr)
        );
      } else {
        // Add date
        await Util.post(`/calendar/${dateStr}`, {});
        setSelectedDates((prevDates) => [...prevDates, dateStr]);
      }
    } catch (error) {
      console.error("Error updating meditation dates:", error);
      alert("Error updating meditation dates. Please try again.");
    }
  };

  const clearDates = async () => {
    if (!window.confirm("Are you sure you want to clear all dates?")) return;

    try {
      // Remove all dates by making individual DELETE requests
      const deletePromises = selectedDates.map((date) =>
        Util.request(`/calendar/${date}`, { method: "DELETE" })
      );
      await Promise.all(deletePromises);

      setSelectedDates([]);
      alert("All dates have been cleared.");
    } catch (error) {
      console.error("Error clearing meditation dates:", error);
      alert("Error clearing meditation dates. Please try again.");
    }
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
