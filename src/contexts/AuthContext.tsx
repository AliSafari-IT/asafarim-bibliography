import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAuthenticated, getCurrentUser, logout, handleGoogleLogin } from '../services/authService';

// Define our user type
interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

// Define the context value type
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
  loading: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());
  const [loading, setLoading] = useState<boolean>(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
      setUser(getCurrentUser());
    };
    
    // Check on mount
    checkAuth();
    
    // Set up storage event listener to handle auth changes in other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'auth_token' || event.key === 'user_data') {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login function
  const login = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await handleGoogleLogin();
      if (response) {
        setUser(response.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = async (): Promise<void> => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout: logoutUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
