import { configureStore } from '@reduxjs/toolkit';
import api from './api';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    api: api.reducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
