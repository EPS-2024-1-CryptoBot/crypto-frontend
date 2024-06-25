import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pitchit-api.onrender.com/api/', // URL base da API
  headers: {
    'Content-Type': 'application/json'
  }
});
