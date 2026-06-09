import axios from 'axios';
import { store } from '../../store/store'; // Will verify store.js path

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // TenantId intentionally disabled for current API integration.
    // Will be enabled later.
    // 'Tenant-Id': import.meta.env.VITE_TENANT_ID,
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
    // Normalize error shape for entire application
    const normalizedError = {
      message: error.response?.data?.Message || error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || 500
    };

    // Ensure it flows correctly into Redux thunks that read `error.response?.data`
    if (!error.response) {
      error.response = {};
    }
    error.response.data = normalizedError;

    // Centralized error handling
    if (normalizedError.status === 401) {
      // Handle unauthorized (e.g., redirect to login, trigger logout action)
      console.warn('Unauthorized Access - Token might be expired');
    } else if (normalizedError.status === 403) {
      console.warn('Forbidden Access');
    } else if (error.request && !error.response?.config) {
      console.warn('Network Error - No response received');
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
