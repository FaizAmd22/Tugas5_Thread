import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    follower: [],
    following: []
}

export const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        setFollower: (state, action) => {
            const newUser = action.payload
            state.follower = newUser
            console.log("follower di slice :", action.payload);
        },
        setFollowing: (state, action) => {
            const newUser = action.payload
            state.following = newUser
            console.log("following di slice :", action.payload);
        },
    }
})

export const { setFollower, setFollowing } = followSlice.actions

export const selectFollower = state => state.follow.follower;
export const selectFollowing = state => state.follow.following;

export default followSlice.reducer;
