import { combineReducers } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import tableReducer from './slices/tableSlice';
import paymentReducer from './slices/paymentSlice';
import checkoutReducer from './slices/checkoutSlice';
import uiReducer from './slices/uiSlice';
import takeawayReducer from './slices/takeawaySlice';
import kotReducer from './slices/kotSlice';

const rootReducer = combineReducers({
  order: orderReducer,
  table: tableReducer,
  payment: paymentReducer,
  checkout: checkoutReducer,
  ui: uiReducer,
  takeaway: takeawayReducer,
  kot: kotReducer,
});

export default rootReducer;
