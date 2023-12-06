import api from '../../store/api';

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProductsById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
