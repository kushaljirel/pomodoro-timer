import { useState } from "react";
import PropTypes from "prop-types";
import "./setPomodoro.css";

/**
 * SetPomodoro Component
 * @param {Object} props - Component props
 * @param {Function} props.onSettings - Callback function to handle settings
 * @param {Function} props.getAllTime - Callback function to get all time values
 * @returns {JSX.Element} - SetPomodoro component
 */
const SetPomodoro = ({ onSettings, getAllTime }) => {
  // State variables for work, short break, and long break times
  const [workTime, setWorkTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);

  /**
   * Handles changes in work time input.
   * @param {Object} e - Event object
   */
  const handleWorkTime = (e) => {
    const workingTime = e.target.value;
    setWorkTime(workingTime);
  };

  /**
   * Handles changes in short break time input.
   * @param {Object} e - Event object
   */
  const handleShortBreakTime = (e) => {
    const shortBreak = e.target.value;
    setShortBreakTime(shortBreak);
  };

  /**
   * Handles changes in long break time input.
   * @param {Object} e - Event object
   */
  const handleLongBreakTime = (e) => {
    const longBreak = e.target.value;
    setLongBreakTime(longBreak);
  };

  /**
   * Handles the form submission, triggers onSettings and getAllTime callbacks.
   */
  const handleSubmit = () => {
    onSettings();
    getAllTime(workTime, shortBreakTime, longBreakTime);
  };

  // Render SetPomodoro component
  return (
    <div className="timer__set-pomodoro padding-section">
      <h1 className="timer-gradient">Set Pomodoro</h1>
      <div className="login-wrap">
        <div className="login-html">
          <div className="login-form">
            {/* Work Time Input */}
            <div className="group">
              <label htmlFor="workTime" className="label">
                Work Time
              </label>
              <input
                id="workTime"
                onChange={handleWorkTime}
                type="number"
                className="input"
                min="1"
                max="60"
              />
            </div>

            {/* Short Break Time Input */}
            <div className="group">
              <label htmlFor="shortBreakTime" className="label">
                Short Break Time
              </label>
              <input
                id="shortBreakTime"
                onChange={handleShortBreakTime}
                type="number"
                className="input"
                min="1"
                max="60"
              />
            </div>

            {/* Long Break Time Input */}
            <div className="group">
              <label htmlFor="longBreakTime" className="label">
                Long Break Time
              </label>
              <input
                id="longBreakTime"
                onChange={handleLongBreakTime}
                type="number"
                className="input"
                min="1"
                max="60"
              />
            </div>

            <div className="hr"></div>

            {/* Submit Button */}
            <div className="group">
              <input
                type="submit"
                className="button"
                onClick={handleSubmit}
                value="Apply Settings"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for SetPomodoro component
SetPomodoro.propTypes = {
  onSettings: PropTypes.func.isRequired,
  getAllTime: PropTypes.func.isRequired,
};

export default SetPomodoro;
