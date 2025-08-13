import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import the theme hook

function SkeletonCard() {
  const { theme } = useTheme(); // Get the current theme

  const lightGradient = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
  const darkGradient = 'linear-gradient(90deg, #374151 25%, #4B5563 50%, #374151 75%)';

  const skeletonStyle = {
    background: theme === 'light' ? lightGradient : darkGradient,
    backgroundSize: '200% 100%',
    borderRadius: '4px',
    animation: 'shimmer 1.5s infinite',
  };

  // Add keyframes for the shimmer animation to your main CSS file (e.g., index.css)
  /*
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  */

  const cardBaseStyle = {
    background: theme === 'light' ? 'white' : '#1F2937',
    border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  };

  return (
    <div style={cardBaseStyle}>
      <div style={{ ...skeletonStyle, height: '24px', width: '75%', marginBottom: '18px' }}></div>
      <div style={{ ...skeletonStyle, height: '16px', width: '100%', marginBottom: '10px' }}></div>
      <div style={{ ...skeletonStyle, height: '16px', width: '90%' }}></div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
        <div style={{ ...skeletonStyle, height: '24px', width: '60px' }}></div>
        <div style={{ ...skeletonStyle, height: '24px', width: '75px' }}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;