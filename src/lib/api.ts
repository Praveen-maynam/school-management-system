import axios from 'axios';

/**
 * Shared axios instance for API calls.
 * You can customize baseURL, headers, interceptors, etc. here.
 */
const api = axios.create({
  baseURL: '/api',
  // You can add headers or interceptors here
});

export default api;
