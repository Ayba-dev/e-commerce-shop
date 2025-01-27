import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../../constants/constants.ts";


export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (_, {rejectWithValue}) =>  {

        try {
            const res = await fetch(`${BASE_URL}/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!res.ok) {
                return  rejectWithValue('No cart')
            }
            return res.json()

        }catch (error) {
            return  rejectWithValue(error.message);
        }

    }
)