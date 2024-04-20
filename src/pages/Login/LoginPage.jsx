import React, { useState } from 'react';
import { authInstance } from '../../firebase/firebase';
import { useLocation } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file
import email_icon from '../../images/email.png';
import password_icon from '../../images/password.png';
import google_icon from '../../images/google-logo.png';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Alert from '../../component/Alert/AlertError';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const alertMessage = searchParams.get('alert');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      // Redirect to home page after successful login
      window.location.href = '/HomePage?alert=You%20have%20successfully%20Loged%20in!';

    } catch (error) {
      // Handle login error
      setErrorMessage(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authInstance, provider);
      // Redirect to home page after successful Google sign-in
      window.location.href = '/HomePage?alert=You%20have%20successfully%20Loged%20in!';

    } catch (error) {
      // Handle Google sign-in error
      setErrorMessage(error.message);
    }
  };

  // Handle keydown event to trigger login on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='container-login'>
      <div className="header-login">
        <div className="text-login">Login</div>
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
      <div className="inputs-login">
        <div className="input-login">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
        </div>

        <div className="input-login">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
        </div>

        <div className="forgot-password-login">Lost Password? <span>Click Here</span></div>

        <div className="submit-container-login">
          <div className="submit-login" onClick={handleLogin}>Login</div>
        </div>
      </div>
      {/* Display the Alert component with the message from the URL parameter */}
      {alertMessage && <Alert message={alertMessage} visible={true} />}
      {errorMessage && <Alert message={errorMessage} visible={true} />}
    </div>
  );
}

export default Login;

