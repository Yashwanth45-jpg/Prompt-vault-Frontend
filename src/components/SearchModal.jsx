import React, { useEffect, useRef } from 'react';
import PromptCard from './PromptCard';
import { useTheme } from '../context/ThemeContext';

function SearchModal({ isOpen, onClose, searchTerm, setSearchTerm, results, loading }) {
  const { theme } = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5vh',
    zIndex: 2000,
  };

  const modalStyle = {
    background: theme === 'light' ? 'white' : '#1F2937',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '800px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
  };

  const headerStyle = {
      padding: '20px',
      borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
      position: 'relative'
  };

  const searchInputStyle = {
      width: '100%',
      padding: '14px 60px 14px 20px',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '8px',
      background: theme === 'light' ? '#f3f4f6' : '#374151',
      color: theme === 'light' ? '#111827' : '#F9FAFB',
      outline: 'none',
      boxSizing: 'border-box'
  };

  const resultsContainerStyle = {
      padding: '30px',
      overflowY: 'auto',
      flexGrow: 1
  };

  const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px'
  };

  const infoStyle = {
      textAlign: 'center',
      color: theme === 'light' ? '#6B7280' : '#9CA3AF',
      padding: '40px'
  };

  const closeButtonStyle = {
      position: 'absolute',
      top: '50%',
      right: '35px',
      transform: 'translateY(-50%)',
      background: theme === 'light' ? '#e5e7eb' : '#4B5563',
      border: 'none',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1rem',
      color: theme === 'light' ? '#6B7280' : '#E5E7EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search your prompts by title, content, or tag..."
                style={searchInputStyle}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={closeButtonStyle} onClick={onClose}>&times;</button>
        </div>
        <div style={resultsContainerStyle}>
            {loading && <p style={infoStyle}>Searching...</p>}
            {!loading && searchTerm && results.length === 0 && <p style={infoStyle}>No results found for "{searchTerm}".</p>}
            {!loading && results.length > 0 && (
                <div style={gridStyle}>
                    {results.map(prompt => <PromptCard key={prompt._id} prompt={prompt} />)}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
