# API Integration Quick Reference

## Environment Setup

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
# or
VITE_API_BASE_URL=https://your-production-api.com
```

## API Endpoints Summary

| Endpoint                        | Method | Description                          |
| ------------------------------- | ------ | ------------------------------------ |
| `/accounts/api/register`        | POST   | Register new user                    |
| `/accounts/api/verify-otp`      | PATCH  | Verify OTP (signup & password reset) |
| `/accounts/api/resend-otp`      | POST   | Resend OTP                           |
| `/accounts/api/login`           | POST   | User login                           |
| `/accounts/api/forget-password` | POST   | Request password reset OTP           |
| `/accounts/api/change-password` | PATCH  | Change password (requires token)     |

## Request/Response Examples

### 1. Register

**Request:**

```json
POST /accounts/api/register
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "SecurePass123",
  "reference_code": "REF123" // optional
}
```

**Response:**

```json
{
  "message": "OTP sent to email."
}
```

### 2. Verify OTP

**Request:**

```json
PATCH /accounts/api/verify-otp
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (Signup):**

```json
{
  "message": "OTP verified successfully."
}
```

**Response (Password Reset):**

```json
{
  "message": "OTP verified successfully.",
  "access": "eyJhbGc...",
  "refresh": "eyJhbGc...",
  "login_user_info": {
    "email": "user@example.com",
    "image": null
  }
}
```

### 3. Resend OTP

**Request:**

```json
POST /accounts/api/resend-otp
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "OTP resent successfully."
}
```

### 4. Login

**Request:**

```json
POST /accounts/api/login
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**

```json
{
  "message": "Login successful.",
  "user": {
    "id": 8,
    "email": "user@example.com",
    "image": null,
    "full_name": "John Doe"
  },
  "tokens": {
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 5. Forget Password

**Request:**

```json
POST /accounts/api/forget-password
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "OTP sent successfully.",
  "status": "success"
}
```

### 6. Change Password

**Request:**

```json
PATCH /accounts/api/change-password
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "new_password": "NewSecurePass456"
}
```

**Response:**

```json
{
  "message": "Password changed successfully."
}
```

## Error Handling

All errors follow this format:

```json
{
  "message": "Error description",
  "errors": {} // optional field errors
}
```

Common HTTP Status Codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Testing with cURL

### Register:

```bash
curl -X POST http://localhost:8000/accounts/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "TestPass123"
  }'
```

### Login:

```bash
curl -X POST http://localhost:8000/accounts/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Verify OTP:

```bash
curl -X PATCH http://localhost:8000/accounts/api/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456"
  }'
```

## Frontend Usage

The authentication is already integrated. Just ensure:

1. Backend is running
2. `.env` file has correct `VITE_API_BASE_URL`
3. Navigate to `/step-login` to test

The UI will handle:

- Form validation
- API calls
- Error display
- Success messages
- Token storage
- Redirects

## Troubleshooting

### CORS Issues

If you get CORS errors, ensure your backend allows the frontend origin:

```python
# Django example
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
]
```

### 401 Unauthorized

- Check if token is being sent in headers
- Verify token hasn't expired
- Ensure `Bearer ` prefix in Authorization header

### Network Error

- Verify backend is running
- Check `VITE_API_BASE_URL` in `.env`
- Restart dev server after changing `.env`
