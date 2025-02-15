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
  },
});

export const { setUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
