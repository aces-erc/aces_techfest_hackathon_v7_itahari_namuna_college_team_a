import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axiosInterceptor";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details using token
  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/user/getuser");
      setCurrentUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setCurrentUser(null);
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await api.post("/user/login", credentials);
      const { token } = response.data;

      // Store token
      localStorage.setItem("token", token);

      // Fetch user details using the token
      return await fetchUserDetails();
    } catch (error) {
      throw error;
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await api.post("insurance/createuser", userData);
      const { token } = response.data;

      // Store token
      localStorage.setItem("token", token);

      // Fetch user details using the token
      return await fetchUserDetails();
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  // Check for token and fetch user details on mount/refresh
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await fetchUserDetails();
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      signup,
      logout,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};