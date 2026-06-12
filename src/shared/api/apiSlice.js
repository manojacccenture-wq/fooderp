import { createApi } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from './endpoints';

// Custom baseQuery using dynamic import for axiosClient to prevent circular dependency:
// Component -> apiSlice -> axiosClient -> store -> rootReducer -> apiSlice
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const { default: axiosClient } = await import('./axiosClient');
      const result = await axiosClient({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Tables', 'Customers'],
  endpoints: (builder) => ({
    getTablesWithOrderAmount: builder.query({
      query: () => ({
        url: API_ENDPOINTS.TABLES.GET_TABLES_WITH_ORDER_AMOUNT,
        method: 'GET',
      }),
      transformResponse: (response) => {
        let tablesData = [];
        const isSuccessful = response?.IsSuccessful ?? response?.isSuccessful;
        const data = response?.Data ?? response?.data;

        if (Array.isArray(response)) {
          tablesData = response;
        } else if (response && isSuccessful && data) {
          tablesData = data;
        }

        return tablesData.map(item => {
          const itemId = item.Id ?? item.id;
          const itemName = item.Name ?? item.name;
          const itemChairs = item.Chairs ?? item.chairs;
          const itemStatus = item.Status ?? item.status;

          return {
            tableId: itemId,
            tableName: itemName,
            chairCount: itemChairs,
            status: itemStatus || 'Empty',
            id: itemId,
            tableNo: itemName,
            guests: itemChairs,
            customerName: "",
            reservedGuests: 0,
            duration: "",
            orderId: item.OrderId ?? item.orderId,
            orderStatus: item.OrderStatus ?? item.orderStatus,
            currentOrderAmount: item.CurrentOrderAmount ?? item.currentOrderAmount,
            orderStartedAt: item.OrderStartedAt ?? item.orderStartedAt
          };
        });
      },
      providesTags: ['Tables'],
    }),
    getCustomerNameList: builder.query({
      query: () => ({
        url: API_ENDPOINTS.CUSTOMERS.GET_CUSTOMER_NAME_LIST,
        method: 'GET',
      }),
      providesTags: ['Customers'],
    }),
    getCustomerOrderByTableId: builder.query({
      query: ({ tableId, tableStatus }) => ({
        url: `${API_ENDPOINTS.DINE_IN.GET_CUSTOMER_ORDER_BY_TABLE_ID}?tableId=${tableId}&tableStatus=${tableStatus}`,
        method: 'GET',
      }),
    }),
    putOrderStatus: builder.mutation({
      query: ({ orderId, payload }) => ({
        url: `${API_ENDPOINTS.ORDERS.PUT_ORDER_STATUS}/${orderId}`,
        method: 'PUT',
        data: payload,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    putTableStatus: builder.mutation({
      query: ({ tableId, status }) => ({
        url: `${API_ENDPOINTS.TABLES.PUT_TABLE_STATUS}/${tableId}`,
        method: 'PUT',
        data: status,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    cancelDineInOrder: builder.mutation({
      query: (orderId) => ({
        url: `${API_ENDPOINTS.ORDERS.CANCEL_DINE_IN_ORDER}?orderId=${orderId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Tables', 'Customers'],
    }),
    putOrderPaymentStatus: builder.mutation({
      query: ({ orderId, payload }) => ({
        url: `${API_ENDPOINTS.ORDERS.PUT_ORDER_PAYMENT_STATUS}/${orderId}`,
        method: 'PUT',
        data: payload,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    closeOrder: builder.mutation({
      query: (payload) => ({
        url: API_ENDPOINTS.ORDERS.CLOSE_ORDER,
        method: 'POST',
        data: payload,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const {
  useGetTablesWithOrderAmountQuery,
  useGetCustomerNameListQuery,
  useLazyGetCustomerOrderByTableIdQuery,
  usePutOrderStatusMutation,
  usePutTableStatusMutation,
  useCancelDineInOrderMutation,
  usePutOrderPaymentStatusMutation,
  useCloseOrderMutation,
} = apiSlice;
