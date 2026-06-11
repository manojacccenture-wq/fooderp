import axiosClient from '../../../shared/api/axiosClient';
import { API_ENDPOINTS } from '../../../shared/api/endpoints';

export const orderApi = {
  /**
   * Submits an order (KOT) to the backend API.
   * @param {Object} payload The order payload.
   * @returns {Promise<any>}
   */
  postOrder: async (payload) => {
    const response = await axiosClient.post(API_ENDPOINTS.ORDERS.POST_ORDER, payload);
    return response.data;
  },
};
