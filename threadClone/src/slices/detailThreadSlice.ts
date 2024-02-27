import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
}

export const detailThreadSlice = createSlice({
    name: "detailThread",
    initialState,
    reducers: {
        addDetailThread: (state, action) => {
            const newUser = action.payload
            state.data = newUser
            console.log("state data :", state.data);
        }
    }
})

export const { addDetailThread } = detailThreadSlice.actions

export default detailThreadSlice.reducer

export const selectDetailThread = state => state.detailThread.data