import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ show, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = () => {
    // Check if the search query is not empty
    if (searchQuery.trim() !== '') {
      // Update recent searches list with the current search query
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]); // Limit recent searches to 5 items
  
      // Perform search logic here (e.g., fetching search results)
      // This is where you would typically make an API request or perform any other search-related operation
      // For demonstration purposes, let's just log the search query to the console
      console.log('Search query:', searchQuery);
  
      // Close the search bar after searching
      onClose();
    }
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
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SearchBar;
