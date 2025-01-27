import { apiBase } from './api'
import { IUser, User } from '../features/userSlice/types'



export const userApi = apiBase.injectEndpoints?.({
  endpoints: (builder) => ({
    register: builder.mutation<IUser, User>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<IUser, {email: string, password: string}>({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      })
    })
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation
} = userApi