import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import mapService from "../../api/mapService";

// First, create the thunk
export const fetchRestrictions = createAsyncThunk(
  "maps/restrictions",
  async (coords, thunkAPI) => {
    const { latitude, longitude, distance } = coords;
    if (!thunkAPI.getState().map?.restrictions) {
      thunkAPI.dispatch(setMapLoading(true));
    }
    const response = await mapService.getRestrictions(
      latitude,
      longitude,
      distance
    );
    if (!response) {
      toast.info("We found no restrictions in your area");
      thunkAPI.dispatch(setMapLoading(false));
      thunkAPI.dispatch(setRestrictions(null));
    }
    thunkAPI.dispatch(setRestrictions(response.restrictions));
    thunkAPI.dispatch(setMapLoading(false));
    const currentViewState = thunkAPI.getState().map.viewState;
    thunkAPI.dispatch(setStartingCoords(currentViewState));
  }
);
export const fetchZones = createAsyncThunk(
  "maps/zones",
  async (_, thunkAPI) => {
    const response = await mapService.getZones();
    if (!response) {
      thunkAPI.dispatch(setZones(null));
    }
    thunkAPI.dispatch(setZones(response.zones));
  }
);

export const getUserLocation = createAsyncThunk(
  "maps/getLocation",
  async (_, thunkAPI) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        thunkAPI.dispatch(
          setViewState({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          })
        );
        thunkAPI.dispatch(
          setStartingCoords({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          })
        );
      });
    } else {
      alert("Unable to get location");
    }
  }
);

const initialState = {
  mapStyle: "mapbox://styles/mapbox/streets-v9",
  mapLoading: false,
  viewState: {
    latitude: 55.676098,
    longitude: 12.568337,
    zoom: 12,
  },
  startingCoords: {
    latitude: 55.6897960048817,
    longitude: 12.555729340168238,
    zoom: 12,
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
    setStartingCoords: (state, action) => {
      state.startingCoords = { ...state.startingCoords, ...action.payload };
    },
    setZones: (state, action) => {
      state.zones = { ...state.zones, ...action.payload };
    },
    setCurrentZone: (state, action) => {
      state.currentZone = action.payload;
    },
    setMapLoading: (state, action) => {
      state.mapLoading = action.payload;
    },
    setRestrictions: (state, action) => {
      state.restrictions = { ...state.restrictions, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setViewState,
  setZones,
  setRestrictions,
  setCurrentZone,
  setStartingCoords,
  setMapLoading,
} = mapSlice.actions;

export default mapSlice.reducer;
