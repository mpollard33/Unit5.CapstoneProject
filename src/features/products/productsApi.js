import api from '../../store/api';

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductsById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    getAllCategories: builder.query({
      query: () => `/products/categories`,
    }),
    getSortOrder: builder.query({
      query: (order) => `/products?sort=${order}`, // 'asc' 'desc'
    }),
    getProductsByCategory: builder.query({
      query: (category, sort) => `/products/category/${category}?sort=${sort}`,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useDeleteProductMutation,
  useGetSortOrderQuery,
} = productsApi;
