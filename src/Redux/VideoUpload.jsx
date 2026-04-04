import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./Config";

// Video form data key in localStorage
const VIDEO_FORM_DATA_KEY = "video_form_data";
const VIDEO_IMAGES_KEY = "video_images_data";

// Keep image files in memory to avoid localStorage quota issues with large base64 strings.
let inMemoryImageFiles = {
  image_one: null,
  image_two: null,
};

// Save metadata to localStorage and files in memory.
export const saveVideoFormData = async (data) => {
  try {
    inMemoryImageFiles = {
      image_one: data.image_one_file || null,
      image_two: data.image_two_file || null,
    };

    // Save metadata to localStorage
    const metadata = {
      memory_theme: data.memory_theme,
      theme_style: data.theme_style,
      is_long: data.is_long,
      single_image: data.single_image,
      hasImageOne: !!data.image_one_file,
      hasImageTwo: !!data.image_two_file,
    };

    localStorage.setItem(VIDEO_FORM_DATA_KEY, JSON.stringify(metadata));
    console.log("saveVideoFormData: Saved metadata to localStorage", metadata);

    return metadata;
  } catch (error) {
    console.error("saveVideoFormData: Error saving data", error);
    throw error;
  }
};

// Get form data from localStorage
export const getVideoFormData = () => {
  const data = localStorage.getItem(VIDEO_FORM_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

// Get image files from localStorage (convert base64 back to File)
export const getVideoImageFiles = () => {
  return {
    image_one: inMemoryImageFiles.image_one,
    image_two: inMemoryImageFiles.image_two,
  };
};

// Clear form data from localStorage
export const clearVideoFormData = () => {
  localStorage.removeItem(VIDEO_FORM_DATA_KEY);
  localStorage.removeItem(VIDEO_IMAGES_KEY);
  inMemoryImageFiles = {
    image_one: null,
    image_two: null,
  };
  console.log("clearVideoFormData: Cleared all video data from localStorage");
};

// Upload Video Action
export const uploadVideo = createAsyncThunk(
  "video/upload",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");

      console.log("uploadVideo: Checking token...", { hasToken: !!token });

      if (!token) {
        return rejectWithValue({
          message: "No authentication token found. Please log in again.",
          code: "no_token",
        });
      }

      const videoMetadata = getVideoFormData();
      const imageFiles = getVideoImageFiles();

      console.log("uploadVideo: Video metadata:", videoMetadata);
      console.log("uploadVideo: Image files:", {
        hasImageOne: !!imageFiles.image_one,
        hasImageTwo: !!imageFiles.image_two,
      });

      if (!videoMetadata) {
        return rejectWithValue({
          message: "No video data found. Please start the flow again.",
          code: "no_data",
        });
      }

      if (!imageFiles.image_one) {
        return rejectWithValue({
          message: "No image file found. Please upload an image.",
          code: "no_image",
        });
      }

      // Create FormData
      const formData = new FormData();
      formData.append("memory_theme", videoMetadata.memory_theme);
      formData.append("is_long", videoMetadata.is_long);
      formData.append("theme_style", videoMetadata.theme_style || "Default");
      formData.append("single_image", videoMetadata.single_image);

      // Append image files
      formData.append("image_one", imageFiles.image_one);

      if (!videoMetadata.single_image && imageFiles.image_two) {
        formData.append("image_two", imageFiles.image_two);
      }

      console.log(
        "uploadVideo: Sending request to API:",
        `${BASE_URL}core/api/video`,
      );

      const response = await axios.post(`${BASE_URL}core/api/video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("uploadVideo: API response:", response.data);

      // Clear the form data after successful upload
      clearVideoFormData();

      return response.data;
    } catch (error) {
      console.error("uploadVideo: Error:", error);
      if (error.response && error.response.data) {
        // Handle API error responses (e.g., {"error": "Credit Balance: Insufficient credits..."})
        const errorData = error.response.data;
        console.log("Redux VideoUpload - API error response data:", errorData);
        const errorMessage =
          errorData.error || errorData.message || "Failed to upload video";
        console.log(
          "Redux VideoUpload - Extracted error message:",
          errorMessage,
        );
        return rejectWithValue({ message: errorMessage, data: errorData });
      }
      return rejectWithValue({ message: "Network error occurred" });
    }
  },
);

// Video slice for managing state
const videoSlice = createSlice({
  name: "video",
  initialState: {
    loading: false,
    error: null,
    uploadSuccess: false,
    uploadedVideo: null,
  },
  reducers: {
    clearVideoState: (state) => {
      state.loading = false;
      state.error = null;
      state.uploadSuccess = false;
      state.uploadedVideo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadSuccess = true;
        state.uploadedVideo = action.payload;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Upload failed";
        state.uploadSuccess = false;
      });
  },
});

export const { clearVideoState } = videoSlice.actions;
export default videoSlice.reducer;
