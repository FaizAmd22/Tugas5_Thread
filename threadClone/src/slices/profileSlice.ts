import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            const newUser = action.payload
            state.data = newUser
            // console.log("state data :", state.data);
        }
    }
})

export const { setProfile } = profileSlice.actions

export const selectProfile = state => state.profile.data;

export default profileSlice.reducer;
