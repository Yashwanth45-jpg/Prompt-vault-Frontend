import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PersonalVaultPage from './pages/PersonalVaultPage';
import CommunityPage from './pages/CommunityPage';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import CreatePromptModal from './components/CreatePromptModal';
import LoadingScreen from './components/LoadingScreen';


function AppWrapper() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handlePromptCreated = (newPrompt) => {
      setRefreshKey(oldKey => oldKey + 1); 
      if (newPrompt.isPublic) {
          navigate('/community');
      } else {
          navigate('/vault');
      }
  };

 if (loading) {
    // Show the LoadingScreen component when the auth state is loading
    return <LoadingScreen />;
  }

  return (
    <>
      {user && <Navbar onOpenModal={() => setIsModalOpen(true)} />}
      <div className={user ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/vault" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/vault" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/vault" />} />
          <Route path="/vault" element={user ? <PersonalVaultPage key={refreshKey} /> : <Navigate to="/login" />} />
          <Route path="/community" element={user ? <CommunityPage key={refreshKey} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={user ? "/vault" : "/"} />} />
        </Routes>
      </div>
      <CreatePromptModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPromptCreated={handlePromptCreated}
      />
    </>
  );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <AppWrapper />
                </ThemeProvider>
            </AuthProvider>
        </Router>
    )
}

export default App;