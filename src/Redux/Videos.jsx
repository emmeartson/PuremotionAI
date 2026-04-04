import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// Fetch all videos
export const fetchVideos = createAsyncThunk(
  "videos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found.",
          code: "no_token",
        });
      }

      const response = await axios.get(`${BASE_URL}core/api/video`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle API error responses (e.g., {"error": "Credit Balance: Insufficient credits..."})
        const errorData = error.response.data;
        console.log("Redux Videos - API error response data:", errorData);
        const errorMessage =
          errorData.error || errorData.message || "Failed to fetch videos";
        console.log("Redux Videos - Extracted error message:", errorMessage);
        return rejectWithValue({ message: errorMessage, data: errorData });
      }
      return rejectWithValue({ message: "Failed to fetch videos" });
    }
  },
);

// Delete a video
export const deleteVideo = createAsyncThunk(
  "videos/delete",
  async (videoId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found.",
          code: "no_token",
        });
      }

      await axios.delete(`${BASE_URL}core/api/video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return videoId;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle API error responses
        const errorData = error.response.data;
        const errorMessage =
          errorData.error || errorData.message || "Failed to delete video";
        return rejectWithValue({ message: errorMessage, data: errorData });
      }
      return rejectWithValue({ message: "Failed to delete video" });
    }
  },
);

// Videos slice
const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearVideosError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch videos";
      })
      .addCase(deleteVideo.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videos = state.videos.filter(
          (video) => video.id !== action.payload,
        );
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete video";
      });
  },
});

export const { clearVideosError } = videosSlice.actions;
export default videosSlice.reducer;
