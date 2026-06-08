import { authApi } from '../api/authApi';

export const authService = {
  /**
   * Calls the authentication API and handles business logic mapping.
   * 
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<Object>} Contains token details
   */
  performLogin: async (username, password) => {
    try {
      const data = await authApi.login(username, password);
      
      // Extract tokens and expected fields from the response
      // Example payload from generic token endpoint:
      // { access_token, token_type, expires_in, refresh_token }
      
      return {
        success: true,
        accessToken: data.access_token,
        tokenType: data.token_type || 'Bearer',
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        rawData: data,
      };
    } catch (error) {
      // Extract backend error message if available
      const errorMessage = error.response?.data?.error_description 
        || error.response?.data?.error 
        || error.response?.data?.message 
        || error.message 
        || 'An error occurred during login';
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
};
