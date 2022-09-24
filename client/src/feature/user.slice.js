import { createSlice } from "@reduxjs/toolkit";

export const getUsers = createSlice({
  name: "getUsers",
  initialState: {
    getUsers: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.getUsers = action.payload;
    },
  },
});

export default getUsers.reducer;
export const { setUserData } = getUsers.actions;
