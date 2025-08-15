// API client with base URL and auth headers
import axios from 'axios';
import { getAccessToken } from '../context/AuthContext';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true, // for cookies if using refresh token
});

// Request interceptor to attach token
axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
