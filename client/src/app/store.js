import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user.slice";

export default configureStore({
  reducer: {
    getUsers: userReducer,
  },
});
