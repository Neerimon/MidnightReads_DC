import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetailsPage.css';
import { firestoreInstance, authInstance } from '../../firebase/firebase';
import { collection, doc, updateDoc, deleteField, getDoc } from "firebase/firestore";

function BookDetailsPage() {
  const { id } = useParams(); // Get the book ID from route parameters
  const [bookCover, setBookCover] = useState(null);
  const [bookInfo, setBookInfo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isAvailableOnGooglePlay, setIsAvailableOnGooglePlay] = useState(false);

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

        // Check if the book is available on Google Play Store
        const googlePlayUrl = data.volumeInfo && data.volumeInfo.canonicalVolumeLink;
        if (googlePlayUrl) {
          setIsAvailableOnGooglePlay(true);
        }

        // Check if the book is liked by the user
        const currentUser = authInstance.currentUser;
        if (currentUser) {
          const userEmail = currentUser.email;
          const userDocRef = doc(firestoreInstance, 'users', userEmail);
          const userDocSnapshot = await getDoc(userDocRef);
          const userData = userDocSnapshot.data();
          if (userData && userData[id] === true) {
            setIsLiked(true);
          }
        }

      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToList = () => {
    // Implement logic to add the book to a list
    console.log('Book added to list!');
  };

  const handleLike = async () => {
    try {
      // Get the current user's email
      const currentUser = authInstance.currentUser;
      if (!currentUser) {
        console.error('User not logged in.');
        return;
      }
      const userEmail = currentUser.email;
  
      // Check the current like status
      const userDocRef = doc(firestoreInstance, 'users', userEmail);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const isBookLiked = userData && userData[id] === true;
  
      // Update the user's document based on the current like status
      if (isBookLiked) {
        // If the book is already liked, remove it from the user's document
        await updateDoc(userDocRef, {
          [id]: deleteField() // Remove the book ID from the user's document
        });
      } else {
        // If the book is not liked, add it to the user's document
        await updateDoc(userDocRef, {
          [id]: true // Set the book ID as true to indicate it's liked
        });
      }
  
      setIsLiked(!isLiked); // Toggle the like status
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  };

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
            <div className="button-container">
              <button className={isLiked ? "like-button liked" : "like-button"} onClick={handleLike}>
                {isLiked ? "❤️ Liked" : "🤍 Like"}
              </button>
              <button className="add-to-list-button" onClick={handleAddToList}>Add to List</button>
            </div>
            {isAvailableOnGooglePlay && (
                <a href={`${bookInfo.canonicalVolumeLink}&source=gbs_api`} target="_blank" rel="noopener noreferrer">
                  <button className="read-on-google-play-button">Read the book here</button>
                </a>
              )}
          </div>
        </div>
        <div className="content-diff">
          {bookInfo && (
            <>
              <h1 className="title">{bookInfo.title}</h1>
              <div className="description-container" dangerouslySetInnerHTML={{ __html: bookInfo.description }} />
              {/* Add navigation links or any other information here */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;
