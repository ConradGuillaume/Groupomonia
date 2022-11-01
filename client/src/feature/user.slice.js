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

    editBio: (state, { payload }) => {
      state.getUsers.bio = payload;
    },
    setFollowUser: (state, { payload }) => {
      state.getUsers.following = [payload, ...state.getUsers.following];
    },
    setUnFollowUser: (state, { payload }) => {
      state.getUsers.following = state.getUsers.following.filter(
        (id) => id !== payload
      );
    },
  },
});

export default getUsers.reducer;
export const {
  setUserData,
  editBio,
  setFollowUser,
  setUnFollowUser,
  uploadPicture,
} = getUsers.actions;
