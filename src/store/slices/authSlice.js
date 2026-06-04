import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isLocked: false,
  autoLockTimeout: 15, // Default 15 minutes
  currentUser: null, // 'morning' | 'evening'
  shiftName: null, // 'Morning Shift' | 'Evening Shift'
  loginTime: null,
  openingCash: null,
  shiftHistory: [], // Array of completed shift closing records
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStartShift: (state, action) => {
      const { user, shiftName, openingCash } = action.payload;
      state.isAuthenticated = true;
      state.isLocked = false;
      state.currentUser = user;
      state.shiftName = shiftName;
      state.openingCash = Number(openingCash) || 0;
      state.loginTime = new Date().toISOString();
    },
    lockPOS: (state) => {
      if (state.isAuthenticated) {
        state.isLocked = true;
      }
    },
    unlockPOS: (state, action) => {
      const { pin } = action.payload;
      // Valid pins for mock demo
      const validPin = state.currentUser === 'morning' ? '1234' : '567890';
      if (pin === validPin) {
        state.isLocked = false;
      }
    },
    setAutoLockTimeout: (state, action) => {
      state.autoLockTimeout = action.payload;
    },
    endShift: (state, action) => {
      const closingRecord = action.payload;
      state.shiftHistory.push({
        ...closingRecord,
        id: Date.now(),
        cashier: state.currentUser,
        shift: state.shiftName,
        loginTime: state.loginTime,
        logoutTime: new Date().toISOString(),
        openingCash: state.openingCash,
      });

      // Clear current session
      state.isAuthenticated = false;
      state.isLocked = false;
      state.currentUser = null;
      state.shiftName = null;
      state.loginTime = null;
      state.openingCash = null;
    },
  },
});

export const { loginStartShift, endShift, lockPOS, unlockPOS, setAutoLockTimeout } = authSlice.actions;

export default authSlice.reducer;
