import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQuery'

export const epicApi = createApi({
  reducerPath: 'epicApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (patch) => ({
        url: 'auth/login',
        method: 'POST',
        body: patch,
      }),
    }),
    loginByGoogle: builder.mutation({
      query: (token) => ({
        url: 'auth/firebase',
        method: 'POST',
        body: { token: token }
      })
    }),
    register: builder.mutation({
      query: (patch) => ({
        url: 'auth/register',
        method : "POST",
        body : patch
      })
    }),
    getUserById: builder.query({
      query: (id) => (
        {
          url: `users/${id}`,
          method: 'GET',
        }
      )
    }),
    verifyOtp : builder.mutation({
      query : (patch) => ({
        url : 'auth/verifyOtp',
        method : 'POST',
        body : patch
      })
    }),
    getCounrty: builder.query({
      query: () => 'global/countries'
    })

  }),

})

export const {
  useLoginMutation,
  useLoginByGoogleMutation,
  useLazyGetUserByIdQuery,
  useGetCounrtyQuery,
  useRegisterMutation,
  useVerifyOtpMutation
} = epicApi