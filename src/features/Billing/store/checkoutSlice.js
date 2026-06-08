import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  discountAmount: 0,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setDiscountAmount: (state, action) => {
      state.discountAmount = action.payload;
    },
    clearCheckout: (state) => {
      state.discountAmount = 0;
    }
  },
});

export const { setDiscountAmount, clearCheckout } = checkoutSlice.actions;

export const selectDiscountAmount = (state) => state.checkout.discountAmount;

export default checkoutSlice.reducer;
