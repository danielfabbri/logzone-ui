import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log("BASE URL",process.env.NEXT_PUBLIC_API_BASE_URL)

export default api;