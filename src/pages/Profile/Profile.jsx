import React, { useState } from 'react';
import StoreImageFirebase from '../../component/StoreIT/StoreImageTextFirebase';
import ProfileImage from '../../component/ProfileImage/ProfileImage';
import StoreBanner from '../../component/StoreIT/StoreBnner';
import BannerHeader from '../../component/BannerHeader/BannerHeader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../firebase/firebase';
import AboutSection from '../../component/AboutSection/AboutSection';

function Profile() {
  const [img, setImg] = useState('');
  const [banner, setBanner] = useState(null); // Change default value to null
  const [aboutText, setAboutText] = useState(''); // State to store about text

  const handleImageChange = (url) => {
    setImg(url);
  };

  const handleBannerChange = (url) => {
    setBanner(url); // Update banner state
  };

  const [user] = useAuthState(authInstance);

  return (
    <div className="profile-container">
      <header className="profile-header">
        {banner ? (
          <BannerHeader BannerImage={banner} /> // Pass banner state to BannerHeader
        ) : (
          <StoreBanner onBannerChange={handleBannerChange} />
        )}
        <div className="profile-info">
          {!img && <StoreImageFirebase onImageChange={handleImageChange} />}
          {img && <ProfileImage profilePicture={img} />}
          {user && (
            <div>
              <p className="username">{user.displayName}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Profile;
