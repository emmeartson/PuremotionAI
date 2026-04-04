import {
  BASE_URL,
  API_ENDPOINTS,
  setAuthTokens,
  clearAuthTokens,
  setUserInfo,
  getUserInfo,
} from "./Config";

// Auth API Service
class AuthService {
  async register(data) {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  }

  async verifyOTP(data) {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.VERIFY_OTP}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "OTP verification failed");
    }

    const result = await response.json();

    // Store tokens if returned
    if (result.tokens) {
      setAuthTokens(result.tokens.access, result.tokens.refresh);
    } else if (result.access) {
      // Handle case where tokens are at root level
      setAuthTokens(result.access, result.refresh || "");
    }
    if (result.user) {
      setUserInfo(result.user);
    }

    return result;
  }

  async resendOTP(data) {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.RESEND_OTP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to resend OTP");
    }

    return await response.json();
  }

  async login(data) {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const result = await response.json();

    // Store tokens and user info
    if (result.tokens) {
      setAuthTokens(result.tokens.access, result.tokens.refresh);
    }
    if (result.user) {
      setUserInfo(result.user);
    }

    return result;
  }

  async forgetPassword(data) {
    const response = await fetch(
      `${BASE_URL}${API_ENDPOINTS.FORGET_PASSWORD}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send reset OTP");
    }

    return await response.json();
  }

  async changePassword(data, accessToken) {
    const response = await fetch(
      `${BASE_URL}${API_ENDPOINTS.CHANGE_PASSWORD}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to change password");
    }

    return await response.json();
  }

  logout() {
    clearAuthTokens();
  }

  getCurrentUser() {
    return getUserInfo();
  }

  isAuthenticated() {
    return !!localStorage.getItem("access_token");
  }
}

export const authService = new AuthService();
export default authService;
