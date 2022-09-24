import { createSlice } from "@reduxjs/toolkit";

export const bioEdit = createSlice({
  name: "bioEdit",
  initialState: { bio: null },
  reducers: {
    editBio: (state, { payload }) => {
      state.bio = payload;
    },
  },
});
export default bioEdit.reducer;
export const { editBio } = bioEdit.actions;
