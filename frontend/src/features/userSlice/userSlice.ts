import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUserType } from './types'
import { RootState } from '../../shared/store/store'
import { userApi } from '../../services/userApi'


const initialState: IUserType = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) :  null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials : (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    logOut : (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.register.matchFulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        localStorage.removeItem('user')
      })
  },
})


export default userSlice.reducer
export const selectUser = (state: RootState) => state.user.user

export const {setCredentials, logOut} = userSlice.actions