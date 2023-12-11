import { createSlice } from '@reduxjs/toolkit';
import api from './api';
import { useRegisterMutation } from '../features/account/authApi';

const TOKEN_KEY = 'token';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.localStorage.getItem(TOKEN_KEY),
    isLoggedIn: 'false',
    id: '',
    cart: {
      userId: '',
      date: '',
      products: [],
      itemCount: 0,
    },
  },
  reducers: {
    setUserId: (state, { payload }) => {
      state.id = payload.id;
      state.cart.userId = payload.id;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = 'false';
      state.id = '';
      state.cart = {
        userId: '',
        date: '',
        products: [],
        itemCount: 0,
      };
      window.localStorage.removeItem(TOKEN_KEY);
    },
    getToken: (state) => state.token,
    setCart: (state, { payload }) => {
      state.cart = {
        ...payload,
      };
    },
    addProductToCart: (state, { payload }) => {
      state.cart.products = [...payload.products];
    },
    removeProduct: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === 'api/config/middlewareRegistered',
      (state, { payload }) => {
        if (payload) {
          console.log('User Registered', payload);
          state.token = payload;
          state.isLoggedIn = 'true';
          window.localStorage.setItem(TOKEN_KEY, payload);
        }
      },
    );
  },
});

export const {
  logout,
  getToken,
  setCart,
  addProductToCart,
  updateProductQuantity,
  removeProduct,
  setUserId,
} = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectCart = (state) => state?.auth?.cart;
export const selectUserId = (state) => state?.auth?.id;
export const selectState = (state) => state?.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
