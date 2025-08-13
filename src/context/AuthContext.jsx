import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkAuthStatus } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await checkAuthStatus();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const loginAction = (data) => {
    setUser(data.user);
  };

  const logoutAction = () => {
    setUser(null);
    // You would also call a backend logout endpoint here
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