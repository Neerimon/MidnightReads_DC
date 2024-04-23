import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from '../../component/Slider/slider';
import Horizontalslider from '../../component/Horizontalslider/horizontalslider';
import './HomePage.css';
import Alert from '../../component/Alert/AlertError';

function Home() {
  const [activeTab] = useState('Home');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const alertMessage = searchParams.get('alert');

  const [books, setBooks] = useState({});

  useEffect(() => {
    fetchBooks("science fiction", 15);
    fetchBooks("mystery", 15);
    fetchBooks("horror", 15);
    fetchBooks("history", 15);
  }, []);

  const fetchBooks = async (query, maxResults) => {
    try {
      // Fetch books based on the provided query
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`);
      
      const data = await response.json();
      setBooks(prevState => ({
        ...prevState,
        [query]: data.items
      }));
    } catch (error) {
      console.error(`Error fetching books for ${query}:`, error);
    }
  };

  return (
    <div >
       <header>
       <Slider />
       </header>
       <div className="home-container">
        <div>
          {alertMessage && <Alert message={alertMessage} visible={true} />}
        </div>
        <div className="book-display-container">
          {/* Display books for each genre */}
          {Object.entries(books).map(([query, genreBooks]) => (
            <div key={query} className="category-row">
              <Horizontalslider title={query} books={genreBooks} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
