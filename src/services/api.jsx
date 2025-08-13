import axios from 'axios';

// Create an axios instance configured to talk to your backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend URL
  withCredentials: true, // This is crucial for sending cookies
});


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
// You will add other functions here later (register, createPrompt, etc.)