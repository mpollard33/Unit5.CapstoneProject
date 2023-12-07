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
    login: builder.mutation({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: { user },
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
