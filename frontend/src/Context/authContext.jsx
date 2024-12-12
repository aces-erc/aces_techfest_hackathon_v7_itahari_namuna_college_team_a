import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axiosInterceptor";

// Create Auth Context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await api.post("/user/login", credentials);
      const { token } = response.data;

      // Store token and set current user
      localStorage.setItem("token", token);
      setCurrentUser(response.data.user);
      console.log(response.data.user, 'user');
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      return currentUser;

    } catch (error) {
      console.error("Login error: ", error);
      throw error;
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await api.post("/user/signup", userData);
      const { token } = response.data;

      // Store token
      localStorage.setItem("token", token);

      // Optionally fetch user details if needed
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Signup error: ", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  // Check for token and fetch user details on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/user/userprofile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching user details: ", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add a loading spinner or fallback UI
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
