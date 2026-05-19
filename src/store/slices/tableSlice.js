import { createSlice } from '@reduxjs/toolkit';

const initialTableData = [
  { id: 1, tableNo: "01", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 2, tableNo: "02", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
  { id: 3, tableNo: "03", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 4, tableNo: "04", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 5, tableNo: "05", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
  { id: 6, tableNo: "06", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 7, tableNo: "07", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 8, tableNo: "09", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 9, tableNo: "11", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
  { id: 10, tableNo: "10", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 11, tableNo: "12", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 12, tableNo: "13", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
];

const initialState = {
  tables: initialTableData,
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
    setActiveTableMenu: (state, action) => {
      state.activeTableMenu = action.payload;
    },
    startOrderForTable: (state, action) => {
      const { tableNo, formData } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.status = 'occupied';
        table.customerName = formData.name || table.customerName;
        table.guests = formData.guests || table.guests;
        table.duration = formData.time || table.duration;
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
          }
          oldTable.status = 'available';
          oldTable.customerName = '';
          oldTable.guests = 0;
          oldTable.reservedGuests = 0;
          oldTable.duration = '';
        }
      } else if (actionType === 'merge') {
        const targetTables = selectedTables;
        const oldTable = state.tables.find(t => t.tableNo === oldTableNo);
        if (oldTable) {
          state.tables.forEach(t => {
            if (targetTables.includes(t.tableNo)) {
              t.status = 'occupied';
              t.customerName = oldTable.customerName + " (Merged)";
              t.guests = oldTable.guests;
              t.duration = oldTable.duration;
            }
          });
        }
      }
    },
    confirmCancellation: (state, action) => {
      const { tableNo } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.status = 'available';
        table.customerName = '';
        table.guests = 0;
        table.reservedGuests = 0;
        table.duration = '';
      }
    },
    confirmReplacement: (state, action) => {
      const { tableNo } = action.payload;
      const table = state.tables.find(t => t.tableNo === tableNo);
      if (table) {
        table.customerName = table.customerName + " (Replaced)";
      }
    }
  },
});

export const {
  setTables,
  setSelectedTableForOrder,
  setActionTarget,
  setActiveTableMenu,
  startOrderForTable,
  confirmSelection,
  confirmCancellation,
  confirmReplacement
} = tableSlice.actions;

export const selectAllTables = (state) => state.table.tables;
export const selectSelectedTableForOrder = (state) => state.table.selectedTableForOrder;
export const selectActionTarget = (state) => state.table.actionTarget;
export const selectActiveTableMenu = (state) => state.table.activeTableMenu;

export default tableSlice.reducer;
