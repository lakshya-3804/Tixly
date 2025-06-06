import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:null,
};

const userDetailsSlice = createSlice({
  name: "userDetailsSlice",
  initialState,
  reducers: {
    setUserDetails: (state,action) => {
      state.value = action.payload;
    },
    clearUserDetails: (state) => {
      state.value = null;
    },
  },
});

export const { setUserDetails , clearUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
