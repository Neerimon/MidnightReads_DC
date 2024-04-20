import React from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';
import AboutSection from '../../component/AboutSection/AboutSection';
import AvatarForm from '../../component/AvatarForm/AvatarForm';

function Settings() {
    return (
        <div className="page-content">
            <div className="settings container">
                <div className="nav-2">
                    <div className="mobile-nav">
                        <h1>Settings</h1>
                    </div>
                    <div className="nav-group mobile-nav-hidden">
                        <ul>
                            <li><Link to="/Settings">Profile</Link></li>
                            <li><Link to="/Account">Account</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="profile">
                        <div className="section">
                            <h1>Profile</h1>
                        </div>
                        <AboutSection/>
                        <AvatarForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
