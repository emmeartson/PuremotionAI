# Authentication Setup Guide

## Overview

Complete authentication system has been integrated with backend API endpoints including:

- User Registration with OTP verification
- Login with JWT tokens
- Forgot Password flow with OTP
- Password Reset
- User session management

## Files Modified/Created

### 1. **src/Redux/Config.js**

- Base URL configuration
- API endpoint definitions
- Auth helper functions (token management, user info storage)

### 2. **src/Redux/Auth.jsx**

- Complete authentication service class
- API methods for all auth operations:
  - `register()` - User registration
  - `verifyOTP()` - OTP verification
  - `resendOTP()` - Resend OTP
  - `login()` - User login
  - `forgetPassword()` - Initiate password reset
  - `changePassword()` - Reset password
  - `logout()` - Clear session
  - `getCurrentUser()` - Get user info
  - `isAuthenticated()` - Check auth status

### 3. **src/Pages/FlashbackAI/Step5_Login.jsx**

Complete authentication UI with multiple views:

- **Signup Form** - Includes email, first name, last name, password, and optional reference code
- **Login Form** - Email and password with forgot password link
- **OTP Verification** - For both signup and password reset
- **Forgot Password** - Email submission
- **Reset Password** - New password form
- Real-time error handling and success messages
- Form validation
- Loading states

### 4. **src/Shared/Header.jsx**

- Dynamic header based on authentication state
- User dropdown menu when logged in showing:
  - User's name (or email if name not available)
  - Dashboard link
  - Logout option
- "Sign In" button when not authenticated
- Automatic user detection on page load

### 5. **.env.example**

Template for environment variables

## Configuration

1. **Set Backend URL**

   Create a `.env` file in the project root:

   ```env
   VITE_API_BASE_URL=http://your-backend-url.com
   ```

   Or update directly in `src/Redux/Config.js` if not using environment variables.

2. **API Endpoints** (already configured in Config.js):
   - `/accounts/api/register` - POST
   - `/accounts/api/verify-otp` - PATCH
   - `/accounts/api/resend-otp` - POST
   - `/accounts/api/login` - POST
   - `/accounts/api/forget-password` - POST
   - `/accounts/api/change-password` - PATCH

## Authentication Flow

### Registration Flow:

1. User fills signup form (email, first name, last name, password, optional reference code)
2. Submit → API call to `/accounts/api/register`
3. OTP sent to email → Show OTP verification screen
4. User enters OTP → API call to `/accounts/api/verify-otp`
5. Success → Redirect to login form

### Login Flow:

1. User enters email and password
2. Submit → API call to `/accounts/api/login`
3. Success → Store tokens and user info in localStorage
4. Redirect to `/dashboard`
5. Header automatically updates to show user menu

### Forgot Password Flow:

1. User clicks "Forgot Password" on login form
2. Enters email → API call to `/accounts/api/forget-password`
3. OTP sent → User enters OTP
4. Verify OTP → API call to `/accounts/api/verify-otp`
5. Receives temporary access token → Show reset password form
6. User enters new password → API call to `/accounts/api/change-password`
7. Success → Redirect to login

## Local Storage Management

The system stores the following in localStorage:

- `access_token` - JWT access token
- `refresh_token` - JWT refresh token
- `user_info` - User details (id, email, full_name, image)

On logout, all data is cleared and user is redirected to home page.

## Usage

### Check Authentication Status:

```javascript
import { authService } from "../Redux/Auth";

const isLoggedIn = authService.isAuthenticated();
const user = authService.getCurrentUser();
```

### Logout:

```javascript
authService.logout();
```

## Security Notes

1. Tokens are stored in localStorage (consider httpOnly cookies for production)
2. All API calls use proper authentication headers
3. Passwords are never stored locally
4. OTP verification required for email confirmation and password reset

## Testing

1. Start your backend server
2. Update `.env` with your backend URL
3. Run the frontend: `npm run dev`
4. Navigate to `/step-login` to test authentication flows

## Next Steps

Consider implementing:

- Token refresh mechanism
- Remember me functionality
- Social login integration
- Email verification resend with cooldown
- Rate limiting on frontend
- Password strength indicator
- Session timeout handling
