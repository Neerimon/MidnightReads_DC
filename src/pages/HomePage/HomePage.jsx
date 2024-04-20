import React, { useState, useEffect } from 'react';
import '../../App.css';
import Slider from '../../component/Slider/slider';
import Horizontalslider from '../../component/Horizontalslider/horizontalslider';
import Browse from '../Browse/Browse';

function Home() {
  const [activeTab] = useState('Home');
  const [genreImages, setGenreImages] = useState({
    'Top from all genre': [],
    'crime': [],
    'mystery': [],
    'thriller': [],
    'romance': []
  });

  useEffect(() => {
    async function fetchGenreImages() {
      const genres = ['Top from all genre', 'crime', 'mystery', 'thriller', 'romance'];
      const genreImagesData = {};

      for (const genre of genres) {
        try {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${genre}&maxResults=40`);
          const data = await response.json();
          const books = data.items || [];
          const randomBooks = shuffle(books).slice(0, 20); // Selecting 10 random books from the shuffled list
          const images = randomBooks.map(book => {
            const imageLinks = book.volumeInfo.imageLinks || {};
            return imageLinks.thumbnail || '';
          });

          genreImagesData[genre] = images;
        } catch (error) {
          console.error(`Error fetching images for ${genre}:`, error);
          genreImagesData[genre] = [];
        }
      }

      setGenreImages(genreImagesData);
    }

    fetchGenreImages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Function to shuffle an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className="App">
      <div className="content">
        {activeTab === 'Home' && (
          <>
            <Slider />
            {Object.entries(genreImages).map(([genre, images]) => (
              <Horizontalslider key={genre} images={images} title={genre} />
            ))}
          </>
        )}
        {activeTab === 'Browse' && (
          <div className="browse-tab">
            <Browse />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
