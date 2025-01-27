import {apiBase} from "../../api.ts";
import {IAnalyticsData} from "./types.ts";


export const cartApi = apiBase.injectEndpoints?.({
    endpoints: (builder) => ({
        addCart: builder.mutation<never, string>({
            query: (productId) => ({
                url: '/cart',
                method: 'POST',
                body: {productId}
            })
        }),
        removeCart : builder.mutation<void, string>({
            query: (productId) => ({
                url: `/cart`,
                method: 'DELETE',
                body: {productId}
            })
        }),
        updateQuantity: builder.mutation<void, {productId: string, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `/cart/${productId}`,
                method: 'PUT',
                body: {quantity}
            })
        }),
        getCoupon: builder.query({
            query: () => ({
                url: `/coupons`,
                method: 'GET',
            })
        }),
        applyCoupon: builder.mutation({
            query: (code) => ({
                url: `/coupons/validate`,
                method: 'POST',
                body: {code}
            })
        }),
        checkoutSuccess: builder.mutation({
            query: (sessionId) => ({
                url: `/payments/checkout-success`,
                method: 'POST',
                body: {sessionId}
            })
        }),
        getAnalytics: builder.query<IAnalyticsData, void>({
            query: () => ({
                url: `/analytics`,
                method: 'GET'
            })
        })
    })
})

export const {
    useAddCartMutation,
    useRemoveCartMutation,
    useUpdateQuantityMutation,
    useApplyCouponMutation,
    useCheckoutSuccessMutation,
    useGetAnalyticsQuery,
    useGetCouponQuery
} = cartApi