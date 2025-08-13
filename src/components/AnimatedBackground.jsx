import React from 'react';
import { useTheme } from '../context/ThemeContext';

function AnimatedBackground() {
    const { theme } = useTheme();

    const areaStyle = {
        position: 'absolute', // Changed back to absolute for page-specific use
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0 
    };

    const circlesStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0
    };

    const circleStyle = {
        position: 'absolute',
        display: 'block',
        listStyle: 'none',
        width: '20px',
        height: '20px',
        animation: 'float 25s linear infinite',
        bottom: '-150px',
    };

    // Add this animation to your main CSS file (e.g., index.css)
    /*
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
            border-radius: 0;
        }
        100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
        }
    }
    */

    const lightColors = [
        'rgba(196, 181, 253, 0.3)',
        'rgba(167, 139, 250, 0.2)',
        'rgba(139, 92, 246, 0.2)',
    ];

    const darkColors = [
        'rgba(255, 255, 255, 0.1)',
        'rgba(255, 255, 255, 0.15)',
        'rgba(255, 255, 255, 0.05)',
    ];

    const circleData = [
        { left: '25%', width: 80, height: 80, delay: 0, duration: 35 },
        { left: '10%', width: 20, height: 20, delay: 2, duration: 12 },
        { left: '70%', width: 20, height: 20, delay: 4, duration: 18 },
        { left: '40%', width: 60, height: 60, delay: 0, duration: 28 },
        { left: '65%', width: 20, height: 20, delay: 0, duration: 22 },
        { left: '75%', width: 110, height: 110, delay: 3, duration: 45 },
        { left: '35%', width: 150, height: 150, delay: 7, duration: 55 },
        { left: '50%', width: 25, height: 25, delay: 15, duration: 35 },
        { left: '20%', width: 15, height: 15, delay: 2, duration: 25 },
        { left: '85%', width: 150, height: 150, delay: 0, duration: 41 },
    ];

    const colors = theme === 'light' ? lightColors : darkColors;

    return (
        <div style={areaStyle}>
            <ul style={circlesStyle}>
                {circleData.map((c, i) => (
                    <li key={i} style={{
                        ...circleStyle,
                        left: c.left,
                        width: c.width,
                        height: c.height,
                        animationDelay: `${c.delay}s`,
                        animationDuration: `${c.duration}s`,
                        background: colors[i % colors.length],
                    }}></li>
                ))}
            </ul>
        </div >
    );
};

export default AnimatedBackground;