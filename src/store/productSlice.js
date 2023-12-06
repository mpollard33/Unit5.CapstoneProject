import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    sort: { sortType: '', order: 'asc' },
    selectedCategory: '',
  },
  reducers: {
    setSort: (state, { payload }) => {
      state.sort = payload;
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    getSort: (state, action) => {
      return state.products.sort.sortType;
    },
    // addToCart: (state, action) => {
    //   return state.concat({cart: payload, isEmpty: false})
    //   state.cart = action.payload; // tentative, .push? .concat
    // },
  },
});

export const { setSort, setCategory, getSort } = productSlice.actions;
export const selectSort = (state) => state.products.sort;
export const selectCategory = (state) => state.products.selectedCategory;
export default productSlice.reducer;
