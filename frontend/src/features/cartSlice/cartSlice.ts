import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICart, ICartSlice} from "./types.ts";
import {getCartItems} from "./thunk.ts";
import {toast} from "react-toastify";
import {calculateTotals} from "../../../../lib/calculateTotals.tsx";
import {cartApi} from "./cartApi.ts";


const initialState: ICartSlice = {
    carts: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    coupon: '',
    total: 0,
    subtotal: 0,
    isCouponApplied: false
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const findIndex = state.carts.findIndex((item) => item._id === action.payload._id)
            if (findIndex >= 0) {
                state.carts[findIndex].quantity += 1
                toast('increased cart quantity')
            } else {
                const tempProduct = {...action.payload, quantity: 1}
                state.carts.push(tempProduct)
            }
            const {subtotal, total} = calculateTotals(state.carts, state.coupon);
            state.subtotal = subtotal
            state.total = total
            localStorage.setItem('carts', JSON.stringify(state.carts))
        },
        removeFromCart: (state, action: PayloadAction<ICart>) => {
            state.carts = state.carts.filter((item) => item._id !== action.payload._id)
            const {subtotal, total} = calculateTotals(state.carts, state.coupon);
            state.subtotal = subtotal
            state.total = total
            localStorage.setItem('carts', JSON.stringify(state.carts))
            toast.success(`${action.payload.name} removed from cart`, {
                position: "top-right",
            })

        },
        decreaseFromCart: (state, action: PayloadAction<ICart>) => {
            const findItem = state.carts.findIndex((item) => item._id === action.payload._id)
            if (findItem >= 0) {
                state.carts[findItem].quantity -= 1
            }
            const {subtotal, total} = calculateTotals(state.carts, state.coupon);
            state.subtotal = subtotal
            state.total = total
        },
        increaseFromCart: (state, action: PayloadAction<ICart>) => {
            const findItem = state.carts.find((item) => item._id === action.payload._id)
            if (findItem) {
                findItem.quantity += 1
            }
            const {subtotal, total} = calculateTotals(state.carts, state.coupon);
            state.subtotal = subtotal
            state.total = total
        },
        clearCart: () => {
            return initialState
        },
        removeCoupon: (state) => {
            state.coupon = null
            state.isCouponApplied = false
            const {total, subtotal} = calculateTotals(state.carts, state.coupon)
            state.coupon = total
            state.subtotal = subtotal
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(getCartItems.fulfilled.match, (state, action) => {
            state.carts = action.payload
        })
        builder
            .addMatcher(getCartItems.rejected.match, (state, action) => {
                state.carts = [];
                toast(`${action.payload.message} couldn't add to cart`)
            })
        builder
            .addMatcher(cartApi.endpoints.getCoupon.matchFulfilled, (state, action) => {
                console.log('Matcher triggered:', action.payload)
                state.coupon = action.payload
            })
        builder
            .addMatcher(cartApi.endpoints.applyCoupon.matchFulfilled, (state, action) => {
                state.coupon = action.payload
                state.isCouponApplied = true
                const {total, subtotal} = calculateTotals(state.carts, state.coupon)
                state.coupon = total
                state.subtotal = subtotal
            })
    }
})


export default cartSlice.reducer
export const {
    addToCart,
    removeFromCart,
    increaseFromCart,
    decreaseFromCart,
    removeCoupon,
    clearCart,
    getCoupons
} = cartSlice.actions