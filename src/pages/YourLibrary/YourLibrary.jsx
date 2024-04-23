import React, { useState, useEffect } from 'react';
import './YourLibrary.css';
import backgroundImage from '../../images/YourLibrary.jpg';
import { collection, getDocs } from 'firebase/firestore'; // Import collection and getDocs
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const YourLibrary = () => {
  const [bookIds, setBookIds] = useState([]);
  const [user] = useAuthState(authInstance);

  useEffect(() => {
    const fetchBookIds = async () => {
      try {
        if (!user) {
          return; // Return early if user object is null
        }
  
        const docRef = doc(db, 'your_library', user.email); // Reference the document using user's email
        console.log("Document Reference:", docRef); // Add this line
  
        const docSnap = await getDoc(docRef);
        console.log("Document Snapshot:", docSnap); // Add this line
  
        if (docSnap.exists()) {
          const bookIds = docSnap.data().bookIds; // Assuming bookIds is the field containing an array of book IDs
          console.log("Book IDs:", bookIds); // Add this line
          setBookIds(bookIds);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error('Error fetching book IDs:', error);
      }
    };
  
    fetchBookIds();
  }, [user]);
  
  
  

  return (
    <div>
      <header className="your-library-header">
        <img src={backgroundImage} alt="Library Background" className="your-library-background" />
        <div className="your-library-overlay"></div>
        <div className="your-library-header-content">
          <h1>Welcome to Your Library</h1>
          <p>Explore, organize, and customize your virtual library</p>
        </div>
      </header>
      <div className="book-list">
        <h2>Your Book IDs:</h2>
        <ul>
          {bookIds && bookIds.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default YourLibrary;
