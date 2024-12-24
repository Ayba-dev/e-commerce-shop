import {api} from "../../api.ts";
import {IUserType, User} from "./types.ts";


export const userApi = api.injectEndpoints?.({
    endpoints: (builder) => ({
        register: builder.mutation<IUserType>({
            query: (user) => ({
                url: "/auth/signup",
                method: "POST",
                body: user
            })
        }),
        login: builder.mutation<IUserType>({
            query: (user) => ({
                url: "/auth/login",
                method: "POST",
                body: user
            })
        }),
        checkAuth: builder.query<User, void>({
            query: () => ({
                url: "/auth/profile",
                method: "GET",
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            })
        })
    })
})


export const {
    useRegisterMutation,
    useLoginMutation ,
    useCheckAuthQuery,
    useLogoutMutation,
    useLazyCheckAuthQuery
} = userApi
export const {
    endpoints: {register, checkAuth},
} = userApi