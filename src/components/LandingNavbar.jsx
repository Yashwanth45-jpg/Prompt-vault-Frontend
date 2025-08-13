import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

function LandingNavbar() {
  const { theme } = useTheme();

  const navStyle = {
      width: '100%',
      background: 'transparent',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      height: '80px',
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1000
  };

  const navContentStyle = {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
  };

  const logoStyle = {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: theme === 'light' ? '#111827' : '#ffffff',
      textDecoration: 'none'
  };

  const rightSectionStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
  };

  const loginButtonStyle = {
      background: 'transparent',
      color: theme === 'light' ? '#4B5563' : 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '0.9rem',
  };

  const signupButtonStyle = {
      background: theme === 'light' ? '#4F46E5' : 'white',
      color: theme === 'light' ? 'white' : '#4F46E5',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '0.9rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
  };

  return (
    <nav style={navStyle}>
        <div style={navContentStyle}>
            <Link to="/" style={logoStyle}>PromptVault</Link>
            <div style={rightSectionStyle}>
                <ThemeToggle />
                <Link to="/login" style={loginButtonStyle}>Login</Link>
                <Link to="/register" style={signupButtonStyle}>Sign Up</Link>
            </div>
        </div>
    </nav>
  );
}

export default LandingNavbar;