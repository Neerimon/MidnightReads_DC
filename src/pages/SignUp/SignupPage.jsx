import React, { useState } from 'react';
import { authInstance } from '../../firebase/firebase';
import './SignupPage.css'; // Import the CSS file
import user_icon from '../../images/person.png';
import email_icon from '../../images/email.png';
import password_icon from '../../images/password.png';
import google_icon from '../../images/google-logo.png';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup,updateProfile } from "firebase/auth";
import Alert from '../../component/Alert/AlertError';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      // Create user with email and password
      const credential = await createUserWithEmailAndPassword(authInstance, email, password);
  
      // Update user profile with the provided name
      await updateProfile(credential.user, { displayName: name });
  
      setIsSignedUp(true);
    } catch (error) {
      console.error('Signup error:', error.message);
      setErrorMessage(error.message);
    }
  };
  
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(authInstance, provider);
  
      // Extract username from the Google account
      const googleUsername = credential.user.displayName;
  
      // Update user profile with the Google username
      await updateProfile(credential.user, { displayName: googleUsername });
  
      setIsSignedUp(true);
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      setErrorMessage(error.message);
    }
  };
  

  // Handle keydown event to trigger signup on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignup();
    }
  };

  if (isSignedUp) {
    window.location.href = `/login?alert=You%20have%20successfully%20signed%20up!`;
    return null;
  } else {
    return (
      <div className='container-signup'>
        <div className="header-signup">
          <div className="text-signup">Sign Up</div>
          <div className="underline-login"></div>
        </div>
        <div className="google-button" onClick={handleGoogle}>
          <img src={google_icon} alt="Google Logo" />
          <span>Continue with Google</span>
        </div>
        <div className="or-divider">
          <div className="or-line"></div>
          <span className="or-text">OR</span>
          <div className="or-line"></div>
        </div>
        <div className="inputs-signup">
          <div className="input-signup">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <div className="input-signup">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
          </div>

          <div className="input-signup">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
          </div>

          <div className="submit-container-signup">
            <div className="submit-signup" onClick={handleSignup}>Sign Up</div>
          </div>
        </div>
        {errorMessage && <Alert message={errorMessage} visible={true} />}
      </div>
    );
  }
}

export default Signup;
