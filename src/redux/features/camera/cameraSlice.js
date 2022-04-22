import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    image: "",
  },
  reducers: {
    setImage: (state, action) => {
      state.lat = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setImage } = cameraSlice.actions;

export default cameraSlice.reducer;
