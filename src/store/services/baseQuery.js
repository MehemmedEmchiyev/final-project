import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        prepareHeaders : (headers , {endpoint}) => {
            const token = localStorage.getItem("accessToken")
            if(token && endpoint !== "'loginGoogle") headers.set('authorization', `Bearer ${token}`)
        return headers
        }
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const newAccessToken = refreshResult.data.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default baseQueryWithReauth;