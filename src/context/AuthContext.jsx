import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('raahi_token');
    const storedUser = localStorage.getItem('raahi_user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('raahi_token');
        localStorage.removeItem('raahi_user');
      }
    }
    setLoading(false);
  }, []);

  const persistSession = (userData, token) => {
    localStorage.setItem('raahi_token', token);
    localStorage.setItem('raahi_user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = useCallback(async (credentials) => {
    setError(null);
    setLoading(true);
    try {
      const { user: userData, token } = await authService.login(credentials);
      persistSession(userData, token);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (data) => {
    setError(null);
    setLoading(true);
    try {
      const { user: userData, token } = await authService.signup(data);
      persistSession(userData, token);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    localStorage.removeItem('raahi_token');
    localStorage.removeItem('raahi_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('raahi_user', JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
