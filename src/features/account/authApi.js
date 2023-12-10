import api from '../../store/api';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => 'users/me',
    }),
    register: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: { user },
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'auth/login',
        method: 'POST',
        body: { user },
      }),
      transformResponse: (response) => response.data.message,
    }),
    getCart: builder.query({
      query: (id) => `carts/user/${id}`,
    }),
    addUserCart: builder.mutation({
      query: (user) => ({
        url: '/carts/',
        method: 'POST',
        body: { user },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
    updateCart: builder.mutation({
      query: ({ id, action }) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
        body: { action },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
  }),
});

export const {
  useMeQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCartQuery,
  useAddUserCartMutation,
  useUpdateCartMutation,
} = authApi;
