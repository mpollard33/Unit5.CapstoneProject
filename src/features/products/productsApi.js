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
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
    }),
    getProductsBySortOrder: builder.query({
      query: (sortOrder) => `/products?sort=${sortOrder}`,
    }),
    getProductCategoryBySortOrder: builder.query({
      query: (sortOrder, category) =>
        `/products/category/${category}?sort=${sortOrder}`,
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
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductsBySortOrderQuery,
  useGetProductCategoryBySortOrderQuery,
  useDeleteProductMutation,
} = productsApi;
