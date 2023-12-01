import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    sort: { sortType: '', order: 'asc' },
    selectedCategory: '',
  },
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSort, setCategory } = productsSlice.actions;
export const selectProducts = (state) => state.products;
export default productsSlice.reducer;
