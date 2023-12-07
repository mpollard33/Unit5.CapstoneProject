import { createSlice } from '@reduxjs/toolkit';
import api from './api';

const TOKEN_KEY = 'token';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
    isLoggedIn: 'false',
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = 'false';
      sessionStorage.removeItem('token');
      sessionStorage.removeItem(TOKEN_KEY);

      window.sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.register.matchFulfilled, storeToken)
      .addMatcher(api.endpoints.login.matchFulfilled, storeToken)
      .addMatcher(
        (action) => action.type === 'api/config/middlewareRegistered',
        (state, action) => {
          state.token = action.payload;
          state.isLoggedIn = 'true';
          window.sessionStorage.setItem(TOKEN_KEY, action.payload);
        },
      );
  },
});

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
};
export const { logout } = authSlice.actions;
export const selectToken = (state) => state?.auth?.token;

export default authSlice.reducer;
