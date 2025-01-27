
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from '../../store/hooks'
import { BASE_URL } from '../../../constants'



const stripePromise = loadStripe(
    "pk_test_51QULlfEy2s9UtV5EFdcvCJoLJlY3w46oiHRtsSpMEI9KcZvFjqceh3fO9cxmdomLjkmdZwdug0PSQ0BaZHPz9UMK00lyCTZwOl"
);

export const OrderSummary = () => {

    const {subtotal, total, coupon, carts, isCouponApplied} = useAppSelector(state => state.cart)

    const savings = subtotal - total;
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTotal = total.toFixed(2);
    const formattedSavings = savings.toFixed(2);



    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;

            if (!stripe) {
                throw new Error("Stripe instance not found.");
            }

            const res = await fetch(`${BASE_URL}/payments/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: carts, // Здесь возможно нужно "products", а не "product"
                    couponCode: coupon ? coupon.code : null,
                }),
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const session = await res.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error("Error during redirect to checkout:", result.error);
            }
        } catch (error) {
            console.error("Error in handlePayment:", error);
        }
    };

    return (
        <motion.div
            className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className='text-xl font-semibold text-emerald-400'>Order summary</p>

            <div className='space-y-4'>
                <div className='space-y-2'>
                    <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-base font-normal text-gray-300'>Original price</dt>
                        <dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
                    </dl>

                    {savings > 0 && (
                        <dl className='flex items-center justify-between gap-4'>
                            <dt className='text-base font-normal text-gray-300'>Savings</dt>
                            <dd className='text-base font-medium text-emerald-400'>-${formattedSavings}</dd>
                        </dl>
                    )}

                    {coupon && isCouponApplied && (
                        <dl className='flex items-center justify-between gap-4'>
                            <dt className='text-base font-normal text-gray-300'>Coupon ({coupon?.code})</dt>
                            <dd className='text-base font-medium text-emerald-400'>-{coupon?.discountPercentage}%</dd>
                        </dl>
                    )}
                    <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
                        <dt className='text-base font-bold text-white'>Total</dt>
                        <dd className='text-base font-bold text-emerald-400'>${formattedTotal}</dd>
                    </dl>
                </div>

                <motion.button
                    className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePayment}
                >
                    Proceed to Checkout
                </motion.button>

                <div className='flex items-center justify-center gap-2'>
                    <span className='text-sm font-normal text-gray-400'>or</span>
                    <Link
                        to='/'
                        className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
                    >
                        Continue Shopping
                        <MoveRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
