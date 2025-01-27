import {createSlice} from "@reduxjs/toolkit";
import {IUserType} from "./types.ts";
import {userApi} from "./userApi.ts";
import {RootState} from "../../store.ts";
import {checkAuth} from "./thunk.ts";


const initialState: IUserType = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logOutUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(userApi.endpoints.register.matchFulfilled, (state, action) => {
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {;
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            builder.addMatcher(checkAuth.fulfilled.match, (state, action) => {
                state.user = action.payload
            })
            .addMatcher(userApi.endpoints.checkAuth.matchFulfilled, (state, action) => {
                state.user = action.payload
            })
            .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
                state.user = null;
                localStorage.removeItem('user');
                localStorage.clear()
            })
    }
})


export default userSlice.reducer
export const selectUser = (state: RootState) => state.user.user;

export const {setUser, logOutUser} = userSlice.actions