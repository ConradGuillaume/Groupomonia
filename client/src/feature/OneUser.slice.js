import { createSlice } from "@reduxjs/toolkit";
export const getOneUser = createSlice({
  name: "getOneUser",
  initialState: {
    getOneUser: null,
  },
  reducers: {
    setOneUser: (state, action) => {
      state.getOneUser = action.payload;
    },
  },
});
export default getOneUser.reducer;
export const { setOneUser } = getOneUser.actions;
