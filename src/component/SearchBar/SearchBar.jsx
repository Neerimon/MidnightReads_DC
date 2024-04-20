import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ show, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = () => {
    // Add logic to handle search
    // You can update recentSearches state here
  };

  return (
    <div className={`search-popup ${show ? 'show' : ''}`}>
      <div className="overlay" onClick={onClose}></div>
      <div className="search-content">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
        <div className="recent-searches">
          <p>Recent Searches:</p>
          {/* Render recent searches here */}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SearchBar;



