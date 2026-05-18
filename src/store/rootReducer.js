import { combineReducers } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import tableReducer from './slices/tableSlice';
import paymentReducer from './slices/paymentSlice';
import checkoutReducer from './slices/checkoutSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  order: orderReducer,
  table: tableReducer,
  payment: paymentReducer,
  checkout: checkoutReducer,
  ui: uiReducer,
});

export default rootReducer;
