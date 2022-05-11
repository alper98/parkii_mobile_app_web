import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mapService from "../../api/mapService";

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
      thunkAPI.dispatch(setMapLoading(false));
      thunkAPI.dispatch(setRestrictions(null));
    }
    thunkAPI.dispatch(setRestrictions(response.restrictions));
    thunkAPI.dispatch(setMapLoading(false));
    const currentViewState = thunkAPI.getState().map.coordinates;
    thunkAPI.dispatch(setCoordinatesLastFetch(currentViewState));
  }
);
export const fetchRestrictionById = createAsyncThunk(
  "maps/fetchRestrictionById",
  async (id, thunkAPI) => {
    const response = await mapService.getRestriction(id);
    if (!response) {
      thunkAPI.dispatch(setCurrentRestriction(null));
      return null;
    }
    thunkAPI.dispatch(setCurrentRestriction(response.restriction));
    return response.restriction;
  }
);
export const fetchZones = createAsyncThunk(
  "maps/zones",
  async (_, thunkAPI) => {
    const response = await mapService.getZones();
    if (!response) {
      thunkAPI.dispatch(setZones(null));
    }
    response.zones.features.forEach((zone) => {
      switch (zone.properties.kategori) {
        case "Betalingszone":
          zone.properties.navn = "blue";
          break;
        default:
          zone.properties.navn = "black";
          break;
      }
    });
    thunkAPI.dispatch(setZones(response.zones));
  }
);

export const getUserLocation = createAsyncThunk(
  "maps/getLocation",
  async (_, thunkAPI) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        thunkAPI.dispatch(
          setCoordinates({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          })
        );
        thunkAPI.dispatch(
          setCoordinatesLastFetch({
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
  coordinates: {
    latitude: 55.676098,
    longitude: 12.568337,
    zoom: 12,
  },
  coordinatesLastFetch: {
    latitude: 55.6897960048817,
    longitude: 12.555729340168238,
    zoom: 12,
  },
  restrictions: null,
  zones: null,
  currentZone: null,
  currentRestriction: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = { ...state.coordinates, ...action.payload };
    },
    setCoordinatesLastFetch: (state, action) => {
      state.coordinatesLastFetch = {
        ...state.coordinatesLastFetch,
        ...action.payload,
      };
    },
    setZones: (state, action) => {
      state.zones = { ...state.zones, ...action.payload };
    },
    setCurrentZone: (state, action) => {
      state.currentZone = action.payload;
    },
    setCurrentRestriction: (state, action) => {
      state.currentRestriction = action.payload;
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
  setCoordinates,
  setZones,
  setRestrictions,
  setCurrentZone,
  setCoordinatesLastFetch,
  setMapLoading,
  setCurrentRestriction,
} = mapSlice.actions;

export default mapSlice.reducer;
