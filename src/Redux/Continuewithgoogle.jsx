import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// Google Login - send authorization code to backend
export const googleLogin = createAsyncThunk(
  "googleAuth/googleLogin",
  async (codeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}api/v1/auth/accounts/google/login/`,
        codeData
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network error occurred" });
    }
  }
);

const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearGoogleAuthError: (state) => {
      state.error = null;
    },
    clearGoogleAuthData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearGoogleAuthError, clearGoogleAuthData } =
  googleAuthSlice.actions;
export default googleAuthSlice.reducer;
