import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
}

export const threadSlice = createSlice({
    name: "thread",
    initialState,
    reducers: {
        addThread: (state, action) => {
            const newThread = action.payload;
            if (Array.isArray(newThread)) {
                state.data = state.data.concat(newThread);
            } else {
                state.data.push(newThread);
            }
            // console.log("thread slice :", newThread);
        }
    }
})

export const { addThread } = threadSlice.actions

export default threadSlice.reducer

export const selectThread = state => state.thread.data