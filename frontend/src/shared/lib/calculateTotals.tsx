import {ICart} from "../src/store/slices/cartSlice/types";

export const calculateTotals = (carts: ICart[], coupon: number) => {
    const  subtotal = carts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    let total = subtotal;

    if (coupon) {
        const discount = subtotal * (coupon.discountPercentage / 100);
        total = subtotal - discount
    }

    return {total, subtotal}
}