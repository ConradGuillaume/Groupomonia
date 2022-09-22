import { createSlice } from "@reduxjs/toolkit";

export const pictureSlice = createSlice({
  name: "pictures",
  initialState: {
    pictures: null,
  },
  reducers: {
    setUserPicture: (state, { payload }) => {
      state.pictures.push(payload);
    },
  },
});

export const { setUserPicture } = pictureSlice.actions;
export default pictureSlice.reducer;
