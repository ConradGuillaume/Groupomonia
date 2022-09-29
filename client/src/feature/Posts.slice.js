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
    likePost: (state, action) => {
      state.posts.map((posts) => {
        if (posts._id === action.payload.postId) {
          return {
            state,
            posts,
            likers: [action.payload.userId, state.posts.likers],
          };
        }
        return posts;
      });
    },
    unLikePost: (state, action) => {
      return state.posts.map((posts) => {
        if (posts._id === action.payload.postId) {
          return {
            posts,
            likers: posts.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return posts;
      });
    },
  },
});
export default allPosts.reducer;
export const { setAllPosts, likePost, unLikePost } = allPosts.actions;
