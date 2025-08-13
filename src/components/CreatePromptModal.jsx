import React, { useState } from 'react';
import { createPrompt } from '../services/api';
import { useTheme } from '../context/ThemeContext';

function CreatePromptModal({ isOpen, onClose, onPromptCreated }) {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const newPromptData = { title, promptText, isPublic };
      const result = await createPrompt(newPromptData);
      onPromptCreated(result.prompt);
      handleClose();
    } catch (err) {
      setError(err.msg || 'Failed to create prompt.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
      setTitle('');
      setPromptText('');
      setIsPublic(false);
      setError('');
      onClose();
  };

  if (!isOpen) return null;

  // Theme-aware styles
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    background: theme === 'light' ? 'white' : '#1F2937',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    position: 'relative',
    border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
  };

  const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: theme === 'light' ? '#111827' : '#F9FAFB',
    marginBottom: '25px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'light' ? '#D1D5DB' : '#4B5563'}`,
    boxSizing: 'border-box',
    fontSize: '1rem',
    background: theme === 'light' ? '#FFFFFF' : '#374151',
    color: theme === 'light' ? '#111827' : '#F9FAFB',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '150px',
    resize: 'vertical',
  };
  
  const checkboxContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '25px',
  };

  const buttonContainerStyle = {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  const createButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(45deg, #4F46E5, #6D28D9)',
    color: 'white',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    background: theme === 'light' ? '#F3F4F6' : '#374151',
    color: theme === 'light' ? '#4B5563' : '#9CA3AF',
  };
  
  const closeButtonStyle = {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#9CA3AF'
  };

  return (
    <div style={overlayStyle} onClick={handleClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={handleClose}>&times;</button>
        <h2 style={titleStyle}>Create a New Prompt</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Prompt Title (e.g., 'Marketing Copy for Instagram')"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            style={textareaStyle}
            placeholder="Enter your prompt text here..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            required
          />
          <div style={checkboxContainerStyle}>
              <input 
                type="checkbox" 
                id="isPublic" 
                checked={isPublic} 
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <label htmlFor="isPublic" style={{color: theme === 'light' ? '#4B5563' : '#D1D5DB', fontWeight: '500'}}>Make this prompt public</label>
          </div>
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
          <div style={buttonContainerStyle}>
            <button type="button" style={cancelButtonStyle} onClick={handleClose}>Cancel</button>
            <button type="submit" style={createButtonStyle} disabled={loading}>
              {loading ? 'Creating...' : 'Create Prompt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePromptModal;