import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    isFetchDetail: true,
}

export const detailThreadSlice = createSlice({
    name: "detailThread",
    initialState,
    reducers: {
        // addDetailThread: (state, action) => {
        //     const newUser = action.payload
        //     state.data = newUser
        //     // console.log("state data :", state.data);
        // },
        addDetailThread: (state, action) => {
            const newThreads = action.payload;
            // state.data.unshift(newThreads);
            state.data = newThreads
            state.isFetchDetail = true
            // console.log("data :", action);
        },
        setIsFetchDetail: (state, action) => {
            state.isFetchDetail = action.payload;

            // console.log("action :", action.payload);
            
        }
    }
})

export const { addDetailThread, setIsFetchDetail } = detailThreadSlice.actions

export const selectDetailThread = state => state.detailThread.data

export const selectIsFetchDetail = state => state.detailThread.isFetchDetail;

export default detailThreadSlice.reducer
