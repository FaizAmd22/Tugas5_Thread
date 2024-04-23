import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import detailThreadSlice from "./slices/detailThreadSlice";
import profileSlice from "./slices/profileSlice";
import searchedUserSlice from "./slices/searchedUserSlice";
import suggestionSlice from "./slices/suggestionSlice";
import threadSlice from "./slices/threadSlice";
import userSlice from "./slices/userSlice";
import profileThreadSlice from "./slices/profileThreadSlice";
import followSlice from "./slices/followSlice";
import likedSlice from "./slices/likedSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        thread: threadSlice,
        profileThread: profileThreadSlice,
        search: searchedUserSlice,
        detailThread: detailThreadSlice,
        profile: profileSlice,
        suggestion: suggestionSlice,
        follow: followSlice,
    }
})