import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./features/map/mapSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice,
  },
});
