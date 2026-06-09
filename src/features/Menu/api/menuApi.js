import axiosClient from '../../../shared/api/axiosClient';
import { API_ENDPOINTS } from '../../../shared/api/endpoints';

export const menuApi = {
  /**
   * Fetches the franchisee menus from the backend API.
   * @returns {Promise<any>}
   */
  getFranchiseeMenus: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.MENU.GET_FRANCHISEE_MENUS);
    return response.data;
  },
};
