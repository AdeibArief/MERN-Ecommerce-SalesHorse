import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED: Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        console.log('✅ User loaded from localStorage:', parsed.name);
      } catch (e) {
        // If parsing fails, clear invalid data
        console.error('Failed to parse user from localStorage');
        localStorage.removeItem('user');
      }
    }
    setLoading(false); // Done loading
  }, []);

  const getApiUrl = () => {
    return window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : 'https://saleshorse-backend.onrender.com';
  };

  // Register
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${getApiUrl()}/api/auth/register`, {
        name, email, password
      });

      const userData = response.data.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('✅ Registered:', userData.name);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      console.error('Register error:', message);
      return { success: false, message };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${getApiUrl()}/api/auth/login`, {
        email, password
      });

      const userData = response.data.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('✅ Logged in:', userData.name);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      console.error('Login error:', message);
      return { success: false, message };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('✅ Logged out');
  };

  // Update Profile
  const updateProfile = async (name, email, password) => {
    try {
      const body = { name, email };
      if (password) body.password = password;

      const response = await axios.put(
        `${getApiUrl()}/api/auth/updateprofile`,
        body,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Merge updated data but KEEP the token
      const updatedUser = { ...user, ...response.data.data, token: user.token };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('✅ Profile updated');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      console.error('Update error:', message);
      return { success: false, message };
    }
  };

  // ✅ FIXED: Derive isAuthenticated directly from user
  // This ensures it's ALWAYS in sync
  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,       // true if user exists
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};