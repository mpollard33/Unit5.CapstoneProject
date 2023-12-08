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
  },
});

export const { setSort, setCategory } = productSlice.actions;
export const selectSort = (state) => state.products.sort;
export const selectCategory = (state) => state.products.selectedCategory;

export default productSlice.reducer;
