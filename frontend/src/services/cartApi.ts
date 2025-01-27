import { apiBase } from './api'


export const cartApi = apiBase.injectEndpoints?.({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productId) => ({
        url: '/cart',
        method: 'POST',
        body: { productId },
      }),
    }),
    removeCart: builder.mutation<void, string>({
      query: (productId) => ({
        url: '/cart',
        method: 'DELETE',
        body: { productId },
      }),
    }),
    updateQuantity: builder.mutation<void, { productId: string, quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,
        method: 'PUT',
        body: { quantity },
      }),
    }),
    getCoupon: builder.query<{ code: string, discountPercentage: string }, void>({
      query: () => ({
        url: `/coupons`,
        method: 'GET',
      }),
    }),
    applyCoupon: builder.mutation<{ code: string; discountPercentage: string; }, string>({
      query: (code) => ({
        url: `/coupons/validate`,
        method: 'POST',
        body: { code },
      }),
    }),
  }),
})

export const {
  useAddProductMutation,
  useRemoveCartMutation,
  useUpdateQuantityMutation,
  useApplyCouponMutation,
} = cartApi