import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../constants'


export interface IProfile {
  _id: number,
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
  cartItems: string[],

}

export const checkAuth = createAsyncThunk(
  'checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!res.ok) {
        return rejectWithValue('Not logged in')
      }

      const data: IProfile = await res.json()

      return data


    } catch (error) {
      return rejectWithValue(error.message)
    }
  })