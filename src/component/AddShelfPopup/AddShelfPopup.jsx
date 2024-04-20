// AddShelfPopup.jsx

import React, { useState } from 'react';
import './AddShelfPopup.css';

const AddShelfPopup = ({ isOpen, onClose, onAddShelf }) => {
  const [shelfName, setShelfName] = useState('');
  const [shelfColor, setShelfColor] = useState('#ffffff');

  const handleAddShelf = () => {
    // Validate shelfName and shelfColor if needed
    onAddShelf({ name: shelfName, color: shelfColor });
    // Reset state and close popup
    setShelfName('');
    setShelfColor('#ffffff');
    onClose();
  };

  return (
    isOpen && (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Add New Shelf</h2>
          <label htmlFor="shelfName">Shelf Name:</label>
          <input
            type="text"
            id="shelfName"
            value={shelfName}
            onChange={(e) => setShelfName(e.target.value)}
          />
          <label htmlFor="shelfColor">Shelf Color:</label>
          <input
            type="color"
            id="shelfColor"
            value={shelfColor}
            onChange={(e) => setShelfColor(e.target.value)}
          />
          <button onClick={handleAddShelf}>Add Shelf</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default AddShelfPopup;
