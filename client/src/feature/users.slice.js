import { createSlice } from "@reduxjs/toolkit";


export const allUsers = createSlice({
  name: "users",
  initialState: { users: null },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export default allUsers.reducer;
export const { setUsers } = allUsers.actions;
