import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from '../../../shared/api/apiSlice';

export const fetchTablesData = createAsyncThunk(
  'table/fetchTablesData',
  async (_, { rejectWithValue }) => {
    try {
      const { tableService } = await import('../services/tableService');
      const data = await tableService.fetchAndMapTables();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  tables: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedTableForOrder: null, // used in dine-in for start order
  actionTarget: null, // { type: 'change' | 'merge' | 'cancel-food' | 'replace-food', tableNo: string }
  activeTableMenu: '01', // for menu page
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.tables = action.payload;
    },
    setSelectedTableForOrder: (state, action) => {
      state.selectedTableForOrder = action.payload;
    },
    setActionTarget: (state, action) => {
      state.actionTarget = action.payload;
    },
    clearActionTarget: (state) => {
      state.actionTarget = null;
    },
    setActiveTableMenu: (state, action) => {
      state.activeTableMenu = action.payload;
    },
    startOrderForTable: (state, action) => {
      const { tableNo, formData } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.status = 'Occupied';
        table.customerName = formData.name || table.customerName;
        table.guests = formData.guests || table.guests;
        table.duration = formData.time || table.duration;
        table.customerPhone = formData.mobile || table.customerPhone || "";
      }
    },
    confirmSelection: (state, action) => {
      const { actionType, oldTableNo, selectedTables } = action.payload;
      if (actionType === 'change') {
        const newTableNo = selectedTables;
        const oldTable = state.tables.find(t => t.tableNo === oldTableNo);
        if (oldTable) {
          const newTable = state.tables.find(t => t.tableNo === newTableNo);
          if (newTable) {
            newTable.status = oldTable.status;
            newTable.customerName = oldTable.customerName;
            newTable.guests = oldTable.guests;
            newTable.reservedGuests = oldTable.reservedGuests;
            newTable.duration = oldTable.duration;
            newTable.customerPhone = oldTable.customerPhone;
          }
          oldTable.status = 'Empty';
          oldTable.customerName = '';
          oldTable.guests = 0;
          oldTable.reservedGuests = 0;
          oldTable.duration = '';
          oldTable.customerPhone = '';
        }
      } else if (actionType === 'merge') {
        const targetTables = selectedTables;
        const oldTable = state.tables.find(t => t.tableNo === oldTableNo);
        if (oldTable) {
          state.tables.forEach(t => {
            if (targetTables.includes(t.tableNo)) {
              t.status = 'Occupied';
              t.customerName = oldTable.customerName + " (Merged)";
              t.guests = oldTable.guests;
              t.duration = oldTable.duration;
              t.customerPhone = oldTable.customerPhone;
            }
          });
        }
      }
    },
    confirmCancellation: (state, action) => {
      const { tableNo } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.status = 'Empty';
        table.customerName = '';
        table.guests = 0;
        table.reservedGuests = 0;
        table.duration = '';
        table.customerPhone = '';
      }
    },
    confirmReplacement: (state, action) => {
      const { tableNo } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.customerName = table.customerName + " (Replaced)";
      }
    },
    updateTableOrder: (state, action) => {
      const { tableNo, orderData } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      // NEVER restore order data to an available table. This fixes the zombie state!
      if (table && table.status !== 'Empty') {
        table.orderData = orderData;
      }
    },
    cancelTable: (state, action) => {
      const { tableNo, reason, remarks } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.status = 'Empty';
        table.customerName = '';
        table.guests = 0;
        table.reservedGuests = 0;
        table.duration = '';
        table.customerPhone = '';
        table.orderData = undefined;
        table.cancellationData = {
          reason: reason || null,
          remarks: remarks || '',
          cancelledAt: Date.now()
        };
      }
    },
    completeTableOrder: (state, action) => {
      const { tableNo } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.status = 'Empty';
        table.customerName = '';
        table.guests = 0;
        table.reservedGuests = 0;
        table.duration = '';
        table.customerPhone = '';
        table.orderData = undefined;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTablesData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTablesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tables = action.payload;
      })
      .addCase(fetchTablesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch tables';
      })
      .addMatcher(apiSlice.endpoints.getTablesWithOrderAmount.matchFulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tables = action.payload;
      });
  }
});

export const {
  setTables,
  setSelectedTableForOrder,
  setActionTarget,
  setActiveTableMenu,
  startOrderForTable,
  confirmSelection,
  confirmCancellation,
  confirmReplacement,
  updateTableOrder,
  cancelTable,
  completeTableOrder
} = tableSlice.actions;

export const selectAllTables = (state) => state.table.tables;
export const selectSelectedTableForOrder = (state) => state.table.selectedTableForOrder;
export const selectActionTarget = (state) => state.table.actionTarget;
export const selectActiveTableMenu = (state) => state.table.activeTableMenu;

export default tableSlice.reducer;
