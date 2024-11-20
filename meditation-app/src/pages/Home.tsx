import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/Timer.css';
import { OptionsContext } from '../context/OptionsContext';
import { MusicOptions } from './Music';


const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

// For Timer Functionality
// please refer to https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
const Timer: React.FC = () => {
  const { musicKey } = useContext(OptionsContext);
  const audio = useRef(new Audio());

  const [timeLimit, setTimeLimit] = useState<number>(20); // Default time is 20 seconds
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [timePassed, setTimePassed] = useState<number>(0);
  const [remainingPathColor, setRemainingPathColor] = useState<string>(COLOR_CODES.info.color);
  const [isActive, setIsActive] = useState<boolean>(false); // To track if the timer is running

  // Pause audio after leaving the page
  useEffect(() => () => audio.current?.pause(), []);

  useEffect(() => {
    const calculateTimeFraction = (): number => {
      const rawTimeFraction = timeLeft / timeLimit;
      return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    };

    const setCircleDasharray = () => {
      const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
      const pathRemaining = document.getElementById("base-timer-path-remaining");
      if (pathRemaining) {
        pathRemaining.setAttribute("stroke-dasharray", circleDasharray);
      }
    };

    let timerInterval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimePassed(prev => prev + 1);
        setTimeLeft(timeLimit - (timePassed + 1));
        setCircleDasharray();
        setRemainingPathColor(getRemainingPathColor(timeLeft));
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerInterval) clearInterval(timerInterval); // Only clear if not null
      setIsActive(false);
      audio.current.pause();
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval); // Only clear if not null
    };
  }, [isActive, timePassed, timeLeft, timeLimit]);

  const handleStart = () => {
    setIsActive(true);
    audio.current = new Audio(MusicOptions[musicKey].audio);
    audio.current.play();
  };

  const handleReset = () => {
    setIsActive(false);
    setTimePassed(0);
    setTimeLeft(timeLimit);
    setRemainingPathColor(COLOR_CODES.info.color);
    audio.current.pause();
  };

  const handleTimeLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTimeLimit = parseInt(event.target.value, 10) || 0; // Parse input, default to 0
    if (newTimeLimit < 0) newTimeLimit = 0; // FIXED IT. USED TO BE ABLE TO CHOOSE NEGATIVE TIME.
    setTimeLimit(newTimeLimit);
    setTimeLeft(newTimeLimit); // Update timeLeft to reflect the new time limit
  };

  const formatTimeLeft = (time: number): string => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = Number(`0${seconds}`);
    }
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const getRemainingPathColor = (timeLeft: number): string => {
    if (timeLeft <= COLOR_CODES.alert.threshold) {
      return COLOR_CODES.alert.color;
    } else if (timeLeft <= COLOR_CODES.warning.threshold) {
      return COLOR_CODES.warning.color;
    }
    return COLOR_CODES.info.color;
  };

  return (
    <div id="app">
      <h1>Welcome to Calmanaut</h1>
      <p>Your meditation journey begins here!</p>
      <div className="timer-container"> {/* Main centering container */}
        <div className="time-input">
          <label className="timer-label">Set Timer (seconds): </label>
          <input
            type="number"
            value={timeLimit}
            onChange={handleTimeLimitChange}
            disabled={isActive} // Disable while timer is running
            min="0"
          />
        </div>
        <div className="base-timer">
          <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g className="base-timer__circle">
              <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
              <path
                id="base-timer-path-remaining"
                strokeDasharray="283"
                className={`base-timer__path-remaining ${remainingPathColor}`}
                d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
              ></path>
            </g>
          </svg>
          <span id="base-timer-label" className="base-timer__label">
            {formatTimeLeft(timeLeft)}
          </span>
        </div>
        <div className="timer-controls">
          <button onClick={handleStart} disabled={isActive || timeLeft === 0}>Start</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );


}

export default Timer;

