import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQuery'

export const epicApi = createApi({
  reducerPath: 'epicApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users', 'Genres', 'Features', 'Events', 'Types', 'Platforms', 'Subscription', 'Products', 'Wishlist', 'Carts'],
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
        body: { token },
      })
    }),
    register: builder.mutation({
      query: (patch) => ({
        url: 'auth/register',
        method: "POST",
        body: patch
      })
    }),
    getUserById: builder.query({
      query: (id) => (
        {
          url: `users/${id}`,
          method: 'GET',
        }
      ),
      providesTags: ['Users']
    }),
    verifyOtp: builder.mutation({
      query: (patch) => ({
        url: 'auth/verifyOtp',
        method: 'POST',
        body: patch
      })
    }),
    forgotPassword: builder.mutation({
      query: (patch) => ({
        url: 'auth/forget-password',
        method: "POST",
        body: patch
      })
    }),
    getCounrty: builder.query({
      query: () => 'global/countries'
    }),
    getGenres: builder.query({
      query: () => 'genres',
      providesTags: ['Genres']
    }),
    createGenres: builder.mutation({
      query: (name) => ({
        url: 'genres',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Genres']
    }),
    deleteGenres: builder.mutation({
      query: (id) => ({
        url: `genres/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Genres']
    }),
    updateGenres: builder.mutation({
      query: ({ id, name }) => ({
        url: `genres/${id}`,
        method: "POST",
        body: { name }
      }),
      invalidatesTags: ['Genres']
    }),

    getFeatures: builder.query({
      query: () => 'features',
      providesTags: ['Features']
    }),
    createFeatures: builder.mutation({
      query: (name) => ({
        url: 'features',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Features']
    }),
    deleteFeatures: builder.mutation({
      query: (id) => ({
        url: `features/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Features']
    }),
    updateFeatures: builder.mutation({
      query: ({ id, name }) => ({
        url: `features/${id}`,
        method: "POST",
        body: { name }
      }),
      invalidatesTags: ['Features']
    }),


    getEvents: builder.query({
      query: () => 'events',
      providesTags: ['Events']
    }),
    createEvents: builder.mutation({
      query: (name) => ({
        url: 'events',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Events']
    }),
    deleteEvents: builder.mutation({
      query: (id) => ({
        url: `events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events']
    }),
    updateEvents: builder.mutation({
      query: ({ id, name }) => ({
        url: `events/${id}`,
        method: "POST",
        body: { name }
      }),
      invalidatesTags: ['Events']
    }),


    getTypes: builder.query({
      query: () => 'types',
      providesTags: ['Types']
    }),
    createTypes: builder.mutation({
      query: (name) => ({
        url: 'types',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Types']
    }),
    deleteTypes: builder.mutation({
      query: (id) => ({
        url: `types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Types']
    }),
    updateTypes: builder.mutation({
      query: ({ id, name }) => ({
        url: `types/${id}`,
        method: "POST",
        body: { name }
      }),
      invalidatesTags: ['Types']
    }),


    getPlatforms: builder.query({
      query: () => 'platforms',
      providesTags: ['Platforms']
    }),
    createPlatforms: builder.mutation({
      query: (name) => ({
        url: 'platforms',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Platforms']
    }),
    deletePlatforms: builder.mutation({
      query: (id) => ({
        url: `platforms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Platforms']
    }),
    updatePlatforms: builder.mutation({
      query: ({ id, name }) => ({
        url: `platforms/${id}`,
        method: "POST",
        body: { name }
      }),
      invalidatesTags: ['Platforms']
    }),

    getSubscription: builder.query({
      query: () => 'subscriptions',
      providesTags: ['Subscription']
    }),
    createSubscription: builder.mutation({
      query: (name) => ({
        url: 'subscriptions',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Subscription']
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `subscriptions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription']
    }),
    updateSubscription: builder.mutation({
      query: ({ id, name }) => ({
        url: `subscriptions/${id}`,
        method: "POST",
        body: { name }
      }),
      invalidatesTags: ['Subscription']
    }),
    getProducts: builder.query({
      query: (params = "") => `products?${params}`,
      providesTags: ['Products'],
      keepUnusedDataFor: 0
    }),
    getProductById : builder.query({
      query : (id) => `products/${id}`,
      providesTags : ['Products']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products']
    }),
    uploadMedia: builder.mutation({
      query: (files) => {
        const formData = new FormData()
        files.forEach(file => {
          formData.append("files", file)
        });
        return {
          url: "upload/media",
          method: 'POST',
          body: formData
        }
      }
    }),
    createProduct: builder.mutation({
      query: (patch) => ({
        url: 'products',
        method: 'POST',
        body: patch
      }),
      invalidatesTags: ['Products']
    }),
    updateProduct: builder.mutation({
      query: ({ id, patch }) => ({
        url: `products/${id}`,
        method: 'POST',
        body: patch
      }),
      invalidatesTags: ['Products']
    }),
    getWishlist: builder.query({
      query: () => 'wishlist',
      providesTags: ['Wishlist'],
      keepUnusedDataFor: 0
    }),
    addToWishlist: builder.mutation({
      query: (patch) => ({
        url: 'wishlist/toggle',
        method: 'POST',
        body: patch
      }),
      invalidatesTags: ['Wishlist']
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist']
    }),
    clearWishlist: builder.mutation({
      query: () => ({
        url: 'wishlist',
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist']
    }),
    getCarts: builder.query({
      query: () => 'carts',
      providesTags: ['Carts'],
      keepUnusedDataFor: 0
    }),
    addToCart: builder.mutation({
      query: (patch) => ({
        url: 'carts/add',
        method: 'POST',
        body: patch
      }),
      invalidatesTags: ['Carts']
    }),
    clearCarts: builder.mutation({
      query: () => ({
        url: 'carts',
        method: 'DELETE',
      }),
      invalidatesTags: ['Carts']
    }),
    newEmail: builder.mutation({
      query: (patch) => ({
        url: 'users/updateEmail',
        method: 'POST',
        body: patch
      })
    }),
    verifyNewEmail: builder.mutation({
      query: (patch) => ({
        url: 'users/verifyNewEmail',
        method: 'POST',
        body: patch
      })
    }),
    updateProfile: builder.mutation({
      query: (patch) => ({
        url: 'users/updateProfile',
        method: 'POST',
        body: patch
      }),
      invalidatesTags: ['Users']
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags : ['Users']
    })
  }),
})

export const {
  useLoginMutation,
  useLoginByGoogleMutation,
  useLazyGetUserByIdQuery,
  useGetCounrtyQuery,
  useRegisterMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useGetGenresQuery,
  useCreateGenresMutation,
  useDeleteGenresMutation,
  useUpdateGenresMutation,
  useGetFeaturesQuery,
  useCreateFeaturesMutation,
  useDeleteFeaturesMutation,
  useUpdateFeaturesMutation,
  useGetEventsQuery,
  useCreateEventsMutation,
  useDeleteEventsMutation,
  useUpdateEventsMutation,
  useGetTypesQuery,
  useCreateTypesMutation,
  useDeleteTypesMutation,
  useUpdateTypesMutation,
  useGetPlatformsQuery,
  useCreatePlatformsMutation,
  useDeletePlatformsMutation,
  useUpdatePlatformsMutation,
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useUploadMediaMutation,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useDeleteWishlistMutation,
  useClearWishlistMutation,
  useGetCartsQuery,
  useAddToCartMutation,
  useClearCartsMutation,
  useNewEmailMutation,
  useVerifyNewEmailMutation,
  useUpdateProfileMutation,
  useDeleteAccountMutation
} = epicApi