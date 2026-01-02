import axios from "axios"
import { io } from "socket.io-client"

// Use relative path in production (same origin), absolute URL in development
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return import.meta.env.PROD ? '/api' : 'http://localhost:4000/api';
};

const getSocketURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace('/api', '');
  }
  return import.meta.env.PROD ? window.location.origin : 'http://localhost:4000';
};

export const API = axios.create({
  baseURL: getBaseURL()
})

export const socket = io(getSocketURL())
