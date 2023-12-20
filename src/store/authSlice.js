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
        isLoggedIn: false,
        id: payload.id,
        currentUser: payload,
        cart: {
          ...state.cart,
          userId: payload.id,
          id: payload.id,
          // date: new Date().toISOString(),
        },
      };
    },
    toggleLoginState: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setCurrentUser: (state, { payload }) => {
      const { currentUser, id } = payload;
      state.currentUser = { ...currentUser, id };
      state.id = id;
      state.isLoggedIn = true;
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

    addToCart: (state, action) => {
      const { products } = state.cart;
      const existingProductIndex = products.findIndex(
        (product) => product.id === action.payload.id,
      );
      const quantity = action.payload.quantity;
      const price = action.payload.price;

      if (existingProductIndex !== -1) {
        state.cart.products[existingProductIndex].quantity += quantity;
      } else {
        state.cart.products.push({
          id: action.payload.id,
          quantity: action.payload.quantity,
          price: action.payload.price,
        });
      }

      state.cart.itemCount = state.cart.products.reduce(
        (total, product) => total + product.quantity,
        0,
      );

      // Calculate the total based on the products in the cart
      state.cart.total = state.cart.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );
    },

    removeFromCart: (state, payload) => {
      const productIdToRemove = payload.id;
      const index = state.cart.products.findIndex(
        (product) => product.id === productIdToRemove,
      );
      console.log('index is', index);
      state.cart.products.splice(index, 1);
      state.cart.itemCount = state.cart.products.reduce(
        (total, product) => total + product.quantity,
        0,
      );
      state.cart.total = state.cart.products.reduce(
        (total, product) => total + product.price * product.quantity,
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
  toggleLoginState,
  setLoggedIn,
  setCart,
  initializeUser,
  logout,
  addToCart,
  removeFromCart,
  setCurrentUser,
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
