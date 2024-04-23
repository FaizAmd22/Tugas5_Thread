import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    addThread: (state, action) => {
      state.data = action.payload;
      // const newThreads = action.payload;
      // state.data.unshift(newThreads);
      console.log("data di threadSlice :", action.payload);
      
    },
  },
});

export const { addThread } = threadSlice.actions;

export const selectThread = (state) => state.thread.data;

export default threadSlice.reducer;
