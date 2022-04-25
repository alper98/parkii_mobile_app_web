import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    error: null,
    lat: 55.676098,
    lng: 12.568337,
    address: null,
    currentRestriction: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setCurrentRestriction: (state, action) => {
      state.currentRestriction = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLat,
  setLng,
  setCurrentZone,
  setAddress,
  setCurrentRestriction,
  setError,
} = mapSlice.actions;

export default mapSlice.reducer;
