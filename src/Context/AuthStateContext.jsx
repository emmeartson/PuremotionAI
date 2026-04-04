import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../Redux/Auth";

const AuthStateContext = createContext();

export const AuthStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        const userInfo = authService.getCurrentUser();
        setUser(userInfo);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateAuthState = (userInfo) => {
    setUser(userInfo);
    setIsAuthenticated(!!userInfo);
  };

  const clearAuthState = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    updateAuthState,
    clearAuthState,
    checkAuth,
  };

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within AuthStateProvider");
  }
  return context;
};

export default AuthStateContext;
