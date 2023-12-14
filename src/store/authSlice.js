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
      return {
        ...state,
        id: payload,
        cart: { ...state.cart, userId: payload },
      };
    },
    setCart: (state, { payload }) => {
      return { ...state, cart: { ...state.cart, ...payload } };
    },
    setCartId: (state, { payload }) => {
      return { ...state, cart: { ...state.cart, userId: payload } };
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    logout: (state) => {
      sessionStorage.setItem(TOKEN_KEY, '');
      sessionStorage.setItem(CURR_USER, '');
      return initialState;
    },
    addProductToCart: (state, { payload }) => {
      if (payload.products && payload.products.length > 0) {
        const { productId, quantity, product } = payload.products[0];

        const existingProduct = state.cart.products.find(
          (p) => p.productId === productId,
        );

        let updatedProducts;

        if (existingProduct) {
          updatedProducts = state.cart.products.map((p) => {
            if (p.productId === productId) {
              return { ...p, quantity: p.quantity + 1 };
            }
            return p;
          });
        } else {
          updatedProducts = state.cart.products.concat({
            productId,
            product,
            quantity: 1,
          });
        }

        const updatedItemCount = updatedProducts.reduce(
          (total, product) => total + product.quantity,
          0,
        );

        const updatedTotal = updatedProducts.reduce(
          (total, product) => total + product.quantity * product.product.price,
          0,
        );

        return {
          ...state,
          cart: {
            ...state.cart,
            products: updatedProducts,
            itemCount: updatedItemCount,
            total: updatedTotal,
          },
        };
      }
      return state;
    },
    removeProduct: (state, { payload }) => {
      const updatedProducts = payload.products;
      if (updatedProducts.length === 0) {
        return {
          ...state,
          cart: {
            products: [],
            itemCount: 0,
          },
        };
      }
      const updatedItemCount = updatedProducts.reduce(
        (total, product) => total + product.quantity,
        0,
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts,
          itemCount: updatedItemCount,
        },
      };
    },

    setCurrentUser: (state, action) => {
      const { currentUser, id } = action.payload;
      return {
        ...state,
        currentUser: { ...currentUser, id },
        id,
        isLoggedIn: true,
      };
    },
    initializeUser: (state, { payload }) => {
      return { ...state, currentUser: payload || null, isLoggedIn: true };
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
      },
    );
  },
});

export const selectCartItemCount = (state) => {
  return state.auth.cart.products.reduce(
    (total, product) => total + product.quantity,
    0,
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

export default authSlice.reducer;
