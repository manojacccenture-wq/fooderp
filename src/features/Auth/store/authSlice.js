import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isLocked: false,
  autoLockTimeout: 15, // Default 15 minutes
  currentUser: null, // 'morning' | 'evening' or actual username
  shiftName: null, // 'Morning Shift' | 'Evening Shift'
  userPins: {}, // Stores custom overridden PINs { 'morning': '1111' }
  loginTime: null,
  openingCash: null,
  shiftHistory: [], // Array of completed shift closing records
  
  // API Tokens
  accessToken: null,
  tokenType: null,
  refreshToken: null,
  expiresIn: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStartShift: (state, action) => {
      const { user, shiftName, openingCash, tokens } = action.payload;
      state.isAuthenticated = true;
      state.isLocked = false;
      state.currentUser = user;
      state.shiftName = shiftName;
      state.openingCash = Number(openingCash) || 0;
      state.loginTime = new Date().toISOString();
      
      if (tokens) {
        state.accessToken = tokens.accessToken;
        state.tokenType = tokens.tokenType;
        state.refreshToken = tokens.refreshToken;
        state.expiresIn = tokens.expiresIn;
      }
    },
    lockPOS: (state) => {
      if (state.isAuthenticated) {
        state.isLocked = true;
      }
    },
    unlockPOS: (state, action) => {
      const { pin } = action.payload;
      // Valid pins for mock demo, check userPins first
      const validPin = state.userPins?.[state.currentUser] || (state.currentUser === 'morning' ? '1234' : '567890');
      if (pin === validPin) {
        state.isLocked = false;
      }
    },
    resetUserPin: (state, action) => {
      const { user, newPin } = action.payload;
      if (!state.userPins) state.userPins = {};
      state.userPins[user] = newPin;
      // Optionally auto-unlock the POS after reset
      state.isLocked = false;
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
      
      // Clear tokens
      state.accessToken = null;
      state.tokenType = null;
      state.refreshToken = null;
      state.expiresIn = null;
    },
  },
});

export const { loginStartShift, endShift, lockPOS, unlockPOS, resetUserPin, setAutoLockTimeout } = authSlice.actions;

export default authSlice.reducer;
