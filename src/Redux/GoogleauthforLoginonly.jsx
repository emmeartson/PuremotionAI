import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// Google Login Only - send authorization code to backend (home endpoint)
export const googleLoginOnly = createAsyncThunk(
  "googleAuthLoginOnly/googleLoginOnly",
  async (codeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}api/v1/auth/accounts/google/home/`,
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

const googleAuthLoginOnlySlice = createSlice({
  name: "googleAuthLoginOnly",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearGoogleAuthLoginOnlyError: (state) => {
      state.error = null;
    },
    clearGoogleAuthLoginOnlyData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleLoginOnly.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(googleLoginOnly.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(googleLoginOnly.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearGoogleAuthLoginOnlyError, clearGoogleAuthLoginOnlyData } =
  googleAuthLoginOnlySlice.actions;
export default googleAuthLoginOnlySlice.reducer;