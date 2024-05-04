import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
  name: 'products',
  initialState: {
    sortType: '',
    sortOrder: '',
    selectedCategory: '',
  },
  reducers: {
    setSortOrder: (state, { payload }) => {
      state.sortOrder = payload.trim();
      console.log('state.sortOrder ', state.sortOrder);
    },
    setSortType: (state, { payload }) => {
      state.sortType = payload.trim();
      console.log('state.sortType ', state.sortType)
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload.trim();
      console.log('state.selectedCategory ', state.selectedCategory);
    },
  },
});

export const { setSortOrder, setSortType, setCategory } = productSlice.actions;
export const selectSortType = (state) => state.products.sortType;
export const selectSortOrder = (state) => state.products.sortOrder;
export const selectCategory = (state) => state.products.selectedCategory;

export default productSlice.reducer;
