import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// Subscription Checkout Action
export const subscriptionCheckout = createAsyncThunk(
  "subscription/checkout",
  async ({ price_id, is_exclusive }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found. Please log in again.",
          code: "no_token",
        });
      }

      const response = await axios.post(
        `${BASE_URL}core/api/subscription-checkout`,
        {
          price_id,
          is_exclusive,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network error occurred" });
    }
  },
);
