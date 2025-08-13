import React from 'react';

function SearchResultItem({ prompt }) {
    const itemStyle = {
        padding: '12px 16px',
        cursor: 'pointer',
        borderBottom: '1px solid #f3f4f6',
        transition: 'background-color 0.2s'
    };
    
    const titleStyle = {
        fontWeight: '600',
        color: '#111827',
        marginBottom: '4px'
    };

    const textStyle = {
        fontSize: '0.9rem',
        color: '#6B7280',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    return (
        <div 
            style={itemStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
            <div style={titleStyle}>{prompt.title}</div>
            <div style={textStyle}>{prompt.promptText}</div>
        </div>
    );
}

function SearchResultsPopup({ results, loading }) {
  const popupStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    width: '336px', // Matches search bar width + padding
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    zIndex: 10,
    maxHeight: '300px',
    overflowY: 'auto'
  };

  const infoStyle = {
      padding: '16px',
      textAlign: 'center',
      color: '#6B7280'
  };

  return (
    <div style={popupStyle}>
      {loading && <div style={infoStyle}>Searching...</div>}
      {!loading && results.length === 0 && <div style={infoStyle}>No results found.</div>}
      {!loading && results.map(prompt => (
        <SearchResultItem key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
}

export default SearchResultsPopup;