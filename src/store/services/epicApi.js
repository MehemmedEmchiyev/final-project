import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQuery'

export const epicApi = createApi({
  reducerPath: 'epicApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    
  }),
})

export const {  } = epicApi