// Example of how to connect to the backend's Socket.io
import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const socket = io(BACKEND_URL, {
  withCredentials: true
});

export default socket;