import axios from 'axios';

// Set the base URL for all API requests
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://agrofix-webapp.onrender.com';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if we're in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/login', { username, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  // In a real application, these would interact with a backend that supports OTP
  sendOTP: async (email: string) => {
    // For demo purposes, we're simulating OTP sending
    // In a real app, you would call your backend API
    return { success: true, message: 'OTP sent successfully' };
  },
  verifyOTP: async (email: string, otp: string) => {
    // For demo purposes, we'll consider "123456" as the valid OTP
    // In a real app, you would verify with your backend
    if (otp === '123456') {
      return { success: true, message: 'OTP verified successfully' };
    } else {
      throw new Error('Invalid OTP');
    }
  },
};

// Products API calls
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  add: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
};

// Orders API calls
export const ordersAPI = {
  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  getMyOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
};

export default api; 