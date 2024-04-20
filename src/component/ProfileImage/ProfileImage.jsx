import React from 'react';
import '../../pages/Profile/Profile.css';
import defaultProfilePicture from '../../images/Profile.jpg'; // import your default profile picture file
import './ProfileImage.css';
const ProfileImage = ({ profilePicture }) => {
  return (
    <div className="profile-picture-container">
      <img src={profilePicture || defaultProfilePicture} alt="Profile Picture" className="profile-picture" />
    </div>
  );
};

export default ProfileImage;
