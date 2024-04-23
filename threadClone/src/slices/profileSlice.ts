import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    // isFetchProfile: true,
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            const newUser = action.payload
            state.data = newUser
            // state.isFetchProfile = true
            // console.log("state data :", state.data);
        },
        // setIsFetchProfile: (state, action) => {
        //     state.isFetchProfile = action.payload
        // }
    }
})

export const { setProfile } = profileSlice.actions

export const selectProfile = state => state.profile.data;

// export const selectIsFetchProfile = state => state.detailThread.isFetchProfile;

export default profileSlice.reducer;
