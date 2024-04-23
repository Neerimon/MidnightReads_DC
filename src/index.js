import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

// Only use createRoot to render your application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
