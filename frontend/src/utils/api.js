import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const api = axios.create({
    baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
};

export const productAPI = {
    // Get all products with pagination
    getAll: (page = 1, limit = 10) => api.get(`/products?page=${page}&limit=${limit}`),
    getById: (id) => api.get(`/products/${id}`),

    // Get current user's products - backend will use authenticated user from token
    getMine: (page = 1, limit = 10) => api.get(`/products/mine?page=${page}&limit=${limit}`),

    // Create product - send as JSON (backend expects imageUrls array)
    create: (data) => api.post('/products', data),

    delete: (id) => api.delete(`/products/${id}`),
};