// src/services/api.jsx
import axios from 'axios';

// Access the backend URL from environment variables
// For Vite, environment variables are exposed via import.meta.env
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Create an axios instance configured to talk to your backend
const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`, // Dynamically set the base URL
  withCredentials: true, // This is crucial for sending cookies (e.g., session cookies for authentication)
});

// ... (rest of your existing code for checkAuthStatus, login, getMyPrompts, etc.)

// NEW FUNCTION TO CHECK AUTH STATUS
export const checkAuthStatus = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Define the login function
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    // Throw the error so the component can handle it
    throw error.response.data;
  }
};

export const getMyPrompts = async () => {
  try {
    // This assumes your backend route is /api/prompts/myprompts
    const response = await apiClient.get('/prompt/myprompts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCommunityPrompts = async (page = 1) => {
  try {
    // Send the page number as a query parameter
    const response = await apiClient.get(`/prompt/community?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const upvotePrompt = async (promptId) => {
  try {
    const response = await apiClient.put(`/prompt/${promptId}/upvote`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPrompt = async (promptData) => {
  try {
    // This endpoint should match your backend route for creating a prompt
    const response = await apiClient.post('/prompt', promptData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchMyPrompts = async (term) => {
  try {
    const response = await apiClient.get(`/prompt/search?term=${term}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const logout = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};