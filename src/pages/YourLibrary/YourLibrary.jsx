// YourLibrary.jsx

import React, { useState } from 'react';
import './YourLibrary.css';
import backgroundImage from '../../images/YourLibrary.jpg';
import AddShelfPopup from '../../component/AddShelfPopup/AddShelfPopup';
import ShelfPage from '../ShelfPage/ShelfPage';

const YourLibrary = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState(null); // State to keep track of the selected shelf

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleAddShelf = (newShelf) => {
    setShelves([newShelf, ...shelves]); // Add new shelf to the beginning of the array
    setPopupOpen(false); // Close the popup
  };

  const handleShelfClick = (shelfName) => {
    setSelectedShelf(shelfName); // Set the selected shelf
  };

  const navigateToLibrary = () => {
    setSelectedShelf(null); // Reset selected shelf
  };

  return (
    <div>
      <header className="your-library-header">
        <img src={backgroundImage} alt="Library Background" className="your-library-background" />
        <div className="your-library-overlay"></div>
        <div className="your-library-header-content">
          <h1>Welcome to Your Library</h1>
          <p>Explore, organize, and customize your virtual library</p>
        </div>
      </header>

      <div className="your-library-container">
        {/* If a shelf is selected, render the ShelfPage */}
        {selectedShelf ? (
          <ShelfPage shelfName={selectedShelf} navigateToLibrary={navigateToLibrary} />
        ) : (
          /* Render shelves */
          shelves.map((shelf, index) => (
            <div key={index} className="shelf-card" style={{ backgroundColor: shelf.color }} onClick={() => handleShelfClick(shelf.name)}>
              <h3>{shelf.name}</h3>
            </div>
          ))
        )}

        {/* Render the "Add New Shelves" card if no shelf is selected */}
        {!selectedShelf && (
          <div className="add-shelves-card" onClick={togglePopup}>
            <div className="add-shelves-icon">+</div>
            <div className="add-shelves-text">Add New Shelves</div>
          </div>
        )}
      </div>

      {/* Render the AddShelfPopup component */}
      <AddShelfPopup isOpen={isPopupOpen} onClose={togglePopup} onAddShelf={handleAddShelf} />
    </div>
  );
}

export default YourLibrary;
