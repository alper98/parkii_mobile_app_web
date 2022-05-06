import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./features/mapSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
  },
});
