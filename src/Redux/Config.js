// API Base URL Configuration
// const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://10.10.13.80:8004';
const rawBaseUrl = 'https://api.puremotion.co'; //live server
// const rawBaseUrl = 'https://api.yourcompassy.com'; //local server



export const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;

// API Endpoints
export const API_ENDPOINTS = {
  REGISTER: 'accounts/api/register',
  VERIFY_OTP: 'accounts/api/verify-otp',
  RESEND_OTP: 'accounts/api/resend-otp',
  LOGIN: 'accounts/api/login',
  FORGET_PASSWORD: 'accounts/api/forget-password',
  CHANGE_PASSWORD: 'accounts/api/change-password',
};

// Auth Helper Functions
export const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

export const setAuthTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

export const clearAuthTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_info');
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem('user_info');
  return userInfo ? JSON.parse(userInfo) : null;
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem('user_info', JSON.stringify(userInfo));
};
