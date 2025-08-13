// src/pages/PersonalVaultPage.jsx
import React, { useState, useEffect } from 'react';
import PromptCard from '../components/PromptCard';
import SearchModal from '../components/SearchModal';
import { getMyPrompts, searchMyPrompts } from '../services/api'; 
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from '../components/AnimatedBackground'; // Import the component here

function PersonalVaultPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  // ... (state remains the same)
  const [allPrompts, setAllPrompts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // ... (useEffect and handlers remain the same)
  useEffect(() => {
    const fetchInitialPrompts = async () => {
      try {
        setLoading(true);
        const data = await getMyPrompts();
        setAllPrompts(data);
      } catch (err) {
        setError('Failed to fetch prompts.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialPrompts();
  }, []);

  useEffect(() => {
    if (!isSearchModalOpen || searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const search = async () => {
      setSearchLoading(true);
      try {
        const data = await searchMyPrompts(searchTerm);
        setSearchResults(data);
      } catch (err) {
        console.error("Search failed:", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      search();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, isSearchModalOpen]);
  
  const handleOpenSearch = () => {
      setSearchTerm('');
      setSearchResults([]);
      setIsSearchModalOpen(true);
  };

  // Styles
  const pageStyle = {
      background: 'transparent', // Let the global background show through
      minHeight: 'calc(100vh - 64px)',
      position: 'relative',
  };
  // ... (other styles remain the same)
  const vaultContainerStyle = {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1
  };
  const headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px'
  };
  const titleStyle = {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: theme === 'light' ? '#111827' : '#F9FAFB'
  };
  const welcomeTextStyle = {
      color: theme === 'light' ? '#6B7280' : '#9CA3AF',
      fontSize: '1.1rem',
      marginTop: '5px'
  };
  const searchButtonStyle = {
      padding: '12px 20px',
      fontSize: '1rem',
      width: '300px',
      borderRadius: '10px',
      border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
      cursor: 'pointer',
      textAlign: 'left',
      background: theme === 'light' ? 'white' : '#1F2937',
      color: theme === 'light' ? '#6B7280' : '#9CA3AF',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  };
  const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '30px'
  };
  const emptyStateStyle = {
      textAlign: 'center',
      padding: '80px 40px',
      background: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(5px)',
      borderRadius: '20px',
      border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(55, 65, 81, 0.9)'}`
  };
  const emptyTitleStyle = {
      fontSize: '1.75rem',
      fontWeight: '600',
      color: theme === 'light' ? '#111827' : '#F9FAFB',
      marginBottom: '15px'
  };
  const emptyTextStyle = {
      color: theme === 'light' ? '#6B7280' : '#9CA3AF',
      fontSize: '1.1rem',
      maxWidth: '450px',
      margin: '0 auto'
  };

  if (loading) return <div style={vaultContainerStyle}><p style={{color: theme === 'light' ? '#111827' : '#F9FAFB'}}>Loading your prompts...</p></div>;
  if (error) return <div style={vaultContainerStyle}><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <>
      <div style={pageStyle}>
        <AnimatedBackground /> {/* Render the animation component here */}
        <div style={vaultContainerStyle}>
            <div style={headerStyle}>
                <div>
                    <h1 style={titleStyle}>My Vault</h1>
                    <p style={welcomeTextStyle}>Welcome back, {user?.username}!</p>
                </div>
                <button 
                    style={searchButtonStyle}
                    onClick={handleOpenSearch}
                >
                    <span>Search your prompts...</span>
                    <span style={{fontSize: '0.8rem', color: '#9CA3AF'}}>⌘K</span>
                </button>
            </div>
            {allPrompts.length > 0 ? (
                <div style={gridStyle}>
                    {allPrompts.map(prompt => (
                        <PromptCard key={prompt._id} prompt={prompt} />
                    ))}
                </div>
            ) : (
                <div style={emptyStateStyle}>
                    <h2 style={emptyTitleStyle}>Your prompt vault is empty</h2>
                    <p style={emptyTextStyle}>Click "+ Create Prompt" in the navigation bar to save your first masterpiece.</p>
                </div>
            )}
        </div>
      </div>
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        results={searchResults}
        loading={searchLoading}
      />
    </>
  );
}

export default PersonalVaultPage;
