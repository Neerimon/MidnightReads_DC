import React, { useState } from 'react';
import { authInstance } from '../../firebase/firebase';
import './DeleteAccount.css';

function DeleteAccount() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = () => {
    // Show confirmation popup
    setShowConfirmation(true);
  };

  const confirmDeleteAccount = () => {
    // Delete user account and associated data
    const user = authInstance.currentUser;
    if (user) {
      // Delete account
      user.delete().then(() => {
        // Account deleted successfully
        console.log('Account deleted successfully.');
        window.location.href = `/LandingPage?alert=The%20account%20has%20been%20detected!`;
      }).catch((error) => {
        // An error occurred while deleting the account
        console.error('Error deleting account:', error);
      });
    }

    // Hide confirmation popup
    setShowConfirmation(false);
  };

  return (
    <div className="delete-account-container">
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={confirmDeleteAccount}>OK</button>
            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default DeleteAccount;
