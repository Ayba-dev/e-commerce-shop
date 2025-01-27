import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICart, ICartSlice } from './types'
import { toast } from 'react-toastify'
import { calculateTotals } from '../../shared/lib/calculateTotals'
import { cartApi } from '../../services/cartApi'


const initialState: ICartSlice = {
  carts: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICart>) => {
      const findIndex = state.carts.findIndex((item: ICart) => item._id === action.payload._id)
      if (findIndex >= 0) {
        state.carts[findIndex].quantity += 1
        toast.success('increased cart quantity')
      } else {
        const tempProduct = { ...action.payload, quantity: 1 }
        toast.success('Product added successfully.')
        state.carts = [...state.carts, tempProduct]
      }
      const {total} = calculateTotals(state.carts);
      state.total = total
      localStorage.setItem('cart', JSON.stringify(state.carts))
    },
    deleteCart: (state, action: PayloadAction<ICart>) => {
      state.carts = state.carts.filter((item: ICart) => item._id !== action.payload._id)
      toast.success('Cart removed successfully.')
      const {total} = calculateTotals(state.carts);
      state.total = total
      localStorage.setItem('cart', JSON.stringify(state.carts));
    },
    decreaseFromCart: (state, action: PayloadAction<ICart>) => {
      const findItem = state.carts.find((item: ICart) => item._id === action.payload._id)
      if (findItem) {
        findItem.quantity -= 1
      }
      const {total} = calculateTotals(state.carts);
      state.total = total
    },
    increaseFromCart:  (state, action: PayloadAction<ICart>) => {
      const findItem = state.carts.find((item: ICart) => item._id === action.payload._id);
      if (findItem) {
        findItem.quantity += 1
      }
      const {total} = calculateTotals(state.carts);
      state.total = total
    },
    removeCoupon: (state) => {
      state.coupon = null
      state.isCouponApplied = false
      state.total = 0
      state.subtotal = 0
    },
    clearCart: (state) => {
      const {total} = calculateTotals(state.carts, state.coupon);
      state.total = total
      return initialState
    },
  },
  extraReducers: (builder)  => {
    builder
      .addMatcher(cartApi.endpoints.getCoupon.matchFulfilled, (state, action: PayloadAction<{ code: string, discountPercentage: string }>) => {
        state.coupon = action.payload
      })
      .addMatcher(cartApi.endpoints.applyCoupon.matchFulfilled, (state, action: PayloadAction<{code: string, discountPercentage: string }>) => {
        state.coupon = action.payload
        state.isCouponApplied = true
        const {total, subtotal} = calculateTotals(state.carts, state.coupon)
        state.total = total
        state.subtotal = subtotal
      })
  }
})

export default cartSlice.reducer
export const {
  addCart,
  deleteCart,
  decreaseFromCart,
  increaseFromCart,
  removeCoupon
} = cartSlice.actions