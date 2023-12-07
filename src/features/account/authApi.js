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
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
