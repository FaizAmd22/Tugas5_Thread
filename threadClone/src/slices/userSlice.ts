import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const newUser = action.payload
            state.data = newUser
            console.log("state data :", state.data);
        }
    }
})

export const { setUser } = userSlice.actions

export const selectUser = state => state.user.data;

export default userSlice.reducer;
