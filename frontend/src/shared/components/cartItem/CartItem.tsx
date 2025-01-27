import {Minus, Plus, Trash} from "lucide-react";
import { useRemoveCartMutation, useUpdateQuantityMutation } from '../../../services/cartApi'
import { useAppDispatch } from '../../store/hooks'
import { decreaseFromCart, deleteCart, increaseFromCart } from '../../../features/cartSlice/cartSlice'
import { toast } from 'react-toastify'



interface IItem {
    _id: string,
    image?: string,
    quantity?: number,
    price?: number,
    name?: string,
    description?: string
}

interface  Props {
    item: IItem;
}

const CartItem = ({item}: Props) => {

    const [removeCart] = useRemoveCartMutation();
    const [updateCart] = useUpdateQuantityMutation()
    const dispatch = useAppDispatch();



    const handleRemove = async (item: IItem) => {
        try {
            await removeCart(item._id).unwrap();
            dispatch(deleteCart(item))
        }catch (error) {
            console.log(error);
        }

    }

    const increaseCartFromCart = async (item: IItem) => {
        try {
            await updateCart({ productId: item._id, quantity: item.quantity + 1 }).unwrap()
            dispatch(increaseFromCart(item))
            toast.success(`${item.name} removed from cart successfully.`)
        } catch (error) {
            toast.error(`${error.message} error occurred while removing cart!`)
        }
    }


    const decreaseCartFromCart = async (item: IItem) => {
        try {
            await updateCart({ productId: item._id, quantity: item.quantity - 1 }).unwrap()
            dispatch(decreaseFromCart(item))
            toast.success('CartItem decreased successfully.')
        } catch (error) {
            toast.error(`${error.message} error occurred while removing cart!`)
        }
    }



    return (
        <div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
            <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
                <div className='shrink-0 md:order-1'>
                    <img className='h-20 md:h-32 rounded object-cover' src={item?.image}/>
                </div>
                <label className='sr-only'>Choose quantity:</label>

                <div className='flex items-center justify-between md:order-3 md:justify-end'>
                    <div className='flex items-center gap-2'>
                        <button
                          disabled={item.quantity <= 1}
                          onClick={() => decreaseCartFromCart(item)}
                            className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
							  focus:ring-emerald-500'
                        >
                            <Minus className='text-gray-300'/>
                        </button>
                        <p>{item.quantity}</p>
                        <button
                            onClick={() => increaseCartFromCart(item)}
                            className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none
						focus:ring-2 focus:ring-emerald-500'
                        >
                            <Plus className='text-gray-300'/>
                        </button>
                    </div>

                    <div className='text-end md:order-4 md:w-32'>
                        <p className='text-base font-bold text-emerald-400'>${item.price}</p>
                    </div>
                </div>

                <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
                    <p className='text-base font-medium text-white hover:text-emerald-400 hover:underline'>
                        {item.name}
                    </p>
                    <p className='text-sm text-gray-400'>{item.description}</p>

                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => handleRemove(item)}
                            className='inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline'
                        >
                            <Trash/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartItem;