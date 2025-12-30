import axios from "axios";

const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    if (window.location.hostname.includes('vercel.app')) {
        return 'https://stylee.onrender.com/api';
    }

    const host = window.location.hostname === 'localhost' ? '127.0.0.1' : window.location.hostname;
    return `http://${host}:5001/api`;
};

const API_BASE_URL = getApiBaseUrl();

if (import.meta.env.DEV) {
    console.log('🔗 API Base URL:', API_BASE_URL);
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    signup: (data) => api.post("/auth/signup", data),
    login: (data) => api.post("/auth/login", data),
    getProfile: () => api.get("/auth/profile"),
};

export const itemsAPI = {
    getAll: (params = {}) => api.get("/items", { params }),

    getById: (id) => api.get(`/items/${id}`),

    create: (data) => api.post("/items", data),

    update: (id, data) => api.put(`/items/${id}`, data),

    delete: (id) => api.delete(`/items/${id}`),

    getCategories: () => api.get("/items/categories"),
};

export const usersAPI = {
    getAll: (params = {}) => api.get("/users", { params }),

    getById: (id) => api.get(`/users/${id}`),

    update: (id, data) => api.put(`/users/${id}`, data),

    delete: (id) => api.delete(`/users/${id}`),
};

export const wishlistAPI = {
    getWishlist: () => api.get("/wishlist"),

    addToWishlist: (itemId) => api.post(`/wishlist/${itemId}`),

    removeFromWishlist: (itemId) => api.delete(`/wishlist/${itemId}`),

    clearWishlist: () => api.delete("/wishlist"),
};

export default api;
