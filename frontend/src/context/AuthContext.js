import { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '@services/storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const token = await storage.getToken('token');
      const storedUser = await storage.getItem('user');

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(token, userData) {
    await storage.setToken('token', token);
    await storage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  async function logout() {
    await storage.removeToken('token');
    await storage.removeItem('user');
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}