import { createSlice } from '@reduxjs/toolkit';
import api from './api';

const TOKEN_KEY = 'token';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
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
      state.id = payload.id || 'no userID';
      state.cart.userId = payload.id;
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
      window.sessionStorage.removeItem(TOKEN_KEY);
    },
    setCart: (state, { payload }) => {
      state.cart = {
        ...payload,
        userId: state.id,
      };
    },

    updateProductQuantity: (state, { payload }) => {
      const { productId, quantity } = payload;

      state.cart.itemCount +=
        quantity -
        (
          state.cart.products.find(
            (product) => product.productId === productId,
          ) || { quantity: 0 }
        ).quantity;

      state.cart.products = state.cart.products.map((product) =>
        product.productId === productId ? { ...product, quantity } : product,
      );
    },

    removeProduct: (state, { payload }) => {
      const productId = payload;
      const removedProduct = state.cart.products.find(
        (product) => product.productId === productId,
      );

      state.cart.products = state.cart.products.filter(
        (product) => product.productId !== productId,
      );
      state.cart.itemCount -= removedProduct ? removedProduct.quantity : 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === 'api/config/middlewareRegistered',
      (state, { payload }) => {
        console.log('Middleware Registered!!!', payload);

        if (payload) {
          state.token = payload;
          state.id = payload.id || '';
          state.isLoggedIn = 'true';
          window.sessionStorage.setItem(TOKEN_KEY, payload);
        }
      },
    );
  },
});

export const {
  logout,
  setCart,
  updateProductQuantity,
  removeProduct,
  setUserId,
} = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectCart = (state) => state?.auth?.cart;
export const selectUserId = (state) => state?.auth?.userId;
export const selectState = (state) => state?.auth;

export default authSlice.reducer;
