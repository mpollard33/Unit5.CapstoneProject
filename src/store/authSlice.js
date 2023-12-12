import { createSlice } from '@reduxjs/toolkit';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isLoggedIn: false,
    user: null,
    id: null,
    cart: {
      userId: '',
      date: '',
      products: [],
      itemCount: 0,
    },
  },
  reducers: {
    setId: (state, { payload }) => {
      state.id = payload;
      state.cart.userId = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      state.id = null;
      state.cart = {
        userId: '',
        date: '',
        products: [],
        itemCount: 0,
      };
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
    initializeUser: (state) => {
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) {
        state.user = JSON.parse(storedUser);
        state.isLoggedIn = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === 'api/config/middlewareRegistered',
      (state, { payload }) => {
        if (payload) {
          console.log('User Registered', payload);
          state.token = payload;
          state.isLoggedIn = 'true';
          localStorage.setItem(TOKEN_KEY, payload);
        }
      },
    );
  },
});

export const {
  logout,
  getToken,
  setCart,
  initializeUser,
  addProductToCart,
  updateProductQuantity,
  removeProduct,
  setId,
  setUser,
  setLoggedIn,
} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectCart = (state) => state?.auth?.cart;
export const selectUserId = (state) => state?.auth?.user?.id;
export const selectState = (state) => state?.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
