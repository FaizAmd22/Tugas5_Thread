import { configureStore } from "@reduxjs/toolkit";
import loggedInSilce from "./slices/loggedInSlice"; 

export default configureStore({
  reducer: {
    loggedIn: loggedInSilce
    // cart: cartSlice.reducer,
  }
});