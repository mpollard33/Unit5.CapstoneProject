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
      total: 0,
    },
  },
  reducers: {
    setId: (state, { payload }) => {
      state.id = payload;
      state.cart.userId = payload;
    },
    setCart: (state, { payload }) => {
      state.cart = { ...state.cart, ...payload };
    },
    setCartId: (state, { payload }) => {
      state.cart.userId = payload;
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    logout: (state) => {
      state.token = '';
      state.isLoggedIn = false;
      state.currentUser = null;
      state.id = null;
      state.cart = {
        userId: '',
        date: '',
        products: [],
        itemCount: 0,
        total: 0,
      };
      sessionStorage.setItem(TOKEN_KEY, '');
      sessionStorage.setItem(CURR_USER, '');
    },
    addProductToCart: (state, { payload }) => {
      const { productId, quantity, product } = payload.products[0];

      const existingProductIndex = state.cart.products.findIndex(
        (p) => p.productId === productId
      );

      if (existingProductIndex !== -1) {
        state.cart.products[existingProductIndex].quantity += 1;
      } else {
        state.cart.products.push({ productId, product, quantity: 1 });
      }

      state.cart.itemCount = state.cart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },

    setCurrentUser: (state, action) => {
      const { currentUser, id } = action.payload;
      state.currentUser = { ...currentUser, id };
      state.id = id;
      state.isLoggedIn = true;
    },
    removeProduct: (state, { payload }) => {
      const updatedProducts = payload.products;
      const updatedItemCount = updatedProducts.reduce(
        (total, product) => total + product.quantity,
        0
      );
      state.cart = {
        ...state.cart,
        products: updatedProducts,
        itemCount: updatedItemCount,
      };
    },
    initializeUser: (state, { payload }) => {
      state.currentUser = payload || null;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === 'api/config/middlewareRegistered',
      (state, { payload }) => {
        if (payload) {
          console.log('User Registered', payload);
          state.token = payload;
          state.isLoggedIn = true;
          sessionStorage.setItem(TOKEN_KEY, payload);
        }
      }
    );
  },
});

export const selectCartItemCount = (state) => {
  return state.auth.cart.products.reduce(
    (total, product) => total + product.quantity,
    0
  );
};

export const {
  logout,
  setCart,
  setCartId,
  setLoggedIn,
  addProductToCart,
  removeProduct,
  setId,
  setCurrentUser,
  initializeUser,
} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectCart = (state) => state.auth.cart;
export const selectUserId = (state) => state.auth.id;
export const selectState = (state) => state.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectTotalInCart = (state) => state.auth.cart.total;

export default authSlice.reducer;
