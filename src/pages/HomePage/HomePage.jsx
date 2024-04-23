// HomePage.jsx
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
    fetchBooks("romance", 15);
    fetchBooks("horror", 15);
    fetchBooks("manga", 15);
  }, []);

  const fetchBooks = async (genre, maxResults) => {
    try {
      // Generate a random start index
      const startIndex = Math.floor(Math.random() * 100); // Adjust 100 as needed
      
      // Fetch books with the random start index
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=${maxResults}&startIndex=${startIndex}`);
      
      const data = await response.json();
      setBooks(prevState => ({
        ...prevState,
        [genre]: data.items
      }));
    } catch (error) {
      console.error(`Error fetching ${genre} books:`, error);
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
          {Object.entries(books).map(([genre, genreBooks]) => (
            <div key={genre} className="category-row">
              <Horizontalslider title={genre} books={genreBooks} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
