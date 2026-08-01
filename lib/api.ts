// lib/api.ts
import api from "./axios"
const BASE_URL = "http://localhost:8080"

// -----------------------------
// Types
// -----------------------------

export type LoginResponse = {
  id: number
  role: string
}
export type SignupResponse = {
  userId: number
  role: string
}

export type EducationLevelVariant = {
  id: number
  department: string | null
}

export type EducationLevel = {
  name: string
  variants: EducationLevelVariant[]
}

export type RefreshResponse = {
  accessToken: string
}
export type VerifyOtpResponse = {
  resetToken: string
}

export type Language = {
  id: number
  name: string
  code: string
}
// -----------------------------
// Helpers
// -----------------------------






// -----------------------------
// Signup API
// -----------------------------

export async function signupUser(data: {
  name: string
  email: string
  password: string
  confirmPassword: string
  preferredLanguageCode: string
  educationLevelId?: number | null
  role: "STUDENT" | "TEACHER"
}): Promise<SignupResponse> {
  try {
    const response = await api.post(
      "/auth/signup",
      data
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Signup failed"
    )
  }
}
// -----------------------------
// Auth APIs
// -----------------------------

export async function loginUser(data: {
  email: string
  password: string
}): Promise<LoginResponse> {
  try {
    const response = await api.post(
      "/auth/login",
      data
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Login failed"
    )
  }
}

// -----------------------------
// Example Protected API
// -----------------------------

export async function getProfile() {
  try {
    const response = await api.get("/auth/me")
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch profile"
    )
  }
}

/** Updates the authenticated user's profile. */
export async function updateProfile(
  data: UpdateProfileRequest
): Promise<UserProfileResponse> {
  try {
    const response = await api.patch("/users/me", data)
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Failed to update profile"
    )
  }
}

// -----------------------------
// Generic Request Helper (ADVANCED)
// -----------------------------

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || "API request failed")
  }

  return res.json()
}


// Education level api


export async function getEducationLevels():
  Promise<EducationLevel[]> {
  const res = await fetch(
    `${BASE_URL}/api/v1/education-levels`
  )

  if (!res.ok) {
    throw new Error(
      "Failed to fetch education levels"
    )
  }

  const response = await res.json()
  return response.data
}


export function googleAuth() {
  window.location.href = `${BASE_URL}/api/v1/auth/oauth2/google`
}


// Logout api

export async function logoutUser() {
  try {
    await api.post("/auth/logout")
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Logout failed"
    )
  }
}


// Refresh token api
export async function refreshToken() {
  try {
    await api.post("/auth/refresh")
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Refresh failed"
    )
  }
}


// forget password 

export async function forgotPassword(
  email: string
) {
  try {
    const response = await api.post(
      "/auth/forgot-password",
      { email }
    )
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Failed to send OTP"
    )
  }
}

// verify otp 

export async function verifyOtp(
  email: string,
  otp: string
): Promise<VerifyOtpResponse> {
  try {
    const response = await api.post(
      "/auth/verify-otp",
      { email, otp }
    )
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Invalid OTP"
    )
  }
}


// reset api 
export async function resetPassword(
  resetToken: string,
  newPassword: string,
  confirmPassword: string
) {
  try {
    const response = await api.post(
      "/auth/reset-password",
      {
        resetToken,
        newPassword,
        confirmPassword,
      }
    )
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Password reset failed"
    )
  }
}

// language api

export async function getLanguages(): Promise<Language[]> {
  const res = await fetch(
    `${BASE_URL}/api/v1/languages`
  )

  if (!res.ok) {
    throw new Error("Failed to load languages")
  }

  const response = await res.json()
  return response.data
}

/** Supported authentication providers. */
export type Provider = "GOOGLE" | "FACEBOOK"

/** Available user roles. */
export type RoleName =
  | "STUDENT"
  | "TEACHER"
  | "CONTENT_ADMIN"
  | "SUPER_ADMIN"

/** User profile returned by the API. */
export type UserProfileResponse = {
  id: number
  name: string
  email: string
  phone: string | null
  avatarUrl: string | null
  preferredLanguage: string
  educationLevel: string | null
  department: string | null
  isActive: boolean
  lastLoginAt: string | null
  providers: Provider[]
  roles: RoleName[]
}

/** Request payload for updating user profile fields. */
export type UpdateProfileRequest = Partial<{
  name: string
  phone: string
  preferredLanguageCode: string
  educationLevelId: number
  avatarUrl: string
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}>

/** Uploads a new profile avatar image and returns the resulting URL. */
export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await api.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ?? "Failed to upload avatar"
    )
  }
}

// -----------------------------
// Student Dashboard
// -----------------------------

export async function getStudentDashboard() {
  try {
    const response = await api.get("/dashboard/student")
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch dashboard"
    )
  }
}
