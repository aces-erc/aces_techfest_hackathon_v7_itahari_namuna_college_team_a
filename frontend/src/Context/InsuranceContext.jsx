import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../utils/axiosInterceptor";

// Create InsuranceCompanyContext
export const InsuranceCompanyContext = createContext();

// InsuranceCompanyContextProvider component
export const InsuranceCompanyContextProvider = ({ children }) => {
  const [currentInsuranceCompany, setCurrentInsuranceCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch insurance company details
  const fetchInsuranceCompanyDetails = useCallback(async () => {
    try {
      const response = await api.get("/insurance/profile");
      const companyData = response.data;

      setCurrentInsuranceCompany(companyData);
      setError(null);

      // Safely store company data
      localStorage.setItem("insuranceCompany", JSON.stringify(companyData));

      return companyData;
    } catch (err) {
      // Clear authentication-related local storage
      localStorage.removeItem("token");
      localStorage.removeItem("insuranceCompany");

      setCurrentInsuranceCompany(null);
      setError(
        err.response?.data?.message ||
          "Failed to fetch insurance company details",
      );

      throw err;
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await api.post("/insurance/login", credentials);
      const { token } = response.data;

      // Store token securely
      localStorage.setItem("token", token);

      // Fetch and return insurance company details
      return await fetchInsuranceCompanyDetails();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Signup function
  const signup = async (companyData) => {
    try {
      const response = await api.post("/insurance/create", companyData);
      const { token } = response.data;

      // Store token securely
      localStorage.setItem("token", token);

      // Fetch and return insurance company details
      return await fetchInsuranceCompanyDetails();
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  // Logout function
  const logout = useCallback(() => {
    // Clear authentication-related local storage
    localStorage.removeItem("token");
    localStorage.removeItem("insuranceCompany");

    // Reset state
    setCurrentInsuranceCompany(null);
    setError(null);
  }, []);

  // Hospitals management functions
  const createHospital = async (hospitalData) => {
    try {
      const response = await api.post(
        "/insurance/create-hospital",
        hospitalData,
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create hospital");
      throw err;
    }
  };

  const getAllHospitals = async () => {
    try {
      const response = await api.get("/insurance/hospitals");
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch hospitals");
      throw err;
    }
  };

  const updateHospital = async (hospitalId, hospitalData) => {
    try {
      const response = await api.put(
        `/insurance/hospital/${hospitalId}`,
        hospitalData,
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update hospital");
      throw err;
    }
  };

  const deleteHospital = async (hospitalId) => {
    try {
      const response = await api.delete(`/insurance/hospital/${hospitalId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete hospital");
      throw err;
    }
  };

  // Initialize authentication on mount/refresh
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          await fetchInsuranceCompanyDetails();
        }
      } catch (err) {
        console.error("Authentication initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchInsuranceCompanyDetails]);

  // Context value with memoization
  const contextValue = {
    currentInsuranceCompany,
    login,
    signup,
    logout,
    createHospital,
    getAllHospitals,
    updateHospital,
    deleteHospital,
    isAuthenticated: !!currentInsuranceCompany,
    error,
    loading,
  };

  // Render children when loading is complete
  if (loading) {
    return null; // Or a loading spinner component
  }

  return (
    <InsuranceCompanyContext.Provider value={contextValue}>
      {children}
    </InsuranceCompanyContext.Provider>
  );
};

// Custom hook for using insurance company context
export const useInsuranceCompany = () => {
  const context = useContext(InsuranceCompanyContext);

  if (!context) {
    throw new Error(
      "useInsuranceCompany must be used within an InsuranceCompanyContextProvider",
    );
  }

  return context;
};
