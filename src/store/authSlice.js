import { createSlice } from '@reduxjs/toolkit';
import api from './api';

const TOKEN_KEY = 'token';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
    isLoggedIn: 'false',
    cart: {
      userId: '',
      date: '',
      products: [],
      itemCount: 0,
    },
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = 'false';
      state.cart = {
        userId: '',
        date: '',
        products: [],
        itemCount: 0,
      };
      window.sessionStorage.removeItem(TOKEN_KEY);
    },
    setCart: (state, { payload }) => (state.cart = payload),

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
    builder
      .addMatcher(api.endpoints.register.matchFulfilled, storeToken)
      .addMatcher(api.endpoints.login.matchFulfilled, storeToken)
      .addMatcher(
        (action) => action.type === 'api/config/middlewareRegistered',
        (state, { payload }) => {
          state.token = payload;
          state.isLoggedIn = 'true';
          window.sessionStorage.setItem(TOKEN_KEY, payload);
        },
      );
  },
});

function storeToken(state, { payload }) {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
}

export const { logout, setCart, updateProductQuantity, removeProduct } =
  authSlice.actions;
export const selectToken = (state) => state?.auth?.token;
export const selectCart = (state) => state?.auth?.cart;

export default authSlice.reducer;
