import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // backend URL

export const api = axios.create({
  baseURL: API_URL
});

// Dodavanje tokena u header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
