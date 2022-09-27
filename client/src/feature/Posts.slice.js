import { createSlice } from "@reduxjs/toolkit";

export const allPosts = createSlice({
  name: "allPosts",
  initialState: {
    posts: null,
  },
  reducers: {
    setAllPosts: (state, { payload }) => {
      state.posts = payload;
    },
  },
});
export default allPosts.reducer;
export const { setAllPosts } = allPosts.actions;
