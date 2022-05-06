import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStyle: "userbox://styles/userbox/streets-v9",
  user: null,
  settings: {
    radius: localStorage.getItem("settings"),
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setSettings } = userSlice.actions;

export default userSlice.reducer;
