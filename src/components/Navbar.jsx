import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { logout } from '../services/api'; // 1. Import the new logout function

function Navbar({ onOpenModal }) { 
  const { theme } = useTheme();
  const { logoutAction } = useAuth();
  const navigate = useNavigate();

  // 2. Update the handleLogout function
  const handleLogout = async () => {
    try {
        // Call the backend to clear the cookie
        await logout(); 
    } catch (error) {
        console.error("Logout API call failed:", error);
    } finally {
        // This will run regardless of whether the API call succeeded
        logoutAction(); // Clear the user state in React
        navigate('/');   // Navigate to the landing page
    }
  };

  // --- All the style objects remain the same ---
  const navStyle = {
      width: '100%',
      background: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
      display: 'flex',
      justifyContent: 'center',
      height: '64px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
  };
  const navContentStyle = {
      width: '100%',
      maxWidth: '1200px',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
  };
  const leftSectionStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '40px'
  };
  const rightSectionStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
  };
  const logoStyle = {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: theme === 'light' ? '#111827' : '#F9FAFB',
      textDecoration: 'none'
  };
  const navLinksStyle = {
      display: 'flex',
      gap: '10px'
  };
  const navLinkStyle = {
      textDecoration: 'none',
      color: theme === 'light' ? '#4B5563' : '#9CA3AF',
      fontWeight: '600',
      padding: '10px 20px',
      borderRadius: '8px',
      transition: 'background-color 0.2s, color 0.2s'
  };
  const activeNavLinkStyle = {
      background: 'linear-gradient(45deg, #4F46E5, #6D28D9)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  };
  const createButtonStyle = {
      background: 'linear-gradient(45deg, #4F46E5, #6D28D9)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '0.9rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
  };
  const logoutButtonStyle = {
      background: theme === 'light' ? '#F3F4F6' : '#1F2937',
      color: theme === 'light' ? '#4B5563' : '#9CA3AF',
      border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
      padding: '9px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.2s'
  };

  return (
    <nav style={navStyle}>
        <div style={navContentStyle}>
            <div style={leftSectionStyle}>
                <Link to="/vault" style={logoStyle}>PromptVault</Link>
                <div style={navLinksStyle}>
                    <NavLink 
                        to="/vault" 
                        style={({ isActive }) => ({ ...navLinkStyle, ...(isActive ? activeNavLinkStyle : {}) })}
                    >
                        My Vault
                    </NavLink>
                    <NavLink 
                        to="/community" 
                        style={({ isActive }) => ({ ...navLinkStyle, ...(isActive ? activeNavLinkStyle : {}) })}
                    >
                        Community
                    </NavLink>
                </div>
            </div>
            <div style={rightSectionStyle}>
                <ThemeToggle />
                <button 
                    style={createButtonStyle}
                    onClick={onOpenModal}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    + Create Prompt
                </button>
                <button 
                    onClick={handleLogout} 
                    style={logoutButtonStyle}
                >
                    Logout
                </button>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
