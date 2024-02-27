import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
}

export const threadProfileSlice = createSlice({
    name: "threadProfile",
    initialState,
    reducers: {
        addThreadProfile: (state, action) => {
            const newThread = action.payload;
            if (Array.isArray(newThread)) {
                state.data = state.data.concat(newThread);
            } else {
                state.data.push(newThread);
            }
            console.log("thread slice :", newThread);
        }
    }
})

export const { addThreadProfile } = threadProfileSlice.actions

export default threadProfileSlice.reducer

export const selectThreadProfile = state => state.threadProfile.data