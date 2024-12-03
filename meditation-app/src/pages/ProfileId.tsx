import "../styles/Profile.css";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthorizationContext } from "../context/AuthorizationContext";
import * as Util from "../lib/Util";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

type User = {
  username: string,
  createDate: Date,
  id: number,
};

export const ProfileId = (props: any) => {
  const { id } = useContext(AuthorizationContext);

  const [user, setUser] = useState<User | undefined | false>(undefined);
  const userId = Number.parseInt(useParams().id || "-1");

  const [meditationDates, setMeditationDates] = useState<string[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    Util.get("users/" + userId, Util.createDateReviver("createDate")).then(res => {
      setUser(res.user);
    }).catch(e => {
      setUser(false);
      console.error(e);
    });
  }, [setUser, userId]);

  useEffect(() => {
    // Fetch meditation dates from the backend
    const fetchDates = async () => {
      const response = await Util.get(`/users/${userId}`);
      setMeditationDates(response.user.meditationDates || []);
    };

    fetchDates().catch(console.error);
  }, [userId]);

  useEffect(() => {
    if (meditationDates.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    const parseLocalDate = (dateString: string) => {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript's Date.
    };

    const sortedDates = meditationDates
      .map(parseLocalDate)
      .sort((a, b) => a.getTime() - b.getTime());

    let currentStreak = 1;
    let longestStreak = 1;
    let previousDate: Date = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
      const diff = (sortedDates[i].getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentStreak++;
      } else if (diff > 1) {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }

      previousDate = sortedDates[i];
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    setCurrentStreak(currentStreak);
    setLongestStreak(longestStreak);
  }, [meditationDates]);

  if (user === false)
    return <p>User not found.</p>;

  if (user === undefined)
    return <></>;

  const handleDateClick = async (info: { dateStr: string }) => {
    if (id !== userId)
      return;

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
      if (meditationDates.includes(dateStr)) {
        // Remove date
        await Util.del(`/calendar/${dateStr}`, {});
        setMeditationDates((prevDates) =>
          prevDates.filter((date) => date !== dateStr)
        );
      } else {
        // Add date
        await Util.post(`/calendar/${dateStr}`, {});
        setMeditationDates((prevDates) => [...prevDates, dateStr]);
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
      const deletePromises = meditationDates.map((date) =>
        Util.request(`/calendar/${date}`, { method: "DELETE" })
      );
      await Promise.all(deletePromises);

      setMeditationDates([]);
      alert("All dates have been cleared.");
    } catch (error) {
      console.error("Error clearing meditation dates:", error);
      alert("Error clearing meditation dates. Please try again.");
    }
  };

  const cry = currentStreak === 0 ? "\u{1F622}" : "";
  const fire = "\u{1F525}".repeat(Math.min(3, Math.ceil(currentStreak / 3)));

  return <div className="profile">
    <div className="info">
      <h1>{user.username} {id === userId ? "(you)" : ""}</h1>
      <p>Signed up on {user.createDate.toLocaleString().split(",")[0]}</p>
    </div>
    <div className="streak">
      <h1>Meditation Progress</h1>
      <h2>Current Streak: {currentStreak} days {fire} {cry}</h2>
      <h2>Longest Streak: {longestStreak} days</h2>
    </div>
    <div className="calendar">
      {
        id === userId
          ? <p>Track your meditation progress by selecting dates:</p>
          : <></>
      }
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={meditationDates.map((date) => ({
            title: "Meditation",
            start: date,
            allDay: true,
          }))}
        />
      </div>
      {
        id === userId
          ? <button className="clear-dates-button" onClick={clearDates}>
            Clear Dates
          </button> : <></>
      }
    </div>
  </div>;
};
