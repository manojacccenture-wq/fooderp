import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  completedOrders: [],
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    addCompletedOrder: (state, action) => {
      // payload represents a full snapshot of the order
      state.completedOrders.push({
        ...action.payload,
        completedAt: new Date().toISOString()
      });
    },
    clearHistory: (state) => {
      state.completedOrders = [];
    }
  }
});

export const { addCompletedOrder, clearHistory } = orderHistorySlice.actions;

export const selectCompletedOrders = (state) => state.orderHistory.completedOrders;

export default orderHistorySlice.reducer;
