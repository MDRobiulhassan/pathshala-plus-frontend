import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().trim().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/\d/, "Password must include a number")
      .regex(/[@#$%^&+=!]/, "Password must include a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    preferredLanguageCode: z.string().min(1, "Please select a language"),
    educationLevelId: z.string().optional(),
    role: z.enum(["STUDENT", "TEACHER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileInfoSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string().trim().optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().trim().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/\d/, "Password must include a number")
      .regex(/[@#$%^&+=!]/, "Password must include a special character"),
    confirmNewPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
});

export const verifyOtpSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
  otp: z.string().trim().regex(/^\d{6}$/, "OTP must contain exactly 6 digits"),
});

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, "Reset token is missing"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/\d/, "Password must include a number")
      .regex(/[@#$%^&+=!]/, "Password must include a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
