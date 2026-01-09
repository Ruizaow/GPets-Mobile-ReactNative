import axios from 'axios';
import { Platform } from 'react-native';
import { storage } from '@services/storage';

const baseURL =
  Platform.OS === 'web'
    ? 'http://172.25.212.146:4000'
    : 'http://10.0.2.2:4000';

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);