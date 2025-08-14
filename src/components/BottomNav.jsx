import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './BottomNav.css';

function BottomNav({ onOpenModal }) {
  const { theme } = useTheme();

  return (
    <nav className={`bottom-nav ${theme}`}>
      <NavLink 
        to="/vault" 
        className={({ isActive }) => isActive ? "bottom-nav-link active" : "bottom-nav-link"}
      >
        <i className="fas fa-book"></i>
        <span>My Vault</span>
      </NavLink>
      <button className="bottom-nav-create" onClick={onOpenModal} aria-label="Create Prompt">
        <i className="fas fa-plus"></i>
      </button>
      <NavLink 
        to="/community" 
        className={({ isActive }) => isActive ? "bottom-nav-link active" : "bottom-nav-link"}
      >
        <i className="fas fa-users"></i>
        <span>Community</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;