import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

// Global axios interceptor: auto-logout on invalid token
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data;
    if (data?.code === "token_not_valid") {
      localStorage.clear();
      window.location.reload();
      // Return a never-resolving promise to halt further .catch() handlers
      return new Promise(() => {});
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  // </StrictMode>,
);
