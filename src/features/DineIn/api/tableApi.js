import axiosClient from '../../../shared/api/axiosClient';
import { API_ENDPOINTS } from '../../../shared/api/endpoints';

export const tableApi = {
  /**
   * Fetches tables from the backend API.
   * @returns {Promise<any>}
   */
  getTables: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.TABLES.GET_TABLES);
    return response.data;
  },
};
