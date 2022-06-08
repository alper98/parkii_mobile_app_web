import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../../api/authService";
import userService from "../../api/userService";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  const response = await userService.get();
  if (!response) {
    thunkAPI.dispatch(setUser(null));
    return null;
  }
  thunkAPI.dispatch(setUser(response.user));
  return response.user;
});

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { email, password } = data;
  const response = await authService.login(email, password);
  console.log(response);
  if (response.error) {
    thunkAPI.dispatch(setUser(null));
    thunkAPI.dispatch(setToken(null));
    thunkAPI.dispatch(setErrorMessage(response.error));
    return null;
  }
  thunkAPI.dispatch(setUser(response.user));
  thunkAPI.dispatch(setToken(response.access_token));
  thunkAPI.dispatch(setErrorMessage(null));
  return response.user;
});

export const create = createAsyncThunk(
  "user/create",
  async (data, thunkAPI) => {
    const response = await toast.promise(userService.create(data), {
      success: `Welcome, ${data.name}`,
      error: {
        render({ data }) {
          return data.message;
        },
      },
    });
    if (!response) {
      thunkAPI.dispatch(setUser(null));
      thunkAPI.dispatch(setToken(null));
      return null;
    }
    thunkAPI.dispatch(setUser(response.user));
    thunkAPI.dispatch(setToken(response.access_token));
    return response.user;
  }
);

export const update = createAsyncThunk(
  "user/updated",
  async (data, thunkAPI) => {
    const response = await toast.promise(
      userService.update(thunkAPI.getState().user.user.id, data),
      {
        success: `Updated`,
        error: {
          render({ data }) {
            return data.message;
          },
        },
      }
    );
    if (!response) {
      thunkAPI.dispatch(setUser(null));
    }
    thunkAPI.dispatch(setUser(response.user));
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data, thunkAPI) => {
    const response = await toast.promise(
      userService.delete(thunkAPI.getState().user.user.id),
      {
        success: `You have been deleted`,
        error: {
          render({ data }) {
            return data.message;
          },
        },
      }
    );
    if (!response) {
      localStorage.removeItem("access_token");
      thunkAPI.dispatch(setUser(null));
    }
    localStorage.removeItem("access_token");
    thunkAPI.dispatch(setUser(null));
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  localStorage.removeItem("access_token");
  thunkAPI.dispatch(setUser(null));
  toast.info("Logged out");
});

const initialState = {
  userStyle: "userbox://styles/userbox/streets-v9",
  user: null,
  userLoading: false,
  prevPath: null,
  token: localStorage.getItem("access_token"),
  errorMessage: null,
  settings: {
    radius: localStorage.getItem("settings") ?? 500,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setPrevPath: (state, action) => {
      state.prevPath = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setSettings, setToken, setPrevPath, setErrorMessage } =
  userSlice.actions;

export default userSlice.reducer;
