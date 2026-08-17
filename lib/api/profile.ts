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

export type UpdateProfileRequest = Partial<{
  name: string;
  phone: string;
  preferredLanguageCode: string;
  educationLevelId: number;
  avatarUrl: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}>;

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

export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to upload avatar"));
  }
}
