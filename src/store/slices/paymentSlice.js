import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectSubtotal, selectTax } from './orderSlice';
import { selectDiscountAmount } from './checkoutSlice';

const initialState = {
  paymentMode: 'Cash', // 'Cash' | 'Upi' | 'Card' | 'Due'
  customerPaidAmount: 600,
  splitMode: 'full', // 'full' | 'equal' | 'by_item'
  selectedTip: 0,
  customTip: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload;
    },
    setCustomerPaidAmount: (state, action) => {
      state.customerPaidAmount = action.payload;
    },
    setSplitMode: (state, action) => {
      state.splitMode = action.payload;
    },
    setSelectedTip: (state, action) => {
      state.selectedTip = action.payload;
      state.customTip = ''; // clear custom when preset is selected
    },
    setCustomTip: (state, action) => {
      state.customTip = action.payload;
      state.selectedTip = 0; // clear preset when custom is typed
    },
    clearPayment: (state) => {
      state.paymentMode = 'Cash';
      state.splitMode = 'full';
      state.selectedTip = 0;
      state.customTip = '';
    }
  },
});

export const {
  setPaymentMode,
  setCustomerPaidAmount,
  setSplitMode,
  setSelectedTip,
  setCustomTip,
  clearPayment
} = paymentSlice.actions;

export const selectPaymentMode = (state) => state.payment.paymentMode;
export const selectCustomerPaidAmount = (state) => state.payment.customerPaidAmount;
export const selectSplitMode = (state) => state.payment.splitMode;
export const selectSelectedTip = (state) => state.payment.selectedTip;
export const selectCustomTip = (state) => state.payment.customTip;

// Derived Selectors that use state from multiple slices
export const selectFinalPrice = createSelector(
  [selectSubtotal, selectTax, selectDiscountAmount],
  (subtotal, tax, discount) => subtotal + tax - discount
);

// We'll pass guestCount as an argument when we use this selector, or we can add guestCount to tableSlice
// For now, guestCount is likely local state or derived from selectedTable. Let's assume the component will handle the division, 
// or we can add guestCount to tableSlice. The analysis didn't explicitly move guestCount to tableSlice, but it's part of start order formData.
// Let's create a parameterized selector or return a factory.
// Actually, MenuPage has `const [guestCount, setGuestCount] = useState(4);`. We might need to move guestCount to orderSlice or tableSlice.
// I will keep it simple for now, components can compute splitCalculatedAmount from selectFinalPrice and local guestCount.

export const selectAppliedTip = createSelector(
  [selectCustomTip, selectSelectedTip],
  (custom, selected) => custom !== '' ? Number(custom) : selected
);

// This depends on how split is calculated which might need guestCount from component.
// payableAmount = splitCalculatedAmount + appliedTip. The component can combine these.

export default paymentSlice.reducer;
