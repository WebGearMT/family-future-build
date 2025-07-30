import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (userData: User) => void;
  signUp: (userData: User) => void;
  signOut: () => void;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthNavigation = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignOut = () => {
    signOut();
  };

  return {
    user,
    isAuthenticated,
    handleSignIn,
    handleSignUp,
    handleSignOut
  };
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to store user session with timestamp
  const storeUserSession = (userData: User) => {
    const sessionData = {
      user: userData,
      timestamp: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
  };

  // Helper function to get stored user session
  const getStoredUserSession = () => {
    try {
      const storedSession = localStorage.getItem('userSession');
      if (storedSession) {
        const sessionData = JSON.parse(storedSession);

        // Check if session has expired
        if (sessionData.expiresAt && Date.now() > sessionData.expiresAt) {
          localStorage.removeItem('userSession');
          return null;
        }

        return sessionData.user;
      }
    } catch (error) {
      console.error('Failed to parse stored session data:', error);
      localStorage.removeItem('userSession');
    }
    return null;
  };

  // Clear stored session
  const clearStoredSession = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('user'); // Remove legacy storage key
  };

  const checkSession = async () => {
    try {
      const response = await fetch('/server/check_session.php', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.logged_in && data.user) {
          const userData = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || data.user.email.split("@")[0],
            firstName: data.user.firstName,
            lastName: data.user.lastName,
          };
          setUser(userData);
          storeUserSession(userData);
          return userData;
        } else {
          // Server says not logged in, clear local session
          setUser(null);
          clearStoredSession();
        }
      } else {
        // Server error, keep local session if available
        const storedUser = getStoredUserSession();
        if (storedUser) {
          setUser(storedUser);
          return storedUser;
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
      // Network error, try to use stored session
      const storedUser = getStoredUserSession();
      if (storedUser) {
        setUser(storedUser);
        return storedUser;
      } else {
        setUser(null);
      }
    }
    return null;
  };

  const signIn = (userData: User) => {
    setUser(userData);
    storeUserSession(userData);
  };

  const signUp = (userData: User) => {
    setUser(userData);
    storeUserSession(userData);
  };

  const signOut = async () => {
    try {
      // Call backend to destroy session
      await fetch('/server/logout.php', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Clear local state and stored session regardless of backend response
      setUser(null);
      clearStoredSession();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      // First, check for stored user session
      const storedUser = getStoredUserSession();
      if (storedUser) {
        setUser(storedUser);
      }

      // Then validate with server (this may update or clear the session)
      await checkSession();

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    checkSession,
  };
  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
