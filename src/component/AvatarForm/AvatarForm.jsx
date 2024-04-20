
import React, { useState } from 'react';
import StoreImageFirebase from '../StoreIT/StoreImageTextFirebase'; // Import the StoreImageFirebase component
import StoreBanner from '../StoreIT/StoreBnner'; // Import the StoreBanner component
import './AvatarForm.css';

function AvatarForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  // Define a function to update the image URL
  const handleImageChange = (url) => {
    setImageUrl(url);
  };

  // Define a function to update the banner URL
  const handleBannerChange = (url) => {
    setBannerUrl(url);
  };

  return (
    <form className="section">
      <h2>Avatar</h2>
      <div className="dropbox">
        {/* Include StoreImageFirebase component */}
        <StoreImageFirebase onImageChange={handleImageChange} />
      </div>
      <h2>Banner</h2>
      <div className="dropbox">
        {/* Include StoreBanner component */}
        <StoreBanner onBannerChange={handleBannerChange} />
      </div>
    </form>
  );
}

export default AvatarForm;


