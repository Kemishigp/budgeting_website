import axios from 'axios';

// Base axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // replace with your backend URL
});

// Helpers that accept the token
export const getWithToken = (url, token) => {
  return axiosClient.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const postWithToken = (url, data, token) => {
  return axiosClient.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default axiosClient;
