import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    sort: { sortType: '', order: 'asc' },
    selectedCategory: '',
  },
  reducers: {
    setSortType: (state, { payload }) => {
      state.sort.sortType = payload;
    },
    setSortOrder: (state, { payload }) => {
      state.sort.order = payload;
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSort: (state, { payload }) => {
      state.sort.order = payload.order;
      state.sort.sortType = payload.sortType;
    },
  },
});

export const { setCategory, setSortType, setSortOrder, setSort } =
  productSlice.actions;
export const selectSortOrder = (state) => state.products.sort.order;
export const selectSortType = (state) => state.products.sort.sortType;
export const selectCategory = (state) => state.products.selectedCategory;
export const selectSort = (state) => state.products.sort;

export default productSlice.reducer;
