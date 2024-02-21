import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loggedInItems: false
}

export const loggedInSilce = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        addTrue: (state) => {
            state.loggedInItems = true
        },
        addFalse: (state) => {
            state.loggedInItems = false
        }
    }
})

export const { addFalse, addTrue } = loggedInSilce.actions

export default loggedInSilce

export const selectLoggedIn = state => state.loggedIn.loggedInItems