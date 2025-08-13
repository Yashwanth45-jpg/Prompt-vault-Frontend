// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
// Assuming you have the image in your public folder or src
import loadingImage from '../assets/image.png';
// import '../App.css'
import '../App.css'

const LoadingScreen = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust the duration as needed
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="vault-container">
          <img
            src={loadingImage}
            alt="PromptVault loading screen"
            className="vault-logo"
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingScreen;