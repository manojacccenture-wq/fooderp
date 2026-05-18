import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  heldItems: [],
  orderType: 'dine_in', // 'dine_in' | 'take_away'
  kotStatus: 'idle', // 'idle' | 'success_anim' | 'sent'
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
    },
    setHeldItems: (state, action) => {
      state.heldItems = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setKotStatus: (state, action) => {
      state.kotStatus = action.payload;
    },
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.orderItems.find((item) => item.title === product.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.orderItems.push({
          id: Date.now(),
          image: product.image,
          title: product.title,
          price: Number(product.price),
          quantity: 1,
        });
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.orderItems.find((item) => item.id === id);
      if (existing) {
        existing.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.orderItems.find((item) => item.id === id);
      if (existing) {
        if (existing.quantity === 1) {
          state.orderItems = state.orderItems.filter(item => item.id !== id);
        } else {
          existing.quantity -= 1;
        }
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.orderItems = state.orderItems.filter(item => item.id !== id);
    },
    cancelOrder: (state) => {
      state.orderItems = [];
      state.heldItems = [];
      state.kotStatus = 'idle';
    },
    replaceItem: (state, action) => {
      const { selectedItemId, newProduct } = action.payload;
      state.orderItems = state.orderItems.map(item => 
        item.id === selectedItemId
          ? { ...newProduct, id: item.id, quantity: item.quantity }
          : item
      );
    },
    confirmSplit: (state, action) => {
      const { item, kitchenQty, heldQty } = action.payload;
      
      // Update kitchen order
      if (kitchenQty > 0) {
        const orderItem = state.orderItems.find(i => i.id === item.id);
        if (orderItem) orderItem.quantity = kitchenQty;
      } else {
        state.orderItems = state.orderItems.filter(i => i.id !== item.id);
      }
      
      // Update held items
      if (heldQty > 0) {
        const heldItem = state.heldItems.find(i => i.id === item.id);
        if (heldItem) {
          heldItem.quantity += heldQty;
        } else {
          state.heldItems.push({ ...item, quantity: heldQty });
        }
      }
    }
  },
});

export const {
  setOrderItems,
  setHeldItems,
  setOrderType,
  setKotStatus,
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  cancelOrder,
  replaceItem,
  confirmSplit
} = orderSlice.actions;

export const selectOrderItems = (state) => state.order.orderItems;
export const selectHeldItems = (state) => state.order.heldItems;
export const selectOrderType = (state) => state.order.orderType;
export const selectKotStatus = (state) => state.order.kotStatus;

// Derived Selectors
export const selectSubtotal = createSelector(
  [selectOrderItems],
  (items) => items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
);

export const selectTotalQuantity = createSelector(
  [selectOrderItems],
  (items) => items.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectTotalHeldPrice = createSelector(
  [selectHeldItems],
  (items) => items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
);

export const selectTax = createSelector(
  [selectSubtotal],
  (subtotal) => subtotal * 0.08
);

export default orderSlice.reducer;
