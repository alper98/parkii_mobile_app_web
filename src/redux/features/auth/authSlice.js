import { createSlice } from "@reduxjs/toolkit";
import api from "../../../api/ApiClient";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export default authSlice.reducer;

// Actions
const { loginSuccess, logoutSuccess } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await api.post("/login", {
      email: email,
      password: password,
    });
    if (response) {
      localStorage.setItem("access_token", response.data.access_token);
      dispatch(loginSuccess(response.data.user));
      return true;
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
    console.log(response);
    if (response) {
      // dispatch(loginSuccess(response.data.user));
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
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export const checkToken = () => async (dispatch) => {
  try {
    const response = await api.get("/user");
    if (response.data.user) {
      console.log(response.data.user);
      loginSuccess(response.data.user);
    }
  } catch (e) {
    return console.error(e.message);
  }
};
