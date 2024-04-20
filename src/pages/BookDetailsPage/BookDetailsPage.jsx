import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetailsPage.css';

function BookDetailsPage() {
  const { id } = useParams(); // Get the book ID from route parameters
  const [bookCover, setBookCover] = useState(null);
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetch book details including cover and other information
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();

        if (data.volumeInfo && data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail) {
          setBookCover(data.volumeInfo.imageLinks.thumbnail);
        }

        setBookInfo(data.volumeInfo);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div>
    <div className="header-wrap">
    <div className="banner" style={{ backgroundImage: `url(${bookCover})` }}>
      <div className="shadow"></div>
    </div>
  </div>
    <div className="container-diff">
      <div className="cover-wrap overlap-banner">
        <div className="cover-wrap-inner">
          <img className="cover" src={bookCover} alt="Book Cover" />
          {/* You can add actions related to the cover here */}
        </div>
      </div>
      <div className="content-diff">
        {bookInfo && (
          <>
            <h1 className="title">{bookInfo.title}</h1>
            <p className="description">{bookInfo.description}</p>
            {/* Add navigation links or any other information here */}
          </>
        )}
      </div>
    </div>
    </div>
  );
}

export default BookDetailsPage;
