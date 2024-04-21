import { useState } from "react";
import SetPomodoro from "./containers/setPomodoro/SetPomodoro";
import MainTimer from "./containers/mainTimer/MainTimer";
import "./index.css";
import "./App.css";

/**
 * App Component
 * @returns {JSX.Element} - App component
 */
const App = () => {
  // State variables
  const [isIntervalSelected, setIsIntervalSelected] = useState(true);
  const [allPomodoroTime, setAllPomodoroTime] = useState({
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  });

  /**
   * Toggles between interval selection and main timer.
   */
  const onSettings = () => {
    setIsIntervalSelected((prev) => !prev);
  };
  
  /**
   * Updates the pomodoro time configuration.
   * @param {number} workTime - Work time in minutes
   * @param {number} shortBreakTime - Short break time in minutes
   * @param {number} longBreakTime - Long break time in minutes
   */
  const getAllTime = (workTime, shortBreakTime, longBreakTime) => {
    setAllPomodoroTime((prev) => ({
      ...prev,
      workTime,
      shortBreakTime,
      longBreakTime,
    }));
  };

  // Conditional rendering based on interval selection
  return (
    <>
      {isIntervalSelected ? (
        <MainTimer onSettings={onSettings} allPomodoroTime={allPomodoroTime} />
      ) : (
        <SetPomodoro onSettings={onSettings} getAllTime={getAllTime} />
      )}
    </>
  );
};

export default App;
