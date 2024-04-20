import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MagnifyingGlass from '../../images/Magnifying-Glass.png';
import logo from '../../images/BookQuest.png';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = ({ toggleSidebar, activeTab, handleTabChange }) => {
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isLoggedIn = localStorage.getItem('authToken') !== null; // Check if user is logged in

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear user authentication token
    window.location.href = '/'; // Redirect to home page after logout
  };

  return (
    <>
      {isLoggedIn ? (
        <nav className="navbar">
          <button onClick={toggleSidebar}>
            <i className="ai-three-line-horizontal"></i>
          </button>
          <ul>
            <li className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTabChange('Home')}>
              <Link to="/HomePage">Home</Link>
            </li>
            <li className={activeTab === 'Browse' ? 'active' : ''} onClick={() => handleTabChange('Browse')}>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </nav>
      ) : (
        /* If not logged in, display this navbar */
        <nav className="navbar">
          <button onClick={toggleSidebar}>
            <i className="ai-three-line-horizontal"></i>
          </button>
          <ul>
            <li className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTabChange('Home')}>
              <Link to="/HomePage">Home</Link>
            </li>
            <li className={activeTab === 'Browse' ? 'active' : ''} onClick={() => handleTabChange('Browse')}>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          <div className="Login_buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
