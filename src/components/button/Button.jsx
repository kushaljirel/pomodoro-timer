import PropTypes from "prop-types";
import "./button.css";

/**
 * Button Component
 * @param {Object} props - Component props
 * @param {boolean} props.isStopped - Flag indicating whether the timer is stopped
 * @param {Function} props.changeState - Function to change the timer state
 * @returns {JSX.Element} - Button component
 */
const Button = ({ isStopped, changeState }) => {
  /**
   * Handles the click event on the button.
   * Toggles the timer state.
   */
  const handleClick = () => {
    changeState(!isStopped);
  };



  // Render Button component
  return (
    <div className="timer__button">
      <button
        className={isStopped ? "timer__button-start" : "timer__button-stop"}
        onClick={handleClick}
      >
        {isStopped ? "Start" : "Stop"}
      </button>
    </div>
  );
};

// PropTypes for Button component
Button.propTypes = {
  isStopped: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired,
};

export default Button;
