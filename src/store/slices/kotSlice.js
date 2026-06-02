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
    removeKots: (state, action) => {
      const kotIdsToRemove = action.payload; // array of IDs
      state.activeKots = state.activeKots.filter(k => !kotIdsToRemove.includes(k.id));
    },
    clearCompletedKots: (state) => {
      state.activeKots = state.activeKots.filter(k => k.status !== 'delivered');
    },
    updateKotItemFulfillment: (state, action) => {
      const { itemId, serveQty, packQty } = action.payload;
      // Search all KOTs for the item
      for (const kot of state.activeKots) {
        const item = kot.items.find(i => i.id === itemId);
        if (item) {
          item.fulfillment = { ...item.fulfillment, dine_in: serveQty, take_away: packQty };
        }
      }
    },
    removePackedKotItems: (state, action) => {
      const { packedItemIds } = action.payload;
      for (const kot of state.activeKots) {
        kot.items = kot.items.filter(item => {
          if (packedItemIds.includes(item.id)) {
            // Keep the item only if it has dine_in quantity > 0
            return (item.fulfillment?.dine_in || 0) > 0;
          }
          return true;
        });
      }
      // Optional: remove empty KOTs
      state.activeKots = state.activeKots.filter(k => k.items.length > 0);
    }
  }
});

export const { generateKOT, updateKotStatus, removeKots, clearCompletedKots, updateKotItemFulfillment, removePackedKotItems } = kotSlice.actions;

export const selectActiveKots = (state) => state.kot.activeKots;

export default kotSlice.reducer;
