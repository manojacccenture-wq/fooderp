import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rightView: 'order', // 'order' | 'checkout'
  centerView: 'menu', // 'menu' | 'cancel_item' | 'replace_item'
  selectedItemForAction: null, // used for cancel/replace item flows
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setRightView: (state, action) => {
      state.rightView = action.payload;
    },
    setCenterView: (state, action) => {
      state.centerView = action.payload;
    },
    setSelectedItemForAction: (state, action) => {
      state.selectedItemForAction = action.payload;
    }
  },
});

export const { setRightView, setCenterView, setSelectedItemForAction } = uiSlice.actions;

export const selectRightView = (state) => state.ui.rightView;
export const selectCenterView = (state) => state.ui.centerView;
export const selectSelectedItemForAction = (state) => state.ui.selectedItemForAction;

export default uiSlice.reducer;
