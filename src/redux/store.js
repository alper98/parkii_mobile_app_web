import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import mapSlice from "./features/map/mapSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice,
  },
  //  show the devTools only in development
  devTools: process.env.NODE_ENV !== "production",
});
