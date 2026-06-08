import axios from 'axios';
import { store } from '../../store/store'; // Will verify store.js path

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Tenant-Id': import.meta.env.VITE_TENANT_ID,
  },
  timeout: 30000,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Inject Authorization token if available in Redux state
    const state = store.getState();
    const token = state.auth?.accessToken;
    const tokenType = state.auth?.tokenType || 'Bearer';
    
    if (token) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Centralized error handling
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle unauthorized (e.g., redirect to login, trigger logout action)
        console.warn('Unauthorized Access - Token might be expired');
      } else if (status === 403) {
        console.warn('Forbidden Access');
      }
    } else if (error.request) {
      console.warn('Network Error - No response received');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
