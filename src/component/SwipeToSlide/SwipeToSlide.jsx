import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "./SwipeToSlide.css";

function SwipeToSlide({ books }) {
  const [slidesToShow, setSlidesToShow] = useState(5); // Default number of slides to show

  useEffect(() => {
    const updateSlidesToShow = () => {
      const windowWidth = window.innerWidth;
      // Adjust the number of slides to show based on the window width
      if (windowWidth < 576) {
        setSlidesToShow(2);
      } else if (windowWidth < 768) {
        setSlidesToShow(3);
      } else if (windowWidth < 992) {
        setSlidesToShow(4);
      } else if (windowWidth < 1200) {
        setSlidesToShow(6);
      } else if (windowWidth < 1400) {
        setSlidesToShow(7);
      } else if (windowWidth < 1600) {
        setSlidesToShow(8);
      } else if (windowWidth < 1800) {
        setSlidesToShow(9);
      } else {
        setSlidesToShow(10);
      }
    };

    // Call the function initially and add event listener for window resize
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {books &&
          books.map((book, index) => (
            <div key={index}>
              {/* Make each book card clickable */}
              <Link to={`/book/${book.id}`}>
                <div className="book-card">
                  {book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.thumbnail && (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                      />
                    )}
                  <div className="book-details">
                    <h3 className="book-title">{book.volumeInfo.title}</h3>
                    <p className="book-author">
                      {book.volumeInfo.authors &&
                        book.volumeInfo.authors.join(", ")}
                    </p>
                    {/* Add more book details as needed */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default SwipeToSlide;
