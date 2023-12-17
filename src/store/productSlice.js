import { createSlice, createSelector, createAction } from '@reduxjs/toolkit';
import { logout } from './authSlice';

const initialState = {
  products: { sortType: '', order: 'asc' },
  selectedCategory: '',
};

export const resetProducts = createAction('products/reset');

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSortType: (state, { payload }) => {
      state.products.sortType = payload;
    },
    setSortOrder: (state, { payload }) => {
      state.products.order = payload;
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSort: (state, { payload }) => {
      state.products.order = payload.order;
      state.products.sortType = payload.sortType;
    },
  },
  extraReducers: {
    [logout]: () => initialState,
    [resetProducts]: () => initialState,
  },
});

export const { setSortType, setSortOrder, setCategory, setSort } =
  productSlice.actions;

export const selectSortOrder = createSelector(
  (state) => state.products.order,
  (order) => order,
);

export const selectSortType = createSelector(
  (state) => state.products.sortType,
  (sortType) => sortType,
);

export const selectCategory = createSelector(
  (state) => state.selectedCategory,
  (selectedCategory) => selectedCategory,
);

export const selectSort = createSelector(
  (state) => state.products,
  (products) => products,
);

export default productSlice.reducer;
