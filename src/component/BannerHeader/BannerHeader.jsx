import React from 'react';
import '../../pages/Profile/Profile.css';
import defaultBanner from '../../images/black.jpg';

const BannerHeader = ({ BannerImage }) => {
  return (
    <div className="header-container">
      <img src={BannerImage || defaultBanner} alt="Profile Header Background" className="header-background" />
    </div>
  );
};

export default BannerHeader;
