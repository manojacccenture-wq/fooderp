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
  /**
   * Updates an existing order with new items.
   * @param {Object} params
   * @param {string|number} params.orderId
   * @param {Array} params.payload
   * @returns {Promise<any>}
   */
  updateOrderItems: async ({ orderId, payload }) => {
    
    const response = await axiosClient.put(`${API_ENDPOINTS.ORDERS.UPDATE_ORDER_ITEMS_WEB}?OrderId=${orderId}`, payload);
    return response.data;
  },
};
