import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import detailThreadSlice from "./slices/detailThreadSlice";
import searchedUserSlice from "./slices/searchedUserSlice";
import threadProfileSlice from "./slices/threadProfileSlice";
import threadSlice from "./slices/threadSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        thread: threadSlice,
        threadProfile: threadProfileSlice,
        search: searchedUserSlice,
        detailThread: detailThreadSlice
    }
})