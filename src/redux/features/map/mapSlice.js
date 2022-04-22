import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    lat: 55.676098,
    lng: 12.568337,
    currentZone: null,
    address: null,
  },
  reducers: {
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
    setCurrentZone: (state, action) => {
      state.currentZone = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLat, setLng, setCurrentZone, setAddress } = mapSlice.actions;

export default mapSlice.reducer;
