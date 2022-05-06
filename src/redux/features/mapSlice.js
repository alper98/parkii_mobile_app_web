import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mapService from "../../api/mapService";

// First, create the thunk
export const fetchRestrictions = createAsyncThunk(
  "maps/restrictions",
  async (coords, thunkAPI) => {
    const { latitude, longitude, distance } = coords;
    const response = await mapService.getRestrictions(
      latitude,
      longitude,
      distance
    );
    return response.restrictions;
  }
);
export const fetchZones = createAsyncThunk("maps/zones", async (thunkAPI) => {
  console.log("silent fetching");
  const response = await mapService.getZones();
  return response.zones;
});

const initialState = {
  mapStyle: "mapbox://styles/mapbox/streets-v9",
  mapLoading: false,
  viewState: {
    latitude: 55.676098,
    longitude: 12.568337,
    zoom: 14,
  },
  startingCoords: {
    latitude: 55.676098,
    longitude: 12.568337,
    zoom: 14,
  },
  restrictions: null,
  zones: null,
  currentZone: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setViewState: (state, action) => {
      state.viewState = { ...state.viewState, ...action.payload };
    },
    setZones: (state, action) => {
      state.zones = { ...state.zones, ...action.payload };
    },
    setCurrentZone: (state, action) => {
      state.currentZone = action.payload;
    },
    setRestrictions: (state, action) => {
      state.restrictions = { ...state.restrictions, ...action.payload };
    },
  },
  extraReducers: {
    [fetchRestrictions.pending]: (state, { payload }) => {
      state.mapLoading = true;
    },
    [fetchRestrictions.fulfilled]: (state, { payload }) => {
      state.restrictions = payload;
      state.startingCoords = state.viewState;
      state.mapLoading = false;
    },
    [fetchZones.pending]: (state, { payload }) => {
      state.mapLoading = true;
    },
    [fetchZones.fulfilled]: (state, { payload }) => {
      state.mapLoading = false;
      state.zones = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setViewState, setZones, setRestrictions, setCurrentZone } =
  mapSlice.actions;

export default mapSlice.reducer;
