import api from '../../store/api';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: { user },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: { user },
      }),
      transformResponse: (response) => response.data.token,
      transformErrorResponse: (response) => response.data.error.message,
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
    }),
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
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} = authApi;
