import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../../api/authApi";
import {
  setAuthToken,
  setAuthUser,
  removeAuthToken,
  removeAuthUser,
} from "../../../common/utils/authUtil";
import { API_ENDPOINTS } from "../../../common/constants/apiConstants";
import REDUX_FETCH_STATUS from "../../../common/constants/reduxConstants";

const { IDLE, PENDING, FULFILLED, REJECTED } = REDUX_FETCH_STATUS;

const INITIAL_STATE = {
  isLoggedIn: false,
  user: {},
  status: IDLE,
  errorCode: undefined,
};

export const login = createAsyncThunk(
  API_ENDPOINTS.LOGIN,
  async (data, { rejectWithValue }) => {
    try {
      const { username, password } = data;
      const loginResponse = await authApi.login({ username, password });
      setAuthToken(loginResponse?.data.token);

      setAuthUser(loginResponse?.data);

      return loginResponse?.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const logout = createAsyncThunk(
  API_ENDPOINTS.LOGOUT,
  async (_data, { rejectWithValue }) => {
    try {
      removeAuthToken();
      removeAuthUser();
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

/* eslint-disable no-param-reassign */
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.status = FULFILLED;
      state.errorCode = undefined;
    });
    builder.addCase(login.pending, (state) => {
      state.status = PENDING;
      state.errorCode = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = REJECTED;
      state.errorCode = action.payload?.status;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = undefined;
    });
  },
});
/* eslint-enable no-param-reassign */
const { actions, reducer } = authSlice;
export { actions, reducer };
