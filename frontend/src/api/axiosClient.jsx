import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getWithToken = (url, token) =>
  axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` } });

export const postWithToken = (url, data, token) =>
  axiosClient.post(url, data, { headers: { Authorization: `Bearer ${token}` } });

export default axiosClient;
