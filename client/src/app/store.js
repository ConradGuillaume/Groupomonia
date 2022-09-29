import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user.slice";
import usersReducer from "../feature/users.slice";
import usersPosts from "../feature/Posts.slice";

export default configureStore({
  reducer: {
    getUsers: userReducer,
    allUsers: usersReducer,
    allPosts: usersPosts,
  },
});
