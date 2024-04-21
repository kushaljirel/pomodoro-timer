import { useState } from "react";
import PropTypes from "prop-types";
import "./tags.css";

/**
 * Tags Component
 * @param {Object} props - Component props
 * @param {Function} props.getTagIndex - Callback function to get the selected tag index
 * @returns {JSX.Element} - Tags component
 */
const Tags = (props) => {
  // Define sessions for different timer phases
  const sessions = ["Work", "Short Break", "Long Break"];

  // State to track the active tag index
  const [activeTag, setActiveTag] = useState(0);

  /**
   * Handles the click event on a tag button.
   * Updates the active tag index and calls the callback function.
   * @param {number} index - Index of the clicked tag
   */
  const handleTagClick = (index) => {
    setActiveTag(index);
    props.getTagIndex(index);
  };

  /**
   * Renders individual tag buttons based on the sessions array.
   * @returns {JSX.Element[]} - Array of tag button elements
   */
  const renderTagButtons = () => {
    return sessions.map((session, index) => (
      <button
        key={index}
        className="timer__tags_item"
        onClick={() => handleTagClick(index)}
        style={{
          backgroundColor: activeTag === index ? "#317773" : "#86739e",
          color: activeTag === index ? "#fff" : "#ffffff9c",
        }}
      >
        {session}
      </button>
    ));
  };

  // Render Tags component
  return <div className="timer__tags">{renderTagButtons()}</div>;
};

// PropTypes for Tags component
Tags.propTypes = {
  getTagIndex: PropTypes.func.isRequired,
};

export default Tags;
