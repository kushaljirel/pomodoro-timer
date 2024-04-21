import { useEffect } from "react";
import "./timer.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


/**
 * Timer Component
 * @param {Object} props - Component props
 * @param {boolean} props.isStopped - Indicates whether the timer is stopped
 * @param {number} props.givenTime - Remaining time in seconds
 * @param {Function} props.changeTime - Callback function to handle time change
 * @param {number} props.pomoTime - Total time for the Pomodoro session in seconds
 * @returns {JSX.Element} - Timer component
 */
const Timer = ({ isStopped, givenTime, changeTime, pomoTime, getPercent }) => {
  // Calculate and format time
  const getTime = (givenTime) => {
    const minutes = Math.floor(givenTime / 60);
    const seconds = givenTime % 60;

    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${displayMinutes}:${displaySeconds}`;
  };

  const time = getTime(givenTime);

  // Calculate percentage progress
  const calculatePercentage = (remainingTime) => {
    return ((pomoTime - remainingTime) / pomoTime) * 100;
  };

  const percentage = calculatePercentage(givenTime);

  getPercent(percentage);

  useEffect(() => {
    let interval = null;

    // Update time at intervals if not stopped and time remaining
    if (!isStopped && givenTime > 0) {
      interval = setInterval(() => {
        changeTime();
        // audio.play();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [givenTime, isStopped, changeTime]);

  // const red = "#f54e4e";
  const timer_text_color = "#f14fa0e0";
  const timer_path_color = "#664292";
  // const timer_trail_color = "rgba(255, 255, 255, 0.2)";
  const timer_trail_color = "#3885dd81";
  /**
   * Renders the Timer component with a circular progress bar.
   * @returns {JSX.Element} - Timer component JSX
   */
  const renderTimer = () => (
    <div className="timer__progress">
      <CircularProgressbar
        value={percentage}
        text={time}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textColor: timer_text_color,
          pathColor: timer_path_color,
          trailColor: timer_trail_color,
        })}
      />
    </div>
  );

  return renderTimer();
};

export default Timer;
