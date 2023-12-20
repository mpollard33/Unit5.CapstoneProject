import api from '../../store/api';

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => '/carts',
    }),
    getUserCart: builder.query({
      query: (id) => `carts/userid/${id}`,
    }),
    getSingleCart: builder.query({
      query: (id) => ({
        url: `carts/${id}`,
        method: 'GET',
      }),
    }),
    updateCart: builder.mutation({
      query: (id, data) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    }),
    addToUserCart: builder.mutation({
      query: (data) => ({
        url: `/carts`,
        method: 'POST',
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useGetUserCartQuery,
  useGetSingleCartQuery,
  useUpdateCartMutation,
  useAddToUserCartMutation,
} = cartApi;
