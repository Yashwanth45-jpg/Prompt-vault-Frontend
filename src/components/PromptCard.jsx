import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function PromptCard({ prompt, onUpvote, showUpvoteButton = false }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
      background: theme === 'light' ? 'white' : '#1F2937',
      borderRadius: '12px',
      border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      boxSizing: 'border-box',
      boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
  };

  const titleStyle = {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: theme === 'light' ? '#111827' : '#F9FAFB',
      marginBottom: '8px'
  };

  const textStyle = {
      fontSize: '1rem',
      color: theme === 'light' ? '#6B7280' : '#9CA3AF',
      flexGrow: 1,
      lineHeight: '1.6',
      marginBottom: '20px'
  };

  const tagsContainerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
  };

  const tagStyle = {
      background: theme === 'light' ? '#EEF2FF' : '#3730A3',
      color: theme === 'light' ? '#4F46E5' : '#E0E7FF',
      padding: '5px 10px',
      borderRadius: '6px',
      fontSize: '0.8rem',
      fontWeight: '600'
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: `1px solid ${theme === 'light' ? '#f3f4f6' : '#374151'}`
  };
  
  const authorStyle = {
      color: theme === 'light' ? '#6B7280' : '#9CA3AF',
      fontSize: '0.9rem',
      fontWeight: '500'
  };

  const upvoteButtonContainerStyle = {
    position: 'relative',
  };

  const hasUserUpvoted = prompt.upvotes.some(upvoter => upvoter._id === user?.id);
  const upvoteButtonStyle = {
    background: hasUserUpvoted ? '#4F46E5' : (theme === 'light' ? '#F3F4F6' : '#374151'),
    color: hasUserUpvoted ? 'white' : (theme === 'light' ? '#4B5563' : '#9CA3AF'),
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background-color 0.2s'
  };

  const tooltipStyle = {
    visibility: showTooltip ? 'visible' : 'hidden',
    opacity: showTooltip ? 1 : 0,
    transition: 'opacity 0.2s, visibility 0.2s',
    position: 'absolute',
    bottom: '125%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#111827',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    zIndex: 10,
    width: '180px',
    maxHeight: '150px',
    overflowY: 'auto',
    textAlign: 'left',
    fontSize: '0.85rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  };

  return (
    <div 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div>
            <h3 style={titleStyle}>{prompt.title}</h3>
            <p style={textStyle}>{prompt.promptText}</p>
            <div style={tagsContainerStyle}>
                {prompt.tags.map((tag, index) => (
                    <span key={index} style={tagStyle}>{tag}</span>
                ))}
            </div>
        </div>
        {showUpvoteButton && (
            <div style={footerStyle}>
                <span style={authorStyle}>By: {prompt.author?.username || 'Unknown'}</span>
                <div 
                    style={upvoteButtonContainerStyle}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <button 
                        style={upvoteButtonStyle} 
                        onClick={() => onUpvote(prompt._id)}
                    >
                        <span>👍</span>
                        <span>{prompt.upvotes.length}</span>
                    </button>
                    <div style={tooltipStyle}>
                        {prompt.upvotes.length > 0 ? (
                            prompt.upvotes.map(upvoter => (
                                <div key={upvoter._id} style={{ padding: '3px 0' }}>{upvoter.username}</div>
                            ))
                        ) : (
                            'Be the first to upvote!'
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default PromptCard;