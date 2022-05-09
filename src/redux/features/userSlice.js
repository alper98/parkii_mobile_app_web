import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../../api/authService";
import userService from "../../api/userService";

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { email, password } = data;
  const response = await toast.promise(authService.login(email, password), {
    success: {
      render({ data }) {
        return `Welcome back, ${data.user.name.split(" ")[0]}`;
      },
    },
    error: {
      render({ data }) {
        return data.message;
      },
    },
  });
  if (!response) {
    thunkAPI.dispatch(setUser(null));
  }
  thunkAPI.dispatch(setUser(response.user));
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
    }
    thunkAPI.dispatch(setUser(response.user));
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
      thunkAPI.dispatch(setUser(null));
    }
    thunkAPI.dispatch(setUser(response.user));
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  thunkAPI.dispatch(setUser(null));
  toast.info("Logged out");
});

const initialState = {
  userStyle: "userbox://styles/userbox/streets-v9",
  user: null,
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
    },
    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setSettings } = userSlice.actions;

export default userSlice.reducer;
