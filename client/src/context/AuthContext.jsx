import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('rcc_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('rcc_token');
      const savedUser = localStorage.getItem('rcc_user');

      if (savedToken && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
          // Verify with server in background
          const res = await api.get('/auth/profile');
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('rcc_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, requiredRole = null) => {
    try {
      const res = await api.post('/auth/login', { email, password, requiredRole });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('rcc_token', token);
        localStorage.setItem('rcc_user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        return { success: true, user };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check credentials.',
      };
    }
  };

  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('rcc_token', token);
        localStorage.setItem('rcc_user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        return { success: true, user };
      }
      return { success: false, message: res.data.message || 'Registration failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('rcc_token');
    localStorage.removeItem('rcc_user');
    setToken(null);
    setUser(null);
  };

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('rcc_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
