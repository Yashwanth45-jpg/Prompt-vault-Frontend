import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './MobileNav.css';

/**
 * A complete mobile navigation solution, including a top bar and a bottom bar.
 * Uses Font Awesome for icons.
 */
function MobileNav({ onOpenModal }) { // Removed onOpenSearch from props
  const { theme, toggleTheme } = useTheme();
  const { logoutAction } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAction();
    navigate('/');
  };

  return (
    <>
      {/* --- Top Mobile Navigation Bar --- */}
      <header className={`mobile-header ${theme}`}>
        <Link to="/vault" className="mobile-logo">PromptVault</Link>
        <div className="mobile-header-right">
          {/* Search button has been removed from here */}
          <button onClick={toggleTheme} className="mobile-header-btn" aria-label="Toggle Theme">
            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
          </button>
          <button onClick={handleLogout} className="mobile-header-btn" aria-label="Logout">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </header>

      {/* --- Bottom Mobile Navigation Bar --- */}
      <nav className={`bottom-nav ${theme}`}>
        <NavLink to="/vault" className={({ isActive }) => isActive ? "bottom-nav-link active" : "bottom-nav-link"}>
          <i className="fas fa-book"></i>
          <span>My Vault</span>
        </NavLink>
        <button className="bottom-nav-create" onClick={onOpenModal} aria-label="Create Prompt">
          <i className="fas fa-plus"></i>
        </button>
        <NavLink to="/community" className={({ isActive }) => isActive ? "bottom-nav-link active" : "bottom-nav-link"}>
          <i className="fas fa-users"></i>
          <span>Community</span>
        </NavLink>
      </nav>
    </>
  );
}

export default MobileNav;