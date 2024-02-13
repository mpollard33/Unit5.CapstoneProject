import { configureStore } from '@reduxjs/toolkit';
import api from './api';
import productReducer from './productSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    api: api.reducer,
    products: productReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
