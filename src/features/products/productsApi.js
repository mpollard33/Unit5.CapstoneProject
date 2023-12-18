import api from '../../store/api';

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    getAllCategories: builder.query({
      query: () => `/products/categories`,
    }),
    getSortOrder: builder.query({
      query: (order) => `/products?sort=${order}`,
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
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useDeleteProductMutation,
  useGetSortOrderQuery,
} = productsApi;
