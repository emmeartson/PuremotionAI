import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

export const registerOrLogin = createAsyncThunk(
  "onlyemail/registerOrLogin",
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}accounts/api/register-or-login/`, emailData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network error occurred" });
    }
  }
);

const onlyemailSlice = createSlice({
  name: "onlyemail",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOnlyemailError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerOrLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerOrLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(registerOrLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearOnlyemailError } = onlyemailSlice.actions;
export default onlyemailSlice.reducer;
