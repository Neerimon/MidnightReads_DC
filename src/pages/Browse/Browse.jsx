import React, { useState, useEffect } from 'react';
import './Browse.css'; // Import CSS file for Browse component

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [filterGenre, setFilterGenre] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [genreDropdownPosition, setGenreDropdownPosition] = useState({});
  const [yearDropdownPosition, setYearDropdownPosition] = useState({});

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let url = '';
        if (searchQuery.trim() !== '') {
          url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40`;
        } else if (filterGenre.trim() !== '') {
          url = `https://www.googleapis.com/books/v1/volumes?q=subject:${filterGenre}&orderBy=newest&maxResults=40`;
        } else if (filterYear.trim() !== '') {
          url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40&publishedDate=${filterYear}`;
        } else {
          url = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=40';
        }

        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery, filterGenre, filterYear]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterGenre = () => {
    setShowGenreDropdown(!showGenreDropdown);
    setShowYearDropdown(false); // Close year dropdown
  };

  const handleFilterYear = () => {
    setShowYearDropdown(!showYearDropdown);
    setShowGenreDropdown(false); // Close genre dropdown
  };

  const handleSelectGenre = (genre) => {
    setFilterGenre(genre);
    setShowGenreDropdown(false);
  };

  const handleSelectYear = (year) => {
    setFilterYear(year);
    setShowYearDropdown(false);
  };

  const positionDropdowns = () => {
    const genreButton = document.getElementById('genre-button');
    const yearButton = document.getElementById('year-button');

    if (genreButton) {
      const rect = genreButton.getBoundingClientRect();
      setGenreDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    if (yearButton) {
      const rect = yearButton.getBoundingClientRect();
      setYearDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    positionDropdowns();
    window.addEventListener('resize', positionDropdowns);
    return () => window.removeEventListener('resize', positionDropdowns);
  }, [showGenreDropdown, showYearDropdown]);

  return (
    <div className="browse-tab">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button id="genre-button" onClick={handleFilterGenre}>Filter by Genre</button>
        {showGenreDropdown && (
          <div className="dropdown-content" style={genreDropdownPosition}>
            <button onClick={() => handleSelectGenre('fiction')}>Fiction</button>
            <button onClick={() => handleSelectGenre('romance')}>Romance</button>
            <button onClick={() => handleSelectGenre('mystery')}>Mystery</button>
            <button onClick={() => handleSelectGenre('history')}>History</button>
            <button onClick={() => handleSelectGenre('biography')}>Biography</button>
            <button onClick={() => handleSelectGenre('fantasy')}>Fantasy</button>
            <button onClick={() => handleSelectGenre('science')}>Science</button>
            <button onClick={() => handleSelectGenre('technology')}>Technology</button>
            <button onClick={() => handleSelectGenre('self-help')}>Self-Help</button>
            <button onClick={() => handleSelectGenre('travel')}>Travel</button>
          </div>
        )}
        <button id="year-button" onClick={handleFilterYear}>Filter by Year</button>
        {showYearDropdown && (
          <div className="dropdown-content" style={yearDropdownPosition}>
            {Array.from({ length: 75 }, (_, i) => 2024 - i).map((year) => (
              <button key={year} onClick={() => handleSelectYear(year)}>{year}</button>
            ))}
          </div>
        )}
      </div>
      <div className="search-results">
        {(searchResults.length > 0 ? searchResults : topRatedBooks).map((book, index) => (
          <div key={index} className="book-item" onMouseEnter={() => console.log('Mouse entered')}>
            <a href={book.volumeInfo.infoLink} target="_blank" rel="noreferrer">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image'}
                alt={book.volumeInfo.title}
                title={book.volumeInfo.title}
              />
            </a>
            <div className="book-details">
              <p>{book.volumeInfo.title}</p>
              <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
