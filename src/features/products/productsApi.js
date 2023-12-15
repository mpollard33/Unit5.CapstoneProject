import api from '../../store/api';

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductsById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/${category}`,
    }),
    getAllCategories: builder.query({
      query: () => `/products/categories`,
    }),
    getOneCategory: builder.query({
      query: (category) => `/products/category/${category}`,
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
} = productsApi;
