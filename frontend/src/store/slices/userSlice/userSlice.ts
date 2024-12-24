import {createSlice} from "@reduxjs/toolkit";
import {IUserType} from "./types.ts";
import {userApi} from "./userApi.ts";
import {RootState} from "../../store.ts";


const initialState: IUserType = {
    user: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(userApi.endpoints.register.matchFulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload
            })
            .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload
            })
            .addMatcher(userApi.endpoints.checkAuth.matchFulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload
            })
            .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
    }
})


export default userSlice.reducer


export function selectAuthenticated(state: RootState) {
    return !!state.auth.isAuthenticated; // Проверяем, есть ли user
}

export const selectUser = (state: RootState) => state.user;