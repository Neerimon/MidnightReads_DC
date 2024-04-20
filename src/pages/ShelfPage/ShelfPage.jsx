// ShelfPage.jsx
import React, { useState, useEffect } from 'react';
import './ShelfPage.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import BookDetailsPage from '../BookDetailsPage/BookDetailsPage'; 

const ShelfPage = ({ shelfName, navigateToLibrary }) => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBookId, setSelectedBookId] = useState(null); 

  // Function to fetch books data based on the search query
  const fetchBooks = async () => {
    try {
      // Make API call or fetch data based on the searchQuery
      // For example, using Google Books API:
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
      const data = await response.json();
      if (data.items) {
        // Extract relevant book information
        const fetchedBooks = data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          // Add more properties as needed
        }));
        setBooks(fetchedBooks);
      } else {
        setBooks([]); // Clear books if no items found
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

    // Function to handle search
    const handleSearch = () => {
        fetchBooks();
      };
    
      // Render BookDetailsPage if a book ID is selected
      if (selectedBookId) {
        // Directly navigate to the book details page using the book ID
        return <BookDetailsPage bookId={selectedBookId} navigateToLibrary={navigateToLibrary} />;
      }

  return (
    <div className="shelf-page"> {/* Apply the class name to the container div */}
      <h2>{shelfName}</h2>
            {/* Search bar */}
            <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Display search results */}
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id}>
            {/* Use Link to navigate to the book details page */}
            <Link to={`/book/${book.id}`} onClick={() => setSelectedBookId(book.id)}>
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
      <table className="shelf-table"> {/* Apply the class name to the table */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Score</th>
            <th>Chapters</th>
            <th>Volumes</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.score}</td>
              <td>{book.chapters}</td>
              <td>{book.volumes}</td>
              <td>{book.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-button" onClick={navigateToLibrary}>Back to Library</button> {/* Apply the class name to the button */}
    </div>
  );
}

export default ShelfPage;
