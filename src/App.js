import React, { useState, useEffect } from 'react';
import Home from './pages/HomePage/HomePage'
import Alert from './component/Alert/AlertError'
import Footer from './component/Footer/Footer';
import Navbar from './component/NavBar/Navbar';
import Sidebar from './component/SideBar/Sidebar';
import Browse from './pages/Browse/Browse';
import YourLibrary from './pages/YourLibrary/YourLibrary';
import Settings from './pages/Settings/Settings';
import Account from './pages/Account/AccountPage';
import Profile from './pages/Profile/Profile';
import Signup from './pages/SignUp/SignupPage';
import Login from './pages/Login/LoginPage'; 
import AboutPage1 from './pages/AboutPage/AboutPage1';
import LandingPage from './pages/LandingPage/LandingPage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import'./App.css';

function App() {
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Parse URL parameters and set alert message
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const alertParam = params.get('alert');
    if (alertParam) {
      setAlertMessage(alertParam);
    }
  }, []);

  return (
    <Router>
      <div>
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} activeTab={activeTab} handleTabChange={handleTabChange}/>
        <Sidebar isSidebarOpen={isSidebarOpen}/>
        <Routes>
          <Route path="/HomePage" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/YourLibrary" element={<YourLibrary />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AboutPage1" element={<AboutPage1 />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          {/* Redirect to Home page if route doesn't match any defined routes */}
          <Route path="*" element={<Navigate to="/LandingPage" />} />
        </Routes>
        {/* Display the Alert component with the message from the URL parameter */}
        {alertMessage && <Alert message={alertMessage} visible={true} />}
        {errorMessage && <Alert message={errorMessage} visible={true} />}
        <Footer />
      </div>
    </Router>
  )
}

export default App;