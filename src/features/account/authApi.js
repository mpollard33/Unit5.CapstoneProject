import api from '../../store/api';
import { initializeUser } from '../../store/authSlice';

const TOKEN_KEY = 'token';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => '/users/me',
    }),
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
    updateCart: builder.mutation({
      query: ({ id, action }) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
        body: { action },
      }),
    }),
  }),
  overrideExisting: true,
  afterAuthCheck: ({ dispatch, getState }) => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      dispatch(initializeUser());
    }
  },
});

export const {
  useMeQuery,
  useGetAllUsersQuery,
  useRegisterMutation,
  useLogoutMutation,
  useGetCartQuery,
  useAddUserCartMutation,
  useUpdateCartMutation,
  useGetSingleUserQuery,
  useGetSingleCartQuery,
  useGetUserCartQuery,
  useGetAllCartsQuery,
} = authApi;
