import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isToken: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = action.payload.user
            state.user = newUser
            // console.log("new user :", state.user);
            
            const newToken = action.payload.token
            state.isToken = newToken
            // console.log("new Token :", state.isToken);
        }
    }
})

export const { addUser } = authSlice.actions

export default authSlice.reducer

export const selectUser = state => state.auth.user