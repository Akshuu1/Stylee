import axios from "axios";

// Base URL configuration with smart environment detection
const getApiBaseUrl = () => {
    // 1. Use explicitly set environment variable (highest priority)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // 2. Production detection - if deployed on Vercel
    if (window.location.hostname.includes('vercel.app')) {
        // DEPLOY YOUR BACKEND FIRST, then update this URL!
        // Instructions: See DEPLOYMENT.md in the project root
        const backendUrl = 'https://your-backend-url.vercel.app/api';

        // Show warning if backend not deployed yet
        if (backendUrl.includes('your-backend-url')) {
            console.error('⚠️ BACKEND NOT DEPLOYED! Please deploy backend and update this URL in Frontend/src/services/api.js line 16');
            console.error('📖 See DEPLOYMENT.md for instructions');
        }

        return backendUrl;
    }

    // 3. Local development fallback
    return `http://${window.location.hostname}:5001/api`;
};

const API_BASE_URL = getApiBaseUrl();

// Log the API URL in development for debugging
if (import.meta.env.DEV) {
    console.log('🔗 API Base URL:', API_BASE_URL);
}

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH API ====================
export const authAPI = {
    signup: (data) => api.post("/auth/signup", data),
    login: (data) => api.post("/auth/login", data),
    getProfile: () => api.get("/auth/profile"),
};

// ==================== ITEMS API ====================
export const itemsAPI = {
    // Get all items with filters
    getAll: (params = {}) => api.get("/items", { params }),

    // Get single item
    getById: (id) => api.get(`/items/${id}`),

    // Create new item
    create: (data) => api.post("/items", data),

    // Update item
    update: (id, data) => api.put(`/items/${id}`, data),

    // Delete item (admin only)
    delete: (id) => api.delete(`/items/${id}`),

    // Get categories
    getCategories: () => api.get("/items/categories"),
};

// ==================== USERS API ====================
export const usersAPI = {
    // Get all users (admin only)
    getAll: (params = {}) => api.get("/users", { params }),

    // Get single user (admin only)
    getById: (id) => api.get(`/users/${id}`),

    // Update user (admin only)
    update: (id, data) => api.put(`/users/${id}`, data),

    // Delete user (admin only)
    delete: (id) => api.delete(`/users/${id}`),
};

export default api;
