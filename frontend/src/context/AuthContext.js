import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const token = await SecureStore.getItemAsync('token');
      const storedUser = await AsyncStorage.getItem('user');

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
    await SecureStore.setItemAsync('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  async function logout() {
    await SecureStore.deleteItemAsync('token');
    await AsyncStorage.removeItem('user');
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