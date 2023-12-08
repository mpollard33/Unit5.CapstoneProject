import api from '../../store/api';

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (id) => `carts/${id}`,
    }),
    addToCart: builder.mutation({
      query: (product) => ({
        url: '/carts',
        method: 'POST',
        body: { product },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/carts/${productId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
    updateCartQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/carts/${productId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} = cartApi;
