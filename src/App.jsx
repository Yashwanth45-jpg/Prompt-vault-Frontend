import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Import Pages and Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PersonalVaultPage from './pages/PersonalVaultPage';
import CommunityPage from './pages/CommunityPage';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar'; // Desktop Nav
import MobileNav from './components/MobileNav'; // Mobile Nav
import CreatePromptModal from './components/CreatePromptModal';
import SearchModal from './components/SearchModal';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppWrapper() {
  const { user, loading } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handlePromptCreated = (newPrompt) => {
    setRefreshKey(oldKey => oldKey + 1);
    if (newPrompt.isPublic) {
      navigate('/community');
    } else {
      navigate('/vault');
    }
    setIsCreateModalOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    // --- THIS IS THE FIX ---
    // This outer div creates a flex container that ensures a proper sticky footer layout.
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {user && (
        <>
          <Navbar onOpenModal={() => setIsCreateModalOpen(true)} />
          <MobileNav 
            onOpenModal={() => setIsCreateModalOpen(true)} 
          />
        </>
      )}
      
      {/* The 'flex: 1' style makes this div grow to fill all available space */}
      <main className="main-content" style={{ flex: 1, paddingTop: user ? '64px' : '0', paddingBottom: user ? '85px' : '0' }}>
        <Routes>
          {/* Routes */}
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/vault" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/vault" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/vault" />} />
          <Route 
            path="/vault" 
            element={
              <ProtectedRoute>
                <PersonalVaultPage key={refreshKey} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/community" 
            element={
              <ProtectedRoute>
                <CommunityPage key={refreshKey}/>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to={user ? "/vault" : "/"} />} />
        </Routes>
      </main>
      
      <CreatePromptModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPromptCreated={handlePromptCreated}
      />
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}

function App() {
    return (
        <Router>
          <ErrorBoundary>
            <AuthProvider>
                <ThemeProvider>
                    <AppWrapper />
                </ThemeProvider>
            </AuthProvider>
          </ErrorBoundary>
        </Router>
    )
}

export default App;
