
/* 2. CREATE A NEW FILE: src/components/ThemeToggle.jsx */
// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const buttonStyle = {
        background: theme === 'light' ? '#F3F4F6' : '#374151',
        border: 'none',
        width: '48px',
        height: '28px',
        borderRadius: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        position: 'relative',
        transition: 'background-color 0.3s ease'
    };

    const circleStyle = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        transition: 'transform 0.3s ease',
        transform: theme === 'light' ? 'translateX(0px)' : 'translateX(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    
    const iconStyle = {
        fontSize: '12px'
    };

    return (
        <button style={buttonStyle} onClick={toggleTheme}>
            <div style={circleStyle}>
                {theme === 'light' ? <span style={iconStyle}>☀️</span> : <span style={iconStyle}>🌙</span>}
            </div>
        </button>
    );
}

export default ThemeToggle;