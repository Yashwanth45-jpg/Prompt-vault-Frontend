import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css'

function Navbar({ onOpenModal }) { 
  const { theme } = useTheme();
  const { logoutAction } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAction();
    navigate('/');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-content">
        <div className="left-section">
          <Link to="/vault" className="logo">PromptVault</Link>
          <div className="nav-links">
            <NavLink 
              to="/vault" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              My Vault
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Community
            </NavLink>
          </div>
        </div>
        <div className="right-section">
          <ThemeToggle />
          <button 
            className="btn-create"
            onClick={onOpenModal}
          >
            + Create Prompt
          </button>
          <button 
            onClick={handleLogout} 
            className="btn-logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;