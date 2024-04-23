import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';
import './Navbar.css';
import Logo from '../../images/MidnightReadsLogo.png';

const Navbar = ({ isSidebarOpen, toggleSidebar, activeTab, handleTabChange }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current && // Sidebar element exists
        !sidebarRef.current.contains(event.target) && // Click is outside the sidebar
        event.target.closest('.sidebar-content') && // Click is not on the sidebar button or its children
        isSidebarOpen // Sidebar is currently open
      ) {
        toggleSidebar(false); // Close the sidebar
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [toggleSidebar]);

  const navbarClassName = isScrolled ? 'navbar scrolled' : 'navbar';

  const renderNavbar = () => {
    if (location.pathname === '/LandingPage' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/AboutPage1') {
      return (
        <nav className={navbarClassName}>
          <ul>
            <li className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTabChange('Home')}>
              <Link to="/LandingPage">Home</Link>
            </li>
            <li className={activeTab === 'Browse' ? 'active' : ''} onClick={() => handleTabChange('Browse')}>
              <Link to="/AboutPage1">About</Link>
            </li>
          </ul>
          <div className="Login_buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
          <img src={Logo} alt="Logo" className="logo large-logo" /> {/* Include your SVG logo */}
        </nav>
      );
    } else {
      return (
        <nav className={navbarClassName}>
          <div className='sidebar-content' ref={sidebarRef}>
            <button onClick={() => toggleSidebar(true)}>
              <i className="ai-three-line-horizontal"></i>
            </button>
          </div>
          <ul>
            <li className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTabChange('Home')}>
              <Link to="/HomePage">Home</Link>
            </li>
            <li className={activeTab === 'Browse' ? 'active' : ''} onClick={() => handleTabChange('Browse')}>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          <img src={Logo} alt="Logo" className="logo" />
        </nav>
      );
    }
  };

  return renderNavbar();
};

export default Navbar;
