import { createSlice } from '@reduxjs/toolkit';

const TOKEN_KEY = 'token';
const USER_KEY = 'users';
const CURR_USER = 'currentUser';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isLoggedIn: false,
    currentUser: null,
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
      state.cart = {
        ...state.cart,
        userId: payload,
      };
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.currentUser = null;
      state.id = null;
      state.cart = {
        userId: null,
        date: '',
        products: [],
        itemCount: 0,
      };
      sessionStorage.setItem('currentUser', null);
    },
    setCart: (state, { payload }) => {
      state.cart = {
        ...state.cart,
        payload,
        // payload:  userId, date, products:[{productId, quantity}], itemCount, ...additional,
      };
    },
    addProductToCart: (state, { payload }) => {
      state.cart.products = [...payload.products];
    },
    setCurrentUser: (state, { payload }) => {
      // get currentUser obj from session storage
      //payload: JSON.parse(sessionStorage.getItem(currentUser));
      // set state
      // can be combined with setLogin
      state.currentUser = payload;
    },
  },
  initializeUser: (state, { payload }) => {
    // payload: JSON.parse(sessionStorage.getItem(CURR_USER));
    state.currentUser = payload || null;
    state.isLoggedIn = true;
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === 'api/config/middlewareRegistered',
      (state, { payload }) => {
        if (payload) {
          console.log('User Registered', payload);
          state.token = payload;
          state.isLoggedIn = 'true';
          sessionStorage.setItem(TOKEN_KEY, payload);
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
  setCurrentUser,
  setLoggedIn,
} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectCart = (state) => state.auth.cart;
export const selectUserId = (state) => state.auth.id;
export const selectState = (state) => state.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
