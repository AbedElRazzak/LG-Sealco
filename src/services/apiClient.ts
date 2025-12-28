import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:49206/api';
// Removes the /api suffix safely
const ROOT_URL = BASE_URL.replace(/\/api$/, '');

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rootClient = axios.create({
  baseURL: ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



