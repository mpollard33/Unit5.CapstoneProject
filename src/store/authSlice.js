import { createSlice, createSelector } from '@reduxjs/toolkit';

const TOKEN_KEY = 'token';
const USER_KEY = 'users';
const CURR_USER = 'currentUser';

const getAuthInitialState = () => ({
  token: '',
  isLoggedIn: false,
  currentUser: null,
  id: null,
  cart: { ...cartInitialState },
});

const cartInitialState = {
  userId: '',
  date: '',
  products: [],
  itemCount: 0,
  total: 0,
};

const authInitialState = {
  token: '',
  isLoggedIn: false,
  currentUser: null,
  id: null,
  cart: { ...cartInitialState },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setLoggedIn: (state, { payload }) => {
      return {
        ...state,
        isLoggedIn: true,
        id: payload.id,
        currentUser: payload,
        cart: {
          ...state.cart,
          userId: payload.id,
          id: payload.id,
          date: new Date().toISOString(),
        },
      };
    },

    setCart: (state, { payload }) => {
      state.cart = { ...state.cart, ...payload };
    },

    initializeUser: (state, { payload }) => {
      state.currentUser = payload;
      state.isLoggedIn = true;
    },

    logout: () => {
      return { ...getAuthInitialState() };
    },

    addToCart: (state, { payload }) => {
      const { products } = state.cart;
      const existingProductIndex = products.findIndex(
        (product) => product.id === payload,
      );

      if (existingProductIndex !== -1) {
        state.cart.products[existingProductIndex].quantity += 1;
        state.cart.products[existingProductIndex].dateAdded =
          new Date().toISOString();
      } else {
        state.cart.products = [
          ...products,
          { ...payload, quantity: 1, dateAdded: new Date().toISOString() },
        ];
      }

      state.cart.itemCount = state.cart.products.reduce(
        (total, product) => total + product.quantity,
        0,
      );
    },

    removeFromCart: (state, { payload }) => {
      const productIdToRemove = payload.id;
      state.cart.products = state.cart.products.filter(
        (product) => product.id !== productIdToRemove,
      );

      state.cart.itemCount = state.cart.products.reduce(
        (total, product) => total + product.quantity,
        0,
      );
    },
  },
});

export const selectCartItemCount = (state) => {
  if (state.auth.cart) {
    return state.auth.cart.itemCount;
  }
  return 0;
};

export const {
  setLoggedIn,
  setCart,
  initializeUser,
  logout,
  addToCart,
  removeFromCart,
} = authSlice.actions;

export const selectCart = createSelector(
  (state) => state.auth.cart,
  (cart) => cart,
);

export const selectToken = createSelector(
  (state) => state.auth.token,
  (token) => token,
);

export const selectIsLoggedIn = createSelector(
  (state) => state.auth.isLoggedIn,
  (isLoggedIn) => isLoggedIn,
);

export const selectCurrentUser = createSelector(
  (state) => state.auth.currentUser,
  (currentUser) => currentUser,
);

export const selectUserId = createSelector(
  (state) => state.auth.id,
  (id) => id,
);

export const selectUserIdInCart = createSelector(
  (state) => state.auth.cart.userId,
  (userId) => userId,
);

export const selectDateInCart = createSelector(
  (state) => state.auth.cart.date,
  (date) => date,
);

export const selectProductsInCart = createSelector(
  (state) => state.auth.cart.products,
  (products) => products,
);

export const selectTotalInCart = createSelector(
  (state) => state.auth.cart.total,
  (total) => total,
);

export const selectCategoriesInCart = createSelector(
  (state) => state.auth.cart.categories,
  (categories) => categories,
);

export default authSlice.reducer;
