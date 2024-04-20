import React, { useState, useEffect } from 'react';
import './horizontalslider.css';

const Horizontalslider = ({ images, title }) => {
  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(10);

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
    window.addEventListener('resize', updateSlidesToShow);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  const handlePrev = () => {
    setCurrent(current > 0 ? current - 1 : images.length - slidesToShow);
  };
  
  const handleNext = () => {
    setCurrent(current < images.length - slidesToShow ? current + 1 : 0);
  };
  
  return (
    <div className="horizontalslider-container">
      <div className="horizontalslider">
        <h1 style={{ fontWeight: 'bold' }}>{title}</h1>
        <div className="cards-container">
          {images.slice(current, current + slidesToShow).map((image, index) => (
            <div
              className="card"
              key={index}
              style={{ flexBasis: `${100 / slidesToShow}%` }}
            >
              <img src={image} alt={`Book ${index + 1}`} className="card-image" />
            </div>
          ))}
        </div>
        <button className="prev" onClick={handlePrev}>❮</button>
        <button className="next" onClick={handleNext}>❯</button>
      </div>
    </div>
  );
};

export default Horizontalslider;