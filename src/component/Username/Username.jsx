import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../firebase/firebase';
import { updateProfile } from "firebase/auth";

function Username() {
  const [user] = useAuthState(authInstance);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(authInstance.currentUser, {
        displayName: newDisplayName
      });
      setNewDisplayName('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div>
      {user && (
        <div>
          <p>Current Username: {user.displayName}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter new username"
              value={newDisplayName}
              onChange={handleChange}
            />
            <button type="submit">Update Username</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Username;

