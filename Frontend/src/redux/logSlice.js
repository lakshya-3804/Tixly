import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("isLoggedIn")) || false,  // if we reload the page, we want to keep the logged in state
  // so we check localStorage for the value
};

const loggedInSlice = createSlice({
  name: "loggedInSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.value = false;
      localStorage.removeItem("value");
    },
    login: (state) => {
      state.value = true;
      localStorage.setItem("value", true);
    },
  },
});

export const { logout,login } = loggedInSlice.actions;
export default loggedInSlice.reducer;
