import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTakeaways: [], // Array of parcel orders
  lastTokenDate: new Date().toDateString(),
  dailyTokenCounter: 0,
};

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState,
  reducers: {
    generateToken: (state, action) => {
      const { orderNumber, source, tableReference, customerInfo, status } = action.payload;
      
      const today = new Date().toDateString();
      if (state.lastTokenDate !== today) {
        state.dailyTokenCounter = 0;
        state.lastTokenDate = today;
      }
      
      state.dailyTokenCounter += 1;
      const newToken = state.dailyTokenCounter;
      
      state.activeTakeaways.push({
        id: `TK-${Date.now()}`,
        tokenNumber: newToken,
        orderNumber,
        source: source || 'take_away',
        tableReference: tableReference || null,
        customerInfo: customerInfo || null,
        status: status || 'Preparing',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [], // Snapshotted separately or retrieved from main order
        createdAt: new Date().toISOString(),
      });
    },
    updateTakeawayStatus: (state, action) => {
      const { tokenNumber, status } = action.payload;
      const takeaway = state.activeTakeaways.find(t => t.tokenNumber === tokenNumber);
      if (takeaway) {
        takeaway.status = status;
      }
    },
    completeTakeaway: (state, action) => {
      const { tokenNumber } = action.payload;
      state.activeTakeaways = state.activeTakeaways.filter(t => t.tokenNumber !== tokenNumber);
    }
  }
});

export const { generateToken, updateTakeawayStatus, completeTakeaway } = takeawaySlice.actions;

export const selectActiveTakeaways = (state) => state.takeaway.activeTakeaways;
export const selectDailyTokenCounter = (state) => state.takeaway.dailyTokenCounter;

export default takeawaySlice.reducer;
