import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.thenewsapi.com/v1/', // URL base da API
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer GlpLdgeEYD1PzeWNyqew7M6msBUEB7XC7IhylczG' // Inclua sua chave da API aqui
  }
});
