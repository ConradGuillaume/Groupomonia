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
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },

    likePost: (state, action) => {
      state.posts.map((posts) => {
        if (posts._id === action.payload.postId) {
          return (posts.likers = [action.payload.userId, ...posts.likers]);
        }
        return posts;
      });
    },
    unLikePost: (state, action) => {
      state.posts.map((posts) => {
        if (posts._id === action.payload.postId) {
          return (posts.likers = posts.likers.filter(
            (id) => id !== action.payload.userId
          ));
        }
        return posts;
      });
    },
    updatePost: (state, action) => {
      state.posts.map((posts) => {
        if (posts._id === action.payload.postId) {
          return (posts.message = action.payload.message);
        } else return posts;
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.postId
      );
    },

    editComment: (state, action) => {
      state.posts.map((posts) => {
        if (posts._id === action.payload.postId) {
          return (posts.comments = posts.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              return {
                ...comment,
                text: action.payload.text,
              };
            } else {
              return comment;
            }
          }));
        } else return posts;
      });
    },
    deleteComment: (state, action) => {
      state.posts.map((posts) => {
        if (posts._id === action.payload.postId) {
          return (posts.comments = posts.comments.filter(
            (comment) => comment._id !== action.payload.commentId
          ));
        } else return posts;
      });
    },
  },
});
export default allPosts.reducer;
export const {
  setAllPosts,
  likePost,
  unLikePost,
  updatePost,
  deletePost,
  addComment,
  editComment,
  deleteComment,
  addPost,
} = allPosts.actions;
