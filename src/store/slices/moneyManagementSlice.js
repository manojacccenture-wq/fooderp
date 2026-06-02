import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cashBalance: 0,
  totalCashIn: 0,
  totalCashOut: 0,
  transactions: []
};

const moneyManagementSlice = createSlice({
  name: 'moneyManagement',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const transaction = {
        id: new Date().getTime().toString(),
        createdAt: new Date().toISOString(),
        ...action.payload
      };

      state.transactions.push(transaction);

      // Only cash transactions affect the cash balance
      if (transaction.type === 'cash_in' || transaction.type === 'cash_sale') {
        state.cashBalance += transaction.amount;
        state.totalCashIn += transaction.amount;
      } else if (transaction.type === 'cash_out') {
        state.cashBalance -= transaction.amount;
        state.totalCashOut += transaction.amount;
      }
    }
  }
});

export const { addTransaction } = moneyManagementSlice.actions;

export const selectCashBalance = (state) => state.moneyManagement.cashBalance;
export const selectTotalCashIn = (state) => state.moneyManagement.totalCashIn;
export const selectTotalCashOut = (state) => state.moneyManagement.totalCashOut;
export const selectTransactions = (state) => state.moneyManagement.transactions;

export default moneyManagementSlice.reducer;
