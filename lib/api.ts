// lib/api.ts

const BASE_URL = "http://localhost:8080"

// -----------------------------
// Types
// -----------------------------

export type LoginResponse = {
  userId: number
  accessToken: string
  refreshToken: string
  role: string
}

export type SignupResponse = {
  userId: number
  accessToken: string
  refreshToken: string
  role: string
}

// -----------------------------
// Helpers
// -----------------------------

function getAccessToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

function getAuthHeaders() {
  const token = getAccessToken()

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}


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
  const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || "Signup failed")
  }

  return res.json()
}
// -----------------------------
// Auth APIs
// -----------------------------

export async function loginUser(data: {
  email: string
  password: string
}): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || "Login failed")
  }

  return res.json()
}

// -----------------------------
// Example Protected API
// -----------------------------

export async function getProfile() {
  const res = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  if (res.status === 401) {
    // 🔥 Token invalid or expired
    throw new Error("Unauthorized")
  }

  if (!res.ok) {
    throw new Error("Failed to fetch profile")
  }

  return res.json()
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
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || "API request failed")
  }

  return res.json()
}