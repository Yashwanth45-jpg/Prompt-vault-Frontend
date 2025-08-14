import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 1. Add loading state
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // 2. Set loading to true when the process starts

    try {
      const data = await login({ username, password });
      loginAction(data);
      navigate('/vault');
    } catch (err) {
      // Log the full error to the console for better debugging
      console.error("Login Error:", err); 
      setError(err.msg || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false); // 3. Set loading to false when the process is done
    }
  };

  // Styles (remain the same)
  const pageContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' };
  const cardStyle = { background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' };
  const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' };
  const buttonStyle = { width: '100%', padding: '12px', border: 'none', borderRadius: '6px', background: '#1877f2', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', opacity: isLoading ? 0.7 : 1 }; // Dim button when loading
  const linkStyle = { display: 'block', marginTop: '15px', color: '#1877f2', textDecoration: 'none' };

  return (
    <div style={pageContainerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: '#1c1e21' }}>PromptVault</h1>
        <p style={{ color: '#606770' }}>Log in to access your prompt library.</p>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading} // Disable input when loading
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading} // Disable input when loading
          />
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <button style={buttonStyle} type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <Link to="/register" style={linkStyle}>Don't have an account? Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;