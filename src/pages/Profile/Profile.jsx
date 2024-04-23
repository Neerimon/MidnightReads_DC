// Profile.jsx

import React, { useState, useEffect } from 'react';
import StoreImageFirebase from '../../component/StoreIT/StoreImageTextFirebase';
import ProfileImage from '../../component/ProfileImage/ProfileImage';
import StoreBanner from '../../component/StoreIT/StoreBnner';
import BannerHeader from '../../component/BannerHeader/BannerHeader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance, db } from '../../firebase/firebase';
import AboutSection from '../../component/AboutSection/AboutSection';
import { doc, getDoc } from 'firebase/firestore';
import MyFavoritesTable from '../../component/MyFavoritesTable/MyFavoritesTable'; // Import MyFavoritesTable

function Profile() {
  const [img, setImg] = useState('');
  const [banner, setBanner] = useState(null);
  const [aboutText, setAboutText] = useState('');
  const [likedBooks, setLikedBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);

  const handleImageChange = (url) => {
    setImg(url);
  };

  const handleBannerChange = (url) => {
    setBanner(url);
  };

  const [user] = useAuthState(authInstance);

  useEffect(() => {
    const fetchLikedBooks = async () => {
      try {
        const docRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setLikedBooks(Object.keys(userData));
        }
      } catch (error) {
        console.error('Error fetching liked books:', error);
      }
    };

    if (user) {
      fetchLikedBooks();
    }
  }, [user]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const promises = likedBooks.map(async (bookId) => {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
          const data = await response.json();
          return data;
        });
        const booksData = await Promise.all(promises);
        setBookDetails(booksData);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    if (likedBooks.length > 0) {
      fetchBookDetails();
    }
  }, [likedBooks]);

  return (
    <div className="profile-container">
      <header className="profile-header">
        {banner ? (
          <BannerHeader BannerImage={banner} />
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
      <MyFavoritesTable bookDetails={bookDetails} /> {/* Render MyFavoritesTable component */}
    </div>
  );
}

export default Profile;
