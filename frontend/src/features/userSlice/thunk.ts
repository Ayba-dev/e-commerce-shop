import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../../constants/constants.ts";


interface IProfile {
    _id: string,
    name: string,
    email: string,
    role: string,
    cartItems: string[],
}

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_ , {rejectWithValue}) => {

        try {
          const  response =  await fetch(`${BASE_URL}/auth/profile`,{
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
          })
            if (!response.ok)  {
                rejectWithValue("Not logged in")
            }
            const data : IProfile  = await response.json()

            return data

        }catch(error) {
            return rejectWithValue(error.message);
        }

    }
)