import api, { BASE_URL, getApiErrorMessage } from "./client";

export type LoginResponse = {
  id: number;
  role: string;
};

export type SignupResponse = {
  userId: number;
  role: string;
};

export type RefreshResponse = {
  accessToken: string;
};

export type VerifyOtpResponse = {
  resetToken: string;
};

export type AuthProvider = "GOOGLE" | "FACEBOOK";

export type RoleName =
  | "STUDENT"
  | "TEACHER";

export async function signupUser(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  preferredLanguageCode: string;
  educationLevelId?: number | null;
  role: "STUDENT" | "TEACHER";
}): Promise<SignupResponse> {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      getApiErrorMessage(error, "Signup failed")
    );
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const response = await api.post("/auth/login", data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      getApiErrorMessage(error, "Login failed")
    );
  }
}

export async function logoutUser() {
  try {
    await api.post("/auth/logout");
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Logout failed"));
  }
}

export async function refreshToken() {
  try {
    await api.post("/auth/refresh");
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Refresh failed"));
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      getApiErrorMessage(error, "Failed to send OTP")
    );
  }
}

export async function verifyOtp(email: string, otp: string): Promise<VerifyOtpResponse> {
  try {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Invalid OTP"));
  }
}

export async function resetPassword(
  resetToken: string,
  newPassword: string,
  confirmPassword: string
) {
  try {
    const response = await api.post("/auth/reset-password", {
      resetToken,
      newPassword,
      confirmPassword,
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Password reset failed"));
  }
}

export function googleAuth() {
  window.location.href = `${BASE_URL}/auth/oauth2/google`;
}
