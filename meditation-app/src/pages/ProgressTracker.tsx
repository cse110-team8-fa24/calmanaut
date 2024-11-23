import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../context/AuthorizationContext";
import { format } from "date-fns"; 

const ProgressTracker: React.FC = () => {
  const { isLoggedIn } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [meditationDates, setMeditationDates] = useState<string[]>([]);

  useEffect(() => {
    if (isLoggedIn === false) navigate("/");

    const storedDates = localStorage.getItem("meditationDates");
    if (storedDates) {
      const parsedDates = JSON.parse(storedDates);
      setMeditationDates(parsedDates);
      calculateStreaks(parsedDates);
    }
  }, [isLoggedIn, navigate]);

  const calculateStreaks = (dates: string[]) => {
    if (dates.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }
  
    const sortedDates = dates
      .map((date) => new Date(date)) 
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
  };
  

  return (
    <div>
      <h1>Your Meditation Progress</h1>
      <div>
        <h2>Current Streak: {currentStreak} days</h2>
        <h2>Longest Streak: {longestStreak} days</h2>
      </div>
      <div>
        <h3>Meditation Dates:</h3>
        <ul>
          {meditationDates.map((date) => (
            <li key={date}>{format(new Date(date), "EEEE, MMMM do, yyyy")}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressTracker;
