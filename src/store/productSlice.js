import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    sort: { sortType: '', order: '' },
    selectedCategory: '',
  },
  reducers: {
    setSort: (state, { payload }) => {
      state.sort = {
        sortType: payload.sortType,
        order: payload.order,
      };
      console.log('setSort: ', payload);
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload.trim();

      console.log('setCategory:', payload);
    },
  },
});

export const { setSort, setCategory } = productSlice.actions;
export const selectSort = (state) => state.products.sort;
export const selectCategory = (state) => state.products.selectedCategory;

export default productSlice.reducer;
