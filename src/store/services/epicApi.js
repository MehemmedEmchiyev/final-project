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
    
    })

  }),

})

export const { useLoginMutation } = epicApi