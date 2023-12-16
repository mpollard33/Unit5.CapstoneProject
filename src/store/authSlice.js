import { createSlice } from '@reduxjs/toolkit';

const TOKEN_KEY = 'token';
const USER_KEY = 'users';
const CURR_USER = 'currentUser';

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

    logout: () => authInitialState,

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
  // removeFromCart: (state, { payload }) => {
  //   const { products } = state.cart;
  //   console.log('products state', products);

  //   const productIdToRemove = payload;

  //   console.log('productIdToRemove', productIdToRemove);

  //   const existingProductIndex = products.findIndex(
  //     (product) => product.id === productIdToRemove,
  //   );

  //   console.log('existingProductsIndex', existingProductIndex);

  //   if (existingProductIndex !== -1) {
  //     console.log('if != -1');
  //     if (state.cart.products[existingProductIndex].quantity > 1) {
  //       console.log(
  //         'state.cart.products[index].quantity',
  //         state.cart.products[existingProductIndex].quantity,
  //       );
  //       state.cart.products[existingProductIndex].quantity -= 1;
  //     } else {
  //       console.log('splicing result');
  //       state.cart.products.splice(existingProductIndex, 1);
  //     }
  //   } else {
  //     console.log('Product not in cart');
  //   }

  //       state.cart.itemCount = state.cart.products.reduce(
  //         (total, product) => total + product.quantity,
  //         0,
  //       );
  //     // },
  // },
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

export const selectCart = (state) => state.auth.cart;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectUserId = (state) => state.auth.id;
export const selectUserIdInCart = (state) => state.auth.cart.userId;
export const selectDateInCart = (state) => state.auth.cart.date;
export const selectProductsInCart = (state) => state.auth.cart.products;
export const selectTotalInCart = (state) => state.auth.cart.total;
export const selectCategoriesInCart = (state) => state.auth.cart.categories;

export default authSlice.reducer;
