import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user.slice";
import bioReducer from "../feature/Bio.slice";
export default configureStore({
  reducer: {
    getUsers: userReducer,
    editBio: bioReducer,
  },
});
