import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
}

export const searchedUserSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            const newUser = action.payload
            state.data = newUser
            // console.log("state data :", state.data);
        }
    }
})

export const { setUsers } = searchedUserSlice.actions

export const selectUsers = state => state.search.data;

export default searchedUserSlice.reducer;
