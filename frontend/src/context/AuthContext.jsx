import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be within auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : "https://saleshorse-backend.onrender.com";

  const register = async (name, email, password) => {
    try {
      setError(null);

      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      const userData = response.data.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      setError(message);
      return { success: false, message };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);

      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const userData = response.data.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Login issue";
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = async ({ name, email, password }) => {
    try {
      setError(null);

      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      const body = { name, email };
      if (password) body.password = password;

      const response = await axios.put(
        `${API_URL}/api/auth/updateprofile`,
        body,
        config
      );

      const updatedUser = { ...user, ...response.data.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      setError(message);
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
