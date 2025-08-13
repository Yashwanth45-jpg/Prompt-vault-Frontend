import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth
import { useTheme } from '../context/ThemeContext';

function RegisterPage() {
  const { theme } = useTheme();
  const { loginAction } = useAuth(); // 2. Get the loginAction function
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // 3. The register API now returns user data and a token
      const data = await register({ username, email, password });
      // 4. Use loginAction to set the user in the global state
      loginAction(data);
      // 5. Navigate directly to the vault
      navigate('/vault');
    } catch (err) {
      setError(err.msg || 'Failed to register');
    }
  };

  // Theme-aware styles from your other pages
  const pageContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: theme === 'light' ? '#F9FAFB' : '#111827' };
  const cardStyle = { background: theme === 'light' ? 'white' : '#1F2937', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center', border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}` };
  const titleStyle = { fontSize: '2rem', fontWeight: 'bold', color: theme === 'light' ? '#111827' : '#F9FAFB', marginBottom: '10px' };
  const subtitleStyle = { color: theme === 'light' ? '#6B7280' : '#9CA3AF', marginBottom: '30px' };
  const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: `1px solid ${theme === 'light' ? '#D1D5DB' : '#4B5563'}`, boxSizing: 'border-box', fontSize: '1rem', background: theme === 'light' ? '#FFFFFF' : '#374151', color: theme === 'light' ? '#111827' : '#F9FAFB' };
  const buttonStyle = { width: '100%', padding: '12px', border: 'none', borderRadius: '8px', background: 'linear-gradient(45deg, #4F46E5, #6D28D9)', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
  const linkStyle = { display: 'block', marginTop: '15px', color: '#4F46E5', textDecoration: 'none', fontWeight: '500' };

  return (
    <div style={pageContainerStyle}>
        <div style={cardStyle}>
            <h1 style={titleStyle}>Create Account</h1>
            <p style={subtitleStyle}>Get started with your own prompt library.</p>
            <form onSubmit={handleSubmit}>
                <input style={inputStyle} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <button style={buttonStyle} type="submit">Register</button>
            </form>
            <Link to="/login" style={linkStyle}>Already have an account? Log In</Link>
        </div>
    </div>
  );
}

export default RegisterPage;
