import api from '../../store/api';

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => '/carts',
    }),
    getUserCart: builder.query({
      query: (id) => `carts/user/${id}`,
    }),
    updateCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'PUT',
        body: { product },
      }),
    }),
    updateCartQuantity: builder.mutation({
      query: ({ id }) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
        body: {
          userId: 11,
          date: new Date().toISOString(),
          products: [{ id: 1, quantity: 1 }],
        },
      }),
    }),
    getSortOrder: builder.query({
      query: (order) => `/carts?sort=${order}`, // 'asc' 'desc'
    }),
    updateProduct: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useGetUserCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useGetSortOrderQuery,
} = cartApi;
