import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTakeaways: [], // Array of parcel orders
  completedTakeaways: [], // Array of historical completed parcels
  lastTokenDate: new Date().toDateString(),
  dailyTokenCounter: 0,
};

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState,
  reducers: {
    generateToken: (state, action) => {
      const { orderNumber, source, tableReference, customerInfo, status, tokenNumber } = action.payload;
      
      let newToken = tokenNumber;
      
      if (!newToken) {
        const today = new Date().toDateString();
        if (state.lastTokenDate !== today) {
          state.dailyTokenCounter = 0;
          state.lastTokenDate = today;
        }
        
        state.dailyTokenCounter += 1;
        newToken = state.dailyTokenCounter;
      }
      
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
        completedParcelBatches: [], // Store historical batches here
        createdAt: new Date().toISOString(),
        preparingAt: new Date().toISOString(),
      });
    },
    updateTakeawayStatus: (state, action) => {
      const { tokenNumber, status } = action.payload;
      const takeaway = state.activeTakeaways.find(t => t.tokenNumber === tokenNumber);
      if (takeaway) {
        takeaway.status = status;
        if (status === 'Packed') takeaway.packedAt = new Date().toISOString();
        if (status === 'Ready') takeaway.readyAt = new Date().toISOString();
      }
    },
    completeTakeaway: (state, action) => {
      const { tokenNumber, items } = action.payload;
      const takeawayIndex = state.activeTakeaways.findIndex(t => t.tokenNumber === tokenNumber);
      
      if (takeawayIndex !== -1) {
        const takeaway = state.activeTakeaways[takeawayIndex];
        
        if (!takeaway.completedParcelBatches) {
          takeaway.completedParcelBatches = [];
        }
        
        if (items && items.length > 0) {
          takeaway.completedParcelBatches.push({
            batchId: takeaway.completedParcelBatches.length + 1,
            completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            items: items
          });
        }
        
        takeaway.status = 'Completed';
        takeaway.handedOverAt = new Date().toISOString();
        takeaway.completedAt = new Date().toISOString();
        
        // Move to completed array
        state.completedTakeaways.push(takeaway);
        
        // Remove from active array
        state.activeTakeaways.splice(takeawayIndex, 1);
      }
    },
    createTakeawayEntry: (state, action) => {
      const { orderNumber, source, tableReference, customerInfo, status, tokenNumber, items } = action.payload;

      const isMatch = (t) => {
        if (orderNumber) {
          if (t.orderNumber == orderNumber) return true;
          if (t.sourceOrderId && t.sourceOrderId == orderNumber) return true;
          if (t.originalOrderId && t.originalOrderId == orderNumber) return true;
          return false;
        }
        if (tableReference && t.tableReference == tableReference) return true;
        return false;
      };

      // Since we want the latest for that table if multiple exist, we search backwards or just find.
      // Active takes precedence over completed.
      let existingTakeaway = [...state.activeTakeaways].reverse().find(isMatch);
      let wasCompleted = false;

      if (!existingTakeaway) {
        const completedIndex = [...state.completedTakeaways].reverse().findIndex(isMatch);
        if (completedIndex !== -1) {
          // Because we searched reversed, we need to correct the index
          const actualIndex = state.completedTakeaways.length - 1 - completedIndex;
          existingTakeaway = state.completedTakeaways[actualIndex];
          state.completedTakeaways.splice(actualIndex, 1);
          wasCompleted = true;
        }
      }

      if (existingTakeaway) {
        // Reopen token, append items
        const newItems = items || [];
        newItems.forEach(newItem => {
           const existingItem = existingTakeaway.items.find(i => i.id === newItem.id);
           if (existingItem) {
              existingItem.quantity += newItem.quantity;
              existingItem.fulfillment = { 
                ...existingItem.fulfillment, 
                take_away: (existingItem.fulfillment?.take_away || 0) + (newItem.fulfillment?.take_away || newItem.quantity) 
              };
           } else {
              existingTakeaway.items.push(newItem);
           }
        });
        
        existingTakeaway.status = status || 'Preparing'; 
        if (customerInfo) existingTakeaway.customerInfo = customerInfo;
        if (tableReference) existingTakeaway.tableReference = tableReference;
        
        if (wasCompleted) {
          // Reset Audit Trail stamps
          delete existingTakeaway.handedOverAt;
          delete existingTakeaway.completedAt;
          delete existingTakeaway.readyAt;
          delete existingTakeaway.packedAt;
          
          existingTakeaway.preparingAt = new Date().toISOString();
          state.activeTakeaways.push(existingTakeaway);
        }
      } else {
        // Create new record
        let newToken = tokenNumber;
        if (!newToken) {
          const today = new Date().toDateString();
          if (state.lastTokenDate !== today) {
            state.dailyTokenCounter = 0;
            state.lastTokenDate = today;
          }
          state.dailyTokenCounter += 1;
          newToken = state.dailyTokenCounter;
        }

        state.activeTakeaways.push({
          id: `TK-${Date.now()}`,
          tokenNumber: newToken,
          orderNumber,
          source: source || 'take_away',
          tableReference: tableReference || null,
          customerInfo: customerInfo || null,
          status: status || 'Preparing',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          items: items || [],
          completedParcelBatches: [],
          createdAt: new Date().toISOString(),
          preparingAt: new Date().toISOString(),
        });
      }
    }
  }
});

export const { generateToken, updateTakeawayStatus, completeTakeaway, createTakeawayEntry } = takeawaySlice.actions;

export const selectActiveTakeaways = (state) => state.takeaway.activeTakeaways;
export const selectCompletedTakeaways = (state) => state.takeaway.completedTakeaways;
export const selectDailyTokenCounter = (state) => state.takeaway.dailyTokenCounter;

export default takeawaySlice.reducer;
