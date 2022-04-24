import { createSlice } from "@reduxjs/toolkit";
import api from "../../../api/ApiClient";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;

// Actions
const { loginSuccess, logoutSuccess, setToken } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await api.post("/api/login", {
      email: email,
      password: password,
    });
    if (response) {
      dispatch(setToken(response.data));
      localStorage.setItem("access_token", response.data.access_token);
      console.log(response.data);
      dispatch(loginSuccess(response.data.user));
      localStorage.setItem("user", response.data.access_token);
    } else {
      return false;
    }
  } catch (e) {
    return console.error(e.message);
  }
};

export const register = (name, email, password) => async (dispatch) => {
  console.log(name, email, password);
  try {
    const response = await api.post("/api/register", {
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
