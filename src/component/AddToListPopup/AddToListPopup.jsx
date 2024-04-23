import React, { useState } from 'react';
import './AddToListPopup.css';
import { firestoreInstance, authInstance } from '../../firebase/firebase';
import { doc, setDoc, deleteField, getDoc, updateDoc } from 'firebase/firestore';

const AddToListPopup = ({ onClose, bookId }) => {
  const [score, setScore] = useState('');
  const [chapters, setChapters] = useState('');
  const [volumes, setVolumes] = useState('');

  const handleAddToLibrary = async () => {
    try {
      const currentUser = authInstance.currentUser;
      if (!currentUser) {
        console.error('User not logged in.');
        return;
      }
      const userEmail = currentUser.email;

      // Check if the book is already in the library
      const userDocRef = doc(firestoreInstance, 'your_library', userEmail);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const isBookInLibrary = userData && userData[bookId];

      // Prepare the data to be stored in the document
      const data = {
        [bookId]: {
          score: score,
          chapters: chapters,
          volumes: volumes,
        },
      };

      // Update the user's document based on the current library status
      if (isBookInLibrary) {
        // If the book is already in the library, remove it
        await updateDoc(userDocRef, {
          [bookId]: deleteField(),
        });
      } else {
        // If the book is not in the library, add it with additional attributes
        await setDoc(userDocRef, data, { merge: true });
      }

      onClose(); // Close the popup after adding/removing the book
    } catch (error) {
      console.error('Error updating user library:', error);
    }
  };

  return (
    <div className="add-to-list-popup">
      <div className="popup-content">
        <h2>Add to List</h2>
        <label>
          Score:
          <input type="text" value={score} onChange={(e) => setScore(e.target.value)} />
        </label>
        <label>
          Chapters:
          <input type="text" value={chapters} onChange={(e) => setChapters(e.target.value)} />
        </label>
        <label>
          Volumes:
          <input type="text" value={volumes} onChange={(e) => setVolumes(e.target.value)} />
        </label>
        <button onClick={handleAddToLibrary}>Add to Library</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddToListPopup;
