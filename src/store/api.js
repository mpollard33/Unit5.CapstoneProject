import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      token && headers.set('authorization', `Bearer ${token}`);
    },
  }),
  endpoints: (builder) => ({}),
});

export default api;
