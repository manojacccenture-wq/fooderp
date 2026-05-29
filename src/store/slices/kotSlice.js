import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeKots: [],
};

const kotSlice = createSlice({
  name: 'kot',
  initialState,
  reducers: {
    generateKOT: (state, action) => {
      const { orderNumber, type, items, tableReference, tokenNumber } = action.payload;
      
      const newKot = {
        id: `KOT-${Date.now()}`,
        orderNumber,
        type, // 'dine_in' or 'take_away'
        items: items.map(item => ({ ...item })), // deep copy items at this state
        tableReference: tableReference || null,
        tokenNumber: tokenNumber || null,
        status: 'preparing', // 'preparing' | 'ready' | 'delivered'
        createdAt: new Date().toISOString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      state.activeKots.push(newKot);
    },
    updateKotStatus: (state, action) => {
      const { kotId, status } = action.payload;
      const kot = state.activeKots.find(k => k.id === kotId);
      if (kot) {
        kot.status = status;
      }
    },
    clearCompletedKots: (state) => {
      state.activeKots = state.activeKots.filter(k => k.status !== 'delivered');
    }
  }
});

export const { generateKOT, updateKotStatus, clearCompletedKots } = kotSlice.actions;

export const selectActiveKots = (state) => state.kot.activeKots;

export default kotSlice.reducer;
