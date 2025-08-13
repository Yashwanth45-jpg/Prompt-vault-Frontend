import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const pageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  }

  const cardStyle = {
    background: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    background: '#1877f2',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const linkStyle = {
    display: 'block',
    marginTop: '15px',
    color: '#1877f2',
    textDecoration: 'none',
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ username, password });
      loginAction(data);
      navigate('/vault');
    } catch (err) {
      setError(err.msg || 'Failed to login');
    }
  };

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
                />
                <input
                style={inputStyle}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <button style={buttonStyle} type="submit">Login</button>
            </form>
            <Link to="/register" style={linkStyle}>Don't have an account? Register</Link>
        </div>
    </div>
  );
}

export default LoginPage;