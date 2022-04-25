import { responsiveFontSizes } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import api from "../../../api/ApiClient";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;

// Actions
const { setUser } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await api.post("/login", {
      email: email,
      password: password,
    });
    if (response) {
      localStorage.setItem("access_token", response.data.access_token);
      return dispatch(setUser(response.data.user));
    } else {
      return false;
    }
  } catch (e) {
    return console.log(e.message);
  }
};

export const register = (name, email, password) => async (dispatch) => {
  console.log(name, email, password);
  try {
    const response = await api.post("/register", {
      name: name,
      email: email,
      password: password,
    });
    if (response) {
      return dispatch(setUser(response.data.user));
    } else {
      return false;
    }
  } catch (e) {
    return console.error(e.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("access_token");
    return dispatch(setUser(null));
  } catch (e) {
    return console.error(e.message);
  }
};

export const checkToken = () => async (dispatch) => {
  try {
    const response = await api.get("/user");
    if (response.data.user) {
      return dispatch(setUser(response.data.user));
    }
    return dispatch(setUser(null));
  } catch (e) {
    return e;
  }
};
