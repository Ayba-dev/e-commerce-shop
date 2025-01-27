import { ICart } from '../../features/cartSlice/types'

export const calculateTotals = (carts: ICart[], coupon?: {code: string, discountPercentage: string }) => {
    const  subtotal = carts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    let total = subtotal;

    if (coupon) {
        const discount = subtotal * (Number(coupon.discountPercentage) / 100);
        total = subtotal - discount
    }

    return {total, subtotal}
}