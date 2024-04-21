import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../components/button/Button";
import Tags from "../tags/Tags";
import Timer from "../timer/Timer";
import "./mainTimer.css";

/**
 * MainTimer Component
 * @param {Object} props - Component props
 * @param {Function} props.onSettings - Callback function to handle settings
 * @param {Object} props.allPomodoroTime - Object containing pomodoro time configurations
 * @returns {JSX.Element} - MainTimer component
 */
const MainTimer = ({ onSettings, allPomodoroTime }) => {
  // Constants
  const SECONDS_IN_MINUTE = 60;

  // State variables
  const [isStopped, setIsStopped] = useState(true);
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [givenTime, setGivenTime] = useState(
    SECONDS_IN_MINUTE * allPomodoroTime.workTime
  );
  const audio = new Audio("/assets/audio/clock-ticking-sound.mp3");
  const finishAudio = new Audio("/assets/audio/winfantasia-6912.mp3");

  /**
   * Handles the tag click event.
   * Sets the given time and current tag index based on the selected tag index.
   * @param {number} tagIndex - Index of the clicked tag
   */
  const handleTagClick = (tagIndex) => {
    const tagTimes = [
      SECONDS_IN_MINUTE * allPomodoroTime.workTime,
      SECONDS_IN_MINUTE * allPomodoroTime.shortBreakTime,
      SECONDS_IN_MINUTE * allPomodoroTime.longBreakTime,
    ];

    setGivenTime(tagTimes[tagIndex]);
    setCurrentTagIndex(tagIndex);
  };

  /**
   * Handles the reset button click event.
   * Resets the given time based on the current tag index.
   */
  const handleResetClick = () => {
    const tagTimes = [
      SECONDS_IN_MINUTE * allPomodoroTime.workTime,
      SECONDS_IN_MINUTE * allPomodoroTime.shortBreakTime,
      SECONDS_IN_MINUTE * allPomodoroTime.longBreakTime,
    ];

    setGivenTime(tagTimes[currentTagIndex]);
    audio.pause();
    setIsStopped(true);
  };

  /**
   * Decreases the given time by 1.
   */
  const handleChangeTime = () => {
    setGivenTime((prevTime) => prevTime - 1);
  };

  /**
   * Changes the isStopped state.
   * @param {boolean} isStopped - New isStopped value
   */
  const handleChangeState = (isStopped) => {
    setIsStopped(isStopped);
  };

  /**
   * Calculates the total time based on the current tag index.
   * @returns {number} - Calculated total time
   */
  const calculatePomoTime = () => {
    const tagTimes = [
      SECONDS_IN_MINUTE * allPomodoroTime.workTime,
      SECONDS_IN_MINUTE * allPomodoroTime.shortBreakTime,
      SECONDS_IN_MINUTE * allPomodoroTime.longBreakTime,
    ];

    return tagTimes[currentTagIndex];
  };

  /**
   * Handles the percentage change event.
   * If the percentage is 100, pauses the audio, plays finish audio, and sets isStopped to true.
   * @param {number} percent - Percentage value
   */
  const handlePercentChange = (percent) => {
    if (percent === 100) {
      audio.pause();
      finishAudio.play();
      setIsStopped(true);
    }
  };

  // Render MainTimer component
  return (
    <div className="timer padding-section">
      <h1 className="timer-gradient">Pomodoro Timer</h1>
      <Tags getTagIndex={handleTagClick} />
      <Timer
        isStopped={isStopped}
        givenTime={givenTime}
        changeTime={handleChangeTime}
        pomoTime={calculatePomoTime()}
        getPercent={handlePercentChange}
        audio={audio}
      />
      <div className="timer__maintimer-buttons">
        <Button isStopped={isStopped} changeState={handleChangeState} />
        <div className="timer__maintimer-buttons_settings">
          <button onClick={() => { audio.pause(); onSettings(); }}>Set Time</button>
        </div>
        <div className="timer__maintimer-buttons_reset">
          <button onClick={handleResetClick}>Reset</button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for MainTimer component
MainTimer.propTypes = {
  onSettings: PropTypes.func.isRequired,
  allPomodoroTime: PropTypes.shape({
    workTime: PropTypes.number,
    shortBreakTime: PropTypes.number,
    longBreakTime: PropTypes.number,
  }).isRequired,
};

export default MainTimer;
