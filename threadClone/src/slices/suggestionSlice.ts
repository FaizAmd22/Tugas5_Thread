import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
}

export const suggestionSlice = createSlice({
    name: "suggestion",
    initialState,
    reducers: {
        setSuggestion: (state, action) => { 
            const newUser = action.payload;
            state.data = newUser;
            // console.log("state data :", action.payload);
        }
    }
});

export const { setSuggestion } = suggestionSlice.actions;

export const selectSuggestion = state => state.suggestion.data;

export default suggestionSlice.reducer;
