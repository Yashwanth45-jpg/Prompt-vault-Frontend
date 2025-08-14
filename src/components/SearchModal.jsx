import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PromptCard from './PromptCard'; // 1. Import your existing PromptCard
import './SearchModal.css';

function SearchResultCard({ result, onClick }) {
  // Now, this component renders the full PromptCard inside a link
  return (
    <Link to={`/prompt/${result._id}`} className="search-result-link" onClick={onClick}>
      {/* 2. Use the PromptCard component for the display */}
      <div className="search-result-card-wrapper">
        <PromptCard prompt={result} isSearchResult={true} />
      </div>
    </Link>
  );
}

function SearchModal({ isOpen, onClose, searchTerm, setSearchTerm, results, loading }) {
  const { theme } = useTheme();
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="search-modal-overlay">
      <div ref={modalRef} className={`search-modal-content ${theme}`}>
        <button onClick={onClose} className="close-modal-button" aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        <div className="search-input-container">
          <i className="fas fa-search search-icon"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search your prompts by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-button">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="search-results-container">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : results.length > 0 ? (
            results.map(result => <SearchResultCard key={result._id} result={result} onClick={onClose} />)
          ) : searchTerm ? (
            <div className="no-results">
              <p>No results found for "{searchTerm}"</p>
            </div>
          ) : (
             <div className="no-results">
              <p>Start typing to find your prompts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
