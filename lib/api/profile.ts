import api, { getApiErrorMessage } from "./client";

export type Provider = "GOOGLE" | "FACEBOOK";

export type UserProfileResponse = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  preferredLanguage: string;
  educationLevel: string | null;
  department: string | null;
  isActive: boolean;
  lastLoginAt: string | null;
  providers: Provider[];
  roles: ("STUDENT" | "TEACHER")[];
};

export type UpdateProfileRequest = {
  name?: string;
  phone?: string;
  preferredLanguageCode?: string;
  educationLevelId?: number;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export async function getProfile(): Promise<UserProfileResponse> {
  try {
    const response = await api.get("/auth/me");
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch profile"));
  }
}

export async function updateProfile(data: UpdateProfileRequest): Promise<UserProfileResponse> {
  try {
    const response = await api.patch("/users/me", data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to update profile"));
  }
}

export async function changePassword(data: ChangePasswordRequest): Promise<void> {
  try {
    await api.patch("/users/me/password", data);
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to change password"));
  }
}

export async function uploadAvatar(file: File): Promise<string> {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    throw new Error("Invalid file format. Only JPG, PNG, and WEBP images are allowed.");
  }

  const maxSizeBytes = 2 * 1024 * 1024; // Strict 2MB limit
  if (file.size > maxSizeBytes) {
    throw new Error("File size exceeds 2MB limit.");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data?.avatarUrl || response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to upload avatar"));
  }
}
