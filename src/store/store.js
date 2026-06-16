import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { apiSlice } from '../shared/api/apiSlice';

const persistConfig = {
  key: 'food-erp-root',
  version: 1,
  storage: typeof storage !== 'undefined' ? (storage.default || storage) : storage,
  whitelist: ['auth', 'orderHistory', 'order', 'payment', 'checkout', 'moneyManagement', 'kot'], // Explicitly persist what we need
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
