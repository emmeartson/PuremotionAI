import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// Submit Contact Form Action
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (contactData, { rejectWithValue }) => {
    try {
      const payload = {
        full_name: contactData.full_name,
        email: contactData.email,
        options: contactData.options,
        message: contactData.message,
      };

      const response = await axios.post(
        `${BASE_URL}accounts/api/contact`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to submit contact form" });
    }
  },
);

// Contact Slice
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload.message || "Message sent successfully!";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Failed to send message";
        state.message = null;
      });
  },
});

export default contactSlice.reducer;
