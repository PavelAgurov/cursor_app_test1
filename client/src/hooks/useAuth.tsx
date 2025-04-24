import { useState, useEffect } from 'react';

interface UseAuthReturn {
  isAuthenticated: boolean;
  username: string | null;
  login: () => void;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedUsername = localStorage.getItem('username');
    
    setIsAuthenticated(authStatus);
    setUsername(storedUsername);
  }, []);

  const login = (): void => {
    setIsAuthenticated(true);
    setUsername(localStorage.getItem('username'));
  };

  const logout = (): void => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername(null);
  };

  return { isAuthenticated, username, login, logout };
};

export default useAuth; 