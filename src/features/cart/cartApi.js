import api from '../../store/api';

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => '/carts',
    }),
    getUserCart: builder.query({
      query: (id) => `carts/user/${id}`,
    }),
    getSingleCart: builder.query({
      query: (id) => ({
        url: `carts/${id}`,
        method: 'GET',
      }),
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
        body: { products: data },
      }),
    }),
    addToCart: builder.mutation({
      query: ({ id }) => ({
        url: `/carts/${id}`,
        method: 'PUT',
        body: JSON.stringify({
          date: '2019-10-12',
          products: [{ productId: 1, quantity: 3 }],
        }),
      }),
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useGetUserCartQuery,
  useUpdateCartMutation,
  useAddToCartMutation,
} = cartApi;
