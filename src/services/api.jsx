import axios from 'axios';

// 1. Create a single, configured axios instance for your entire app
const apiClient = axios.create({
  baseURL: 'https://prompt-vault-app-backend.onrender.com/api',
});

// 2. Use an interceptor to automatically add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Add the Authorization header to the request config
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// 3. All your API functions now use the configured apiClient and are much cleaner

/**
 * Checks if the user has a valid session by fetching their profile.
 * The interceptor will automatically add the auth token.
 */
export const checkAuthStatus = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Authentication check failed');
  }
};

/**
 * Logs in the user and returns user data and token.
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Login failed');
  }
};

/**
 * Registers a new user.
 */
export const register = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Registration failed');
    }
};

/**
 * Logs the user out.
 */
export const logout = async () => {
    try {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Logout failed');
    }
};

/**
 * Fetches the prompts belonging to the currently authenticated user.
 * The interceptor will automatically add the auth token.
 */
export const getMyPrompts = async () => {
  try {
    const response = await apiClient.get('/prompt/myprompts');
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch your prompts');
  }
};

/**
 * Fetches prompts shared by the community.
 */
export const getCommunityPrompts = async (page = 1) => {
  try {
    const response = await apiClient.get(`/prompt/community?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch community prompts');
  }
};

/**
 * Creates a new prompt.
 */
export const createPrompt = async (promptData) => {
  try {
    const response = await apiClient.post('/prompt', promptData);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to create prompt');
  }
};

/**
 * Upvotes a specific prompt.
 */
export const upvotePrompt = async (promptId) => {
  try {
    const response = await apiClient.put(`/prompt/${promptId}/upvote`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Upvote failed');
  }
};

/**
 * Searches within the user's own prompts.
 */
export const searchMyPrompts = async (term) => {
  try {
    const response = await apiClient.get(`/prompt/search?term=${term}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Search failed');
  }
};
