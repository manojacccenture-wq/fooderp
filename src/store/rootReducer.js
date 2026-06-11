import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../shared/api/apiSlice';
import orderReducer from '../features/Menu/store/orderSlice';
import tableReducer from '../features/DineIn/store/tableSlice';
import paymentReducer from '../features/Billing/store/paymentSlice';
import checkoutReducer from '../features/Billing/store/checkoutSlice';
import uiReducer from '../shared/store/uiSlice';
import takeawayReducer from '../features/Takeaway/store/takeawaySlice';
import kotReducer from '../features/Menu/store/kotSlice';
import productReducer from '../features/Menu/store/productSlice';
import moneyManagementReducer from '../features/Cashier/store/moneyManagementSlice';

import authReducer from '../features/Auth/store/authSlice';
import orderHistoryReducer from '../features/Orders/store/orderHistorySlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  orderHistory: orderHistoryReducer,
  order: orderReducer,
  table: tableReducer,
  payment: paymentReducer,
  checkout: checkoutReducer,
  ui: uiReducer,
  takeaway: takeawayReducer,
  kot: kotReducer,
  product: productReducer,
  moneyManagement: moneyManagementReducer,
});

export default rootReducer;







