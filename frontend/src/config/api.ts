import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // TODO: change this to get env key
  headers: {
    'Content-Type': 'application/json'
  }
});

// interceptor to add token to requests
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
