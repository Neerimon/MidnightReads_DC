// Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="logo.svg" alt="Company logo" className="logo" />
        <div className="footer-links">
          <div className="footer-section">
            <h2>MidnightReads</h2>
            <a>Your Account</a>
            <a>Adjust</a>
            <a>our Mission</a>
            <a>Future developments</a>
          </div>
          <div className="footer-section">
            <h2>About us</h2>
            <a>Profile</a>
            <a>Signup</a>
            <a>Your data</a>
            <a>System Status</a>
            <a>Our team</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="legal">
          <span>© 2023 All rights reserved</span>
          <a>License</a>
          <a>Terms and conditions</a>
          <a>Privacy Policy</a>
        </div>
        <div className="social-links">
          <a className="fab fa-github"></a>
          <a className="fab fa-linkedin"></a>
          <a className="fab fa-docker"></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
