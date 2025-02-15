import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const loggedInSlice = createSlice({
  name: "loggedInSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.value = false;
    },
    login: (state) => {
      state.value = true;
    },
  },
});

export const { logout,login } = loggedInSlice.actions;
export default loggedInSlice.reducer;
