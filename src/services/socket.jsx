import axios from 'axios';
import { io } from 'socket.io-client';

// --- HTTP API Client (Axios) ---
const apiClient = axios.create({
  baseURL: 'https://prompt-vault-app-backend.onrender.com/api', // Your local backend URL
  withCredentials: true, // This is crucial for sending cookies
});


// --- Real-Time Client (Socket.IO) ---
const socket = io('https://prompt-vault-app-backend.onrender.com', {
    withCredentials: true
});

export default socket;