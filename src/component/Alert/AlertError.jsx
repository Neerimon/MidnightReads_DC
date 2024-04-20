import React, { useState, useEffect } from 'react';
import './AlertError.css';

const Alert = ({ message, visible }) => {
  const [showAlert, setShowAlert] = useState(visible);

  useEffect(() => {
    setShowAlert(visible); // Initially set the visibility based on the prop

    if (visible) {
      // If the popup is visible, set a timeout to hide it after 3 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Clean up the timeout when the component unmounts or when the visibility changes
      return () => clearTimeout(timer);
    }
  }, [visible]); // Run this effect whenever the 'visible' prop changes

  const style = {
    display: showAlert ? 'block' : 'none'
  };

  return (
    <div className="modal" style={style}>
      <div className="modal-content">
        <span className="close">&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Alert;
