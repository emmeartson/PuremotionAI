import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// Submit Survey Action
export const submitSurvey = createAsyncThunk(
  "survey/submit",
  async (surveyData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found. Please log in again.",
          code: "no_token",
        });
      }

      const response = await axios.post(
        `${BASE_URL}core/api/survey`,
        surveyData,
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
