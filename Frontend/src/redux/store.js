import { configureStore } from "@reduxjs/toolkit";
import loggedInSlice from "./logSlice.js";
import userDetailsSlice from "./userDetails.js";

const store = configureStore({
  reducer: {
    logReducer: loggedInSlice,
    userDetailsReducer: userDetailsSlice,
  },
});

export default store;
