import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import { useTheme } from '../context/ThemeContext';

const AnimatedLandingBackground = () => {
    const areaStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 0
    };
    const circlesStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', margin: 0, padding: 0 };
    const circleStyle = { position: 'absolute', display: 'block', listStyle: 'none', width: '20px', height: '20px', animation: 'float 25s linear infinite', bottom: '-150px' };
    const circleData = [
        { left: '25%', width: 80, height: 80, delay: 0, duration: 35, color: 'rgba(255, 255, 255, 0.1)' },
        { left: '10%', width: 20, height: 20, delay: 2, duration: 12, color: 'rgba(255, 255, 255, 0.15)' },
        { left: '70%', width: 20, height: 20, delay: 4, duration: 18, color: 'rgba(255, 255, 255, 0.2)' },
        { left: '40%', width: 60, height: 60, delay: 0, duration: 28, color: 'rgba(255, 255, 255, 0.1)' },
        { left: '65%', width: 20, height: 20, delay: 0, duration: 22, color: 'rgba(255, 255, 255, 0.15)' },
        { left: '75%', width: 110, height: 110, delay: 3, duration: 45, color: 'rgba(255, 255, 255, 0.05)' },
        { left: '35%', width: 150, height: 150, delay: 7, duration: 55, color: 'rgba(255, 255, 255, 0.1)' },
        { left: '50%', width: 25, height: 25, delay: 15, duration: 35, color: 'rgba(255, 255, 255, 0.15)' },
        { left: '20%', width: 15, height: 15, delay: 2, duration: 25, color: 'rgba(255, 255, 255, 0.2)' },
        { left: '85%', width: 150, height: 150, delay: 0, duration: 41, color: 'rgba(255, 255, 255, 0.05)' },
    ];
    return (
        <div style={areaStyle}>
            <ul style={circlesStyle}>
                {circleData.map((c, i) => (
                    <li key={i} style={{ ...circleStyle, left: c.left, width: c.width, height: c.height, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s`, background: c.color }}></li>
                ))}
            </ul>
        </div >
    );
};

function LandingPage() {
    const { theme } = useTheme();
    
    const pageStyle = {
        minHeight: '100vh',
        background: theme === 'light' 
            ? 'linear-gradient(-45deg, #EEF2FF, #F3E8FF, #E0F2FE)'
            : 'linear-gradient(-45deg, #0C111E, #1F2937, #3730A3)',
        backgroundSize: '400% 400%',
        animation: 'gradient-background-dark 15s ease infinite',
        color: theme === 'light' ? '#111827' : 'white',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease, color 0.5s ease'
    };

    const contentContainerStyle = {
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
    };

    const heroTitleStyle = {
        fontSize: '4.5rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: theme === 'light' ? 'none' : '0 4px 10px rgba(0,0,0,0.3)',
        lineHeight: '1.2'
    };

    const heroSubtitleStyle = {
        fontSize: '1.25rem',
        color: theme === 'light' ? '#4B5563' : 'rgba(255, 255, 255, 0.8)',
        maxWidth: '700px',
        margin: '0 auto 40px auto',
        lineHeight: '1.6'
    };

    const ctaButtonStyle = {
        background: theme === 'light' ? '#4F46E5' : 'white',
        color: theme === 'light' ? 'white' : '#4F46E5',
        border: 'none',
        padding: '16px 32px',
        borderRadius: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1.1rem',
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    };

    return (
        <div style={pageStyle}>
            <LandingNavbar />
            {theme === 'dark' && <AnimatedLandingBackground />}
            <div style={contentContainerStyle}>
                <h1 style={heroTitleStyle}>Never Lose a Great Prompt Again</h1>
                <p style={heroSubtitleStyle}>
                    PromptVault is your personal library for saving, organizing, and sharing your best AI prompts. 
                    Stop searching through notes and start creating with confidence.
                </p>
                <Link 
                    to="/register"
                    style={ctaButtonStyle}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Get Started for Free
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;