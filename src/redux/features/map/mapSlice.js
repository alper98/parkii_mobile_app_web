import { createSlice } from "@reduxjs/toolkit";
import api from "../../../api/ApiClient";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    error: null,
    lat: 55.676098,
    lng: 12.568337,
    currentZone: null,
    address: null,
    restrictions: [],
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
    setCurrentZone: (state, action) => {
      state.currentZone = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setRestrictions: (state, action) => {
      state.restrictions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLat,
  setLng,
  setCurrentZone,
  setAddress,
  setRestrictions,
  setError,
} = mapSlice.actions;

export default mapSlice.reducer;
