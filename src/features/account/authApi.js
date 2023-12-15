import api from '../../store/api';


const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: { user },
      }),
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
    }),
    getSingleCart: builder.query({
      query: (id) => ({
        url: `carts/${id}`,
        method: 'GET',
      }),
    }),
    getUserCart: builder.query({
      query: (id) => ({
        url: `/carts/user/${id}`,
        method: 'GET',
      }),
    }),
    getAllCarts: builder.query({
      query: () => ({
        url: '/carts/',
        method: 'GET',
      }),
    }),
    addUserCart: builder.mutation({
      query: (cart) => ({
        url: '/carts/',
        method: 'POST',
        body: { cart },
      }),
    }),

    addToCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useGetAllUsersQuery,
  useRegisterMutation,
  useLogoutMutation,
  useGetCartQuery,
  useAddUserCartMutation,
  useGetSingleUserQuery,
  useGetSingleCartQuery,
  useGetUserCartQuery,
  useGetAllCartsQuery,
} = authApi;
