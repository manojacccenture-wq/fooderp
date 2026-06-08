import axiosClient from '../../../shared/api/axiosClient';
import { API_ENDPOINTS } from '../../../shared/api/endpoints';

export const authApi = {
  /**
   * Performs a login request to get the authentication token.
   * Uses application/x-www-form-urlencoded as requested.
   * 
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<any>}
   */
  login: async (username, password) => {
    // Generate URL encoded form data
    const payload = new URLSearchParams();
    payload.append('grant_type', 'password');
    payload.append('username', username);
    payload.append('password', password);

    // Make the request using the centralized client
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.TOKEN, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  },
};
