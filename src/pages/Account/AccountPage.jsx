import React from 'react';
import { Link } from 'react-router-dom';
import './AccountPage.css';
import Username from '../../component/Username/Username';
import DeleteAccount from '../../component/DeleteAccount/DeleteAccount';

function Account() {
    return (
        <div className="page-content">
            <div className="Account container">
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
                            <h2>Account</h2>
                        </div>
                        <h3>UserName: </h3> 
                        <Username/>
                        <hr/>
                        <p>
                            Are you sure you want to delete your account? Deleting your account will permanently remove all your data from our system. This action cannot be undone, and you will lose access to your account and all associated information. Please consider carefully before proceeding.
                        </p>
                        <DeleteAccount/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
