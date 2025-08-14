import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkAuthStatus } from '../services/api'; // Make sure this path is correct

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await checkAuthStatus();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem('authToken'); // Clean up invalid tokens
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // --- THIS IS THE FUNCTION TO FIX ---
  const loginAction = (data) => {
    // The 'data' object from your API must contain both 'user' and 'token'
    if (data && data.token && data.user) {
      // 1. Save the token to localStorage. This is the missing piece.
      localStorage.setItem('authToken', data.token);

      // 2. Set the user state
      setUser(data.user);
    } else {
      // This helps debug if the server response is not what you expect
      console.error("Login action failed: 'data.token' or 'data.user' is missing from the API response.");
    }
  };

  const logoutAction = () => {
    // Also critical: remove the token on logout
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
