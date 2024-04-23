import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    // isFetchProfileThread: true,
}

export const profileThreadSlice = createSlice({
    name: "profileThread",
    initialState,
    reducers: {
        addProfileThread: (state, action) => {
            const newThreads = action.payload;
            // const userId = sessionStorage.getItem("profileId")
            // console.log("profileId :", userId);
            // console.log("author :", action.payload[0].author.id);
            
            state.data = newThreads
            // state.data.push(newThreads);
            // state.isFetchProfileThread = true
        },
        // setIsFetchProfileThread: (state, action) => {
        //     state.isFetchProfileThread = action.payload
        // }
    }
})

export const { addProfileThread } = profileThreadSlice.actions

export const selectProfileThread = state => state.profileThread.data

// export const selectIsFetchProfileThread = state => state.detailThread.isFetchProfileThread

export default profileThreadSlice.reducer
